"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";

const chapters = [
  { id: "overview", number: "01", zh: "中国材料产量与回收规模", shortZh: "材料规模", en: "Material Output & Recovery", shortEn: "Materials" },
  { id: "data-lab", number: "02", zh: "各材料变化趋势与代表性企业", shortZh: "趋势与企业", en: "Material Trends & Companies", shortEn: "Trends" },
  { id: "evidence-tables", number: "03", zh: "核心数据与技术证据表", shortZh: "核心数据表", en: "Core Data & Evidence Tables", shortEn: "Tables" },
  { id: "figure-atlas", number: "04", zh: "回收技术与项目图解", shortZh: "技术图解", en: "Recycling Technologies & Projects", shortEn: "Technology" },
  { id: "technology", number: "4.5", zh: "主要技术路线对比", shortZh: "技术对比", en: "Recycling Route Comparison", shortEn: "Routes" },
  { id: "roadmap", number: "05", zh: "产业发展路线与重点任务", shortZh: "发展路线", en: "Industry Roadmap & Priorities", shortEn: "Roadmap" },
  { id: "references", number: "06", zh: "数据来源与参考文献", shortZh: "参考文献", en: "Data Sources & References", shortEn: "Sources" },
] as const;

export default function ChapterDirectory() {
  const { language, pick } = useLanguage();
  const [activeId, setActiveId] = useState(chapters[0].id);

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveId(visible.target.id as typeof activeId);
      },
      { rootMargin: "-18% 0px -64% 0px", threshold: [0, 0.08, 0.2] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="chapter-directory" aria-label={pick("核心章节目录", "Core chapter directory")}>
      <div className="chapter-directory-head">
        <span>{pick("目", "§")}</span>
        <div><strong>{pick("网站内容目录", "Site Contents")}</strong>{language === "en" && <small>CONTENTS</small>}</div>
      </div>
      <nav>
        {chapters.map((chapter) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className={activeId === chapter.id ? "active" : ""}
            aria-current={activeId === chapter.id ? "location" : undefined}
            data-label={language === "zh" ? chapter.zh : chapter.en}
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
