"use client";

import { useEffect, useState } from "react";

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
  { id: "3-2", chapter: "recovery", number: "FIG. 3-2", caption: "废旧纺织品从来源到再生利用的产业链流向", src: "/paper-figures/fig-3-2.png" },
  { id: "4-1", chapter: "technology", number: "FIG. 4-1", caption: "PET 闭环再生的主要技术路径", src: "/paper-figures/fig-4-1.png" },
  { id: "4-2", chapter: "technology", number: "FIG. 4-2", caption: "PET 化学解聚代表企业与项目的技术成熟度", src: "/paper-figures/fig-4-2.png" },
  { id: "4-3", chapter: "technology", number: "FIG. 4-3", caption: "PET 酶促解聚代表企业与项目的技术成熟度", src: "/paper-figures/fig-4-3.png" },
  { id: "4-4", chapter: "technology", number: "FIG. 4-4", caption: "PA6 闭环解聚与再聚合流程", src: "/paper-figures/fig-4-4.png" },
  { id: "4-5", chapter: "technology", number: "FIG. 4-5", caption: "PA6 解聚—再聚合代表企业与项目的技术成熟度", src: "/paper-figures/fig-4-5.png" },
  { id: "4-6", chapter: "technology", number: "FIG. 4-6", caption: "氨纶及含氨混纺回收技术的企业成熟度", src: "/paper-figures/fig-4-6.png" },
  { id: "4-7", chapter: "technology", number: "FIG. 4-7", caption: "废棉机械再生 T2T 工艺流程", src: "/paper-figures/fig-4-7.png" },
  { id: "4-8", chapter: "technology", number: "FIG. 4-8", caption: "废棉再生的两类主要技术路径对比", src: "/paper-figures/fig-4-8.png" },
  { id: "4-9", chapter: "technology", number: "FIG. 4-9", caption: "废棉机械与纤维素再生技术的企业成熟度", src: "/paper-figures/fig-4-9.png" },
  { id: "4-10", chapter: "technology", number: "FIG. 4-10", caption: "混纺废纺分离的技术决策图", src: "/paper-figures/fig-4-10.png" },
  { id: "4-11", chapter: "technology", number: "FIG. 4-11", caption: "混纺选择性分离与闭环项目的技术成熟度", src: "/paper-figures/fig-4-11.png" },
  { id: "4-12", chapter: "technology", number: "FIG. 4-12", caption: "主要 T2T 技术路线的多维表现", src: "/paper-figures/fig-4-12.png" },
  { id: "4-13", chapter: "technology", number: "FIG. 4-13", caption: "主要 T2T 技术路线的技术成熟度、原料复杂度与潜在规模", src: "/paper-figures/fig-4-13.png" },
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
  groups: NarrativeGroup[];
};

const chapters: NarrativeChapter[] = [
  {
    id: "method",
    code: "01",
    title: "研究框架与证据边界",
    question: "不同技术项目如何在同一尺度上比较？",
    lead: "论证从统一评价语言开始。成熟度分级先界定实验验证、工程放大与商业运行之间的证据差异，再进入产业数据比较。",
    finding: "T1—T5 不是企业排名，而是对项目证据强度、运行连续性与闭环可验证性的共同标尺。",
    groups: [
      { code: "1.1", title: "统一技术成熟度判据", text: "先建立证据尺度，避免把实验室可行、示范线运行与稳定商业闭环混为同一成熟阶段。", figureIds: ["1-1"] },
    ],
  },
  {
    id: "supply",
    code: "02",
    title: "材料供给与产业底盘",
    question: "哪些材料与企业构成 T2T 的优先原料基础？",
    lead: "第二章由宏观供给进入材料结构，再下沉至企业与产品边界。图件顺序对应“总量—品类—企业”的逐层收敛。",
    finding: "涤纶决定潜在闭环规模；锦纶、氨纶和天然纤维则决定分选精度、混纺复杂度与差异化技术需求。",
    groups: [
      { code: "2.1", title: "全国纤维供给格局", text: "先用总量与结构确定中国纺织原料底盘，识别化学纤维在 T2T 原料体系中的规模权重。", figureIds: ["2-1", "2-2"] },
      { code: "2.2", title: "聚酯主导的规模基础", text: "从涤纶内部结构、年度演变进一步延伸到代表性企业，连接材料规模与可组织的产业供给。", figureIds: ["2-3", "2-4", "2-5"] },
      { code: "2.3", title: "锦纶与氨纶的差异化边界", text: "锦纶关注解聚价值与企业集中度；氨纶关注弹性组分对混纺回收过程的干扰及预处理要求。", figureIds: ["2-6", "2-7", "2-8", "2-9"] },
      { code: "2.4", title: "棉与羊毛的天然纤维体系", text: "产量、区域集中度与企业产品口径共同说明天然纤维不能仅按吨位比较，还需区分纱线、面料与制品边界。", figureIds: ["2-10", "2-11", "2-12", "2-13", "2-14"] },
    ],
  },
  {
    id: "recovery",
    code: "03",
    title: "回收前端与原料流向",
    question: "生产端规模如何转化为稳定、可追溯的再生进料？",
    lead: "第三章把视角从生产供给转向废旧纺织品。回收量回答“有多少”，产业链流向回答“如何进入不同技术路线”。",
    finding: "回收规模增长只是起点；分类、成分识别与标准化进料，才是连接废纺来源与高值闭环技术的关键接口。",
    groups: [
      { code: "3.1", title: "回收规模及其年度变化", text: "通过 2018—2024 年回收量变化观察前端供给的波动性，并为后续路线规模判断提供边界。", figureIds: ["3-1"] },
      { code: "3.2", title: "从来源到技术去向", text: "沿“来源—回收—分选—标准化进料—再生利用”展开关系，突出不同材料进入后端技术前的组织条件。", figureIds: ["3-2"] },
    ],
  },
  {
    id: "technology",
    code: "04",
    title: "技术路线与项目成熟度",
    question: "不同材料应进入哪条闭环路线，商业证据又处于什么阶段？",
    lead: "第四章遵循“工艺机理—代表项目—横向比较”的顺序：先理解路线，再判断成熟度，最后形成技术组合。",
    finding: "不存在适用于所有原料的单一路线。纯度、混纺结构、预处理强度与产品价值共同决定技术选择。",
    groups: [
      { code: "4.1", title: "PET：规模化闭环的主路径", text: "先展示 PET 闭环路线，再分别比较化学解聚与酶促解聚项目的工程化和商业化证据。", figureIds: ["4-1", "4-2", "4-3"] },
      { code: "4.2", title: "PA6 与含氨体系：高值材料的选择性处理", text: "PA6 具备清晰的解聚—再聚合逻辑；氨纶及含氨混纺则更依赖选择性分离和稳定预处理。", figureIds: ["4-4", "4-5", "4-6"] },
      { code: "4.3", title: "废棉：机械再生与纤维素再生并行", text: "机械法保留纤维形态，纤维素法重构材料分子链，两者对应不同原料质量与产品价值目标。", figureIds: ["4-7", "4-8", "4-9"] },
      { code: "4.4", title: "混纺决策与技术组合比较", text: "从混纺分离决策进入代表项目，再用多维矩阵和气泡图比较各路线的成熟度、复杂度与潜在规模。", figureIds: ["4-10", "4-11", "4-12", "4-13"] },
    ],
  },
  {
    id: "strategy",
    code: "05",
    title: "产业推进与行动优先级",
    question: "技术证据如何转化为 2026—2030 年的产业行动？",
    lead: "第五章把前述材料、回收和技术判断转化为时间路线与优先级配置，使建议与证据链逐项对应。",
    finding: "近期重点是可追溯进料与成熟路线示范，中期推进混纺和酶法放大，远期形成标准统一、长期采购支撑的全国闭环网络。",
    groups: [
      { code: "5.1", title: "阶段化产业路线图", text: "按近期、中期和远期拆分基础设施、技术示范与制度建设任务，避免将所有行动压缩到同一时间窗口。", figureIds: ["5-1"] },
      { code: "5.2", title: "产业影响与实施难度", text: "用优先级矩阵校准行动顺序：先推进高影响、低阻力事项，再为高难度系统工程建立长期协同机制。", figureIds: ["5-2"] },
    ],
  },
];

const figureById = new Map(figures.map((figure) => [figure.id, figure]));

export default function PaperFigureAtlas() {
  const [selected, setSelected] = useState<FigureRecord | null>(null);

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
          <div><p className="eyebrow">04 · VISUAL RESEARCH NARRATIVE</p><h2>研究证据链：从材料供给到产业实施</h2></div>
          <p>图件严格沿论文第 1—5 章的论证顺序展开。每一组先提出研究问题，再呈现证据与阶段判断；点击图件可查看高清原图。</p>
        </div>

        <nav className="narrative-index" aria-label="论文图表章节索引">
          {chapters.map((chapter) => (
            <a key={chapter.id} href={`#paper-chapter-${chapter.id}`}>
              <span>{chapter.code}</span>
              <strong>{chapter.title}</strong>
              <small>{String(figures.filter((figure) => figure.chapter === chapter.id).length).padStart(2, "0")} FIG.</small>
            </a>
          ))}
        </nav>

        <div className="narrative-flow">
          {chapters.map((chapter) => (
            <article className="narrative-chapter" id={`paper-chapter-${chapter.id}`} key={chapter.id}>
              <div className="chapter-rail" aria-hidden="true"><span>{chapter.code}</span><i /></div>
              <div className="chapter-content">
                <header className="chapter-heading">
                  <div>
                    <p>CHAPTER {chapter.code}</p>
                    <h3>{chapter.title}</h3>
                  </div>
                  <div className="chapter-question"><span>RESEARCH QUESTION</span><strong>{chapter.question}</strong></div>
                  <p>{chapter.lead}</p>
                </header>

                <div className="narrative-groups">
                  {chapter.groups.map((group) => {
                    const groupFigures = group.figureIds.map((id) => figureById.get(id)).filter((figure): figure is FigureRecord => Boolean(figure));
                    return (
                      <section className="narrative-group" key={group.code}>
                        <div className="narrative-group-copy">
                          <span>{group.code}</span>
                          <h4>{group.title}</h4>
                          <p>{group.text}</p>
                        </div>
                        <div className={`narrative-figures count-${Math.min(groupFigures.length, 5)}`}>
                          {groupFigures.map((figure) => (
                            <button className="figure-card" key={figure.id} onClick={() => setSelected(figure)} aria-label={`查看高清图：${figure.caption}`}>
                              <div className="figure-image"><img src={figure.src.replace(/^\//, "")} alt={figure.caption} loading="lazy" decoding="async" /></div>
                              <div className="figure-meta"><span>{figure.number}</span><strong>{figure.caption}</strong><i>↗</i></div>
                            </button>
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </div>

                <div className="chapter-finding"><span>CHAPTER FINDING</span><p>{chapter.finding}</p></div>
              </div>
            </article>
          ))}
        </div>
        <div className="figure-audit"><span>FIGURE INTEGRITY</span><p>正文实际引用的 32 张图件均已按论文顺序纳入上述五章；Word 压缩包内另有 6 个被替换后残留的旧媒体文件，不作为有效图重复展示。</p></div>
      </div>

      {selected && (
        <div className="figure-lightbox" role="dialog" aria-modal="true" aria-label={selected.caption} onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="关闭大图">×</button>
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox-title"><span>{selected.number}</span><h3>{selected.caption}</h3></div>
            <img src={selected.src.replace(/^\//, "")} alt={selected.caption} />
          </div>
        </div>
      )}
    </section>
  );
}
