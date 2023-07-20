'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2 className="block text-red-800 rounded-lg bg-red-500">Something went wrong!</h2>
        <div>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </body>
    </html>
  )
}