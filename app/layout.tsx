import './globals.css'
import './colorschemes.css'
import LeftSidebar from './LeftSidebar'

const colorschemes: Array<string> = ['nord-light', 'gruvbox-light', 'nord-dark', 'dracula-dark', 'gruvbox-dark']

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
      <body>
        <div id="body-wrapper">
          <LeftSidebar colorschemes={colorschemes} />
          {children}
        </div>
      </body>
    </html>
  )
}
