import Link from "next/link";

export default function Home() {
  return (
    <main className="flex space-x-2">

      <Link href='/register'>Register</Link>
      <Link href='/login'>Login</Link>

    </main>
  )
}
