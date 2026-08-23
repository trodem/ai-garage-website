import { useEffect, useRef, useState, type ReactNode } from "react";

type TypewriterOptions = {
  enabled: boolean;
  paused: boolean;
  instant: boolean;
  onDone?: () => void;
};

export function useMockupTypewriter(text: string, options: TypewriterOptions): string {
  const { enabled, paused, instant, onDone } = options;
  const [count, setCount] = useState(instant || !enabled ? text.length : 0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    doneRef.current = false;
    setCount(instant || !enabled ? text.length : 0);
  }, [enabled, instant, text]);

  useEffect(() => {
    if (!enabled) return;
    if (count >= text.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDoneRef.current?.();
      }
      return;
    }
    if (instant || paused) return;
    const char = text[count] ?? "";
    const delay = char === "\n" ? 60 : 6;
    const id = window.setTimeout(() => setCount((current) => current + 1), delay);
    return () => window.clearTimeout(id);
  }, [enabled, paused, instant, text, count]);

  return text.slice(0, count);
}

export function renderMarkedText(source: string): ReactNode {
  const parts = source.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

export function renderMarkedPartial(visible: string): ReactNode {
  const oddMarks = (visible.match(/\*\*/g) ?? []).length % 2 === 1;
  return renderMarkedText(oddMarks ? `${visible}**` : visible);
}
