"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CitationLinks from "./CitationLinks";
import { useLanguage } from "./LanguageContext";

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
  references?: number[];
};

type Dataset = {
  code: string;
  label: string;
  trendTitle: string;
  short: string;
  color: string;
  trend: Point[];
  source: string;
  boundary: string;
  references: number[];
  views: SecondaryView[];
};

const datasets: Record<string, Dataset> = {
  chemical: {
    code: "CF",
    label: "化学纤维",
    trendTitle: "中国化学纤维产量变化趋势",
    short: "总量",
    color: "#0f8f7a",
    trend: [
      { year: 2020, value: 6025 }, { year: 2021, value: 6524 }, { year: 2022, value: 6488 },
      { year: 2023, value: 6872 }, { year: 2024, value: 7475 }, { year: 2025, value: 7793 },
    ],
    source: "工业和信息化部、中国纺织工业联合会、中国化学纤维工业协会年度运行分析。",
    boundary: "2023年起化纤统计方法有调整，2022年数据亦有修订；序列适合观察规模和方向。",
    references: [2, 3, 4, 5, 6, 7],
    views: [{
      id: "structure", label: "品类结构", title: "2025 年中国主要化学纤维产量结构",
      intro: "主量材料与小品类共同构成规模—复杂度并存的供给格局。",
      references: [2],
      bars: [
        { label: "涤纶", value: 6477 }, { label: "再生纤维素", value: 548 }, { label: "锦纶", value: 472 },
        { label: "氨纶", value: 110 }, { label: "腈纶", value: 62.6 }, { label: "丙纶", value: 47 }, { label: "维纶", value: 8.5 },
      ],
    }],
  },
  polyester: {
    code: "PET",
    label: "涤纶",
    trendTitle: "中国涤纶产量变化趋势",
    short: "涤纶",
    color: "#0f8f7a",
    trend: [
      { year: 2020, value: 4922.75 }, { year: 2021, value: 5363 }, { year: 2022, value: 5343 },
      { year: 2023, value: 5702 }, { year: 2024, value: 6226 }, { year: 2025, value: 6477 },
    ],
    source: "中国纺织工业联合会、中国化学纤维工业协会年度运行分析。",
    boundary: "企业年报披露的产品边界并非完全相同，企业图只做公开产量比较，不计算严格市场份额。",
    references: [2, 3, 4, 5, 6, 7],
    views: [
      {
        id: "enterprise", label: "代表性企业", title: "2025 年中国代表性涤纶企业公开产量",
        intro: "基于同年度公开披露，保留涤纶丝、短纤与聚酯切片的产品边界。",
        references: [8, 9, 10, 11, 12, 84],
        bars: [
          { label: "桐昆股份 · 涤纶丝", value: 1326.68, note: "另有聚酯切片 10.87 万吨" },
          { label: "恒逸石化 · 涤纶产品", value: 867.97, note: "合并产品口径" },
          { label: "新凤鸣 · 涤纶长丝", value: 808.67, note: "另有短纤 130.67、切片 5.35 万吨" },
          { label: "三房巷 · 瓶级聚酯切片", value: 314.05, note: "实际产量" },
          { label: "东方盛虹 · 涤纶丝", value: 287.52, note: "实际产量" },
        ],
      },
      {
        id: "subtype", label: "长短丝结构", title: "2025 年中国涤纶短纤与长丝结构",
        intro: "长丝占涤纶总产量的 79.2%，构成供给结构中的主体部分。",
        references: [2],
        bars: [{ label: "涤纶长丝", value: 5129 }, { label: "涤纶短纤", value: 1348 }],
      },
    ],
  },
  nylon: {
    code: "PA6",
    label: "锦纶",
    trendTitle: "中国锦纶产量变化趋势",
    short: "锦纶",
    color: "#ff8d5c",
    trend: [
      { year: 2020, value: 384.25 }, { year: 2021, value: 415 }, { year: 2022, value: 410 },
      { year: 2023, value: 432 }, { year: 2024, value: 459 }, { year: 2025, value: 472 },
    ],
    source: "中国纺织工业联合会、中国化学纤维工业协会年度运行分析。",
    boundary: "企业数据分别对应聚酰胺制品、PA6 切片、锦纶纤维或设计产能，不用于计算市场份额。",
    references: [2, 3, 4, 5, 6, 7],
    views: [{
      id: "enterprise", label: "代表性企业", title: "2025 年中国代表性锦纶长丝企业公开产量",
      intro: "覆盖聚合、切片与纤维环节；不同产品边界并列呈现，不作严格排名。",
      references: [13, 49, 50, 51, 64, 65, 66, 91],
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
    trendTitle: "中国氨纶产量变化趋势",
    short: "氨纶",
    color: "#83aee8",
    trend: [
      { year: 2020, value: 83.2 }, { year: 2021, value: 86.8 }, { year: 2022, value: 86 },
      { year: 2023, value: 96 }, { year: 2024, value: 105.5 }, { year: 2025, value: 110 },
    ],
    source: "中国纺织工业联合会、中国化学纤维工业协会年度运行分析。",
    boundary: "数据为截至 2025 年末公开披露的产能，不代表 2025 年实际产量。不同企业的披露范围可能为单一基地或多基地合计，因此仅用于展示代表性企业规模，不用于计算市场份额或进行严格排名；晓星中国为中国境内公开厂区产能合计。",
    references: [2, 3, 4, 5, 6, 7],
    views: [{
      id: "enterprise", label: "代表性企业", title: "2025 年末中国主要氨纶企业公开产能",
      intro: "统一采用万吨口径，展示截至 2025 年末中国主要氨纶企业的公开产能规模。",
      references: [14, 15, 16, 52, 53],
      unit: "万吨",
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
    trendTitle: "中国棉花产量变化趋势",
    short: "棉花",
    color: "#c38b55",
    trend: [
      { year: 2020, value: 591 }, { year: 2021, value: 573.1 }, { year: 2022, value: 597.7 },
      { year: 2023, value: 561.8 }, { year: 2024, value: 616.4 }, { year: 2025, value: 664.1 },
    ],
    source: "国家统计局年度棉花产量公告。",
    boundary: "棉花属于农业生产，页面呈现产区集中度，不套用化纤企业产量排名逻辑。",
    references: [17],
    views: [
      {
        id: "region", label: "产区集中度", title: "2025 年中国棉花产地集中度",
        intro: "新疆产量 616.5 万吨，占全国 92.8%；其他地区为全国量减新疆量。",
        references: [17],
        bars: [{ label: "新疆", value: 616.5, note: "92.8%" }, { label: "其他地区", value: 47.6, note: "7.2%" }],
      },
      {
        id: "enterprise", label: "加工企业", title: "2025 年中国代表性棉纺企业能力与产品边界",
        intro: "设备规模、设计能力和实际产量属于不同指标，用于识别再生棉进入产业链的接口。",
        references: [85, 86, 87, 88, 89],
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
    trendTitle: "中国羊毛产量变化趋势",
    short: "羊毛",
    color: "#6f839d",
    trend: [
      { year: 2013, value: 40.2081 }, { year: 2014, value: 40.723 }, { year: 2015, value: 41.3134 },
      { year: 2016, value: 41.1642 }, { year: 2017, value: 41.0523 }, { year: 2018, value: 35.6608 },
      { year: 2019, value: 34.112 }, { year: 2020, value: 33.3625 }, { year: 2021, value: 35.6217 },
      { year: 2022, value: 35.6194 }, { year: 2023, value: 36.7505 }, { year: 2024, value: 36.4481 },
    ],
    source: "国家统计局、《中国统计年鉴 2025》表 12-14；单位换算为万吨。",
    boundary: "细羊毛与半细羊毛属于绵羊毛总量的内部分类，不能与绵羊毛总量相加。",
    references: [18, 19, 20, 21],
    views: [
      {
        id: "structure", label: "品类结构", title: "2024 年中国主要羊毛类别产量",
        intro: "绵羊毛总量与其内部类别并列展示；山羊粗毛属于另一品类。",
        references: [19, 21],
        bars: [
          { label: "绵羊毛总量", value: 36.4481, note: "总量口径" },
          { label: "半细羊毛", value: 19.6293, note: "绵羊毛内部分类" },
          { label: "细羊毛", value: 7.5201, note: "绵羊毛内部分类" },
          { label: "山羊粗毛", value: 2.5384, note: "独立品类" },
        ],
      },
      {
        id: "enterprise", label: "加工企业", title: "2025 年中国代表性毛纺与羊绒企业产品边界",
        intro: "毛条、纱线、面料与成衣位于不同加工环节，不合并为单一规模排名。",
        references: [90, 91, 92, 93, 94],
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
    trendTitle: "中国废旧纺织品回收业务量变化趋势",
    short: "回收",
    color: "#7a63c7",
    trend: [
      { year: 2018, value: 380 }, { year: 2019, value: 400 }, { year: 2020, value: 430 },
      { year: 2021, value: 475 }, { year: 2022, value: 415 }, { year: 2023, value: 480 }, { year: 2024, value: 515 },
    ],
    source: "《中国再生资源回收行业发展报告》系列及 2024 年行业公开数据。",
    boundary: "回收业务量不等于再生纤维产量，更不等于 T2T 闭环量；2023 年约 480 万吨为按 2024 年同比 7.3% 反推。",
    references: [22, 23, 24, 25, 26],
    views: [{
      id: "method", label: "口径辨析", title: "中国废纺回收业务量、再生纤维量与 T2T 闭环量的边界",
      intro: "515 万吨表征进入回收体系的业务规模，不能直接推导纺织级闭环产出。",
      references: [22, 23, 24, 25, 26],
      kind: "method",
    }],
  },
};

const datasetEnglish: Record<string, {
  label: string; trendTitle: string; short: string; source: string; boundary: string;
  views: Array<{ label: string; title: string; intro: string; unit?: string; bars?: Array<{ label: string; note?: string }>; profiles?: Array<{ label: string; metrics: string[]; note: string }> }>;
}> = {
  chemical: {
    label: "Chemical fibers", trendTitle: "Trend in China's Chemical-Fiber Output", short: "Total output",
    source: "Annual industry reviews by the Ministry of Industry and Information Technology, China National Textile and Apparel Council, and China Chemical Fibers Association.",
    boundary: "The statistical method changed from 2023 and 2022 was revised; the series is suitable for observing scale and direction.",
    views: [{ label: "Composition", title: "Composition of China's Major Chemical-Fiber Output in 2025", intro: "Large-volume materials and smaller categories create a supply structure combining scale and complexity.", bars: [
      { label: "Polyester" }, { label: "Regenerated cellulose" }, { label: "Nylon" }, { label: "Spandex" }, { label: "Acrylic" }, { label: "Polypropylene" }, { label: "Vinylon" },
    ] }],
  },
  polyester: {
    label: "Polyester", trendTitle: "Trend in China's Polyester Output", short: "Polyester",
    source: "Annual industry reviews by China National Textile and Apparel Council and China Chemical Fibers Association.",
    boundary: "Product boundaries in company reports are not fully consistent. Company charts compare public output and do not calculate strict market shares.",
    views: [
      { label: "Representative companies", title: "Public Output of Representative Polyester Companies in China, 2025", intro: "Same-year public disclosures retain the boundaries among polyester yarn, staple fiber, and chips.", bars: [
        { label: "Tongkun · polyester yarn", note: "Plus 0.1087 Mt polyester chips" },
        { label: "Hengyi Petrochemical · polyester products", note: "Combined product basis" },
        { label: "Xinfengming · polyester filament", note: "Plus 1.3067 Mt staple and 0.0535 Mt chips" },
        { label: "Sanfangxiang · bottle-grade PET chips", note: "Actual output" },
        { label: "Eastern Shenghong · polyester yarn", note: "Actual output" },
      ] },
      { label: "Filament / staple", title: "China's Polyester Filament and Staple-Fiber Structure in 2025", intro: "Filament represented 79.2% of polyester output and formed the dominant supply segment.", bars: [{ label: "Polyester filament" }, { label: "Polyester staple fiber" }] },
    ],
  },
  nylon: {
    label: "Nylon", trendTitle: "Trend in China's Nylon Output", short: "Nylon",
    source: "Annual industry reviews by China National Textile and Apparel Council and China Chemical Fibers Association.",
    boundary: "Company data refer to polyamide products, PA6 chips, nylon fibers, or design capacity and are not used to calculate market share.",
    views: [{ label: "Representative companies", title: "Public Output of Representative Nylon-Filament Companies in China, 2025", intro: "Polymerization, chips, and fiber stages are shown together; different product boundaries are not ranked strictly.", bars: [
      { label: "Shenma · polyamide products", note: "2025 output" }, { label: "Huading · nylon filament", note: "2025 output" },
      { label: "Highsun · PA6 chips + nylon yarn", note: "0.1761 + 0.0708 Mt" }, { label: "Taihua · nylon filament", note: "2025 output" },
      { label: "Nanshan Fashion · PA6 / PA66", note: "Public design capacity" },
    ] }],
  },
  spandex: {
    label: "Spandex", trendTitle: "Trend in China's Spandex Output", short: "Spandex",
    source: "Annual industry reviews by China National Textile and Apparel Council and China Chemical Fibers Association.",
    boundary: "The figures are publicly disclosed capacity as of year-end 2025, not actual output in 2025. Disclosure may cover one site or several sites, so the figures indicate the scale of representative companies and are not used to calculate market share or create a strict ranking. Hyosung China is the combined capacity of its publicly disclosed sites in China.",
    views: [{ label: "Representative companies", title: "Public Capacity of Major Spandex Companies in China at Year-End 2025", intro: "Figures are presented in units of 10,000 tonnes to show the disclosed capacity of major Chinese spandex companies at year-end 2025.", unit: "10,000 tonnes", bars: [
      { label: "Huafon Chemical", note: "Public capacity" }, { label: "Hyosung China", note: "Sum of disclosed sites" },
      { label: "Zhuji Huahai", note: "Public capacity" }, { label: "Xinxiang Chemical Fiber", note: "Public capacity" }, { label: "Tayho Advanced Materials", note: "Public capacity" },
    ] }],
  },
  cotton: {
    label: "Cotton", trendTitle: "Trend in China's Cotton Output", short: "Cotton",
    source: "Annual cotton-output bulletins from the National Bureau of Statistics of China.",
    boundary: "Cotton is agricultural production. The page shows regional concentration rather than applying a chemical-fiber company-ranking logic.",
    views: [
      { label: "Regional concentration", title: "Regional Concentration of China's Cotton Output in 2025", intro: "Xinjiang produced 6.165 Mt, or 92.8% of the national total; other regions are calculated by subtraction.", bars: [{ label: "Xinjiang", note: "92.8%" }, { label: "Other regions", note: "7.2%" }] },
      { label: "Processing companies", title: "Capabilities and Product Boundaries of Representative Cotton-Spinning Companies in China, 2025", intro: "Equipment scale, design capacity, and actual output are different indicators used to locate interfaces for recycled cotton.", profiles: [
        { label: "Weiqiao Textile", metrics: ["6 million spindles", "0.72 Mt/y yarn capacity"], note: "Existing capacity" },
        { label: "Texhong Textile", metrics: ["4.23 million spindles"], note: "Equipment scale, June 2025" },
        { label: "Huafu Fashion", metrics: ["2.06 million spindles", "0.29 Mt/y new yarn"], note: "Design capacity" },
        { label: "Bros Eastern", metrics: ["0.2429 Mt yarn"], note: "Actual output in 2025" },
        { label: "Luthai Textile", metrics: ["199 million m fabric"], note: "Actual output in 2025" },
      ] },
    ],
  },
  wool: {
    label: "Wool", trendTitle: "Trend in China's Wool Output", short: "Wool",
    source: "National Bureau of Statistics and China Statistical Yearbook 2025, Table 12-14; converted to million tonnes.",
    boundary: "Fine wool and semi-fine wool are internal categories of sheep wool and cannot be added to the sheep-wool total.",
    views: [
      { label: "Composition", title: "Output of Major Wool Categories in China, 2024", intro: "The sheep-wool total is shown with internal categories; coarse goat hair is a separate category.", bars: [
        { label: "Total sheep wool", note: "Total basis" }, { label: "Semi-fine wool", note: "Internal sheep-wool category" },
        { label: "Fine wool", note: "Internal sheep-wool category" }, { label: "Coarse goat hair", note: "Separate category" },
      ] },
      { label: "Processing companies", title: "Product Boundaries of Representative Wool and Cashmere Companies in China, 2025", intro: "Tops, yarn, fabric, and garments occupy different processing stages and are not combined into one scale ranking.", profiles: [
        { label: "Xinao Textiles", metrics: ["16.3 kt worsted yarn", "3.1 kt cashmere yarn", "6.8 kt wool tops"], note: "Actual output in 2025" },
        { label: "Nanshan Fashion", metrics: ["12.1814 million m worsted fabric"], note: "Actual output in 2025" },
        { label: "Erdos", metrics: ["3.198 million cashmere sweaters"], note: "Actual output in 2025" },
        { label: "Consinee", metrics: ["10 kt/y high-grade yarn"], note: "Public production and sales capacity" },
        { label: "King Deer", metrics: ["2 million cashmere items/y"], note: "Madagascar plant capacity" },
      ] },
    ],
  },
  waste: {
    label: "Recovered textiles", trendTitle: "Trend in China's Recovered Textile Business Volume", short: "Recovery",
    source: "China Recycled Resources Industry Development Report series and public industry data for 2024.",
    boundary: "Recovered business volume is not recycled-fiber output or T2T closed-loop volume. The 2023 value of about 4.80 Mt is back-calculated from 7.3% growth in 2024.",
    views: [{ label: "Scope distinction", title: "Boundaries among Recovered Textile Volume, Recycled-Fiber Output, and T2T Closed-Loop Volume", intro: "The 5.15 Mt figure describes material entering the recovery system and cannot directly indicate textile-grade closed-loop output." }],
  },
};

function formatNumber(value: number) {
  return value.toLocaleString("zh-CN", { maximumFractionDigits: 2 });
}

function TrendCanvas({ data, color, label }: { data: Point[]; color: string; label: string }) {
  const { pick } = useLanguage();
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
      const values = data.map((item) => item.value);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const span = Math.max(1, max - min);
      const lower = Math.max(0, min - span * 0.24);
      const upper = max + span * 0.2;
      ctx.font = "14px Inter, Microsoft YaHei, sans-serif";
      const ticks = Array.from({ length: 4 }, (_, i) => upper - (i * (upper - lower)) / 3);
      const pad = { l: Math.ceil(Math.max(...ticks.map((tick) => ctx.measureText(formatNumber(tick)).width))) + 16, r: 26, t: 28, b: 44 };
      const labelStep = Math.max(1, Math.ceil(((data.length - 1) * 56) / Math.max(1, w - pad.l - pad.r)));
      const x = (index: number) => pad.l + (index * (w - pad.l - pad.r)) / Math.max(1, data.length - 1);
      const y = (value: number) => pad.t + ((upper - value) * (h - pad.t - pad.b)) / Math.max(1, upper - lower);

      ctx.clearRect(0, 0, w, h);
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
        if (index === 0 || index === data.length - 1 || (index % labelStep === 0 && index <= data.length - 1 - labelStep)) {
          ctx.fillStyle = "#63716c"; ctx.textAlign = "center"; ctx.fillText(String(data[index].year), point.x, h - 16);
        }
      });
    };
    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [data, color, hovered]);

  const onMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
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
      <canvas ref={ref} tabIndex={0} onPointerMove={onMove} onPointerDown={onMove} onPointerLeave={() => setHovered(null)} onFocus={() => setHovered(0)} onBlur={() => setHovered(null)} onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          setHovered((previous) => Math.max(0, Math.min(data.length - 1, (previous ?? 0) + (event.key === "ArrowRight" ? 1 : -1))));
        }
      }} aria-label={`${pick(`${label}产量趋势折线图，单位：万吨。左右方向键查看各年数据。`, `${label} output trend, in 10,000 tonnes. Use left and right arrows to inspect years.`)} ${data.map((point) => `${point.year}: ${formatNumber(point.value)}`).join("; ")}`} />
      {hovered !== null && geometry.current[hovered] && (
        <div className="chart-tooltip" role="status" style={{ left: Math.max(87, Math.min((ref.current?.clientWidth ?? 300) - 87, geometry.current[hovered].x)), top: Math.max(92, geometry.current[hovered].y) }}>
          <span>{data[hovered].year}</span><strong>{formatNumber(data[hovered].value)} {pick("万吨", "10,000 t")}</strong>
        </div>
      )}
    </div>
  );
}

function BarPanel({ view, color }: { view: SecondaryView; color: string }) {
  const { language, pick } = useLanguage();
  const max = Math.max(...(view.bars ?? []).map((item) => item.value), 1);
  if (view.kind === "method") {
    return (
      <div className="method-grid">
        <article><span>{pick("01 · 回收", "01 · COLLECTION")}</span><strong>{pick("回收业务量", "Recovered volume")}</strong><p>{pick("进入回收体系的废旧纺织品规模。", "Textile waste entering the recovery system.")}</p></article>
        <div className="method-arrow">≠</div>
        <article><span>{pick("02 · 再生", "02 · REGENERATION")}</span><strong>{pick("再生纤维产量", "Recycled-fiber output")}</strong><p>{pick("经处理后形成的再生纤维产品规模。", "Recycled-fiber products formed after treatment.")}</p></article>
        <div className="method-arrow">≠</div>
        <article><span>{pick("03 · 闭环", "03 · CLOSED LOOP")}</span><strong>{pick("T2T 闭环量", "T2T closed-loop volume")}</strong><p>{pick("重新进入纺织级产品体系的闭环规模。", "Material that re-enters textile-grade products.")}</p></article>
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
          <div className="data-bar-label"><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><small>{item.note ?? pick("公开产量", "Public output")}</small></div>
          <div className="data-bar-track"><i style={{ width: `${Math.max(2, (item.value / max) * 100)}%`, background: color }} /></div>
          <div className="data-bar-value"><strong>{formatNumber(item.value)}</strong><span>{view.unit ?? pick("万吨", "10,000 t")}</span></div>
        </div>
      ))}
    </div>
  );
}

export default function DataExplorer() {
  const { language, pick } = useLanguage();
  const [key, setKey] = useState("polyester");
  const [viewId, setViewId] = useState("trend");
  const [rangeId, setRangeId] = useState("all");
  const dataset = datasets[key];
  const englishCopy = datasetEnglish[key];
  const displayViews: SecondaryView[] = dataset.views.map((view, viewIndex) => {
    const copy = englishCopy.views[viewIndex];
    if (language === "zh") return view;
    return {
      ...view,
      label: copy.label,
      title: copy.title,
      intro: copy.intro,
      unit: copy.unit ?? view.unit,
      bars: view.bars?.map((bar, index) => ({ ...bar, ...copy.bars?.[index] })),
      profiles: view.profiles?.map((profile, index) => ({ ...profile, ...copy.profiles?.[index] })),
    };
  });
  const displayDataset = language === "zh" ? dataset : { ...dataset, ...englishCopy, views: displayViews };
  const firstYear = dataset.trend[0].year;
  const lastYear = dataset.trend.at(-1)!.year;
  const ranges = [{ id: "all", label: `${firstYear}—${lastYear}`, from: firstYear, to: lastYear }];
  const activeRange = ranges.find((item) => item.id === rangeId) ?? ranges.at(-1)!;
  const visibleTrend = dataset.trend.filter((item) => item.year >= activeRange.from && item.year <= activeRange.to);
  const secondary = displayDataset.views.find((item) => item.id === viewId);
  const change = useMemo(() => {
    if (visibleTrend.length < 2) return 0;
    return ((visibleTrend.at(-1)!.value / visibleTrend[0].value) - 1) * 100;
  }, [visibleTrend]);

  const selectDataset = (next: string) => {
    setKey(next); setViewId("trend"); setRangeId("all");
  };
  const activeReferences = secondary?.references ?? dataset.references;

  return (
    <section className="data-lab section-shell" id="data-lab">
      <div className="data-lab-heading">
        <div><p className="eyebrow">{pick("02 · 多层次数据分析", "02 · MULTI-SCALE EVIDENCE EXPLORER")}</p><h2>{pick("中国纺织材料产量、结构与企业数据", "China Textile-Material Output, Structure, and Company Data")}</h2></div>
        <p>{pick("以材料为索引，将年度变化、品类结构、产区集中度与企业公开数据放在同一分析界面中；数值和统计口径均沿用论文证据。", "The interface indexes annual trends, category structures, regional concentration, and public company disclosures by material; values and statistical boundaries follow the paper's evidence chain.")}</p>
      </div>

      <div className="dataset-tabs" role="tablist" aria-label={pick("选择论文数据主题", "Select a data topic")}>
        {Object.entries(datasets).map(([id, item]) => (
          <button key={id} className={key === id ? "active" : ""} onClick={() => selectDataset(id)} aria-selected={key === id} role="tab">
            <span>{item.code}</span><strong>{language === "zh" ? item.label : datasetEnglish[id].label}</strong><small>{language === "zh" ? item.short : datasetEnglish[id].short}</small>
          </button>
        ))}
      </div>

      <div className="data-stage">
        <aside className="data-controls">
          <div className="control-group">
            <span className="control-label">{pick("分析视图", "ANALYTICAL VIEW")}</span>
            <button className={viewId === "trend" ? "active" : ""} onClick={() => setViewId("trend")}><i>01</i><strong>{pick("变化趋势", "Trend")}</strong><small>{pick("年度序列", "TREND SERIES")}</small></button>
            {displayDataset.views.map((view, index) => (
              <button key={view.id} className={viewId === view.id ? "active" : ""} onClick={() => setViewId(view.id)}><i>0{index + 2}</i><strong>{view.label}</strong><small>{view.id === "enterprise" ? pick("企业数据", "COMPANY EVIDENCE") : pick("结构分析", "STRUCTURAL VIEW")}</small></button>
            ))}
          </div>
          {viewId === "trend" && <div className="control-group range-control">
            <span className="control-label">{pick("观测区间", "OBSERVATION WINDOW")}</span>
            {ranges.map((range) => <button key={range.id} className={rangeId === range.id ? "active" : ""} onClick={() => setRangeId(range.id)}><strong>{range.label}</strong></button>)}
          </div>}
        </aside>

        <div className="data-visual">
          <div className="data-visual-head">
            <div><span>{dataset.code} · {viewId === "trend" ? `${activeRange.from}—${activeRange.to}` : "2025"}</span><h3>{secondary?.title ?? displayDataset.trendTitle}</h3><p>{secondary?.intro ?? pick(`中国年度公开统计构成连续观测序列；节点对应${dataset.label}的原文记录值。`, `Annual public statistics form a continuous series; each point is the reported value for ${displayDataset.label}.`)}</p></div>
            <div className="unit-badge">{pick("单位", "UNIT")}<br /><strong>{secondary?.unit ?? pick("万吨", "10,000 t")}</strong></div>
          </div>
          {viewId === "trend" ? (
            <>
              <TrendCanvas data={visibleTrend} color={dataset.color} label={displayDataset.label} />
              <div className="trend-summary">
                <div><span>{pick("起始年份", "BASE YEAR")}</span><strong>{formatNumber(visibleTrend[0].value)}</strong><small>{visibleTrend[0].year}</small></div>
                <div><span>{pick("结束年份", "END YEAR")}</span><strong>{formatNumber(visibleTrend.at(-1)!.value)}</strong><small>{visibleTrend.at(-1)!.year}</small></div>
                <div><span>{pick("区间变化", "INTERVAL CHANGE")}</span><strong>{change >= 0 ? "+" : ""}{change.toFixed(1)}%</strong><small>{pick("本文计算", "Calculated in this study")}</small></div>
              </div>
            </>
          ) : secondary ? <BarPanel view={secondary} color={dataset.color} /> : null}
        </div>

        <aside className="data-evidence">
          <p>{pick("证据说明", "EVIDENCE NOTE")}</p>
          <h3>{pick("来源与证据边界", "Sources and Evidence Boundaries")}</h3>
          <div><span>{pick("来源", "Source")}</span><p>{displayDataset.source}</p></div>
          <CitationLinks ids={activeReferences} />
          <div><span>{pick("边界提示", "Boundary note")}</span><p>{displayDataset.boundary}</p></div>
          <div className="evidence-chip"><i /><strong>{pick("可追溯至原始证据", "TRACEABLE TO SOURCE EVIDENCE")}</strong></div>
        </aside>
      </div>

      <div className="data-footnote"><span>{pick("证据范围", "EVIDENCE SCOPE")}</span><p>{pick("羊毛序列覆盖 2013—2024 年，废旧纺织品回收业务量覆盖 2018—2024 年，其余材料连续序列覆盖 2020—2025 年。缺失年份不插值，未公开数据不外推。", "The wool series covers 2013–2024, recovered textile business volume covers 2018–2024, and all other material series cover 2020–2025. Missing years are not interpolated and undisclosed data are not extrapolated.")}</p></div>
    </section>
  );
}
