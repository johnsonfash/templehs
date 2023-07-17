import './globals.css'
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Toast from '@components/toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TempleHS',
  description: 'Hospital test project for TempleHS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toast />
        {children}
      </body>
    </html>
  )
}
