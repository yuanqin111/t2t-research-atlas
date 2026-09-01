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
  references: number[];
  figureIds: string[];
};

type NarrativeChapter = {
  id: FigureRecord["chapter"];
  code: string;
  title: string;
  question: string;
  lead: string;
  finding: string;
  groups: NarrativeGroup[];
};

const chapters: NarrativeChapter[] = [
  {
    id: "method",
    code: "01",
    title: "研究范围与技术成熟度等级",
    question: "不同技术项目如何在同一尺度上比较？",
    lead: "成熟度分级界定实验验证、工程放大与商业运行之间的证据差异，为产业数据比较提供统一评价语言。",
    finding: "T1—T5 不是企业排名，而是对项目证据强度、运行连续性与闭环可验证性的共同标尺。",
    groups: [
      { code: "1.1", title: "T1—T5 技术成熟度等级", text: "统一证据尺度区分实验室可行、示范线运行与稳定商业闭环，避免不同成熟阶段被等同处理。", references: [1, 61, 62], figureIds: ["1-1"] },
    ],
  },
  {
    id: "supply",
    code: "02",
    title: "中国主要纺织材料产量",
    question: "哪些材料与企业构成 T2T 的优先原料基础？",
    lead: "第二章由宏观供给进入材料结构，再下沉至企业与产品边界。图件顺序对应“总量—品类—企业”的逐层收敛。",
    finding: "涤纶决定潜在闭环规模；锦纶、氨纶和天然纤维则决定分选精度、混纺复杂度与差异化技术需求。",
    groups: [
      { code: "2.1", title: "中国主要纺织材料产量", text: "总量与结构共同界定中国纺织原料基础，并反映化学纤维在 T2T 原料体系中的规模权重。", references: [2, 7], figureIds: ["2-1", "2-2"] },
      { code: "2.2", title: "中国涤纶产量与企业数据", text: "从涤纶内部结构、年度演变进一步延伸到代表性企业，连接材料规模与可组织的产业供给。", references: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 63, 84], figureIds: ["2-3", "2-4", "2-5"] },
      { code: "2.3", title: "中国锦纶和氨纶产量与企业数据", text: "锦纶关注解聚价值与企业集中度；氨纶关注弹性组分对混纺回收过程的干扰及预处理要求。", references: [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 64, 65, 66], figureIds: ["2-6", "2-7", "2-8", "2-9"] },
      { code: "2.4", title: "中国棉花和羊毛产量与企业数据", text: "产量、区域集中度与企业产品口径共同说明天然纤维不能仅按吨位比较，还需区分纱线、面料与制品边界。", references: [17, 18, 19, 20, 21, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94], figureIds: ["2-10", "2-11", "2-12", "2-13", "2-14"] },
    ],
  },
  {
    id: "recovery",
    code: "03",
    title: "中国废旧纺织品回收量",
    question: "生产端规模如何转化为稳定、可追溯的再生进料？",
    lead: "第三章把视角从生产供给转向废旧纺织品，通过回收量变化观察前端原料供给的规模与波动。",
    finding: "回收规模增长为 T2T 提供原料基础，但稳定供给仍取决于持续回收与规范化管理。",
    groups: [
      { code: "3.1", title: "中国废旧纺织品回收量变化", text: "通过 2018—2024 年回收量变化观察前端供给的波动性，并为后续路线规模判断提供边界。", references: [22, 23, 24, 25, 26], figureIds: ["3-1"] },
    ],
  },
  {
    id: "technology",
    code: "04",
    title: "中国 T2T 技术成熟度、总体流程与分材料路线",
    question: "不同材料应进入哪条闭环路线，商业证据又处于什么阶段？",
    lead: "第四章采用“成熟度评价—总体流程—分材料技术与企业证据”的总—分结构，统一比较 PET、PA6、氨纶、废棉和混纺废旧纺织品的闭环路径。",
    finding: "不存在适用于所有原料的单一路线。纯度、混纺结构、预处理强度与产品价值共同决定技术选择。",
    groups: [
      { code: "4.4.1", title: "T1—T5 技术成熟度评价标准", text: "T1—T5 以证据强度、运行连续性和闭环可验证性区分实验室研究、工程示范与商业运行，为全部技术和项目提供统一评价尺度。", references: [1, 61, 62], figureIds: ["1-1"] },
      { code: "4.4.2", title: "中国废旧纺织品回收与再生总体流程", text: "居民旧衣、品牌回收和工业边角料经回收与收运、分选与预处理、材料分类和再生处理，形成再生聚合物、再生纤维及纺织品等终端产物。", references: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43], figureIds: ["3-2"] },
      { code: "4.4.3", title: "PET 回收技术与代表性企业", text: "PET 闭环再生包括机械法、化学解聚和酶促解聚。代表性企业与项目的公开证据反映各路线在工程放大、连续运行和商业化方面的进展。", references: [9, 44, 45, 46, 47, 48, 70, 71, 72, 73, 74, 75, 76], figureIds: ["4-1", "4-2", "4-3"] },
      { code: "4.4.4", title: "PA6 回收技术与代表性企业", text: "PA6 闭环由解聚、单体纯化和再聚合构成。BASF loopamid 上海装置属于中国境内已投产的商业案例，并与其他代表性项目采用同一证据尺度比较。", references: [49, 50, 51, 67, 68, 69], figureIds: ["4-4", "4-5"] },
      { code: "4.4.5", title: "氨纶及含氨混纺回收技术与代表性企业", text: "氨纶去除、选择性分离和含氨混纺定向回收构成该类原料的主要处理路径。代表性企业与项目反映了不同路径的技术成熟度。", references: [27, 28, 29, 52, 53, 67, 82, 83], figureIds: ["4-6"] },
      { code: "4.4.6", title: "废棉回收技术与代表性企业", text: "废棉回收包括保留纤维形态的机械再生和重构纤维素分子链的溶解再生。两类路线在原料要求、产品形态和产业成熟度方面存在明显差异。", references: [54, 55, 56, 57, 58, 59, 60, 79, 80], figureIds: ["4-7", "4-8", "4-9"] },
      { code: "4.4.7", title: "混纺分离技术与代表性项目", text: "混纺组成决定选择性分离、组分回收和定向再生方案。代表性项目的证据等级反映了复杂原料闭环利用的工程进展。", references: [27, 28, 29, 77, 78, 81, 82], figureIds: ["4-10", "4-11"] },
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
    title: "China T2T Technology Maturity, Overall Flow, and Material-Specific Routes",
    question: "Which closed-loop route fits each material, and how strong is the commercial evidence?",
    lead: "Chapter 4 uses a whole-to-part structure: maturity assessment, overall industry flow, and material-specific technologies with company evidence for PET, PA6, spandex, cotton waste, and blended textiles.",
    finding: "No single route fits every feedstock. Purity, blend structure, pretreatment intensity, and product value jointly determine technology choice.",
    groups: [
      { title: "T1–T5 Technology-Maturity Assessment", text: "T1–T5 distinguishes laboratory research, engineering demonstration, and commercial operation by evidence strength, operating continuity, and verifiable closed-loop performance." },
      { title: "Overall Textile-Waste Recovery and Recycling Flow in China", text: "Household clothing, brand collection, and industrial scraps pass through collection, sorting and pretreatment, material classification, and recycling to produce regenerated polymers, fibers, and textile products." },
      { title: "PET Recycling Technologies and Representative Companies", text: "Closed-loop PET recycling includes mechanical processing, chemical depolymerization, and enzymatic depolymerization. Public evidence from representative companies and projects indicates progress in scale-up, continuous operation, and commercialization." },
      { title: "PA6 Recycling Technologies and Representative Companies", text: "The PA6 closed loop comprises depolymerization, monomer purification, and repolymerization. BASF's loopamid plant in Shanghai is an operating commercial case in China and is compared with other representative projects on the same evidence scale." },
      { title: "Spandex and Spandex-Blend Recycling Technologies and Representative Companies", text: "Spandex removal, selective separation, and targeted recycling of spandex-containing blends are the principal routes for this feedstock category. Representative companies and projects indicate the maturity of each route." },
      { title: "Cotton-Waste Recycling Technologies and Representative Companies", text: "Cotton waste is processed through mechanical recycling that retains fiber form or dissolution-based regeneration that reconstructs cellulose chains. The routes differ in feedstock requirements, product form, and industrial maturity." },
      { title: "Blend-Separation Technologies and Representative Projects", text: "Blend composition determines the appropriate selective-separation, component-recovery, and targeted-regeneration route. Project evidence indicates the engineering progress of closed-loop solutions for complex feedstocks." },
    ],
  },
};

const figureById = new Map(figures.map((figure) => [figure.id, figure]));
const guideChapters = chapters.filter((chapter) => chapter.id === "technology");

export default function PaperFigureAtlas() {
  const { language, pick } = useLanguage();
  const [selected, setSelected] = useState<FigureRecord | null>(null);
  const figureCaption = (figure: FigureRecord) => language === "zh" ? figure.caption : figureCaptionEn[figure.id];
  const figureNumber = (figure: FigureRecord) => language === "zh" ? figure.number.replace("FIG.", "图") : figure.number;
  const figureSrc = (figure: FigureRecord) => {
    const src = figure.src.replace(/^\//, "");
    return language === "en" ? src.replace(/\.png$/, "-en.png") : src;
  };

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
          <div><p className="eyebrow">{pick("04 · 中国 T2T 技术成熟度与路线", "04 · TECHNOLOGY MATURITY & ROUTES")}</p><h2>{pick("中国 T2T 技术成熟度、总体流程与代表性企业", "China T2T Technology Maturity, Overall Flow, and Representative Companies")}</h2></div>
          <p>{pick("T1—T5 成熟度等级提供统一评价尺度；总体流程呈现废旧纺织品从来源、分选到再生利用的完整链条；分材料小节对应 PET、PA6、氨纶、废棉和混纺材料的技术与企业证据。点击图件可查看高清原图。", "T1–T5 provides a common evidence scale. The overall flow maps textile waste from source and sorting to recycling, while the material sections connect PET, PA6, spandex, cotton waste, and blends with technology and company evidence. Select a figure to view the high-resolution original.")}</p>
        </div>

        <nav className="narrative-index compact" aria-label={pick("回收技术图解目录", "Recycling technology guide index")}>
          {guideChapters.map((chapter) => (
            <a key={chapter.id} href={`#paper-chapter-${chapter.id}`}>
              <span>{chapter.code}</span>
              <strong>{language === "zh" ? chapter.title : chapterEnglish[chapter.id].title}</strong>
              <small>{String(chapter.groups.reduce((total, group) => total + group.figureIds.length, 0)).padStart(2, "0")} {pick("张图", "FIG.")}</small>
            </a>
          ))}
        </nav>

        <div className="narrative-flow">
          {guideChapters.map((chapter) => {
            const chapterCopy = chapterEnglish[chapter.id];
            return <article className="narrative-chapter" id={`paper-chapter-${chapter.id}`} key={chapter.id}>
              <div className="chapter-rail" aria-hidden="true"><span>{chapter.code}</span><i /></div>
              <div className="chapter-content">
                <header className="chapter-heading">
                  <div>
                    <p>{pick(`第 ${Number(chapter.code)} 章`, `CHAPTER ${chapter.code}`)}</p>
                    <h3>{language === "zh" ? chapter.title : chapterCopy.title}</h3>
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
                          <CitationLinks ids={group.references} label={pick("本节引用", "Section sources")} />
                        </div>
                        <div className={`narrative-figures count-${Math.min(groupFigures.length, 6)}`}>
                          {groupFigures.map((figure) => (
                            <button className="figure-card" key={figure.id} onClick={() => setSelected(figure)} aria-label={pick(`查看高清图：${figure.caption}`, `View high-resolution figure: ${figureCaption(figure)}`)}>
                              <div className="figure-image"><img src={figureSrc(figure)} alt={figureCaption(figure)} loading="lazy" decoding="async" /></div>
                              <div className="figure-meta"><span>{figureNumber(figure)}</span><strong>{figureCaption(figure)}</strong><i>↗</i></div>
                            </button>
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </div>

                <div className="chapter-finding"><span>{pick("核心结论", "KEY FINDING")}</span><p>{language === "zh" ? chapter.finding : chapterCopy.finding}</p></div>
              </div>
            </article>
          })}
        </div>
        <div className="figure-audit"><span>{pick("技术证据框架", "TECHNOLOGY EVIDENCE FRAMEWORK")}</span><p>{pick("T1—T5 构成统一证据尺度，产业链流向图呈现总体路径，PET、PA6、氨纶、废棉和混纺小节将具体技术路线与代表性企业或项目的成熟度对应。", "T1–T5 provides a common evidence scale, the industry-flow map defines the overall pathway, and the PET, PA6, spandex, cotton, and blend sections connect specific technologies with maturity evidence from representative companies or projects.")}</p></div>
      </div>

      {selected && (
        <div className="figure-lightbox" role="dialog" aria-modal="true" aria-label={figureCaption(selected)} onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label={pick("关闭大图", "Close figure")}>×</button>
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox-title"><span>{figureNumber(selected)}</span><h3>{figureCaption(selected)}</h3></div>
            <img src={figureSrc(selected)} alt={figureCaption(selected)} />
          </div>
        </div>
      )}
    </section>
  );
}
