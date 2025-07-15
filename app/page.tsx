// app/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
      <h2>퀴즈 앱에 오신 것을 환영합니다!</h2>
      <button onClick={() => router.push("/quiz")}>퀴즈 시작</button>
    </div>
  );
}
