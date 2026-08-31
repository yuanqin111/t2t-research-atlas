"use client";

import { useState } from "react";
import CitationLinks from "./CitationLinks";
import { useLanguage } from "./LanguageContext";

type EvidenceTable = {
  id: string;
  number: string;
  short: string;
  title: string;
  columns: string[];
  rows: string[][];
  note: string;
  references: number[];
};

const tables: EvidenceTable[] = [
  {
    id: "materials",
    number: "TABLE 01",
    short: "材料供给",
    title: "中国主要纺织材料产量与 T2T 回收重点",
    columns: ["材料", "2025 / 最新产量", "供给特征", "T2T 优先问题"],
    rows: [
      ["涤纶 / PET", "6477 万吨", "长丝占 79.2%，头部企业集中", "建立消费后进料规范并接入现有聚合—纺丝体系"],
      ["锦纶", "472 万吨", "PA6 / PA66、民用 / 工业边界复杂", "高纯分选与 PA6 化学回收放大"],
      ["氨纶", "110 万吨", "低比例混入、阻塞效应大", "消费后含氨混纺分离"],
      ["棉花", "664.1 万吨", "新疆高度集中；农业口径", "机械开松的强力保持与高值化"],
      ["羊毛", "36.45 万吨（绵羊毛，2024）", "高单价、小规模", "精细分选和再纺用途"],
    ],
    note: "材料生产规模不等于可用于 T2T 的废料量。",
    references: [2, 7, 13, 14, 15, 16, 17, 19, 25, 64, 65, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94],
  },
  {
    id: "blends",
    number: "TABLE 02",
    short: "混纺废物流",
    title: "中国四类混纺废纺数据与回收情况",
    columns: ["废物流", "全国分项吨数", "可核验项目 / 企业", "当前判断"],
    rows: [
      ["涤棉", "未公开", "Amino 一期 1.2 万吨/年在建；同济示范；源天研发", "示范 / 在建，尚无全国商业闭环量"],
      ["涤锦", "未公开", "瑞天 / DataBeyond 前端分选；PET 和 PA6 单材路线", "高纯分流可做，混纺专线证据不足"],
      ["涤氨", "未公开", "Amino 一期；华峰 / 晓星消费前再生氨纶", "消费后路线仍在工程放大"],
      ["锦氨", "未公开", "锦纶再生企业 + 氨纶消费前路线", "缺少可核验消费后商业闭环"],
    ],
    note: "“未公开”表示未发现全国权威分项统计，不表示数量为零。",
    references: [27, 28, 29, 46, 47, 48, 49, 50, 51, 52, 53, 67, 77, 78, 81, 82, 83],
  },
  {
    id: "front-end",
    number: "TABLE 03",
    short: "前端企业",
    title: "中国回收、分选与装备企业公开数据",
    columns: ["类别", "企业 / 平台", "公开能力或量化证据", "适用边界"],
    rows: [
      ["线上回收", "飞蚂蚁", "覆盖旧衣、床品、鞋包；企业披露服务 300 余城市", "解决触达与物流，后端去向需合同与追溯核验"],
      ["线上 / 商场", "白鲸鱼", "2015 年上线；与银泰部分门店试点，回收后分流再生、捐赠或出口", "平台与商场触点，不等于 T2T 处理量"],
      ["综合回收", "爱回收 / 万物新生", "核心仍为 3C；2025 年“返航新生”涉及鞋服回收，未披露纺织 T2T 量", "可作消费触点，不列为专业废纺闭环企业"],
      ["社区上门", "北京爱分类环境", "房山 10 个社区、27 个小区、14321 户（2022）", "综合可回收物体系，未披露废纺单独量及 T2T 去向"],
      ["区域全链", "浙江九仓“虎哥回收”", "覆盖居民 24.5 万户；综合回收物资源化利用率超 95%（2019）", "整体生活垃圾 / 可回收物口径，不能替代废纺回收率"],
      ["品牌门店", "H&M / Looper Textile", "2013 年以来全球累计收集逾 17.2 万吨；最新分类结果中 T2T 约 2%", "全球数据，不代表中国单独回收量；大部分仍为转售或再利用"],
      ["品牌门店", "RE.UNIQLO", "2025 财年全球收集约 950 万件；开展羽绒再生与高涤服装分子循环示例", "集团全球口径且以再使用 / 捐赠为主，不能折算中国 T2T 吨位"],
      ["区域全链", "格瑞哲", "企业披露年处理纺织品能力 20 万吨级", "企业自述，需核验质量平衡和 T2T 占比"],
      ["分选运营", "瑞天再生资源", "成分 + 颜色识别；纯织物识别 100%、混纺误差 ≤2%、1.5 秒/件", "识别性能不等于全线回收率"],
      ["智能装备", "弓叶 / DataBeyond", "2025 年张家港线运行；约 2 吨/小时、单件 <1 秒", "装备和示范线证据较强，后端仍依材料纯度分流"],
      ["国际分选装备", "陶朗 / TOMRA", "AUTOSORT 采用 NIR、VIS 与金属检测；纺织应用最高 4.5 吨/小时", "供应商上限 / 方案参数，实际吞吐与纯度须按产线验收"],
      ["国际分选装备", "Valvan / Fibersort", "NIR 识别纤维组成、RGB 识别颜色；最高约 1 件/秒、1.08 吨/小时", "参数基于特定单件重量与效率假设，需本地原料验证"],
      ["国际分选装备", "PICVISA / ECOSORT TEXTIL", "按成分、颜色或织物形态分选；标准皮带宽 1000 毫米", "未披露中国商业线吨位，属于装备能力对标"],
      ["装备方案", "广东隽诺 / GENOX", "提供破碎、金属分离、除尘与纤维开松方案", "供应商方案参数需以实际进料测试和验收数据为准"],
      ["装备方案", "嘉诺 / JONO", "提供上料、识别、分选与预处理整线方案", "整线供货能力不等于后端纺织级再生产出"],
    ],
    note: "吨位、户数、件数与识别速度属于不同量纲，不作直接规模排名。",
    references: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
  },
  {
    id: "routes",
    number: "TABLE 04",
    short: "技术路线",
    title: "中国 T2T 主要技术路线与成熟度",
    columns: ["路线", "优先原料", "主要产物", "成熟度上限*", "规模化关键"],
    rows: [
      ["PET 化学解聚", "高 PET 含量、可预处理废纺", "DMT / BHET / PTA / 再生 PET", "T4", "颜色 / 助剂去除、连续纯化、可纺质量"],
      ["PET 酶促解聚", "PET 或可选择处理的混纺", "rPTA / rMEG", "T3", "预处理、酶成本、反应速率、连续线稳定性"],
      ["PA6 解聚—再聚合", "纯 PA6、渔网、工业丝及部分 PA6 / 氨纶混纺", "己内酰胺 / PA6 切片", "T5", "PA6 / PA66 / PET 分选、氨纶去除与进料稳定"],
      ["氨纶及含氨混纺", "消费前氨纶废料；涤氨 / 锦氨", "再生氨纶或分离后的聚合物 / 纤维", "T4", "区分消费前再生与消费后混纺闭环"],
      ["废棉机械再生", "纯棉 / 高棉含量、颜色明确", "开松纤维 / 再生纱", "T4", "纤维长度、强力、粉尘、用途匹配"],
      ["纤维素溶解—再生", "高纤维素含量废纺", "浆粕 / 粘胶 / 莱赛尔", "T4", "聚酯 / 弹性体去除、溶剂闭路与浆粕质量"],
      ["混纺选择性分离", "涤棉、涤氨及其他复杂混纺", "分离纤维或单体", "T4", "选择性、辅料干扰、双组分同步消纳"],
    ],
    note: "*截至 2026 年 8 月代表项目达到的最高等级，不代表同一企业的全部技术或所有原料条件。",
    references: [44, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 58, 59, 60, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83],
  },
];

const tableEnglish: Record<string, { short: string; title: string; columns: string[]; rows: string[][]; note: string }> = {
  materials: {
    short: "Material supply",
    title: "China's Major Textile-Material Output and T2T Priorities",
    columns: ["Material", "2025 / latest output", "Supply characteristics", "T2T priority"],
    rows: [
      ["Polyester / PET", "64.77 Mt", "Filament accounts for 79.2%; leading producers are concentrated", "Standardize post-consumer feedstock and connect it to existing polymerization–spinning systems"],
      ["Nylon", "4.72 Mt", "Complex PA6 / PA66 and consumer / industrial boundaries", "High-purity sorting and scale-up of PA6 chemical recycling"],
      ["Spandex", "1.10 Mt", "Low blend share but strong process-disrupting effect", "Separate post-consumer spandex-containing blends"],
      ["Cotton", "6.641 Mt", "Highly concentrated in Xinjiang; agricultural statistics", "Retain strength in mechanical opening and improve value retention"],
      ["Wool", "0.3645 Mt (sheep wool, 2024)", "High value and small scale", "Fine sorting and respinning applications"],
    ],
    note: "Material production does not equal the amount of waste available for T2T recycling.",
  },
  blends: {
    short: "Blended waste",
    title: "Data Availability and Recycling Status of Four Blended Textile-Waste Streams in China",
    columns: ["Waste stream", "National disaggregated tonnage", "Verifiable project / company", "Current assessment"],
    rows: [
      ["Polyester–cotton", "Not publicly available", "Amino phase I, 12,000 t/y under construction; Tongji demonstration; Yuangtian R&D", "Demonstration / construction stage; no national commercial closed-loop volume"],
      ["Polyester–nylon", "Not publicly available", "Re-Tex / DataBeyond front-end sorting; mono-material PET and PA6 routes", "High-purity diversion is feasible; dedicated blend-route evidence is limited"],
      ["Polyester–spandex", "Not publicly available", "Amino phase I; Huafon / Hyosung pre-consumer recycled spandex", "Post-consumer routes remain at engineering scale-up"],
      ["Nylon–spandex", "Not publicly available", "Nylon recyclers plus pre-consumer spandex routes", "No verifiable post-consumer commercial closed loop"],
    ],
    note: "‘Not publicly available’ means no authoritative national breakdown was found; it does not mean zero volume.",
  },
  "front-end": {
    short: "Front-end actors",
    title: "Public Data for Collection, Sorting, and Equipment Providers in China",
    columns: ["Category", "Company / platform", "Public capacity or quantitative evidence", "Evidence boundary"],
    rows: [
      ["Online collection", "Feimayi", "Old clothing, bedding, shoes, and bags; company reports service in more than 300 cities", "Solves access and logistics; downstream destinations require contractual and traceability verification"],
      ["Online / retail", "Baijingyu", "Launched in 2015; pilots with Intime stores; collected items diverted to recycling, donation, or export", "A collection touchpoint, not T2T processing volume"],
      ["General collection", "Aihuishou / ATRenew", "Core business remains electronics; 2025 apparel collection activity disclosed no textile T2T volume", "Consumer touchpoint only; not classified as a dedicated textile closed-loop operator"],
      ["Community pickup", "Beijing Aifenlei Environment", "10 communities, 27 residential compounds, and 14,321 households in Fangshan (2022)", "General recyclables system; separate textile volume and T2T destination not disclosed"],
      ["Regional integrated chain", "Zhejiang Jiucang / Tiger Recycling", "245,000 households covered; more than 95% resource utilization for collected recyclables (2019)", "Municipal waste / recyclables basis; cannot substitute for a textile recovery rate"],
      ["Brand stores", "H&M / Looper Textile", "More than 172,000 t collected globally since 2013; about 2% classified as T2T in the latest breakdown", "Global data, not China-only volume; most material is still resold or reused"],
      ["Brand stores", "RE.UNIQLO", "About 9.5 million items collected globally in FY2025; down and polyester examples reported", "Group-level global scope dominated by reuse / donation; cannot be converted into China T2T tonnage"],
      ["Regional integrated chain", "Greenter", "Company reports textile-processing capacity at roughly 200,000 t/y", "Self-reported; mass balance and T2T share require verification"],
      ["Sorting operator", "Re-Tex", "Composition and color recognition; 100% for pure fabrics, blend error ≤2%, 1.5 s/item", "Recognition performance is not the same as total-line recovery yield"],
      ["Intelligent equipment", "DataBeyond", "Zhangjiagang line operating in 2025; about 2 t/h and less than 1 s/item", "Strong equipment and demonstration evidence; downstream diversion still depends on material purity"],
      ["International sorting equipment", "TOMRA", "AUTOSORT combines NIR, VIS, and metal detection; textile applications up to 4.5 t/h", "Supplier ceiling / design parameter; actual throughput and purity require line acceptance tests"],
      ["International sorting equipment", "Valvan / Fibersort", "NIR for fiber composition and RGB for color; up to about 1 item/s and 1.08 t/h", "Based on assumptions for item weight and efficiency; local-feedstock validation is required"],
      ["International sorting equipment", "PICVISA / ECOSORT TEXTIL", "Sorting by composition, color, or fabric form; standard belt width 1,000 mm", "No China commercial tonnage disclosed; used as an equipment benchmark"],
      ["Equipment solution", "GENOX", "Shredding, metal separation, dust removal, and fiber-opening solutions", "Supplier specifications require feedstock trials and acceptance data"],
      ["Equipment solution", "JONO", "Integrated feeding, identification, sorting, and pretreatment lines", "Turnkey supply capability does not equal textile-grade recycled output"],
    ],
    note: "Tonnage, households, item counts, and recognition speed use different units and are not ranked directly.",
  },
  routes: {
    short: "Technology routes",
    title: "Major T2T Technology Routes and Maturity in China",
    columns: ["Route", "Priority feedstock", "Main output", "Maximum maturity*", "Scale-up requirement"],
    rows: [
      ["PET chemical depolymerization", "High-PET textile waste suitable for pretreatment", "DMT / BHET / PTA / recycled PET", "T4", "Color and additive removal, continuous purification, and spinnable quality"],
      ["Enzymatic PET depolymerization", "PET or selectively treatable blends", "rPTA / rMEG", "T3", "Pretreatment, enzyme cost, reaction rate, and continuous-line stability"],
      ["PA6 depolymerization–repolymerization", "Pure PA6, fishing nets, industrial yarns, and some PA6 / spandex blends", "Caprolactam / PA6 chips", "T5", "PA6 / PA66 / PET sorting, spandex removal, and feedstock stability"],
      ["Spandex and spandex-containing blends", "Pre-consumer spandex waste; polyester–spandex / nylon–spandex", "Recycled spandex or separated polymer / fiber", "T4", "Distinguish pre-consumer recycling from post-consumer blend closure"],
      ["Mechanical cotton recycling", "Pure or high-cotton, color-defined streams", "Opened fiber / recycled yarn", "T4", "Fiber length, strength, dust, and end-use matching"],
      ["Cellulosic dissolution–regeneration", "High-cellulose textile waste", "Pulp / viscose / lyocell", "T4", "Polyester / elastomer removal, closed-loop solvents, and pulp quality"],
      ["Selective blend separation", "Polyester–cotton, polyester–spandex, and other complex blends", "Separated fibers or monomers", "T4", "Selectivity, trim interference, and synchronized use of both components"],
    ],
    note: "*Highest level reached by representative projects as of August 2026; it does not describe every technology, feedstock, or activity of the same company.",
  },
};

export default function EvidenceTables() {
  const { language, pick } = useLanguage();
  const [activeId, setActiveId] = useState("materials");
  const table = tables.find((item) => item.id === activeId) ?? tables[0];
  const english = tableEnglish[table.id];

  return (
    <section className="evidence-library section-shell" id="evidence-tables">
      <div className="evidence-library-head">
        <div>
          <p className="eyebrow">{pick("03 · 核心证据表", "03 · CORE EVIDENCE MATRIX")}</p>
          <h2>{pick("中国 T2T 核心数据与证据", "Core Data and Evidence for T2T in China")}</h2>
        </div>
        <div className="corpus-counts" aria-label={pick("文档内容统计", "Document content summary")}>
          <div><strong>04</strong><span>{pick("数据表", "DATA TABLES")}</span></div>
          <div><strong>24</strong><span>{pick("静态图", "STATIC FIGURES")}</span></div>
          <div><strong>94</strong><span>{pick("参考文献", "REFERENCES")}</span></div>
        </div>
      </div>

      <div className="table-tabs" role="tablist" aria-label={pick("选择论文数据表", "Select a paper data table")}>
        {tables.map((item) => (
          <button key={item.id} role="tab" aria-selected={activeId === item.id} className={activeId === item.id ? "active" : ""} onClick={() => setActiveId(item.id)}>
            <span>{language === "zh" ? item.number.replace("TABLE", "表") : item.number}</span><strong>{language === "zh" ? item.short : tableEnglish[item.id].short}</strong>
          </button>
        ))}
      </div>

      <div className="evidence-table-shell">
        <div className="evidence-table-title"><span>{language === "zh" ? table.number.replace("TABLE", "表") : table.number}</span><h3>{language === "zh" ? table.title : english.title}</h3><small>{table.rows.length} {pick("条记录", "RECORDS")}</small></div>
        <div className="evidence-table-scroll">
          <table>
            <thead><tr>{(language === "zh" ? table.columns : english.columns).map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>{(language === "zh" ? table.rows : english.rows).map((row, rowIndex) => <tr key={`${table.id}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <CitationLinks ids={table.references} />
        <div className="table-boundary"><span>{pick("证据边界", "EVIDENCE BOUNDARY")}</span><p>{language === "zh" ? table.note : english.note}</p></div>
      </div>
    </section>
  );
}
