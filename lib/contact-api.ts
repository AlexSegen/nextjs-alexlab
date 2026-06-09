import { ContactPayload } from '@/types'

// NOTE: el endpoint de Heroku probablemente está caído (Heroku eliminó los
// dynos free en nov-2022) — el formulario de contacto puede no estar
// enviando mensajes actualmente. Ver Fase 7 del REFACTOR-PLAN.md.
const apiURL =
  process.env.NEXT_PUBLIC_CONTACT_API_URL ??
  'https://pixelagil.herokuapp.com/api'

export const sendMessage = async (payload: ContactPayload) => {
  const body = { ...payload, notify: true }

  const response = await fetch(`${apiURL}/leads/set`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response.json()
}
