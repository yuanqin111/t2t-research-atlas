"use client";

import { useEffect, useMemo, useState } from "react";

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

const filters = [
  { id: "all", label: "全部图件", count: 32 },
  { id: "supply", label: "材料供给", count: 14 },
  { id: "recovery", label: "回收前端", count: 2 },
  { id: "technology", label: "技术证据", count: 13 },
  { id: "strategy", label: "产业策略", count: 2 },
  { id: "method", label: "研究框架", count: 1 },
];

export default function PaperFigureAtlas() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<FigureRecord | null>(null);
  const visible = useMemo(() => filter === "all" ? figures : figures.filter((figure) => figure.chapter === filter), [filter]);

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
          <div><p className="eyebrow">04 · T2T RESEARCH FIGURE ATLAS</p><h2>T2T 研究图谱：材料结构、回收流向与技术路径</h2></div>
          <p>从供给规模、企业边界到技术成熟度与产业路线，所有有效插图均按新版论文顺序归档；点击任意图件可查看高清原图。</p>
        </div>

        <div className="figure-filters" role="tablist" aria-label="筛选论文图件">
          {filters.map((item) => <button key={item.id} role="tab" aria-selected={filter === item.id} className={filter === item.id ? "active" : ""} onClick={() => setFilter(item.id)}><span>{item.label}</span><small>{String(item.count).padStart(2, "0")}</small></button>)}
        </div>

        <div className="figure-grid">
          {visible.map((figure) => (
            <button className="figure-card" key={figure.id} onClick={() => setSelected(figure)} aria-label={`查看高清图：${figure.caption}`}>
              <div className="figure-image"><img src={figure.src} alt={figure.caption} loading="lazy" decoding="async" /></div>
              <div className="figure-meta"><span>{figure.number}</span><strong>{figure.caption}</strong><i>↗</i></div>
            </button>
          ))}
        </div>
        <div className="figure-audit"><span>ASSET AUDIT</span><p>文档内部共含 38 个媒体文件，其中 32 个为正文实际引用图件；其余 6 个是被替换后仍残留在 Word 压缩包中的旧版本，未作为有效图重复展示。</p></div>
      </div>

      {selected && (
        <div className="figure-lightbox" role="dialog" aria-modal="true" aria-label={selected.caption} onClick={() => setSelected(null)}>
          <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="关闭大图">×</button>
          <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox-title"><span>{selected.number}</span><h3>{selected.caption}</h3></div>
            <img src={selected.src} alt={selected.caption} />
          </div>
        </div>
      )}
    </section>
  );
}
