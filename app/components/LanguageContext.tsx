"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "zh" | "en";

type LanguageState = {
  language: Language;
  setLanguage: (language: Language) => void;
  pick: (zh: string, en: string) => string;
};

const LanguageContext = createContext<LanguageState | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh");

  useEffect(() => {
    const saved = window.localStorage.getItem("t2t-language");
    if (saved === "zh" || saved === "en") setLanguage(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = language === "zh"
      ? "中国纺织品循环利用（T2T）研究图谱"
      : "China Textile-to-Textile Circularity Research Atlas";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = language === "zh"
      ? "中国纺织品循环利用（T2T）数据、技术路线、项目证据与产业发展路线的交互式研究图谱。"
      : "An interactive research atlas of data, technology routes, project evidence, and industry pathways for textile-to-textile circularity in China.";
    window.localStorage.setItem("t2t-language", language);
  }, [language]);

  const value = useMemo<LanguageState>(() => ({
    language,
    setLanguage,
    pick: (zh, en) => language === "zh" ? zh : en,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="language-switch" role="group" aria-label={language === "zh" ? "选择网站语言" : "Select site language"}>
      <button className={language === "zh" ? "active" : ""} onClick={() => setLanguage("zh")} aria-pressed={language === "zh"}>中文</button>
      <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
    </div>
  );
}
