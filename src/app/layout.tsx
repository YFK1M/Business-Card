import {ReactNode} from "react";
import './globals.css'

export const metadata = {
  title: 'Maksim Spiridonov',
  description: 'Business card of Maksim Spiridonov',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
