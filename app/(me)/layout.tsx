import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '~/styles/globals.css';
import { Toaster } from '~/components/ui/sonner';
import { ThemeProvider } from '~/components/provider/themeProvider';
import { SWRProvider } from '~/components/provider/swrProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // ensure font display optimization
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap', // ensure font display optimization
});

// extract shared configuration as constant
const THEME_COLORS = [
  { media: '(prefers-color-scheme: light)', color: 'white' },
  { media: '(prefers-color-scheme: dark)', color: '#141414' },
];

export const metadata: Metadata = {
  title: {
    default: 'AntFE Developer Community',
    template: '%s | AntFE Developer Community',
  },
  description: 'Personal homepage in AntFE Developer Community',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: THEME_COLORS,
};

// only use generateViewport when you need to dynamically generate based on parameters
// if the configuration is exactly the same, you can consider deleting this function
export function generateViewport() {
  // if you don't need to dynamically generate different configurations based on locale, you can delete this function
  // or add specific locale logic here
  return {
    // use constant to avoid repetition
    themeColor: THEME_COLORS,
  };
}

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* prevent flashing */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                (function() {
                  var savedTheme = localStorage.getItem('theme')
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                  var theme = savedTheme || 'system'
                  var resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme
                  document.documentElement.classList.add(resolved)
                  document.documentElement.style.colorScheme = resolved
                })()
              } catch(e) { console.error(e) }
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <SWRProvider>
            {children}
            <Toaster />
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
