import './globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CustomThemeProvider from '../src/providers/ThemeProvider'

export const metadata = {
  title: 'Forests by Heartfulness',
  description: 'Creating a greener, more sustainable future through forest restoration and conservation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <CustomThemeProvider>
            {children}
          </CustomThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}