import type { Metadata } from 'next'
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import { PageNavbar } from './components/navbar/navbar';
import { create } from 'domain';
// const inter = Noto_Sans({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Financial Tracker',
  description: 'I have followed setup instructions carefully',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <PageNavbar />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
