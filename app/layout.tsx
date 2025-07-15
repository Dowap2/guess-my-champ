import type { ReactNode } from "react";
import "../src/App.css";
import { Question } from "../src/components/Question";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">{children}</div>
      </body>
    </html>
  );
}
