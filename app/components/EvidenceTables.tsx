"use client";

import { useState } from "react";

type EvidenceTable = {
  id: string;
  number: string;
  short: string;
  title: string;
  columns: string[];
  rows: string[][];
  note: string;
};

const tables: EvidenceTable[] = [
  {
    id: "materials",
    number: "TABLE 01",
    short: "材料供给",
    title: "中国主要纺织材料供给规模及 T2T 优先问题",
    columns: ["材料", "2025 / 最新产量", "供给特征", "T2T 优先问题"],
    rows: [
      ["涤纶 / PET", "6477 万吨", "长丝占 79.2%，头部企业集中", "建立消费后进料规范并接入现有聚合—纺丝体系"],
      ["锦纶", "472 万吨", "PA6 / PA66、民用 / 工业边界复杂", "高纯分选与 PA6 化学回收放大"],
      ["氨纶", "110 万吨", "低比例混入、阻塞效应大", "消费后含氨混纺分离"],
      ["棉花", "664.1 万吨", "新疆高度集中；农业口径", "机械开松的强力保持与高值化"],
      ["羊毛", "36.45 万吨（绵羊毛，2024）", "高单价、小规模", "精细分选和再纺用途"],
    ],
    note: "材料生产规模不等于可用于 T2T 的废料量。",
  },
  {
    id: "blends",
    number: "TABLE 02",
    short: "混纺废物流",
    title: "四类重点混纺废物流公开数据与产业状态",
    columns: ["废物流", "全国分项吨数", "可核验项目 / 企业", "当前判断"],
    rows: [
      ["涤棉", "未公开", "Amino 一期 1.2 万吨/年在建；同济示范；源天研发", "示范 / 在建，尚无全国商业闭环量"],
      ["涤锦", "未公开", "瑞天 / DataBeyond 前端分选；PET 和 PA6 单材路线", "高纯分流可做，混纺专线证据不足"],
      ["涤氨", "未公开", "Amino 一期；华峰 / 晓星消费前再生氨纶", "消费后路线仍在工程放大"],
      ["锦氨", "未公开", "锦纶再生企业 + 氨纶消费前路线", "缺少可核验消费后商业闭环"],
    ],
    note: "“未公开”表示未发现全国权威分项统计，不表示数量为零。",
  },
  {
    id: "front-end",
    number: "TABLE 03",
    short: "前端企业",
    title: "前端回收、分选与装备企业公开能力",
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
  },
  {
    id: "routes",
    number: "TABLE 04",
    short: "技术路线",
    title: "主要 T2T 技术路线的原料、产物与技术成熟度",
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
  },
];

export default function EvidenceTables() {
  const [activeId, setActiveId] = useState("materials");
  const table = tables.find((item) => item.id === activeId) ?? tables[0];

  return (
    <section className="evidence-library section-shell" id="evidence-tables">
      <div className="evidence-library-head">
        <div>
          <p className="eyebrow">03 · STRUCTURED EVIDENCE REGISTRY</p>
          <h2>四张核心表，构成论文的数据骨架</h2>
        </div>
        <div className="corpus-counts" aria-label="文档内容统计">
          <div><strong>04</strong><span>DATA TABLES</span></div>
          <div><strong>32</strong><span>FIGURES</span></div>
          <div><strong>94</strong><span>REFERENCES</span></div>
        </div>
      </div>

      <div className="table-tabs" role="tablist" aria-label="选择论文数据表">
        {tables.map((item) => (
          <button key={item.id} role="tab" aria-selected={activeId === item.id} className={activeId === item.id ? "active" : ""} onClick={() => setActiveId(item.id)}>
            <span>{item.number}</span><strong>{item.short}</strong>
          </button>
        ))}
      </div>

      <div className="evidence-table-shell">
        <div className="evidence-table-title"><span>{table.number}</span><h3>{table.title}</h3><small>{table.rows.length} RECORDS</small></div>
        <div className="evidence-table-scroll">
          <table>
            <thead><tr>{table.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>{table.rows.map((row, rowIndex) => <tr key={`${table.id}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <div className="table-boundary"><span>EVIDENCE BOUNDARY</span><p>{table.note}</p></div>
      </div>
    </section>
  );
}
