import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';

// const inter = Noto_Sans({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Mantine app',
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
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  )
}
