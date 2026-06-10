import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center text-white bg-black">
      <h1 className="mb-4 text-5xl font-bold">404</h1>
      <p className="mb-8 text-gray-400">This page could not be found.</p>
      <Link href="/" className="button is-primary">
        Back home
      </Link>
    </div>
  )
}
