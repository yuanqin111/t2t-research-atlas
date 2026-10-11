"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "./LanguageContext";

type ReadingMode = "mobile" | "desktop";
const ReadingModeContext = createContext<{ mode: ReadingMode; openChooser: () => void } | null>(null);

export function useReadingMode() {
  const context = useContext(ReadingModeContext);
  if (!context) throw new Error("ReadingModeProvider is required");
  return context;
}

export function ReadingModeProvider({ children }: { children: ReactNode }) {
  const { language, pick } = useLanguage();
  const [mode, setMode] = useState<ReadingMode>("desktop");
  const [recommended, setRecommended] = useState<ReadingMode>("desktop");
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const openChooser = () => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (!dialog.current?.open) dialog.current?.showModal();
  };
  useEffect(() => {
    const suggested = window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
    setRecommended(suggested);
    let saved: string | null = null;
    try { saved = localStorage.getItem("t2t-reading-mode"); } catch { /* Storage can be unavailable in private browsing. */ }
    setMode(saved === "mobile" || saved === "desktop" ? saved : suggested);
    if (saved !== "mobile" && saved !== "desktop") dialog.current?.showModal();
  }, []);
  const choose = (next: ReadingMode) => {
    setMode(next);
    try { localStorage.setItem("t2t-reading-mode", next); } catch { /* Selection still works without persistence. */ }
    dialog.current?.close();
  };
  return <ReadingModeContext.Provider value={{ mode, openChooser }}>
    {children}
    <dialog ref={dialog} className="reading-mode-dialog" aria-labelledby="reading-mode-title" onClose={() => previousFocus.current?.focus()}>
      <div className="reading-mode-panel">
        <span className="reading-mode-kicker">{pick("中国纺织品循环利用（T2T）研究图谱", "China T2T Circularity Research Atlas")}</span>
        <h2 id="reading-mode-title">{pick("选择阅读版本", "Choose your reading view")}</h2>
        <p>{pick("两种版式内容相同，可随时切换。", "The same research in two layouts. Switch at any time.")}</p>
        <div className="reading-mode-options">
          <button onClick={() => choose("mobile")} autoFocus={recommended === "mobile"}>
            <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="13" y="4" width="22" height="40" rx="4"/><path d="M21 9h6M22 38h4"/></svg>
            <strong>{pick("手机", "Phone")}{language === "zh" && <small className="reading-mode-english" lang="en">Phone</small>}</strong><span>{pick("竖屏阅读 · 图表可放大", "Portrait reading · Zoomable figures")}</span>
          </button>
          <button onClick={() => choose("desktop")} autoFocus={recommended === "desktop"}>
            <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="4" y="7" width="40" height="28" rx="3"/><path d="M24 35v7M15 42h18"/></svg>
            <strong>{pick("平板 / 电脑", "Tablet / Computer")}{language === "zh" && <small className="reading-mode-english" lang="en">Tablet / Computer</small>}</strong><span>{pick("侧边目录 · 大屏阅读", "Sidebar contents · Wide-screen reading")}</span>
          </button>
        </div>
        <LanguageChoiceHint />
      </div>
    </dialog>
  </ReadingModeContext.Provider>;
}

function LanguageChoiceHint() {
  const { pick } = useLanguage();
  return <p className="reading-mode-hint">{pick("中英文切换位于页面顶部。", "Change the language at the top of the page.")}</p>;
}

export function ReadingModeSwitch() {
  const { mode, openChooser } = useReadingMode();
  const { pick } = useLanguage();
  return <button className="reading-mode-switch" onClick={openChooser} aria-haspopup="dialog">
    {mode === "mobile" ? pick("手机版", "Phone view") : pick("平板 / 电脑版", "Tablet / desktop")}
    <span aria-hidden="true"> ⇄</span>
  </button>;
}
