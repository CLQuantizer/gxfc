import "./globals.css"
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
        <body className={cn("w-screen h-full bg-background font-sans antialiased overflow-x-hidden", fontSans.variable)}>
          <div id="root">{children}</div>
        </body>
    </html>
  )
}
