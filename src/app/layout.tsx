import type { Metadata } from "next";
import { Outfit, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthModalProvider } from "@/components/auth/auth-modal";
import { ToastProvider } from "@/components/ui/toast";
import { AppShell } from "@/components/layout/app-shell";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Knowledge FStack",
    template: "%s · Knowledge FStack",
  },
  description:
    "Nền tảng chia sẻ và học kiến thức phỏng vấn Frontend — JavaScript, React, Vue, Next.js và hơn thế nữa.",
  openGraph: {
    siteName: "Knowledge FStack",
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
  },
  manifest: "/manifest.webmanifest",
};

const themeBootScript = `
(function(){
  try {
    var t = localStorage.getItem('kf-theme');
    if (t !== 'dark' && t !== 'light') t = 'light';
    document.documentElement.dataset.theme = t;
    if (t === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body
        className="flex min-h-full flex-col font-sans"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ToastProvider>
            <AuthModalProvider>
              <AppShell>{children}</AppShell>
            </AuthModalProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
