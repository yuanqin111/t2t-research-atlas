"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Point = { year: number; value: number };
type Bar = { label: string; value: number; note?: string };
type Profile = { label: string; metrics: string[]; note: string };
type SecondaryView = {
  id: string;
  label: string;
  title: string;
  intro: string;
  bars?: Bar[];
  profiles?: Profile[];
  unit?: string;
  kind?: "bars" | "method" | "profiles";
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
      id: "structure", label: "品类结构", title: "2025 年主要化学纤维产量结构",
      intro: "主量材料与小品类共同构成规模—复杂度并存的供给格局。",
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
        id: "enterprise", label: "企业对照", title: "2025 年代表性涤纶企业公开产量",
        intro: "基于同年度公开披露，保留涤纶丝、短纤与聚酯切片的产品边界。",
        bars: [
          { label: "桐昆股份 · 涤纶丝", value: 1326.68, note: "另有聚酯切片 10.87 万吨" },
          { label: "恒逸石化 · 涤纶产品", value: 867.97, note: "合并产品口径" },
          { label: "新凤鸣 · 涤纶长丝", value: 808.67, note: "另有短纤 130.67、切片 5.35 万吨" },
          { label: "三房巷 · 瓶级聚酯切片", value: 314.05, note: "实际产量" },
          { label: "东方盛虹 · 涤纶丝", value: 287.52, note: "实际产量" },
        ],
      },
      {
        id: "subtype", label: "长短丝结构", title: "2025 年涤纶短纤与长丝结构",
        intro: "长丝占涤纶总产量的 79.2%，构成供给结构中的主体部分。",
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
    boundary: "企业数据分别对应聚酰胺制品、PA6 切片、锦纶纤维或设计产能，不用于计算市场份额。",
    views: [{
      id: "enterprise", label: "企业对照", title: "2025 年代表性锦纶长丝企业公开产量",
      intro: "覆盖聚合、切片与纤维环节；不同产品边界并列呈现，不作严格排名。",
      bars: [
        { label: "神马股份 · 聚酰胺产品", value: 42.36, note: "2025 年产量" },
        { label: "华鼎股份 · 锦纶长丝", value: 30.11, note: "2025 年产量" },
        { label: "恒申新材 · PA6 切片 + 锦纶丝", value: 24.69, note: "17.61 + 7.08 万吨" },
        { label: "台华新材 · 锦纶长丝", value: 21.53, note: "2025 年产量" },
        { label: "南山智尚 · PA6 / PA66", value: 8, note: "公开设计产能" },
      ],
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
    boundary: "企业层统一采用公开产能口径；产能不等于当年实际产量，晓星中国为公开厂区产能合计。",
    views: [{
      id: "enterprise", label: "企业对照", title: "2025 年末中国主要氨纶企业公开产能",
      intro: "统一采用万吨/年产能口径，观察氨纶生产体系的规模格局。",
      unit: "万吨/年",
      bars: [
        { label: "华峰化学", value: 47.5, note: "公开产能" },
        { label: "晓星中国", value: 24.6, note: "公开厂区合计" },
        { label: "诸暨华海", value: 22.5, note: "公开产能" },
        { label: "新乡化纤", value: 22, note: "公开产能" },
        { label: "泰和新材", value: 8.5, note: "公开产能" },
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
    views: [
      {
        id: "region", label: "产区集中度", title: "2025 年中国棉花产地集中度",
        intro: "新疆产量 616.5 万吨，占全国 92.8%；其他地区为全国量减新疆量。",
        bars: [{ label: "新疆", value: 616.5, note: "92.8%" }, { label: "其他地区", value: 47.6, note: "7.2%" }],
      },
      {
        id: "enterprise", label: "加工企业", title: "2025 年代表性棉纺企业能力与产品边界",
        intro: "设备规模、设计能力和实际产量属于不同指标，用于识别再生棉进入产业链的接口。",
        kind: "profiles",
        profiles: [
          { label: "魏桥纺织", metrics: ["600 万纱锭", "72 万吨/年纱线能力"], note: "企业现有能力" },
          { label: "天虹纺织", metrics: ["423 万纱锭"], note: "2025 年 6 月设备规模" },
          { label: "华孚时尚", metrics: ["206 万纱锭", "29 万吨/年新型纱线"], note: "设计能力" },
          { label: "百隆东方", metrics: ["24.29 万吨纱线"], note: "2025 年实际产量" },
          { label: "鲁泰纺织", metrics: ["1.99 亿米面料"], note: "2025 年实际产量" },
        ],
      },
    ],
  },
  wool: {
    code: "WO",
    label: "羊毛",
    short: "Wool",
    color: "#6f839d",
    trend: [
      { year: 2013, value: 40.2081 }, { year: 2014, value: 40.723 }, { year: 2015, value: 41.3134 },
      { year: 2016, value: 41.1642 }, { year: 2017, value: 41.0523 }, { year: 2018, value: 35.6608 },
      { year: 2019, value: 34.112 }, { year: 2020, value: 33.3625 }, { year: 2021, value: 35.6217 },
      { year: 2022, value: 35.6194 }, { year: 2023, value: 36.7505 }, { year: 2024, value: 36.4481 },
    ],
    source: "国家统计局、《中国统计年鉴 2025》表 12-14；单位换算为万吨。",
    boundary: "细羊毛与半细羊毛属于绵羊毛总量的内部分类，不能与绵羊毛总量相加。",
    views: [
      {
        id: "structure", label: "品类结构", title: "2024 年主要羊毛类别产量",
        intro: "绵羊毛总量与其内部类别并列展示；山羊粗毛属于另一品类。",
        bars: [
          { label: "绵羊毛总量", value: 36.4481, note: "总量口径" },
          { label: "半细羊毛", value: 19.6293, note: "绵羊毛内部分类" },
          { label: "细羊毛", value: 7.5201, note: "绵羊毛内部分类" },
          { label: "山羊粗毛", value: 2.5384, note: "独立品类" },
        ],
      },
      {
        id: "enterprise", label: "加工企业", title: "2025 年代表性毛纺与羊绒企业产品边界",
        intro: "毛条、纱线、面料与成衣位于不同加工环节，不合并为单一规模排名。",
        kind: "profiles",
        profiles: [
          { label: "新澳股份", metrics: ["1.63 万吨毛精纺纱", "0.31 万吨羊绒纱", "0.68 万吨羊毛毛条"], note: "2025 年实际产量" },
          { label: "南山智尚", metrics: ["1218.14 万米精纺呢绒"], note: "2025 年实际产量" },
          { label: "鄂尔多斯", metrics: ["319.8 万件羊绒衫"], note: "2025 年实际产量" },
          { label: "康赛妮", metrics: ["1 万吨/年高档纱线"], note: "公开生产销售能力" },
          { label: "鹿王", metrics: ["200 万件/年羊绒制品"], note: "马达加斯加工厂产能" },
        ],
      },
    ],
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
      id: "method", label: "口径辨析", title: "回收业务量、再生纤维量与 T2T 闭环量的边界",
      intro: "515 万吨表征进入回收体系的业务规模，不能直接推导纺织级闭环产出。",
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
        if (data.length <= 8 || index % 2 === 0 || index === data.length - 1) {
          ctx.fillStyle = "#63716c"; ctx.textAlign = "center"; ctx.fillText(String(data[index].year), point.x, h - 16);
        }
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
        <article><span>01 · COLLECTION</span><strong>回收业务量</strong><p>进入回收体系的废旧纺织品规模。</p></article>
        <div className="method-arrow">≠</div>
        <article><span>02 · REGENERATION</span><strong>再生纤维产量</strong><p>经处理后形成的再生纤维产品规模。</p></article>
        <div className="method-arrow">≠</div>
        <article><span>03 · CLOSED LOOP</span><strong>T2T 闭环量</strong><p>重新进入纺织级产品体系的闭环规模。</p></article>
      </div>
    );
  }
  if (view.kind === "profiles") {
    return (
      <div className="profile-grid">
        {(view.profiles ?? []).map((profile, index) => (
          <article className="profile-card" key={profile.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h4>{profile.label}</h4>
            <div>{profile.metrics.map((metric) => <strong key={metric}>{metric}</strong>)}</div>
            <small>{profile.note}</small>
          </article>
        ))}
      </div>
    );
  }
  return (
    <div className="data-bars">
      {(view.bars ?? []).map((item, index) => (
        <div className="data-bar-row" key={item.label}>
          <div className="data-bar-label"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><small>{item.note ?? "公开产量"}</small></div>
          <div className="data-bar-track"><i style={{ width: `${Math.max(2, (item.value / max) * 100)}%`, background: color }} /></div>
          <div className="data-bar-value"><strong>{formatNumber(item.value)}</strong><span>{view.unit ?? "万吨"}</span></div>
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
  const ranges = dataset.trend[0].year === 2013
    ? [{ id: "early", label: "2013–2017", from: 2013, to: 2017 }, { id: "recent", label: "2018–2024", from: 2018, to: 2024 }, { id: "all", label: "完整序列", from: 2013, to: 2024 }]
    : dataset.trend[0].year === 2018
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
        <div><p className="eyebrow">02 · MULTI-SCALE EVIDENCE EXPLORER</p><h2>跨尺度审视：从宏观供给到企业证据</h2></div>
        <p>以材料为索引，将年度时序、品类结构、产区集中度与企业公开披露纳入同一分析界面；数值与口径均沿用论文证据链。</p>
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
            <span className="control-label">ANALYTICAL VIEW · 分析视图</span>
            <button className={viewId === "trend" ? "active" : ""} onClick={() => setViewId("trend")}><i>01</i><strong>产量时序</strong><small>TREND SERIES</small></button>
            {dataset.views.map((view, index) => (
              <button key={view.id} className={viewId === view.id ? "active" : ""} onClick={() => setViewId(view.id)}><i>0{index + 2}</i><strong>{view.label}</strong><small>{view.id === "enterprise" ? "ENTERPRISE EVIDENCE" : "STRUCTURAL VIEW"}</small></button>
            ))}
          </div>
          {viewId === "trend" && <div className="control-group range-control">
            <span className="control-label">OBSERVATION WINDOW · 观测区间</span>
            {ranges.map((range) => <button key={range.id} className={rangeId === range.id ? "active" : ""} onClick={() => setRangeId(range.id)}><strong>{range.label}</strong></button>)}
          </div>}
        </aside>

        <div className="data-visual">
          <div className="data-visual-head">
            <div><span>{dataset.code} · {viewId === "trend" ? `${activeRange.from}—${activeRange.to}` : "2025"}</span><h3>{secondary?.title ?? `${dataset.label}产量时序`}</h3><p>{secondary?.intro ?? `年度公开统计构成连续观测序列；节点对应${dataset.label}的原文记录值。`}</p></div>
            <div className="unit-badge">UNIT<br /><strong>{secondary?.unit ?? "万吨"}</strong></div>
          </div>
          {viewId === "trend" ? (
            <>
              <TrendCanvas data={visibleTrend} color={dataset.color} label={dataset.label} />
              <div className="trend-summary">
                <div><span>BASE YEAR</span><strong>{formatNumber(visibleTrend[0].value)}</strong><small>{visibleTrend[0].year}</small></div>
                <div><span>END YEAR</span><strong>{formatNumber(visibleTrend.at(-1)!.value)}</strong><small>{visibleTrend.at(-1)!.year}</small></div>
                <div><span>INTERVAL CHANGE</span><strong>{change >= 0 ? "+" : ""}{change.toFixed(1)}%</strong><small>本文计算</small></div>
              </div>
            </>
          ) : secondary ? <BarPanel view={secondary} color={dataset.color} /> : null}
        </div>

        <aside className="data-evidence">
          <p>EVIDENCE NOTE</p>
          <h3>来源与证据边界</h3>
          <div><span>来源</span><p>{dataset.source}</p></div>
          <div><span>边界提示</span><p>{dataset.boundary}</p></div>
          <div className="evidence-chip"><i /><strong>TRACEABLE TO SOURCE EVIDENCE</strong></div>
        </aside>
      </div>

      <div className="data-footnote"><span>EVIDENCE SCOPE · 证据范围</span><p>羊毛序列覆盖 2013—2024 年，废旧纺织品回收业务量覆盖 2018—2024 年，其余材料连续序列覆盖 2020—2025 年。缺失年份不插值，未公开数据不外推。</p></div>
    </section>
  );
}
