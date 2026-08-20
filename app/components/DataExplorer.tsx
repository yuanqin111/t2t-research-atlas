"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Point = { year: number; value: number };
type Bar = { label: string; value: number; note?: string };
type SecondaryView = {
  id: string;
  label: string;
  title: string;
  intro: string;
  bars?: Bar[];
  kind?: "bars" | "method";
};

type Dataset = {
  code: string;
  label: string;
  short: string;
  color: string;
  trend: Point[];
  source: string;
  boundary: string;
  views: SecondaryView[];
};

const datasets: Record<string, Dataset> = {
  chemical: {
    code: "CF",
    label: "化学纤维",
    short: "总量",
    color: "#0f8f7a",
    trend: [
      { year: 2020, value: 6025 }, { year: 2021, value: 6524 }, { year: 2022, value: 6488 },
      { year: 2023, value: 6872 }, { year: 2024, value: 7475 }, { year: 2025, value: 7793 },
    ],
    source: "工业和信息化部、中国纺织工业联合会、中国化学纤维工业协会年度运行分析。",
    boundary: "2023年起化纤统计方法有调整，2022年数据亦有修订；序列适合观察规模和方向。",
    views: [{
      id: "structure", label: "看结构", title: "2025 年主要化学纤维产量结构",
      intro: "涤纶定义主量；锦纶、氨纶和其他小品类共同定义分选复杂度。",
      bars: [
        { label: "涤纶", value: 6477 }, { label: "再生纤维素", value: 548 }, { label: "锦纶", value: 472 },
        { label: "氨纶", value: 110 }, { label: "腈纶", value: 62.6 }, { label: "丙纶", value: 47 }, { label: "维纶", value: 8.5 },
      ],
    }],
  },
  polyester: {
    code: "PET",
    label: "涤纶",
    short: "Polyester",
    color: "#0f8f7a",
    trend: [
      { year: 2020, value: 4922.75 }, { year: 2021, value: 5363 }, { year: 2022, value: 5343 },
      { year: 2023, value: 5702 }, { year: 2024, value: 6226 }, { year: 2025, value: 6477 },
    ],
    source: "中国纺织工业联合会、中国化学纤维工业协会年度运行分析。",
    boundary: "企业年报披露的产品边界并非完全相同，企业图只做公开产量比较，不计算严格市场份额。",
    views: [
      {
        id: "enterprise", label: "查看企业", title: "2025 年代表性涤纶龙头企业公开产量",
        intro: "点击材料后继续进入企业层，比较同年度公开生产量。",
        bars: [
          { label: "桐昆股份", value: 1326.68, note: "涤纶丝" }, { label: "恒逸石化", value: 867.97, note: "涤纶产品" },
          { label: "新凤鸣", value: 808.67, note: "涤纶长丝" }, { label: "东方盛虹", value: 287.52, note: "涤纶丝" },
        ],
      },
      {
        id: "subtype", label: "看长短丝", title: "2025 年涤纶短纤与长丝结构",
        intro: "长丝占涤纶总产量的 79.2%，是产业供给结构中的主要部分。",
        bars: [{ label: "涤纶长丝", value: 5129 }, { label: "涤纶短纤", value: 1348 }],
      },
    ],
  },
  nylon: {
    code: "PA6",
    label: "锦纶",
    short: "Nylon",
    color: "#ff8d5c",
    trend: [
      { year: 2020, value: 384.25 }, { year: 2021, value: 415 }, { year: 2022, value: 410 },
      { year: 2023, value: 432 }, { year: 2024, value: 459 }, { year: 2025, value: 472 },
    ],
    source: "中国纺织工业联合会、中国化学纤维工业协会年度运行分析。",
    boundary: "企业层仅列可检索到同口径锦纶长丝生产量的代表性上市公司。",
    views: [{
      id: "enterprise", label: "查看企业", title: "2025 年代表性锦纶长丝企业公开产量",
      intro: "企业数量少不是市场企业少，而是公开、可比口径的数据有限。",
      bars: [{ label: "华鼎股份", value: 30.11 }, { label: "台华新材", value: 21.53 }],
    }],
  },
  spandex: {
    code: "PU",
    label: "氨纶",
    short: "Spandex",
    color: "#83aee8",
    trend: [
      { year: 2020, value: 83.2 }, { year: 2021, value: 86.8 }, { year: 2022, value: 86 },
      { year: 2023, value: 96 }, { year: 2024, value: 105.5 }, { year: 2025, value: 110 },
    ],
    source: "中国纺织工业联合会、中国化学纤维工业协会年度运行分析。",
    boundary: "华峰按化学纤维口径披露；泰和值由纤维总量扣除芳纶量计算，仅作近似参考。",
    views: [{
      id: "enterprise", label: "查看企业", title: "2025 年代表性氨纶企业公开产量",
      intro: "图中保留年报披露口径差异，避免把近似数当成严格同口径排名。",
      bars: [
        { label: "华峰化学", value: 39.92, note: "化学纤维口径*" },
        { label: "新乡化纤", value: 20.15, note: "氨纶纤维" },
        { label: "泰和新材", value: 5.23, note: "本文估算**" },
      ],
    }],
  },
  cotton: {
    code: "CO",
    label: "棉花",
    short: "Cotton",
    color: "#c38b55",
    trend: [
      { year: 2020, value: 591 }, { year: 2021, value: 573.1 }, { year: 2022, value: 597.7 },
      { year: 2023, value: 561.8 }, { year: 2024, value: 616.4 }, { year: 2025, value: 664.1 },
    ],
    source: "国家统计局年度棉花产量公告。",
    boundary: "棉花属于农业生产，页面呈现产区集中度，不套用化纤企业产量排名逻辑。",
    views: [{
      id: "region", label: "看产区", title: "2025 年中国棉花产地集中度",
      intro: "新疆产量 616.5 万吨，占全国 92.8%；其他地区为全国量减新疆量。",
      bars: [{ label: "新疆", value: 616.5, note: "92.8%" }, { label: "其他地区", value: 47.6, note: "7.2%" }],
    }],
  },
  waste: {
    code: "WTR",
    label: "废纺回收",
    short: "Recovery",
    color: "#7a63c7",
    trend: [
      { year: 2018, value: 380 }, { year: 2019, value: 400 }, { year: 2020, value: 430 },
      { year: 2021, value: 475 }, { year: 2022, value: 415 }, { year: 2023, value: 480 }, { year: 2024, value: 515 },
    ],
    source: "《中国再生资源回收行业发展报告》系列及 2024 年行业公开数据。",
    boundary: "回收业务量不等于再生纤维产量，更不等于 T2T 闭环量；2023 年约 480 万吨为按 2024 年同比 7.3% 反推。",
    views: [{
      id: "method", label: "看口径", title: "先区分“回收量”与“T2T 闭环量”",
      intro: "515 万吨回答的是进入回收体系的规模，不能直接说明其中有多少重新成为纺织级纤维。",
      kind: "method",
    }],
  },
};

function formatNumber(value: number) {
  return value.toLocaleString("zh-CN", { maximumFractionDigits: 2 });
}

function TrendCanvas({ data, color, label }: { data: Point[]; color: string; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const geometry = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, rect.width * ratio);
      canvas.height = Math.max(1, rect.height * ratio);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(ratio, ratio);
      const w = rect.width;
      const h = rect.height;
      const pad = { l: 58, r: 24, t: 28, b: 42 };
      const values = data.map((item) => item.value);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const span = Math.max(1, max - min);
      const lower = Math.max(0, min - span * 0.24);
      const upper = max + span * 0.2;
      const x = (index: number) => pad.l + (index * (w - pad.l - pad.r)) / Math.max(1, data.length - 1);
      const y = (value: number) => pad.t + ((upper - value) * (h - pad.t - pad.b)) / Math.max(1, upper - lower);

      ctx.clearRect(0, 0, w, h);
      ctx.font = "11px Inter, Microsoft YaHei, sans-serif";
      ctx.fillStyle = "#75827d";
      ctx.strokeStyle = "rgba(16,36,31,.12)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i += 1) {
        const gy = pad.t + (i * (h - pad.t - pad.b)) / 3;
        const tick = upper - (i * (upper - lower)) / 3;
        ctx.beginPath(); ctx.moveTo(pad.l, gy); ctx.lineTo(w - pad.r, gy); ctx.stroke();
        ctx.textAlign = "right"; ctx.fillText(formatNumber(tick), pad.l - 10, gy + 4);
      }

      geometry.current = data.map((point, index) => ({ x: x(index), y: y(point.value) }));
      const gradient = ctx.createLinearGradient(0, pad.t, 0, h - pad.b);
      gradient.addColorStop(0, `${color}33`); gradient.addColorStop(1, `${color}00`);
      ctx.beginPath();
      geometry.current.forEach((point, index) => index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y));
      ctx.lineTo(geometry.current.at(-1)?.x ?? pad.l, h - pad.b); ctx.lineTo(geometry.current[0]?.x ?? pad.l, h - pad.b); ctx.closePath();
      ctx.fillStyle = gradient; ctx.fill();

      ctx.beginPath();
      geometry.current.forEach((point, index) => index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y));
      ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineJoin = "round"; ctx.lineCap = "round"; ctx.stroke();
      geometry.current.forEach((point, index) => {
        ctx.beginPath(); ctx.arc(point.x, point.y, hovered === index ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = hovered === index ? "#10241f" : "#ffffff"; ctx.fill();
        ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = "#63716c"; ctx.textAlign = "center"; ctx.fillText(String(data[index].year), point.x, h - 16);
      });
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [data, color, hovered]);

  const onMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const cursorX = event.clientX - rect.left;
    let nearest = 0;
    geometry.current.forEach((point, index) => {
      if (Math.abs(point.x - cursorX) < Math.abs(geometry.current[nearest].x - cursorX)) nearest = index;
    });
    setHovered(nearest);
  };

  return (
    <div className="trend-canvas-wrap">
      <canvas ref={ref} onMouseMove={onMove} onMouseLeave={() => setHovered(null)} aria-label={`${label}产量趋势折线图`} />
      {hovered !== null && geometry.current[hovered] && (
        <div className="chart-tooltip" style={{ left: geometry.current[hovered].x, top: geometry.current[hovered].y }}>
          <span>{data[hovered].year}</span><strong>{formatNumber(data[hovered].value)} 万吨</strong>
        </div>
      )}
    </div>
  );
}

function BarPanel({ view, color }: { view: SecondaryView; color: string }) {
  const max = Math.max(...(view.bars ?? []).map((item) => item.value), 1);
  if (view.kind === "method") {
    return (
      <div className="method-grid">
        <article><span>01</span><strong>回收业务量</strong><p>进入回收体系的旧纺织品规模。</p></article>
        <div className="method-arrow">≠</div>
        <article><span>02</span><strong>再生纤维产量</strong><p>经过处理后形成的纤维产品规模。</p></article>
        <div className="method-arrow">≠</div>
        <article><span>03</span><strong>T2T 闭环量</strong><p>重新用于纺织级产品的闭环规模。</p></article>
      </div>
    );
  }
  return (
    <div className="data-bars">
      {(view.bars ?? []).map((item, index) => (
        <div className="data-bar-row" key={item.label}>
          <div className="data-bar-label"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><small>{item.note ?? "公开产量"}</small></div>
          <div className="data-bar-track"><i style={{ width: `${Math.max(2, (item.value / max) * 100)}%`, background: color }} /></div>
          <div className="data-bar-value"><strong>{formatNumber(item.value)}</strong><span>万吨</span></div>
        </div>
      ))}
    </div>
  );
}

export default function DataExplorer() {
  const [key, setKey] = useState("polyester");
  const [viewId, setViewId] = useState("trend");
  const [rangeId, setRangeId] = useState("all");
  const dataset = datasets[key];
  const ranges = dataset.trend[0].year === 2018
    ? [{ id: "early", label: "2018–2022", from: 2018, to: 2022 }, { id: "recent", label: "2023–2024", from: 2023, to: 2024 }, { id: "all", label: "完整序列", from: 2018, to: 2024 }]
    : [{ id: "early", label: "2020–2022", from: 2020, to: 2022 }, { id: "recent", label: "2023–2025", from: 2023, to: 2025 }, { id: "all", label: "完整序列", from: 2020, to: 2025 }];
  const activeRange = ranges.find((item) => item.id === rangeId) ?? ranges.at(-1)!;
  const visibleTrend = dataset.trend.filter((item) => item.year >= activeRange.from && item.year <= activeRange.to);
  const secondary = dataset.views.find((item) => item.id === viewId);
  const change = useMemo(() => {
    if (visibleTrend.length < 2) return 0;
    return ((visibleTrend.at(-1)!.value / visibleTrend[0].value) - 1) * 100;
  }, [visibleTrend]);

  const selectDataset = (next: string) => {
    setKey(next); setViewId("trend"); setRangeId("all");
  };

  return (
    <section className="data-lab section-shell" id="data-lab">
      <div className="data-lab-heading">
        <div><p className="eyebrow">02 · PAPER DATA EXPLORER</p><h2>把论文里的图，变成可以点击的数据</h2></div>
        <p>先选材料，再选年份；查看趋势后，可继续切换企业、品类或产区。所有数值沿用原文口径。</p>
      </div>

      <div className="dataset-tabs" role="tablist" aria-label="选择论文数据主题">
        {Object.entries(datasets).map(([id, item]) => (
          <button key={id} className={key === id ? "active" : ""} onClick={() => selectDataset(id)} aria-selected={key === id} role="tab">
            <span>{item.code}</span><strong>{item.label}</strong><small>{item.short}</small>
          </button>
        ))}
      </div>

      <div className="data-stage">
        <aside className="data-controls">
          <div className="control-group">
            <span className="control-label">VIEW · 查看方式</span>
            <button className={viewId === "trend" ? "active" : ""} onClick={() => setViewId("trend")}><i>01</i><strong>产量趋势</strong><small>折线图</small></button>
            {dataset.views.map((view, index) => (
              <button key={view.id} className={viewId === view.id ? "active" : ""} onClick={() => setViewId(view.id)}><i>0{index + 2}</i><strong>{view.label}</strong><small>{view.id === "enterprise" ? "企业图" : "结构图"}</small></button>
            ))}
          </div>
          {viewId === "trend" && <div className="control-group range-control">
            <span className="control-label">RANGE · 年份</span>
            {ranges.map((range) => <button key={range.id} className={rangeId === range.id ? "active" : ""} onClick={() => setRangeId(range.id)}><strong>{range.label}</strong></button>)}
          </div>}
        </aside>

        <div className="data-visual">
          <div className="data-visual-head">
            <div><span>{dataset.code} · {viewId === "trend" ? `${activeRange.from}—${activeRange.to}` : "2025"}</span><h3>{secondary?.title ?? `${dataset.label}产量趋势`}</h3><p>{secondary?.intro ?? `鼠标经过折线节点可查看${dataset.label}的年度公开数值。`}</p></div>
            <div className="unit-badge">单位<br /><strong>万吨</strong></div>
          </div>
          {viewId === "trend" ? (
            <>
              <TrendCanvas data={visibleTrend} color={dataset.color} label={dataset.label} />
              <div className="trend-summary">
                <div><span>起点</span><strong>{formatNumber(visibleTrend[0].value)}</strong><small>{visibleTrend[0].year}</small></div>
                <div><span>终点</span><strong>{formatNumber(visibleTrend.at(-1)!.value)}</strong><small>{visibleTrend.at(-1)!.year}</small></div>
                <div><span>区间变化</span><strong>{change >= 0 ? "+" : ""}{change.toFixed(1)}%</strong><small>本文计算</small></div>
              </div>
            </>
          ) : secondary ? <BarPanel view={secondary} color={dataset.color} /> : null}
        </div>

        <aside className="data-evidence">
          <p>DATA NOTE</p>
          <h3>证据与口径</h3>
          <div><span>来源</span><p>{dataset.source}</p></div>
          <div><span>边界提示</span><p>{dataset.boundary}</p></div>
          <div className="evidence-chip"><i /><strong>原文数据 · 可追溯</strong></div>
        </aside>
      </div>

      <div className="data-footnote"><span>使用提示</span><p>涤纶、锦纶、氨纶的连续可核验序列从 2020 年开始；2018–2022 的完整序列属于废旧纺织品回收量。页面不对缺失年份进行插值或补造。</p></div>
    </section>
  );
}
