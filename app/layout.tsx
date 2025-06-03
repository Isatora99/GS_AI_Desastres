import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Assistente de Prevenção de Desastres",
  description: "Conscientização sobre desastres naturais",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
