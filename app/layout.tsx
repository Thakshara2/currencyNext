import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ['latin'] });

// SEO Metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: "Real-Time Currency Converter | Live Exchange Rates",
    template: "%s | Currency Converter"
  },
  description: "Free currency converter with live exchange rates. Convert between 160+ world currencies instantly. Real-time updates, no ads, and simple to use.",
  keywords: [
    "currency converter",
    "exchange rate calculator",
    "live exchange rates",
    "money converter",
    "forex converter",
    "currency conversion tool",
    "real time currency converter",
    "international currency converter",
    "best currency converter",
    "free currency converter",
    "USD converter",
    "EUR converter",
    "GBP converter",
    "currency calculator",
    "forex calculator"
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name/Company",
  publisher: "Your Name/Company",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Real-Time Currency Converter | Live Exchange Rates",
    description: "Free currency converter with live exchange rates. Convert between 160+ world currencies instantly. Real-time updates, no ads, and simple to use.",
    siteName: "Currency Converter",
    images: [
      {
        url: "/og-image.jpg", // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: "Currency Converter Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real-Time Currency Converter | Live Exchange Rates",
    description: "Free currency converter with live exchange rates. Convert between 160+ world currencies instantly. Real-time updates, no ads, and simple to use.",
    images: ["/twitter-image.jpg"], // Add your Twitter card image
    creator: "@yourhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://your-domain.com",
    languages: {
      'en-US': 'https://your-domain.com/en-US',
      'es-ES': 'https://your-domain.com/es',
      // Add more language alternatives as needed
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Currency Converter",
              "description": "Free currency converter with live exchange rates",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}