"use client";

import referencesData from "../data/references.json";
import { useLanguage } from "./LanguageContext";

type ReferenceRecord = {
  id: number;
  text: string;
  url: string | null;
};

const references = referencesData as ReferenceRecord[];

const groups = [
  { zh: "政策、材料产量与回收统计", en: "Policy, material output, and recovery statistics", range: "1—26", from: 1, to: 26 },
  { zh: "混纺、回收与分选", en: "Blends, collection, and sorting", range: "27—43", from: 27, to: 43 },
  { zh: "再生技术与项目", en: "Recycling technologies and projects", range: "44—83", from: 44, to: 83 },
  { zh: "企业年报与产品数据", en: "Company reports and product data", range: "84—94", from: 84, to: 94 },
] as const;

export default function ReferencesSection() {
  const { language, pick } = useLanguage();
  return (
    <section className="references-section section-shell" id="references">
      <div className="references-head">
        <div>
          <p className="eyebrow">{pick("06 · 参考文献", "06 · REFERENCES")}</p>
          <h2>{pick("参考文献", "References")}</h2>
        </div>
        <p>{pick("以下 94 条文献来自论文投稿优化稿 V3。正文中的参考文献编号可点击并直接跳转到对应条目。", "The 94 references are drawn from manuscript revision V3. Citation numbers throughout the site link directly to each entry; bibliographic titles retain their original publication language.")}</p>
      </div>

      <div className="reference-groups">
        {groups.map((group) => (
          <section className="reference-group" key={group.range}>
            <header><span>{group.range}</span><h3>{language === "zh" ? group.zh : group.en}</h3></header>
            <ol>
              {references
                .filter((reference) => reference.id >= group.from && reference.id <= group.to)
                .map((reference) => (
                  <li id={`ref-${reference.id}`} key={reference.id}>
                    <span>[{reference.id}]</span>
                    <p>
                      {reference.text}
                      {reference.url && <a href={reference.url} target="_blank" rel="noreferrer">{pick("访问原文 ↗", "Open source ↗")}</a>}
                    </p>
                  </li>
                ))}
            </ol>
          </section>
        ))}
      </div>
      <a className="references-top" href="#top">{pick("返回顶部 ↑", "Back to top ↑")}</a>
    </section>
  );
}
