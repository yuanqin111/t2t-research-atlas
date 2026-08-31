"use client";

import { useEffect, useState } from "react";
import CitationLinks from "./CitationLinks";
import { useLanguage } from "./LanguageContext";

type FigureRecord = {
  id: string;
  chapter: "method" | "supply" | "recovery" | "technology" | "strategy";
  number: string;
  caption: string;
  src: string;
};

const figures: FigureRecord[] = [
  { id: "1-1", chapter: "method", number: "FIG. 1-1", caption: "废旧纺织品 T2T 技术成熟度分级框架", src: "/paper-figures/fig-1-1.png" },
  { id: "2-1", chapter: "supply", number: "FIG. 2-1", caption: "2025 年中国主要化学纤维供给格局", src: "/paper-figures/fig-2-1.png" },
  { id: "2-2", chapter: "supply", number: "FIG. 2-2", caption: "2020—2025 年中国化学纤维总产量演变", src: "/paper-figures/fig-2-2.png" },
  { id: "2-3", chapter: "supply", number: "FIG. 2-3", caption: "2025 年中国涤纶短纤与长丝供给结构", src: "/paper-figures/fig-2-3.png" },
  { id: "2-4", chapter: "supply", number: "FIG. 2-4", caption: "2020—2025 年中国涤纶产量演变", src: "/paper-figures/fig-2-4.png" },
  { id: "2-5", chapter: "supply", number: "FIG. 2-5", caption: "2025 年中国代表性聚酯企业产量与产品结构", src: "/paper-figures/fig-2-5.png" },
  { id: "2-6", chapter: "supply", number: "FIG. 2-6", caption: "2020—2025 年中国锦纶产量演变", src: "/paper-figures/fig-2-6.png" },
  { id: "2-7", chapter: "supply", number: "FIG. 2-7", caption: "2025 年中国代表性锦纶企业规模与产品结构", src: "/paper-figures/fig-2-7.png" },
  { id: "2-8", chapter: "supply", number: "FIG. 2-8", caption: "2020—2025 年中国氨纶产量演变", src: "/paper-figures/fig-2-8.png" },
  { id: "2-9", chapter: "supply", number: "FIG. 2-9", caption: "2025 年中国代表性氨纶企业产能格局", src: "/paper-figures/fig-2-9.png" },
  { id: "2-10", chapter: "supply", number: "FIG. 2-10", caption: "2020—2025 年中国棉花产量演变", src: "/paper-figures/fig-2-10.png" },
  { id: "2-11", chapter: "supply", number: "FIG. 2-11", caption: "2025 年中国棉花产地集中度与区域贡献", src: "/paper-figures/fig-2-11.png" },
  { id: "2-12", chapter: "supply", number: "FIG. 2-12", caption: "代表性棉纺企业的生产能力与产品边界（2025 年）", src: "/paper-figures/fig-2-12.png" },
  { id: "2-13", chapter: "supply", number: "FIG. 2-13", caption: "2013—2024 年中国主要羊毛类别产量变化", src: "/paper-figures/fig-2-13.png" },
  { id: "2-14", chapter: "supply", number: "FIG. 2-14", caption: "代表性毛纺与羊绒企业的生产规模及产品边界（2025 年）", src: "/paper-figures/fig-2-14.png" },
  { id: "3-1", chapter: "recovery", number: "FIG. 3-1", caption: "2018—2024 年中国废旧纺织品回收量演变", src: "/paper-figures/fig-3-1.png" },
  { id: "3-2", chapter: "technology", number: "FIG. 3-2", caption: "废旧纺织品从来源到再生利用的产业链流向", src: "/paper-figures/fig-3-2.png" },
  { id: "4-1", chapter: "technology", number: "FIG. 4-1", caption: "PET 闭环再生的主要技术路径", src: "/paper-figures/fig-4-1.png" },
  { id: "4-2", chapter: "technology", number: "FIG. 4-2", caption: "PET 化学解聚代表企业与项目的技术成熟度", src: "/paper-figures/fig-4-2.png" },
  { id: "4-3", chapter: "technology", number: "FIG. 4-3", caption: "PET 酶促解聚代表企业与项目的技术成熟度", src: "/paper-figures/fig-4-3.png" },
  { id: "4-10", chapter: "technology", number: "FIG. 4-10", caption: "混纺废纺分离的技术决策图", src: "/paper-figures/fig-4-10.png" },
  { id: "4-11", chapter: "technology", number: "FIG. 4-11", caption: "混纺选择性分离与闭环项目的技术成熟度", src: "/paper-figures/fig-4-11.png" },
  { id: "5-1", chapter: "strategy", number: "FIG. 5-1", caption: "本文建议的 2026—2030 年中国 T2T 产业推进路径", src: "/paper-figures/fig-5-1.png" },
  { id: "5-2", chapter: "strategy", number: "FIG. 5-2", caption: "中国 T2T 行动重点：产业影响与实施难度", src: "/paper-figures/fig-5-2.png" },
];

type NarrativeGroup = {
  code: string;
  title: string;
  text: string;
  figureIds: string[];
};

type NarrativeChapter = {
  id: FigureRecord["chapter"];
  code: string;
  title: string;
  question: string;
  lead: string;
  finding: string;
  references: number[];
  groups: NarrativeGroup[];
};

const chapters: NarrativeChapter[] = [
  {
    id: "method",
    code: "01",
    title: "研究范围与技术成熟度等级",
    question: "不同技术项目如何在同一尺度上比较？",
    lead: "论证从统一评价语言开始。成熟度分级先界定实验验证、工程放大与商业运行之间的证据差异，再进入产业数据比较。",
    finding: "T1—T5 不是企业排名，而是对项目证据强度、运行连续性与闭环可验证性的共同标尺。",
    references: [1, 61, 62],
    groups: [
      { code: "1.1", title: "T1—T5 技术成熟度等级", text: "先建立证据尺度，避免把实验室可行、示范线运行与稳定商业闭环混为同一成熟阶段。", figureIds: ["1-1"] },
    ],
  },
  {
    id: "supply",
    code: "02",
    title: "中国主要纺织材料产量",
    question: "哪些材料与企业构成 T2T 的优先原料基础？",
    lead: "第二章由宏观供给进入材料结构，再下沉至企业与产品边界。图件顺序对应“总量—品类—企业”的逐层收敛。",
    finding: "涤纶决定潜在闭环规模；锦纶、氨纶和天然纤维则决定分选精度、混纺复杂度与差异化技术需求。",
    references: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 63, 64, 65, 66, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94],
    groups: [
      { code: "2.1", title: "中国主要纺织材料产量", text: "先用总量与结构确定中国纺织原料底盘，识别化学纤维在 T2T 原料体系中的规模权重。", figureIds: ["2-1", "2-2"] },
      { code: "2.2", title: "中国涤纶产量与企业数据", text: "从涤纶内部结构、年度演变进一步延伸到代表性企业，连接材料规模与可组织的产业供给。", figureIds: ["2-3", "2-4", "2-5"] },
      { code: "2.3", title: "中国锦纶和氨纶产量与企业数据", text: "锦纶关注解聚价值与企业集中度；氨纶关注弹性组分对混纺回收过程的干扰及预处理要求。", figureIds: ["2-6", "2-7", "2-8", "2-9"] },
      { code: "2.4", title: "中国棉花和羊毛产量与企业数据", text: "产量、区域集中度与企业产品口径共同说明天然纤维不能仅按吨位比较，还需区分纱线、面料与制品边界。", figureIds: ["2-10", "2-11", "2-12", "2-13", "2-14"] },
    ],
  },
  {
    id: "recovery",
    code: "03",
    title: "中国废旧纺织品回收量",
    question: "生产端规模如何转化为稳定、可追溯的再生进料？",
    lead: "第三章把视角从生产供给转向废旧纺织品，通过回收量变化观察前端原料供给的规模与波动。",
    finding: "回收规模增长为 T2T 提供原料基础，但稳定供给仍取决于持续回收与规范化管理。",
    references: [22, 23, 24, 25, 26],
    groups: [
      { code: "3.1", title: "中国废旧纺织品回收量变化", text: "通过 2018—2024 年回收量变化观察前端供给的波动性，并为后续路线规模判断提供边界。", figureIds: ["3-1"] },
    ],
  },
  {
    id: "technology",
    code: "04",
    title: "T2T 主要回收技术与项目进展",
    question: "不同材料应进入哪条闭环路线，商业证据又处于什么阶段？",
    lead: "第四章先展示废旧纺织品从来源、回收和分选进入不同再生路线的完整流程，再比较主要技术及代表项目。",
    finding: "不存在适用于所有原料的单一路线。纯度、混纺结构、预处理强度与产品价值共同决定技术选择。",
    references: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83],
    groups: [
      { code: "4.1", title: "PET 化学法和酶法回收", text: "先展示 PET 闭环路线，再分别比较化学解聚与酶促解聚项目的工程化和商业化证据。", figureIds: ["4-1", "4-2", "4-3"] },
      { code: "4.2", title: "废旧纺织品从来源到再生技术的流向", text: "沿“来源—回收—分选—标准化进料—再生利用”展示产业链关系，说明不同材料进入后端技术前需要经过的环节。", figureIds: ["3-2"] },
      { code: "4.4", title: "混纺分离与定向回收", text: "通过混纺分离决策和代表项目，说明不同混纺结构应如何选择分离方法与后续回收路线。技术路线的综合比较统一放在后续 4.5 交互模块中，不在本节重复展示。", figureIds: ["4-10", "4-11"] },
    ],
  },
  {
    id: "strategy",
    code: "05",
    title: "中国 T2T 产业发展路线与重点任务",
    question: "如何将技术判断转化为 2026—2030 年的产业行动顺序？",
    lead: "第五章承接 4.5 的技术比较结果，将路线判断转化为产业发展阶段和重点任务。",
    finding: "近期重点是可追溯进料与成熟路线示范，中期推进复杂原料技术放大，远期形成标准统一、长期采购支撑的全国闭环网络。",
    references: [1, 61, 62],
    groups: [
      { code: "5.1", title: "中国 T2T 产业发展路线（2026—2030）", text: "按近期、中期和远期拆分基础设施、技术示范与制度建设任务，避免将所有行动压缩到同一时间窗口。", figureIds: ["5-1"] },
      { code: "5.2", title: "重点任务的影响和实施难度", text: "用优先级矩阵校准行动顺序：先推进高影响、低阻力事项，再为高难度系统工程建立长期协同机制。", figureIds: ["5-2"] },
    ],
  },
];

const figureCaptionEn: Record<string, string> = {
  "1-1": "T2T Technology-Maturity Classification Framework for Textile Waste",
  "2-1": "Supply Structure of China's Major Chemical Fibers in 2025",
  "2-2": "China's Total Chemical-Fiber Output, 2020–2025",
  "2-3": "China's Polyester Staple and Filament Supply Structure in 2025",
  "2-4": "China's Polyester Output, 2020–2025",
  "2-5": "Output and Product Structure of Representative Chinese Polyester Companies in 2025",
  "2-6": "China's Nylon Output, 2020–2025",
  "2-7": "Scale and Product Structure of Representative Chinese Nylon Companies in 2025",
  "2-8": "China's Spandex Output, 2020–2025",
  "2-9": "Capacity Structure of Representative Chinese Spandex Companies in 2025",
  "2-10": "China's Cotton Output, 2020–2025",
  "2-11": "Regional Concentration and Contributions to China's Cotton Output in 2025",
  "2-12": "Production Capacity and Product Boundaries of Representative Cotton-Spinning Companies, 2025",
  "2-13": "Output of Major Wool Categories in China, 2013–2024",
  "2-14": "Production Scale and Product Boundaries of Representative Wool and Cashmere Companies, 2025",
  "3-1": "China's Recovered Textile Business Volume, 2018–2024",
  "3-2": "Value-Chain Flows from Textile-Waste Sources to Recycling Outputs",
  "4-1": "Major Technology Routes for Closed-Loop PET Recycling",
  "4-2": "Technology Maturity of Representative PET Chemical-Depolymerization Companies and Projects",
  "4-3": "Technology Maturity of Representative Enzymatic PET Depolymerization Companies and Projects",
  "4-10": "Technology Decision Map for Separating Blended Textile Waste",
  "4-11": "Technology Maturity of Selective Blend-Separation and Closed-Loop Projects",
  "5-1": "Recommended Roadmap for China's T2T Industry, 2026–2030",
  "5-2": "Priority T2T Actions in China: Industry Impact and Implementation Difficulty",
};

const chapterEnglish: Record<string, {
  title: string; question: string; lead: string; finding: string;
  groups: Array<{ title: string; text: string }>;
}> = {
  method: {
    title: "Research Scope and Technology-Maturity Levels",
    question: "How can technology projects be compared on a common scale?",
    lead: "The analysis begins with a shared evaluation language. Maturity levels distinguish laboratory validation, engineering scale-up, and commercial operation before industry data are compared.",
    finding: "T1–T5 is not a company ranking; it is a common measure of project evidence, operating continuity, and verifiable closed-loop performance.",
    groups: [{ title: "T1–T5 Technology-Maturity Levels", text: "A common evidence scale prevents laboratory feasibility, demonstration-line operation, and stable commercial closure from being treated as the same stage." }],
  },
  supply: {
    title: "Output of Major Textile Materials in China",
    question: "Which materials and companies form the priority feedstock base for T2T?",
    lead: "Chapter 2 moves from macro supply to material structure and then to company and product boundaries. The sequence narrows from total output to category and company evidence.",
    finding: "Polyester determines potential closed-loop scale, while nylon, spandex, and natural fibers determine sorting precision, blend complexity, and differentiated technology needs.",
    groups: [
      { title: "Output of Major Textile Materials in China", text: "Total output and composition define China's textile-material base and the scale weight of chemical fibers in potential T2T feedstock." },
      { title: "China's Polyester Output and Company Data", text: "Internal structure, annual change, and representative-company data connect material scale with organized industrial supply." },
      { title: "China's Nylon and Spandex Output and Company Data", text: "Nylon is assessed for depolymerization value and industry concentration; spandex is assessed for its interference in blend recycling and pretreatment needs." },
      { title: "China's Cotton and Wool Output and Company Data", text: "Output, regional concentration, and company product boundaries show why natural fibers must be distinguished by yarn, fabric, and finished-product stages rather than tonnage alone." },
    ],
  },
  recovery: {
    title: "Recovered Textile Volume in China",
    question: "How can production scale become stable and traceable recycling feedstock?",
    lead: "Chapter 3 shifts from production supply to textile waste and uses recovered-volume changes to observe the scale and volatility of front-end feedstock.",
    finding: "Growing recovery volume provides a material base for T2T, but stable supply still depends on continuous collection and standardized management.",
    groups: [{ title: "Change in China's Recovered Textile Volume", text: "The 2018–2024 series reveals front-end volatility and sets a boundary for later assessments of route scale." }],
  },
  technology: {
    title: "Major T2T Recycling Technologies and Project Progress",
    question: "Which closed-loop route fits each material, and how strong is the commercial evidence?",
    lead: "Chapter 4 first maps the full chain from sources through collection and sorting to recycling routes, then compares major technologies and representative projects.",
    finding: "No single route fits every feedstock. Purity, blend structure, pretreatment intensity, and product value jointly determine technology choice.",
    groups: [
      { title: "Chemical and Enzymatic PET Recycling", text: "The PET closed-loop pathway is followed by separate assessments of engineering and commercial evidence for chemical and enzymatic depolymerization." },
      { title: "Flows from Textile-Waste Sources to Recycling Technologies", text: "Source–collection–sorting–standardized feedstock–recycling relationships show the steps materials require before entering downstream technologies." },
      { title: "Blend Separation and Targeted Recycling", text: "Blend-separation decisions and representative projects show how different blend structures map to separation methods and downstream routes. Comparative route analysis is shown only in the interactive Section 4.5." },
    ],
  },
  strategy: {
    title: "China T2T Industry Roadmap and Priority Actions",
    question: "How can technology assessments become an ordered industry agenda for 2026–2030?",
    lead: "Chapter 5 translates the comparison in Section 4.5 into development stages and priority actions.",
    finding: "Near-term priorities are traceable feedstock and mature-route demonstrations; the mid term scales complex-feedstock technologies; the long term builds harmonized standards and national closed-loop networks supported by long-term offtake.",
    groups: [
      { title: "China T2T Industry Roadmap, 2026–2030", text: "Near-, mid-, and long-term phases separate infrastructure, demonstration, and institutional tasks rather than compressing every action into one window." },
      { title: "Impact and Implementation Difficulty of Priority Actions", text: "The priority matrix advances high-impact, lower-friction actions first while establishing long-term coordination for difficult system projects." },
    ],
  },
};

const figureById = new Map(figures.map((figure) => [figure.id, figure]));

export default function PaperFigureAtlas() {
  const { language, pick } = useLanguage();
  const [selected, setSelected] = useState<FigureRecord | null>(null);
  const figureCaption = (figure: FigureRecord) => language === "zh" ? figure.caption : figureCaptionEn[figure.id];
  const figureNumber = (figure: FigureRecord) => language === "zh" ? figure.number.replace("FIG.", "图") : figure.number;

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section className="figure-atlas" id="figure-atlas">
      <div className="section-shell">
        <div className="figure-atlas-head">
          <div><p className="eyebrow">{pick("04 · 论文图表与研究内容", "04 · VISUAL RESEARCH NARRATIVE")}</p><h2>{pick("中国 T2T 论文图表与研究内容", "Paper Figures and Research Narrative for T2T in China")}</h2></div>
          <p>{pick("图件按照论文第 1—5 章的论证顺序展开。每组先提出研究问题，再呈现证据与阶段判断；点击图件可查看高清原图。", "Figures follow the argument sequence of Chapters 1–5. Each group states a research question before presenting evidence and stage assessments; select a figure to view the high-resolution original.")}</p>
        </div>

        <nav className="narrative-index" aria-label={pick("论文图表章节索引", "Paper-figure chapter index")}>
          {chapters.map((chapter) => (
            <a key={chapter.id} href={`#paper-chapter-${chapter.id}`}>
              <span>{chapter.code}</span>
              <strong>{language === "zh" ? chapter.title : chapterEnglish[chapter.id].title}</strong>
              <small>{String(figures.filter((figure) => figure.chapter === chapter.id).length).padStart(2, "0")} {pick("张图", "FIG.")}</small>
            </a>
          ))}
        </nav>

        <div className="narrative-flow">
          {chapters.map((chapter) => {
            const chapterCopy = chapterEnglish[chapter.id];
            return <article className="narrative-chapter" id={`paper-chapter-${chapter.id}`} key={chapter.id}>
              <div className="chapter-rail" aria-hidden="true"><span>{chapter.code}</span><i /></div>
              <div className="chapter-content">
                <header className="chapter-heading">
                  <div>
                    <p>{pick(`第 ${Number(chapter.code)} 章`, `CHAPTER ${chapter.code}`)}</p>
                    <h3>{language === "zh" ? chapter.title : chapterCopy.title}</h3>
                    <CitationLinks ids={chapter.references} />
                  </div>
                  <div className="chapter-question"><span>{pick("研究问题", "RESEARCH QUESTION")}</span><strong>{language === "zh" ? chapter.question : chapterCopy.question}</strong></div>
                  <p>{language === "zh" ? chapter.lead : chapterCopy.lead}</p>
                </header>

                <div className="narrative-groups">
                  {chapter.groups.map((group, groupIndex) => {
                    const groupCopy = chapterCopy.groups[groupIndex];
                    const groupFigures = group.figureIds.map((id) => figureById.get(id)).filter((figure): figure is FigureRecord => Boolean(figure));
                    return (
                      <section className="narrative-group" key={group.code}>
                        <div className="narrative-group-copy">
                          <span>{group.code}</span>
                          <h4>{language === "zh" ? group.title : groupCopy.title}</h4>
                          <p>{language === "zh" ? group.text : groupCopy.text}</p>
                        </div>
                        <div className={`narrative-figures count-${Math.min(groupFigures.length, 5)}`}>
                          {groupFigures.map((figure) => (
                            <button className="figure-card" key={figure.id} onClick={() => setSelected(figure)} aria-label={pick(`查看高清图：${figure.caption}`, `View high-resolution figure: ${figureCaption(figure)}`)}>
                              <div className="figure-image"><img src={figure.src.replace(/^\//, "")} alt={figureCaption(figure)} loading="lazy" decoding="async" /></div>
                              <div className="figure-meta"><span>{figureNumber(figure)}</span><strong>{figureCaption(figure)}</strong><i>↗</i></div>
                            </button>
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </div>

                <div className="chapter-finding"><span>{pick("本章结论", "CHAPTER FINDING")}</span><p>{language === "zh" ? chapter.finding : chapterCopy.finding}</p></div>
              </div>
            </article>
          })}
        </div>
        <div className="figure-audit"><span>{pick("图件说明", "FIGURE INTEGRITY")}</span><p>{pick("正文现有 24 张静态图件均已按调整后的章节顺序纳入上述五章；技术比较热力图与气泡图统一在 4.5 交互模块中展示，不在 4.4 重复出现。", "All 24 static figures are arranged across the five chapters. The technology-comparison heatmap and bubble chart appear only in the interactive Section 4.5 and are not duplicated in Section 4.4.")}</p></div>
      </div>

      {selected && (
        <div className="figure-lightbox" role="dialog" aria-modal="true" aria-label={figureCaption(selected)} onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label={pick("关闭大图", "Close figure")}>×</button>
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox-title"><span>{figureNumber(selected)}</span><h3>{figureCaption(selected)}</h3></div>
            <img src={selected.src.replace(/^\//, "")} alt={figureCaption(selected)} />
          </div>
        </div>
      )}
    </section>
  );
}
