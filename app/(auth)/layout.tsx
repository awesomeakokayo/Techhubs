export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      {children}
    </main>
  )
}
