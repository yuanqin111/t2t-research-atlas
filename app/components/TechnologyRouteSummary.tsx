"use client";

import CitationLinks from "./CitationLinks";
import { useLanguage } from "./LanguageContext";

const table = {
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
};

const tableEnglish = {
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
};

export default function TechnologyRouteSummary() {
  const { language, pick } = useLanguage();

  return (
    <div className="evidence-table-shell technology-route-summary">
      <div className="evidence-table-title">
        <span>{pick("表 4-1", "TABLE 4-1")}</span>
        <h3>{pick("中国 T2T 主要技术路线与成熟度", "Major T2T Technology Routes and Maturity in China")}</h3>
        <small>7 {pick("条记录", "RECORDS")}</small>
      </div>
      <div className="evidence-table-scroll">
        <table>
          <thead><tr>{(language === "zh" ? table.columns : tableEnglish.columns).map((column) => <th key={column}>{column}</th>)}</tr></thead>
          <tbody>{(language === "zh" ? table.rows : tableEnglish.rows).map((row, rowIndex) => <tr key={`route-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <CitationLinks ids={table.references} />
      <div className="table-boundary"><span>{pick("证据边界", "EVIDENCE BOUNDARY")}</span><p>{language === "zh" ? table.note : tableEnglish.note}</p></div>
    </div>
  );
}
