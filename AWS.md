# Integración AWS — nextjs-alexlab en avivas.dev

Documento de referencia técnica. Describe todos los cambios aplicados para migrar el sitio desde Amplify a una infraestructura propia con S3 + CloudFront.

---

## Contexto

El sitio estaba desplegado en Amplify, cuya distribución interna de CloudFront (`d2dd7ypm7fa7d9.cloudfront.net`) ya no estaba activa en la cuenta. El objetivo fue reemplazarla con infraestructura propia controlada, y habilitar un comando local (`yarn deploy`) que construya y publique el sitio automáticamente.

---

## Estado previo

| Recurso | Estado antes de la migración |
|---|---|
| Amplify app | Eliminada manualmente durante el proceso |
| Route53 `avivas.dev` A | Alias a `d2dd7ypm7fa7d9.cloudfront.net` (distribución huérfana de Amplify) |
| Route53 `www.avivas.dev` CNAME | `d2dd7ypm7fa7d9.cloudfront.net` |
| ACM `avivas.dev` | Inexistente (CNAMEs de validación de un cert anterior presentes en Route53) |
| CloudFront en la cuenta | Ninguna distribución propia para avivas.dev |

---

## Recursos AWS creados

| Recurso | ID / Valor |
|---|---|
| S3 Bucket | `avivas.dev` — región `us-east-1`, acceso privado |
| CloudFront OAC | `<CF_OAC_ID>` — tipo S3, signing `sigv4` |
| CloudFront Distribution | `<CF_DISTRIBUTION_ID>` → `<CF_DOMAIN>.cloudfront.net` |
| CloudFront Function | `avivas-dev-uri-rewrite` — viewer-request, runtime `cloudfront-js-2.0` |
| ACM Certificate | `arn:aws:acm:us-east-1:<AWS_ACCOUNT_ID>:certificate/<CERT_ID>` |
| Route53 Hosted Zone | `<HOSTED_ZONE_ID>` (avivas.dev) |
| AWS Account ID | `<AWS_ACCOUNT_ID>` |
| AWS Profile local | `default` |

---

## Cambios en el código

### `next.config.js` — exportación estática habilitada
```js
const nextConfig = {
  reactStrictMode: true,
  output: 'export',   // genera out/ en lugar de .next/
}
module.exports = nextConfig
```

> **Nota:** Con `output: 'export'` el build genera HTML estático en `out/`, no en `.next/`.
> `.next/` corresponde al modo servidor (`next start`), incompatible con S3.

### `pages/portfolio/[catslug].jsx` — rutas dinámicas para static export
En Next.js pages router, `output: 'export'` requiere que toda ruta dinámica exporte
`getStaticPaths` **y** `getStaticProps`. Sin ambas funciones el build falla.

```js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { catslug: 'web' } },
      { params: { catslug: 'ui' } },
    ],
    fallback: false,
  }
}

export async function getStaticProps() {
  return { props: {} }
}
```

> **Ajuste no previsto en el plan original:** el plan solo contemplaba `getStaticPaths`.
> El build falló con el error `getStaticPaths was added without a getStaticProps`,
> por lo que se agregó `getStaticProps` retornando props vacíos (la página usa
> únicamente datos de contexto cliente).

### `pages/api/hello.js` — eliminado
Las API routes son incompatibles con `output: 'export'`. El archivo era una demo sin uso real.

> Para lógica de servidor en el futuro, usar **AWS Lambda + API Gateway** (ver sección al final).

### `package.json` — script `deploy`
```json
"deploy": "yarn build && aws s3 sync out/ s3://avivas.dev --delete && aws cloudfront create-invalidation --distribution-id E218HNUZNE0T0N --paths '/*'"
```

---

## Infraestructura AWS — pasos aplicados

### 1. Certificado ACM (`us-east-1`)
CloudFront requiere que el certificado esté en `us-east-1` independientemente de la región del bucket.

```bash
aws acm request-certificate \
  --domain-name avivas.dev \
  --subject-alternative-names www.avivas.dev \
  --validation-method DNS \
  --region us-east-1
```

Los CNAMEs de validación se agregaron a Route53 (hosted zone `Z09566062A1OUPP2JBXFO`) y el
certificado quedó en estado `ISSUED` en ~1 minuto (los CNAMEs de una cert anterior aún estaban
presentes en la zona, lo que aceleró la validación del dominio principal).

### 2. Bucket S3 `avivas.dev`
```bash
aws s3api create-bucket --bucket avivas.dev --region us-east-1
aws s3api put-public-access-block --bucket avivas.dev \
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

- Sin Static Website Hosting habilitado (no necesario con CloudFront + OAC).
- Todo el acceso al bucket pasa exclusivamente por CloudFront.

### 3. CloudFront Origin Access Control (OAC)
```bash
aws cloudfront create-origin-access-control \
  --origin-access-control-config '{
    "Name": "avivas-dev-oac",
    "SigningProtocol": "sigv4",
    "SigningBehavior": "always",
    "OriginAccessControlOriginType": "s3"
  }'
# → ID: <CF_OAC_ID>
```

OAC es el mecanismo moderno de autenticación entre CloudFront y S3 (reemplaza al deprecado OAI).

### 4. Distribución CloudFront

> **Ajuste no previsto — `CNAMEAlreadyExists`:** Al intentar crear la distribución con los aliases
> `avivas.dev` y `www.avivas.dev`, la API retornó error `CNAMEAlreadyExists` porque Amplify
> registra sus distribuciones internas en un sistema separado no visible en `list-distributions`.
> El proceso de resolución fue:
>
> 1. Eliminar los registros DNS de Route53 que apuntaban a la distribución huérfana de Amplify.
> 2. Crear la distribución **sin aliases**.
> 3. El usuario eliminó la app de Amplify desde la consola.
> 4. Actualizar la distribución para agregar los aliases `avivas.dev` y `www.avivas.dev`
>    (exitoso una vez que Amplify liberó los CNAMEs).

Configuración final de la distribución:

| Parámetro | Valor |
|---|---|
| Origin | `avivas.dev.s3.us-east-1.amazonaws.com` |
| Origin Access | OAC `<CF_OAC_ID>` |
| CloudFront Function | `avivas-dev-uri-rewrite` (viewer-request) |
| Aliases | `avivas.dev`, `www.avivas.dev` |
| Default root object | `index.html` |
| Viewer protocol policy | `redirect-to-https` |
| Cache policy | Managed-CachingOptimized |
| Custom error 403 | → `/404.html` HTTP 404, TTL 10s |
| Custom error 404 | → `/404.html` HTTP 404, TTL 10s |
| Compress objects | Yes |
| HTTP version | HTTP/2 |
| IPv6 | Enabled |
| Price class | `PriceClass_100` (US + Europa) |
| ACM Certificate | `arn:aws:acm:us-east-1:<AWS_ACCOUNT_ID>:certificate/<CERT_ID>` |

### 5. Bucket Policy S3

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "cloudfront.amazonaws.com" },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::avivas.dev/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::<AWS_ACCOUNT_ID>:distribution/<CF_DISTRIBUTION_ID>"
        }
      }
    }
  ]
}
```

### 6. Route53 — registros finales de `avivas.dev`

| Nombre | Tipo | Valor |
|---|---|---|
| `avivas.dev.` | A Alias | `<CF_DOMAIN>.cloudfront.net.` (HostedZoneId: `Z2FDTNDATAQYW2`) |
| `www.avivas.dev.` | CNAME | `<CF_DOMAIN>.cloudfront.net` |

> **Ajuste no previsto:** Los registros A y CNAME anteriores (que apuntaban a Amplify) fueron
> **eliminados explícitamente** antes de poder crear la distribución, ya que CloudFront
> valida los CNAMEs contra el DNS al momento de asociarlos.

---

## Flujo de despliegue (uso diario)

```bash
yarn deploy
# 1. yarn build      → genera out/ con HTML/CSS/JS estático (8 páginas)
# 2. aws s3 sync     → sube out/ a s3://avivas.dev, borra archivos eliminados
# 3. cloudfront      → invalida /* para que los cambios sean visibles de inmediato
```

El primer deploy subió **80 archivos / 27.3 MiB**.

---

## SPA routing — fix para refresh en rutas internas

Al hacer refresh en `/career`, `/portfolio`, etc., S3 no encuentra el objeto `career` (sin extensión)
y retorna 403, que CloudFront convierte en 404. La solución es una **CloudFront Function** que
reescribe las URIs antes de que lleguen al origen S3.

### Función `avivas-dev-uri-rewrite`

```js
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Directory request → serve index.html
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  }
  // No file extension → append .html (Next.js static export)
  else if (!uri.split('/').pop().includes('.')) {
    request.uri += '.html';
  }

  return request;
}
```

- **Evento:** `viewer-request` (se ejecuta antes de consultar la caché y el origen)
- **Runtime:** `cloudfront-js-2.0`
- Rutas con extensión (`.js`, `.css`, `.jpg`, etc.) pasan sin modificación
- Una ruta inexistente sigue retornando 404 correctamente

---

## Consideraciones sobre API routes y lógica de servidor

`output: 'export'` hace que el sitio sea completamente estático — no puede incluir API routes
ni lógica de servidor en el proceso de Next.js.

Las llamadas en `services/api.jsx` (a `pixelagil.herokuapp.com` y GitHub API) son
**client-side** y siguen funcionando sin cambios.

Para cualquier lógica de servidor futura (envío de emails, webhooks, procesamiento de datos):
- Crear una **AWS Lambda** con **API Gateway** en la misma cuenta
- Invocarla directamente desde el frontend con `fetch`
- El patrón encaja con el stack actual y tiene costo prácticamente cero en un portafolio personal

---

## Verificación realizada

```bash
curl -sI https://avivas.dev
# HTTP/2 200
# server: AmazonS3
# x-cache: Miss from cloudfront
```
