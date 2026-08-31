"use client";

import { useEffect, useState } from "react";
import CitationLinks from "./CitationLinks";
import { useLanguage } from "./LanguageContext";

type FigureRecord = {
  id: string;
  chapter: "method" | "supply" | "recovery" | "technology";
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
  { id: "4-4", chapter: "technology", number: "FIG. 4-4", caption: "PA6 闭环解聚与再聚合流程", src: "/paper-figures/fig-4-4.png" },
  { id: "4-5", chapter: "technology", number: "FIG. 4-5", caption: "PA6 解聚—再聚合代表企业与项目的技术成熟度", src: "/paper-figures/fig-4-5.png" },
  { id: "4-6", chapter: "technology", number: "FIG. 4-6", caption: "氨纶及含氨混纺回收技术的代表性企业成熟度", src: "/paper-figures/fig-4-6.png" },
  { id: "4-7", chapter: "technology", number: "FIG. 4-7", caption: "废棉机械再生 T2T 工艺流程", src: "/paper-figures/fig-4-7.png" },
  { id: "4-8", chapter: "technology", number: "FIG. 4-8", caption: "废棉再生的两类主要技术路径对比", src: "/paper-figures/fig-4-8.png" },
  { id: "4-9", chapter: "technology", number: "FIG. 4-9", caption: "废棉机械与纤维素再生技术的代表性企业成熟度", src: "/paper-figures/fig-4-9.png" },
  { id: "4-10", chapter: "technology", number: "FIG. 4-10", caption: "混纺废旧纺织品分离的技术决策图", src: "/paper-figures/fig-4-10.png" },
  { id: "4-11", chapter: "technology", number: "FIG. 4-11", caption: "混纺选择性分离与闭环项目的技术成熟度", src: "/paper-figures/fig-4-11.png" },
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
    lead: "第四章先系统展示 PET、PA6、废棉与混纺废旧纺织品的主要回收技术，再以产业链流向图连接来源、回收、分选、材料和再生技术，最后集中比较代表性企业与项目的技术成熟度。",
    finding: "不存在适用于所有原料的单一路线。纯度、混纺结构、预处理强度与产品价值共同决定技术选择。",
    references: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83],
    groups: [
      { code: "4.1", title: "主要材料的回收技术路线", text: "集中展示 PET 化学法与酶法、PA6 解聚—再聚合、废棉机械再生与纤维素再生，以及混纺分离与定向回收等主要技术路线。", figureIds: ["4-1", "4-4", "4-7", "4-8", "4-10"] },
      { code: "4.2", title: "废旧纺织品产业链与技术流向", text: "从居民旧衣、品牌回收和工业边角料等来源出发，展示回收与收运、分选与预处理、材料分类、再生技术及终端去向之间的完整关系。", figureIds: ["3-2"] },
      { code: "4.4", title: "代表性企业与项目的技术成熟度", text: "集中比较 PET 化学法、PET 酶法、PA6 解聚、含氨混纺、废棉再生和混纺分离项目的公开证据等级，避免将实验验证、工程示范和商业运行混为一谈。", figureIds: ["4-2", "4-3", "4-5", "4-6", "4-9", "4-11"] },
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
  "3-2": "Industry-Chain Flows from Textile-Waste Sources to Recycling Outcomes",
  "4-1": "Major Technology Routes for Closed-Loop PET Recycling",
  "4-2": "Technology Maturity of Representative PET Chemical-Depolymerization Companies and Projects",
  "4-3": "Technology Maturity of Representative Enzymatic PET Depolymerization Companies and Projects",
  "4-4": "Closed-Loop PA6 Depolymerization and Repolymerization Process",
  "4-5": "Technology Maturity of Representative PA6 Depolymerization–Repolymerization Companies and Projects",
  "4-6": "Technology Maturity of Representative Companies Recycling Spandex and Spandex-Containing Blends",
  "4-7": "Mechanical T2T Recycling Process for Cotton Waste",
  "4-8": "Comparison of Two Major Technology Routes for Cotton-Waste Recycling",
  "4-9": "Technology Maturity of Representative Mechanical Cotton and Cellulosic-Regeneration Companies",
  "4-10": "Technology-Selection Map for Separating Blended Textile Waste",
  "4-11": "Technology Maturity of Selective Blend-Separation and Closed-Loop Projects",
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
    lead: "Chapter 4 first presents the major recycling routes for PET, PA6, cotton waste, and blended textiles, then connects sources, collection, sorting, materials, and recycling technologies through an industry-flow map before comparing public maturity evidence for representative companies and projects.",
    finding: "No single route fits every feedstock. Purity, blend structure, pretreatment intensity, and product value jointly determine technology choice.",
    groups: [
      { title: "Recycling Routes for Major Materials", text: "The section covers chemical and enzymatic PET recycling, PA6 depolymerization–repolymerization, mechanical and cellulosic cotton recycling, and separation and targeted recycling of blended textiles." },
      { title: "Textile-Waste Industry Chain and Technology Flows", text: "The map connects household clothing, brand collection, and industrial scraps with collection, sorting and pretreatment, material categories, recycling technologies, and final outputs." },
      { title: "Technology Maturity of Representative Companies and Projects", text: "Public evidence is compared across PET chemical and enzymatic routes, PA6 depolymerization, spandex-containing blends, cotton recycling, and blend separation so that laboratory, demonstration, and commercial stages are not conflated." },
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
          <div><p className="eyebrow">{pick("04 · 论文图表（第 1—4 章）", "04 · PAPER FIGURES · CHAPTERS 1–4")}</p><h2>{pick("中国 T2T 论文图表（第 1—4 章）", "China T2T Paper Figures, Chapters 1–4")}</h2></div>
          <p>{pick("本区域按照论文第 1—4 章的论证顺序展示图件；第五章的产业发展路线与重点任务已合并至页面最后一章。点击图件可查看高清原图。", "This section follows the argument sequence of Chapters 1–4. Chapter 5 figures on the industry roadmap and priority actions are integrated into the final section of the page. Select a figure to view the high-resolution original.")}</p>
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
                        <div className={`narrative-figures count-${Math.min(groupFigures.length, 6)}`}>
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
        <div className="figure-audit"><span>{pick("图件说明", "FIGURE INTEGRITY")}</span><p>{pick("论文图表区收录第 1—4 章的 28 张静态图；第 5 章的 2 张图已合并至页面最后的产业发展路线，全站共保留 30 张静态图。第三章仅保留中国废旧纺织品回收量变化图；第四章 4.1 完整展示主要回收技术，4.2 单独展示产业链与技术流向，4.4 集中展示代表性企业与项目的技术成熟度。技术比较热力图与气泡图统一在 4.5 交互模块中展示。", "The paper-figure section contains 28 static figures from Chapters 1–4. The two Chapter 5 figures are integrated into the final industry-roadmap section, preserving all 30 static figures across the site. Chapter 3 contains only the change in China's recovered textile volume. In Chapter 4, Section 4.1 presents the full set of major recycling routes, Section 4.2 presents the industry chain and technology flows, and Section 4.4 consolidates maturity evidence for representative companies and projects. The heatmap and bubble chart remain in the interactive Section 4.5.")}</p></div>
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
