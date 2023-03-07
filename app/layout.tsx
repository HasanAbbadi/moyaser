import './globals.css'

export const metadata = {
  title: 'Moyaser',
  description: 'Memorize the holy book easier & quicker.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
