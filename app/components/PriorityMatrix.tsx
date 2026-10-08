"use client";

import { useLanguage } from "./LanguageContext";

const actions = [
  { zh: "回收追溯", en: "Recovery traceability", x: 22, y: 22, quadrant: "priority" },
  { zh: "标准化 PET 进料", en: "Standardized PET feedstock", x: 34, y: 34, quadrant: "priority" },
  { zh: "基础认证与公开", en: "Baseline certification & disclosure", x: 41, y: 44, quadrant: "priority" },
  { zh: "质量平衡", en: "Mass balance", x: 70, y: 18, quadrant: "strategic" },
  { zh: "混纺选择性分离", en: "Selective blend separation", x: 62, y: 27, quadrant: "strategic" },
  { zh: "全国协同网络", en: "National coordination network", x: 82, y: 35, quadrant: "strategic" },
  { zh: "长期承购", en: "Long-term offtake", x: 75, y: 46, quadrant: "strategic" },
  { zh: "智能分选", en: "Intelligent sorting", x: 32, y: 68, quadrant: "support" },
  { zh: "PET 扩产", en: "PET capacity expansion", x: 43, y: 78, quadrant: "support" },
  { zh: "酶法验证", en: "Enzymatic validation", x: 70, y: 66, quadrant: "pilot" },
  { zh: "PA6 规模化", en: "PA6 scale-up", x: 58, y: 73, quadrant: "pilot" },
] as const;

export default function PriorityMatrix() {
  const { language, pick } = useLanguage();

  return (
    <figure className="priority-matrix-figure">
      <div className="priority-matrix-head">
        <div>
          <span>{pick("图 5-2", "FIG. 5-2")}</span>
          <h4>{pick("中国 T2T 行动优先级矩阵", "Priority Matrix for T2T Actions in China")}</h4>
        </div>
        <p>{pick("纵轴表示预计产业影响，横轴表示实施难度；两项均为基于论文证据的相对判断。", "The vertical axis shows expected industry impact and the horizontal axis shows implementation difficulty; both are relative assessments based on the study evidence.")}</p>
      </div>

      <div className="priority-matrix-scroll">
        <div className="priority-matrix" role="img" aria-label={pick("中国 T2T 行动的产业影响与实施难度四象限图", "Four-quadrant matrix of industry impact and implementation difficulty for T2T actions in China")}>
          <div className="matrix-quadrant q-priority"><strong>{pick("Ⅰ 优先启动", "I · START FIRST")}</strong><span>{pick("高影响 · 较易实施", "High impact · Easier")}</span></div>
          <div className="matrix-quadrant q-strategic"><strong>{pick("Ⅱ 中长期攻坚", "II · STRATEGIC SCALE-UP")}</strong><span>{pick("高影响 · 较难实施", "High impact · Harder")}</span></div>
          <div className="matrix-quadrant q-support"><strong>{pick("Ⅲ 快速改善", "III · QUICK IMPROVEMENTS")}</strong><span>{pick("较低影响 · 较易实施", "Lower impact · Easier")}</span></div>
          <div className="matrix-quadrant q-pilot"><strong>{pick("Ⅳ 试点验证", "IV · PILOT & VALIDATE")}</strong><span>{pick("较低影响 · 较难实施", "Lower impact · Harder")}</span></div>

          <div className="matrix-axis-y"><b>{pick("产业影响", "INDUSTRY IMPACT")}</b><span>{pick("高", "HIGH")}</span><i /><span>{pick("低", "LOW")}</span></div>
          <div className="matrix-axis-x"><span>{pick("低", "LOW")}</span><i /><b>{pick("实施难度", "IMPLEMENTATION DIFFICULTY")}</b><i /><span>{pick("高", "HIGH")}</span></div>

          {actions.map((action, index) => {
            const label = language === "zh" ? action.zh : action.en;
            return (
              <div
                className={`priority-point point-${action.quadrant}${action.x >= 75 ? " label-left" : ""}`}
                key={action.zh}
                style={{ left: `${action.x}%`, top: `${action.y}%` }}
                title={label}
                aria-label={`${label}; ${pick("相对位置", "relative position")}: ${action.x}, ${100 - action.y}`}
              >
                <i>{String(index + 1).padStart(2, "0")}</i><strong>{label}</strong>
              </div>
            );
          })}
        </div>
      </div>

      <figcaption>
        <div className="priority-legend">
          <span className="legend-priority">{pick("优先启动", "Start first")}</span>
          <span className="legend-strategic">{pick("中长期攻坚", "Strategic scale-up")}</span>
          <span className="legend-support">{pick("快速改善", "Quick improvements")}</span>
          <span className="legend-pilot">{pick("试点验证", "Pilot & validate")}</span>
        </div>
        <p>{pick("象限位置用于行动排序，不代表统一量纲下的实测分数。", "Quadrant positions support action prioritization and are not measured scores on a common scale.")}</p>
      </figcaption>
    </figure>
  );
}
