import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Toast from '@components/toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TempleHS',
  description: 'Hospital test project for TempleHS',
}

export default async function RootLayout({
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
