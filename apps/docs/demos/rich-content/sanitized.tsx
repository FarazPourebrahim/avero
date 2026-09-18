import { RichContent } from "@averoui/react";

// Everything dangerous here is removed before it reaches the DOM.
const UNTRUSTED = `
<p onclick="steal()">این متن از یک ورودی غیرقابل‌اعتماد می‌آید.</p>
<script>alert("xss")</script>
<a href="javascript:alert(1)">لینک خطرناک</a>
<iframe src="https://evil.test"></iframe>
`;

export default function RichContentSanitizedDemo() {
  return (
    <div className="w-full max-w-2xl">
      <RichContent html={UNTRUSTED} />
    </div>
  );
}
