"use client";

import { useState } from "react";
import ChapterDirectory from "./components/ChapterDirectory";
import DataExplorer from "./components/DataExplorer";
import EvidenceTables from "./components/EvidenceTables";
import PaperFigureAtlas from "./components/PaperFigureAtlas";
import ReferencesSection from "./components/ReferencesSection";
import { LanguageProvider, LanguageSwitch, useLanguage } from "./components/LanguageContext";

const technologyRoutes = [
  {
    id: "pet-chem",
    name: "PET 化学解聚",
    nameEn: "PET chemical depolymerization",
    short: "PET-C",
    evidence: "T4",
    values: [3, 2, 1, 3, 3, 3],
    focus: "稳定进料、脱色除杂与连续化装置协同，是从示范走向规模复制的关键。",
    focusEn: "Stable feedstock, decolorization, contaminant removal, and continuous processing are the keys to scaling from demonstration to replication.",
    cases: ["浙江佳人 · T4", "JEPLAN · T4", "Ambercycle · T3", "Reju · T3", "Syre · T3", "恒逸研发 · T2"],
    casesEn: ["Zhejiang Jiaren · T4", "JEPLAN · T4", "Ambercycle · T3", "Reju · T3", "Syre · T3", "Hengyi R&D · T2"],
  },
  {
    id: "pet-enzyme",
    name: "PET 酶法回收",
    nameEn: "Enzymatic PET recycling",
    short: "PET-E",
    evidence: "T2–T3",
    values: [3, 2, 2, 2, 3, 3],
    focus: "技术潜力突出，但现有公开证据仍以百吨级运行线和万吨级在建项目为主。",
    focusEn: "The route has strong potential, but public evidence is still dominated by hundred-ton operating lines and ten-thousand-ton projects under construction.",
    cases: ["Carbios · T3", "Samsara Eco · T3", "Protein Evolution · T2", "源天生物 · T2", "江苏佩浦 · T2"],
    casesEn: ["Carbios · T3", "Samsara Eco · T3", "Protein Evolution · T2", "Yuantian Bio · T2", "Jiangsu Peipu · T2"],
  },
  {
    id: "pa6-depoly",
    name: "PA6 解聚回收",
    nameEn: "PA6 depolymerization",
    short: "PA6",
    evidence: "T3–T5",
    values: [3, 2, 1, 2, 3, 3],
    focus: "来源稳定的单一材质场景具备近期规模化条件；消费后原料占比的提升取决于分选精度和进料稳定性。",
    focusEn: "Stable mono-material streams offer near-term scaling conditions; higher post-consumer content depends on sorting accuracy and feedstock consistency.",
    cases: ["Aquafil ECONYL · T5", "BASF loopamid · T4", "台华化学回收尼龙 · T4", "Toray Nylon 6 · T4", "恒申 7000 吨项目 · T3"],
    casesEn: ["Aquafil ECONYL · T5", "BASF loopamid · T4", "Taihua chemically recycled nylon · T4", "Toray Nylon 6 · T4", "Highsun 7,000 t project · T3"],
  },
  {
    id: "cotton-mech",
    name: "废棉机械再生",
    nameEn: "Mechanical cotton recycling",
    short: "C-M",
    evidence: "T3–T4",
    values: [2, 1, 1, 3, 2, 2],
    focus: "成熟度高、导入快，但需要通过混配和纺纱优化缓解纤维长度损失。",
    focusEn: "The route is mature and quick to deploy, but blending and spinning optimization are needed to mitigate fiber-length loss.",
    cases: ["苍南再生棉产业集群 · T4", "科力嘉再生棉系列 · T3"],
    casesEn: ["Cangnan recycled-cotton cluster · T4", "Kelijia recycled-cotton series · T3"],
  },
  {
    id: "cellulose",
    name: "纤维素溶解再生",
    nameEn: "Cellulosic dissolution and regeneration",
    short: "CEL",
    evidence: "T3–T4",
    values: [3, 3, 1, 2, 2, 3],
    focus: "高值化潜力突出，前处理纯化与溶剂体系决定产品稳定性和经济性。",
    focusEn: "High-value potential is strong; pretreatment purity and solvent systems determine product stability and economics.",
    cases: ["赛得利 FINEX · T4", "唐山三友 · T4", "Circulose · T4", "Infinited Fiber · T3"],
    casesEn: ["Sateri FINEX · T4", "Tangshan Sanyou · T4", "Circulose · T4", "Infinited Fiber · T3"],
  },
  {
    id: "blend",
    name: "混纺分离与再生",
    nameEn: "Blend separation and recycling",
    short: "BLD",
    evidence: "T3–T4",
    values: [3, 3, 3, 1, 3, 3],
    focus: "长期价值最高、系统难度最大，应以可追溯原料和定向示范项目积累证据。",
    focusEn: "This route offers the highest long-term value and the greatest system complexity; evidence should be built through traceable feedstock and targeted demonstrations.",
    cases: ["Circ 涤棉双组分 · T4", "PurFi d’Lastane · T4", "HKRITA Green Machine · T3", "Worn Again · T3", "Amino · T3", "同济棉涤示范 · T3"],
    casesEn: ["Circ polyester–cotton dual stream · T4", "PurFi d’Lastane · T4", "HKRITA Green Machine · T3", "Worn Again · T3", "Amino · T3", "Tongji cotton–polyester demonstration · T3"],
  },
] as const;

const matrixLabels = [
  ["原料纯度要求", "Feedstock purity"],
  ["预处理强度", "Pretreatment intensity"],
  ["混纺适应性", "Blend compatibility"],
  ["商业成熟度", "Commercial maturity"],
  ["产品价值潜力", "Product-value potential"],
  ["闭环潜力", "Closed-loop potential"],
] as const;

export default function Home() {
  return <LanguageProvider><HomeContent /></LanguageProvider>;
}

function HomeContent() {
  const { language, pick } = useLanguage();
  const [matrixView, setMatrixView] = useState<"heat" | "bubble">("heat");
  const [selectedTech, setSelectedTech] = useState("pet-chem");
  const technology = technologyRoutes.find((item) => item.id === selectedTech) ?? technologyRoutes[0];

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label={pick("返回首页", "Back to home")}>
          <span className="brand-mark">T2T</span>
          <span>{pick("中国纺织品循环利用（T2T）研究图谱", "China Textile-to-Textile Circularity Research Atlas")}</span>
        </a>
        <nav aria-label={pick("页面导航", "Page navigation")}>
          <a href="#data-lab">{pick("趋势与企业", "Trends & companies")}</a>
          <a href="#evidence-tables">{pick("核心数据表", "Core tables")}</a>
          <a href="#figure-atlas">{pick("技术成熟度与路线", "Technology maturity & routes")}</a>
          <a href="#technology">{pick("技术路线对比", "Route comparison")}</a>
          <a href="#roadmap">{pick("产业发展路线", "Industry roadmap")}</a>
          <a href="#references">{pick("数据来源", "Sources")}</a>
          <span className="status-dot">{pick("V3 · 2026年8月", "V3 · AUG 2026")}</span>
          <LanguageSwitch />
        </nav>
      </header>

      <ChapterDirectory />

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{pick("中国纺织品—纺织品循环利用研究图谱", "CHINA TEXTILE-TO-TEXTILE CIRCULARITY · RESEARCH ATLAS")}</p>
          <h1 className="hero-title-long">{language === "zh" ? <>中国纺织品循环利用<br />（T2T）研究图谱</> : <>China Textile-to-Textile<br />Circularity Research Atlas</>}</h1>
          <div className="hero-actions">
            <a className="primary-btn" href="#data-lab">{pick("进入研究图谱", "Explore the atlas")} <span>↘</span></a>
            <p>{pick("证据范围 · 2013—2026", "EVIDENCE BASE · 2013—2026")}</p>
          </div>
          <div className="hero-corpus"><span><strong>15</strong> {pick("张图", "FIGURES")}</span><span><strong>04</strong> {pick("张表", "TABLES")}</span><span><strong>94</strong> {pick("条参考文献", "REFERENCES")}</span></div>
        </div>
        <div className="hero-visual" aria-label={pick("2025年中国化学纤维产量7793万吨数据图形", "China chemical-fiber output in 2025: 77.93 million tonnes")}>
          <div className="orb orb-main">
            <span className="orb-kicker">{pick("中国化学纤维产量", "CHINA CHEMICAL-FIBER OUTPUT")}</span>
            <strong>7,793</strong>
            <span>{pick("万吨 · 2025", "10,000 t · 2025")}</span>
          </div>
          <div className="orb orb-small orb-a"><strong>83.1%</strong><span>{pick("中国涤纶占化纤比重", "Polyester share of China's chemical fibers")}</span></div>
          <div className="orb orb-small orb-b"><strong>515</strong><span>{pick("万吨 · 中国废纺回收业务量", "10,000 t · recovered textile volume")}</span></div>
          <div className="orbit-line orbit-one" />
          <div className="orbit-line orbit-two" />
        </div>
      </section>

      <section className="overview section-shell" id="overview">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{pick("01 · 材料供给范围", "01 · MATERIAL SUPPLY BOUNDARY")}</p>
            <h2>{pick("中国主要纺织材料产量与回收规模", "China's Textile-Material Output and Recovery Scale")}</h2>
          </div>
          <p>{pick("以年度公开统计刻画物质基础，并将总量、结构与回收规模置于同一证据框架中审视。", "Annual public statistics define the material base and place output, composition, and recovery scale within a single evidence framework.")}</p>
        </div>
        <div className="metric-grid">
          <article className="metric-card metric-dark">
            <p>{pick("中国主要化纤生产规模", "China's major chemical-fiber output")}</p>
            <div><strong>7,793</strong><span>{pick("万吨", "10,000 t")}</span></div>
            <small>{pick("2025 · 全国产量", "2025 · NATIONAL OUTPUT")}</small>
          </article>
          <article className="metric-card metric-teal">
            <p>{pick("中国 PET / 涤纶生产规模", "China PET / polyester output")}</p>
            <div><strong>6,477</strong><span>{pick("万吨", "10,000 t")}</span></div>
            <small>{pick("主导材料 · 83.1%", "DOMINANT MATERIAL · 83.1%")}</small>
          </article>
          <article className="metric-card metric-sand">
            <p>{pick("中国棉花生产规模", "China cotton output")}</p>
            <div><strong>664.1</strong><span>{pick("万吨", "10,000 t")}</span></div>
            <small>{pick("2025 · 天然纤维", "2025 · NATURAL FIBER")}</small>
          </article>
          <article className="metric-card metric-paper">
            <p>{pick("中国废纺回收业务量", "China recovered textile volume")}</p>
            <div><strong>≈515</strong><span>{pick("万吨", "10,000 t")}</span></div>
            <small>{pick("2024 · 回收业务量", "2024 · RECOVERY VOLUME")}</small>
          </article>
        </div>
        <div className="supply-structure">
          <div className="structure-copy">
            <p className="eyebrow">{pick("材料占比与处理复杂度", "MATERIAL DOMINANCE & COMPLEXITY")}</p>
            <h3>{pick("中国主要化学纤维产量结构", "Composition of China's Major Chemical-Fiber Output")}</h3>
            <p>{pick("2025 年涤纶约占主要化学纤维产量的 83.1%，构成规模化闭环的首要物质基础；锦纶、氨纶及多组分混纺占比虽低，却显著抬升识别、分离与产品纯化的系统复杂度。", "Polyester accounted for about 83.1% of China's major chemical-fiber output in 2025, making it the primary material base for scaled closed loops. Nylon, spandex, and multicomponent blends have smaller shares but greatly increase the complexity of identification, separation, and purification.")}</p>
          </div>
          <div className="composition-chart" aria-label="涤纶占主要化学纤维产量83.1%">
            <div className="composition-bar">
              <div className="segment pet-segment"><strong>83.1%</strong><span>{pick("PET / 涤纶", "PET / polyester")}</span></div>
              <div className="segment other-segment"><strong>16.9%</strong><span>{pick("其他化纤", "Other chemical fibers")}</span></div>
            </div>
            <div className="composition-foot">
              <span>{pick("总量 7,793 万吨", "Total 77.93 Mt")}</span>
              <span>{pick("涤纶 6,477 万吨", "Polyester 64.77 Mt")}</span>
            </div>
          </div>
        </div>
      </section>

      <DataExplorer />

      <EvidenceTables />

      <PaperFigureAtlas />

      <section className="technology" id="technology">
        <div className="section-shell">
          <div className="technology-heading">
            <div>
              <p className="eyebrow">{pick("4.5 · 技术路线综合比较", "4.5 · EVIDENCE-BASED TECHNOLOGY LANDSCAPE")}</p>
              <h2>{pick("中国 T2T 主要技术路线比较", "Comparison of Major T2T Technology Routes in China")}</h2>
              <p className="section-deck inverted">{pick("从成熟度、原料适应性、产品价值潜力、规模化潜力和分选依赖度等维度进行比较。", "Routes are compared by maturity, feedstock compatibility, product-value potential, scalability, and dependence on sorting.")}</p>
            </div>
            <div className="view-toggle" aria-label="切换技术路线图表">
              <button className={matrixView === "heat" ? "active" : ""} onClick={() => setMatrixView("heat")}>{pick("多维属性矩阵", "Attribute matrix")}</button>
              <button className={matrixView === "bubble" ? "active" : ""} onClick={() => setMatrixView("bubble")}>{pick("成熟度—复杂度图", "Maturity–complexity map")}</button>
            </div>
          </div>

          <div className="technology-board">
            <div className="tech-selector" role="tablist" aria-label={pick("选择技术路线", "Select a technology route")}>
              {technologyRoutes.map((route, index) => (
                <button
                  key={route.id}
                  role="tab"
                  aria-selected={selectedTech === route.id}
                  className={selectedTech === route.id ? "active" : ""}
                  onClick={() => setSelectedTech(route.id)}
                >
                  <span>0{index + 1}</span>
                  <strong>{language === "zh" ? route.name : route.nameEn}</strong>
                  <small>{route.evidence}</small>
                </button>
              ))}
            </div>

            <div className="chart-area">
              {matrixView === "heat" ? (
                <div className="heatmap-wrap">
                  <div className="heatmap" role="img" aria-label={pick("主要 T2T 技术路线多维属性比较热力图", "Heatmap comparing major T2T technology routes")}>
                    <div className="heat-spacer" />
                    {matrixLabels.map((label) => <div className="heat-label" key={label[0]}>{language === "zh" ? label[0] : label[1]}</div>)}
                    {technologyRoutes.map((route) => (
                      <div className={`heat-row ${selectedTech === route.id ? "selected" : ""}`} key={route.id} onClick={() => setSelectedTech(route.id)}>
                        <div className="heat-name"><strong>{language === "zh" ? route.name : route.nameEn}</strong><span>{route.evidence}</span></div>
                        {route.values.map((value, index) => (
                          <div className={`heat-cell score-${value}`} key={`${route.id}-${index}`} title={`${language === "zh" ? matrixLabels[index][0] : matrixLabels[index][1]}: ${value}/5`}>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="heat-legend"><span>{pick("相对等级", "Relative level")}</span><i className="score-1" /><i className="score-2" /><i className="score-3" /><span>{pick("低 → 高", "Low → High")}</span></div>
                </div>
              ) : (
                <div className="bubble-chart" role="img" aria-label={pick("技术成熟度、原料复杂度与潜在规模气泡图", "Bubble chart of maturity, feedstock complexity, and potential scale")}>
                  <div className="axis-y"><span>{pick("成熟度高", "High maturity")}</span><span>{pick("成熟度低", "Low maturity")}</span></div>
                  <div className="bubble-grid">
                    {technologyRoutes.map((route, index) => (
                      <button
                        key={route.id}
                        className={`tech-bubble bubble-${index + 1} ${selectedTech === route.id ? "selected" : ""}`}
                        onClick={() => setSelectedTech(route.id)}
                        aria-label={`${language === "zh" ? route.name : route.nameEn}, ${pick("证据成熟度", "evidence maturity ")}${route.evidence}`}
                      >
                        <strong>{route.short}</strong><span>{route.evidence}</span>
                      </button>
                    ))}
                  </div>
                  <div className="axis-x"><span>{pick("原料复杂度低", "Low feedstock complexity")}</span><span>{pick("原料复杂度高", "High feedstock complexity")}</span></div>
                </div>
              )}
            </div>

            <aside className="tech-insight" aria-live="polite">
              <p>{pick("当前选择的技术路线", "SELECTED EVIDENCE PATHWAY")}</p>
              <h3>{language === "zh" ? technology.name : technology.nameEn}</h3>
              <div><span>{pick("公开证据等级", "Public evidence level")}</span><strong>{technology.evidence}</strong></div>
              <p>{language === "zh" ? technology.focus : technology.focusEn}</p>
              <ul className="case-list">
                {(language === "zh" ? technology.cases : technology.casesEn).map((item) => <li key={item}>{item}</li>)}
              </ul>
              <small>{pick("矩阵中的低—中—高为基于论文证据的定性归纳，用于路线间相对比较，不代表统一量纲下的实测值。", "Low, medium, and high are qualitative syntheses of the paper evidence for relative comparison; they are not measurements on a common quantitative scale.")}</small>
            </aside>
          </div>
        </div>
      </section>

      <section className="roadmap section-shell" id="roadmap">
        <div className="roadmap-heading">
          <p className="eyebrow">{pick("05 · 产业发展路线 2026—2030", "05 · INDUSTRIAL TRANSITION 2026—2030")}</p>
          <h2>{pick("中国 T2T 产业发展路线（2026—2030）", "China T2T Industry Roadmap, 2026–2030")}</h2>
          <p>{pick("发展路线遵循“证据基础—单一材料放大—复杂原料突破”的顺序，使技术扩张与原料质量、产品性能和商业运行证据保持同步。", "The roadmap follows a sequence of evidence foundations, mono-material scaling, and complex-feedstock breakthroughs, aligning technology expansion with feedstock quality, product performance, and commercial evidence.")}</p>
        </div>
        <div className="roadmap-story">
          <article className="roadmap-story-block">
            <header className="roadmap-story-head">
              <div>
                <span>{pick("阶段路线", "PHASED ROADMAP")}</span>
                <h3>{pick("从基础能力建设到全国协同网络", "From Foundational Capacity to a Coordinated National Network")}</h3>
              </div>
              <p>{pick("图 5-1 给出 2026—2030 年的总体推进顺序，下方按近期、中期和远期拆解各阶段的主要任务。", "Figure 5-1 sets out the overall sequence for 2026–2030. The three phases below translate it into a practical task agenda.")}</p>
            </header>
            <a className="roadmap-paper-figure" href={language === "en" ? "paper-figures/fig-5-1-en.png" : "paper-figures/fig-5-1.png"} target="_blank" rel="noreferrer">
              <img src={language === "en" ? "paper-figures/fig-5-1-en.png" : "paper-figures/fig-5-1.png"} alt={pick("2026—2030 年中国 T2T 产业推进建议", "Recommended roadmap for China's T2T industry, 2026–2030")} loading="lazy" decoding="async" />
              <div><span>{pick("图 5-1", "FIG. 5-1")}</span><strong>{pick("2026—2030 年中国 T2T 产业推进建议", "Recommended Roadmap for China's T2T Industry, 2026–2030")}</strong><i>↗</i></div>
            </a>
            <div className="timeline">
              <article>
                <div className="year">2026–27</div>
                <span className="phase-dot" />
                <p>{pick("近期 · 基础能力", "Near term · Foundations")}</p>
                <h3>{pick("追溯、智能分选与 PET 闭环扩产", "Traceability, intelligent sorting, and PET closed-loop expansion")}</h3>
                <ul><li>{pick("完善回收来源与批次追溯", "Improve source and batch traceability")}</li><li>{pick("扩大成分识别和智能分选", "Expand composition identification and intelligent sorting")}</li><li>{pick("同步建立数据、认证与 PET 进料规范", "Establish data, certification, and PET feedstock standards")}</li></ul>
              </article>
              <article>
                <div className="year">2028–29</div>
                <span className="phase-dot" />
                <p>{pick("中期 · 工程放大", "Mid term · Engineering scale-up")}</p>
                <h3>{pick("混纺、PA6 与酶法的连续运行验证", "Continuous-operation validation for blends, PA6, and enzymatic routes")}</h3>
                <ul><li>{pick("建设混纺选择性分离示范", "Build selective blend-separation demonstrations")}</li><li>{pick("推进 PA6 闭环规模化", "Scale PA6 closed loops")}</li><li>{pick("验证酶法稳定性与质量平衡", "Validate enzymatic stability and mass balance")}</li></ul>
              </article>
              <article>
                <div className="year">2030</div>
                <span className="phase-dot" />
                <p>{pick("远期 · 系统协同", "Long term · System coordination")}</p>
                <h3>{pick("全国网络、统一认证与长期承购", "National networks, harmonized certification, and long-term offtake")}</h3>
                <ul><li>{pick("形成跨区域回收—分选—再生网络", "Build cross-regional collection–sorting–recycling networks")}</li><li>{pick("统一再生含量与质量认证标准", "Harmonize recycled-content and quality certification")}</li><li>{pick("提高具有真实去向的 T2T 份额", "Increase T2T volumes with verified end uses")}</li></ul>
              </article>
            </div>
          </article>
          <article className="roadmap-story-block">
            <header className="roadmap-story-head">
              <div>
                <span>{pick("行动排序", "ACTION PRIORITIES")}</span>
                <h3>{pick("优先推进高影响、可落地的基础任务", "Prioritize High-Impact, Actionable Foundations")}</h3>
              </div>
              <p>{pick("图 5-2 综合比较产业影响和实施难度，下方列出实施优先级最高的三项重点任务。", "Figure 5-2 compares industry impact with implementation difficulty. The three actions below have the highest implementation priority.")}</p>
            </header>
            <a className="roadmap-paper-figure" href={language === "en" ? "paper-figures/fig-5-2-en.png" : "paper-figures/fig-5-2.png"} target="_blank" rel="noreferrer">
              <img src={language === "en" ? "paper-figures/fig-5-2-en.png" : "paper-figures/fig-5-2.png"} alt={pick("中国 T2T 行动重点：产业影响与实施难度", "Priority T2T actions in China: industry impact and implementation difficulty")} loading="lazy" decoding="async" />
              <div><span>{pick("图 5-2", "FIG. 5-2")}</span><strong>{pick("中国 T2T 行动重点：产业影响与实施难度", "Priority T2T Actions in China: Industry Impact and Implementation Difficulty")}</strong><i>↗</i></div>
            </a>
            <div className="priority-strip">
              <div><span>{pick("重点任务 01", "STRATEGIC PRIORITY 01")}</span><strong>{pick("建立回收追溯体系", "Build a recovery traceability system")}</strong><small>{pick("高影响 · 较低实施难度", "High impact · Lower implementation difficulty")}</small></div>
              <div><span>{pick("重点任务 02", "STRATEGIC PRIORITY 02")}</span><strong>{pick("标准化高纯 PET 进料", "Standardize high-purity PET feedstock")}</strong><small>{pick("高影响 · 可形成近期成果", "High impact · Near-term results")}</small></div>
              <div><span>{pick("重点任务 03", "STRATEGIC PRIORITY 03")}</span><strong>{pick("基础认证与信息公开", "Establish baseline certification and disclosure")}</strong><small>{pick("制度基础 · 支撑长期扩张", "Institutional foundation · Supports long-term expansion")}</small></div>
            </div>
          </article>
        </div>
      </section>

      <ReferencesSection />

      <footer>
        <div><span className="brand-mark">T2T</span><strong>{pick("中国纺织品循环利用（T2T）研究图谱", "China Textile-to-Textile Circularity Research Atlas")}</strong></div>
        <p>{pick("论文数据与公开证据整理 · 2026", "EVIDENCE-BASED INTERACTIVE ATLAS · 2026")}</p>
        <a href="#top">{pick("返回顶部 ↑", "Back to top ↑")}</a>
      </footer>
    </main>
  );
}
