"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";

const chapters = [
  { id: "overview", number: "01", zh: "中国纺织品产量与回收规模", shortZh: "产量与回收", en: "China Textile Output & Recovery Scale", shortEn: "Output & Recovery" },
  { id: "data-lab", number: "02", zh: "不同类型纺织品产量变化趋势与代表性生产企业", shortZh: "趋势与生产企业", en: "Output Trends by Textile Type & Representative Producers", shortEn: "Trends & Producers" },
  { id: "evidence-tables", number: "03", zh: "中国废旧纺织品回收分选代表性企业", shortZh: "回收分选企业", en: "Representative Waste-Textile Collection & Sorting Companies in China", shortEn: "Collection & Sorting" },
  { id: "figure-atlas", number: "04", zh: "主要回收技术与代表性企业", shortZh: "技术与企业", en: "Major Recycling Technologies & Representative Companies", shortEn: "Technologies & Companies" },
  { id: "technology", number: "4.5", zh: "技术路线综合比较", shortZh: "路线比较", en: "Comparative Assessment of Recycling Routes", shortEn: "Route Comparison" },
  { id: "roadmap", number: "05", zh: "产业发展路线与重点任务", shortZh: "发展路线", en: "Industry Roadmap & Priorities", shortEn: "Roadmap" },
  { id: "references", number: "06", zh: "数据来源与参考文献", shortZh: "参考文献", en: "Data Sources & References", shortEn: "Sources" },
] as const;

export default function ChapterDirectory() {
  const { language, pick } = useLanguage();
  const [activeId, setActiveId] = useState<string>(chapters[0].id);

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));

    let frame = 0;
    const updateActiveChapter = () => {
      frame = 0;
      const readingLine = Math.min(window.innerHeight * 0.32, 260);
      const current = sections.filter((section) => section.getBoundingClientRect().top <= readingLine).at(-1);
      setActiveId(current?.id ?? chapters[0].id);
    };
    const scheduleUpdate = () => { if (!frame) frame = window.requestAnimationFrame(updateActiveChapter); };
    updateActiveChapter();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <aside className="chapter-directory" aria-label={pick("核心章节目录", "Core chapter directory")}>
      <div className="chapter-directory-head">
        <span>{pick("目", "§")}</span>
        <div><strong>{pick("网站内容目录", "Site Contents")}</strong>{language === "en" && <small>CONTENTS</small>}</div>
      </div>
      <nav id="chapter-navigation">
        {chapters.map((chapter) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className={activeId === chapter.id ? "active" : ""}
            aria-current={activeId === chapter.id ? "location" : undefined}
            data-label={language === "zh" ? chapter.zh : chapter.en}
            title={`${chapter.number} · ${language === "zh" ? chapter.zh : chapter.en}`}
            aria-label={`${chapter.number} · ${language === "zh" ? chapter.zh : chapter.en}`}
            onClick={() => setActiveId(chapter.id)}
          >
            <span>{chapter.number}</span>
            <strong>
              <b>{language === "zh" ? chapter.zh : chapter.en}</b>
              <small>{language === "zh" ? chapter.shortZh : chapter.shortEn}</small>
            </strong>
          </a>
        ))}
      </nav>
    </aside>
  );
}
