"use client";

import CitationLinks from "./CitationLinks";
import { useLanguage } from "./LanguageContext";

const table = {
  number: "TABLE 03",
  title: "企业公开能力、量化证据与适用边界",
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
};

const tableEnglish = {
  title: "Public Capabilities, Quantitative Evidence, and Evidence Boundaries",
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
};

export default function EvidenceTables() {
  const { language, pick } = useLanguage();

  return (
    <section className="evidence-library section-shell" id="evidence-tables">
      <div className="evidence-library-head">
        <div>
          <p className="eyebrow">{pick("03 · 回收与分选企业", "03 · COLLECTION & SORTING ACTORS")}</p>
          <h2>{pick("中国废旧纺织品回收分选代表性企业", "Representative Waste-Textile Collection and Sorting Companies in China")}</h2>
        </div>
        <p className="evidence-library-summary">{pick("汇总 15 家回收平台、区域运营方、品牌回收项目、分选运营商与装备企业的公开能力，并明确各类数据的适用边界。", "Public evidence from 15 collection platforms, regional operators, brand programs, sorting operators, and equipment providers, with explicit boundaries for each type of disclosure.")}</p>
      </div>

      <div className="evidence-table-shell evidence-table-single">
        <div className="evidence-table-title"><span>{language === "zh" ? table.number.replace("TABLE", "表") : table.number}</span><h3>{language === "zh" ? table.title : tableEnglish.title}</h3><small>{table.rows.length} {pick("条记录", "RECORDS")}</small></div>
        <div className="evidence-table-scroll">
          <table>
            <thead><tr>{(language === "zh" ? table.columns : tableEnglish.columns).map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>{(language === "zh" ? table.rows : tableEnglish.rows).map((row, rowIndex) => <tr key={`front-end-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <CitationLinks ids={table.references} />
        <div className="table-boundary"><span>{pick("证据边界", "EVIDENCE BOUNDARY")}</span><p>{language === "zh" ? table.note : tableEnglish.note}</p></div>
      </div>
    </section>
  );
}
