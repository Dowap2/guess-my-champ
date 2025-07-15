import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header>
          <h1>Next.js 퀴즈 앱</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
