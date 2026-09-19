"use client";

import { RichContent } from "@averoui/react";
import { useCopy } from "../copy";

export default function RichContentSanitizedDemo() {
  const t = useCopy({
    fa: { text: "این متن از یک ورودی غیرقابل‌اعتماد می‌آید.", link: "لینک خطرناک" },
    en: { text: "This text comes from an untrusted source.", link: "A dangerous link" },
  });

  // Everything dangerous here is removed before it reaches the DOM.
  const untrusted = `
<p onclick="steal()">${t.text}</p>
<script>alert("xss")</script>
<a href="javascript:alert(1)">${t.link}</a>
<iframe src="https://evil.test"></iframe>
`;

  return (
    <div className="w-full max-w-2xl">
      <RichContent html={untrusted} />
    </div>
  );
}
