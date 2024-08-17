"use client";

import { useState } from "react";
import { CsrfTests } from "./_components/csrfTests";
import { RequestTests } from "./_components/requestTests";

export default function HomePage() {
  const [text, setText] = useState("No text found");
  function changeText(newText: string) {
    setText(newText);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-screen">
      <h1>{text}</h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <CsrfTests changeText={changeText} />
        <RequestTests changeText={changeText} />
      </div>
    </div>
  );
}
