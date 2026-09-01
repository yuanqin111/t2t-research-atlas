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
  { id: "statistics", zh: "政策、材料产量与回收统计", en: "Policy, material output, and recovery statistics", zhDescription: "支撑研究口径、中国材料供给规模及废旧纺织品回收量。", enDescription: "Sources for the research scope, China's material-supply base, and recovered-textile volume.", range: "1—26", from: 1, to: 26 },
  { id: "collection", zh: "混纺、回收与分选", en: "Blends, collection, and sorting", zhDescription: "支撑混纺组成、回收组织、分选与预处理环节。", enDescription: "Sources for blend composition, collection systems, sorting, and pretreatment.", range: "27—43", from: 27, to: 43 },
  { id: "technology", zh: "再生技术与项目", en: "Recycling technologies and projects", zhDescription: "支撑 PET、PA6、氨纶、废棉及混纺分离技术与项目成熟度。", enDescription: "Sources for PET, PA6, spandex, cotton, blend-separation technologies, and project maturity.", range: "44—83", from: 44, to: 83 },
  { id: "companies", zh: "企业年报与产品数据", en: "Company reports and product data", zhDescription: "补充代表性企业的产量、产能、产品边界与公开经营信息。", enDescription: "Company disclosures on output, capacity, product boundaries, and public operating data.", range: "84—94", from: 84, to: 94 },
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
        <p>{pick("以下 94 条文献来自论文投稿优化稿 V3。引用已细化到对应研究小节，点击编号可直接跳转到完整条目。", "The 94 references are drawn from manuscript revision V3. Citations are assigned to the relevant research subsection and link directly to the full entry; titles retain their original publication language.")}</p>
      </div>

      <nav className="reference-index" aria-label={pick("参考文献分类", "Reference categories")}>
        {groups.map((group) => (
          <a href={`#reference-group-${group.id}`} key={group.id}>
            <span>{group.range}</span>
            <strong>{language === "zh" ? group.zh : group.en}</strong>
          </a>
        ))}
      </nav>

      <div className="reference-groups">
        {groups.map((group) => (
          <section className="reference-group" id={`reference-group-${group.id}`} key={group.range}>
            <header>
              <span>{group.range}</span>
              <div>
                <h3>{language === "zh" ? group.zh : group.en}</h3>
                <p>{language === "zh" ? group.zhDescription : group.enDescription}</p>
              </div>
              <small>{group.to - group.from + 1} {pick("条", "sources")}</small>
            </header>
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
