"use client";

import { useState } from "react";
import DataExplorer from "./components/DataExplorer";

const materials = {
  PET: {
    label: "PET / 涤纶",
    maturity: "E3",
    route: "精细分选 → 预处理 → 解聚/再聚合",
    insight: "规模基础最强，近期产业化重点在稳定进料与杂质控制。",
    tone: "teal",
  },
  PA6: {
    label: "PA6 / 锦纶",
    maturity: "E2–E3",
    route: "识别分选 → 脱色除杂 → 解聚回收",
    insight: "单一材质闭环路径清晰，混纺与染整残留仍抬高工艺门槛。",
    tone: "orange",
  },
  COTTON: {
    label: "棉 / 纤维素",
    maturity: "E2–E3",
    route: "机械开松 / 溶解再生 → 纺丝",
    insight: "机械法成熟但品质衰减；纤维素法更适合高值化闭环。",
    tone: "blue",
  },
} as const;

type MaterialKey = keyof typeof materials;

const technologyRoutes = [
  {
    id: "pet-chem",
    name: "PET 化学解聚",
    short: "PET-C",
    evidence: "E3",
    values: [5, 3, 5, 5, 4],
    focus: "稳定进料、脱色除杂与连续化装置协同，是从示范走向规模复制的关键。",
    cases: ["浙江佳人现有线 · E3", "浙江佳人扩建一期 · E2", "恒逸聚酯回收研发 · E1"],
  },
  {
    id: "pet-enzyme",
    name: "PET 酶法回收",
    short: "PET-E",
    evidence: "E1–E2",
    values: [2, 3, 4, 3, 5],
    focus: "技术潜力突出，但现有公开证据仍以百吨级运行线和万吨级在建项目为主。",
    cases: ["源天生物现有线 · E1", "天津源天项目 · E2", "江苏佩浦万吨线 · E2"],
  },
  {
    id: "pa6-depoly",
    name: "PA6 解聚回收",
    short: "PA6",
    evidence: "E2–E3",
    values: [4, 2, 5, 3, 4],
    focus: "优先切入来源稳定的单一材质场景，再逐步扩大消费后原料占比。",
    cases: ["恒申/恒欣 7000 吨项目 · E2", "台华嘉华再生锦纶 · E3", "消费后锦氨分离 · E1"],
  },
  {
    id: "cotton-mech",
    name: "废棉机械再生",
    short: "C-M",
    evidence: "E3–E4",
    values: [5, 3, 2, 4, 2],
    focus: "成熟度高、导入快，但需要通过混配和纺纱优化缓解纤维长度损失。",
    cases: ["苍南再生棉产业集群 · E3", "唐山三友循环再生纤维 · E3"],
  },
  {
    id: "cellulose",
    name: "纤维素溶解再生",
    short: "CEL",
    evidence: "E2–E3",
    values: [3, 3, 5, 4, 3],
    focus: "高值化潜力突出，前处理纯化与溶剂体系决定产品稳定性和经济性。",
    cases: ["赛得利 FINEX · E3", "山东银鹰再生浆粕 · E2"],
  },
  {
    id: "blend",
    name: "混纺分离与再生",
    short: "BLD",
    evidence: "E1–E2",
    values: [2, 5, 4, 4, 5],
    focus: "长期价值最高、系统难度最大，应以可追溯原料和定向示范项目积累证据。",
    cases: ["Amino 涤棉/涤氨 · E2", "同济棉涤示范 · E2", "源天混纺酶法 · E1"],
  },
] as const;

const matrixLabels = ["技术成熟度", "原料适应性", "产品品质潜力", "规模化潜力", "分选依赖度"];

export default function Home() {
  const [active, setActive] = useState<MaterialKey>("PET");
  const [matrixView, setMatrixView] = useState<"heat" | "bubble">("heat");
  const [selectedTech, setSelectedTech] = useState("pet-chem");
  const material = materials[active];
  const technology = technologyRoutes.find((item) => item.id === selectedTech) ?? technologyRoutes[0];

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark">T2T</span>
          <span>中国纺织循环研究图谱</span>
        </a>
        <nav aria-label="页面导航">
          <a href="#overview">物质供给</a>
          <a href="#data-lab">数据图谱</a>
          <a href="#pathways">材料路径</a>
          <a href="#technology">技术证据</a>
          <a href="#roadmap">演进框架</a>
          <span className="status-dot">EVIDENCE ATLAS</span>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">CHINA TEXTILE-TO-TEXTILE CIRCULARITY · RESEARCH ATLAS</p>
          <h1>纤维流动与<br />闭环再生图谱</h1>
          <p className="hero-intro">
            以材料供给为底图，以回收—分选—再生为主轴，汇集论文中的可核验数据与项目证据，
            描绘中国纺织品—纺织品循环的规模基础、技术边界与产业演进路径。
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#data-lab">进入研究图谱 <span>↘</span></a>
            <p>EVIDENCE BASE · 2018—2025</p>
          </div>
        </div>
        <div className="hero-visual" aria-label="7793万吨化纤产量数据图形">
          <div className="orb orb-main">
            <span className="orb-kicker">CHEMICAL FIBER</span>
            <strong>7,793</strong>
            <span>万吨 · 2025</span>
          </div>
          <div className="orb orb-small orb-a"><strong>83.1%</strong><span>PET / 化纤比重</span></div>
          <div className="orb orb-small orb-b"><strong>515</strong><span>万吨 · 回收业务量</span></div>
          <div className="orbit-line orbit-one" />
          <div className="orbit-line orbit-two" />
        </div>
      </section>

      <section className="overview section-shell" id="overview">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 · MATERIAL SUPPLY BOUNDARY</p>
            <h2>材料供给构成闭环再生的规模边界</h2>
          </div>
          <p>以年度公开统计刻画物质基础，并将总量、结构与回收规模置于同一证据框架中审视。</p>
        </div>
        <div className="metric-grid">
          <article className="metric-card metric-dark">
            <p>主要化纤生产规模</p>
            <div><strong>7,793</strong><span>万吨</span></div>
            <small>2025 · NATIONAL OUTPUT</small>
          </article>
          <article className="metric-card metric-teal">
            <p>PET / 涤纶生产规模</p>
            <div><strong>6,477</strong><span>万吨</span></div>
            <small>DOMINANT MATERIAL · 83.1%</small>
          </article>
          <article className="metric-card metric-sand">
            <p>棉花生产规模</p>
            <div><strong>664.1</strong><span>万吨</span></div>
            <small>2025 · NATURAL FIBER</small>
          </article>
          <article className="metric-card metric-paper">
            <p>废纺回收业务量</p>
            <div><strong>≈515</strong><span>万吨</span></div>
            <small>2024 · RECOVERY VOLUME</small>
          </article>
        </div>
        <div className="supply-structure">
          <div className="structure-copy">
            <p className="eyebrow">MATERIAL DOMINANCE & COMPLEXITY</p>
            <h3>PET 决定规模上限，多组分材料界定技术边界</h3>
            <p>2025 年涤纶约占主要化学纤维产量的 83.1%，构成规模化闭环的首要物质基础；锦纶、氨纶及多组分混纺占比虽低，却显著抬升识别、分离与产品纯化的系统复杂度。</p>
          </div>
          <div className="composition-chart" aria-label="涤纶占主要化学纤维产量83.1%">
            <div className="composition-bar">
              <div className="segment pet-segment"><strong>83.1%</strong><span>PET / 涤纶</span></div>
              <div className="segment other-segment"><strong>16.9%</strong><span>其他化纤</span></div>
            </div>
            <div className="composition-foot">
              <span>总量 7,793 万吨</span>
              <span>涤纶 6,477 万吨</span>
            </div>
          </div>
        </div>
      </section>

      <DataExplorer />

      <section className="pathways section-shell" id="pathways">
        <div className="pathway-title">
          <div><p className="eyebrow">03 · MATERIAL-SPECIFIC PATHWAYS</p><span className="section-folio">ROUTE MAPPING</span></div>
          <div><h2>材料差异，塑造不同的纤维级闭环路径</h2><p className="section-deck">从进料识别、预处理到再聚合或再纺丝，每条路线的可行性均由材料组成与杂质边界共同决定。</p></div>
        </div>
        <div className="pathway-panel">
          <div className="material-tabs" role="tablist" aria-label="选择材料类型">
            {(Object.keys(materials) as MaterialKey[]).map((key) => (
              <button
                key={key}
                role="tab"
                aria-selected={active === key}
                className={active === key ? "active" : ""}
                onClick={() => setActive(key)}
              >
                <span>{materials[key].label}</span>
                <small>{materials[key].maturity}</small>
              </button>
            ))}
          </div>
          <div className={`flow-canvas tone-${material.tone}`}>
            <div className="flow-stage">
              <span>01</span><strong>废纺进料体系</strong><small>POST-CONSUMER · PRE-CONSUMER</small>
            </div>
            <div className="flow-link"><i /><i /><i /></div>
            <div className="flow-stage focus">
              <span>02</span><strong>{material.label}</strong><small>识别 · 组分分选 · 进料标准化</small>
            </div>
            <div className="flow-link"><i /><i /><i /></div>
            <div className="flow-stage">
              <span>03</span><strong>纤维级再生输出</strong><small>RE-ENTRY INTO TEXTILE VALUE CHAIN</small>
            </div>
          </div>
          <div className="pathway-note" aria-live="polite">
            <div><span>路径机制</span><strong>{material.route}</strong></div>
            <div><span>公开证据等级</span><strong>{material.maturity}</strong></div>
            <p>{material.insight}</p>
          </div>
        </div>
      </section>

      <section className="technology" id="technology">
        <div className="section-shell">
          <div className="technology-heading">
            <div>
              <p className="eyebrow">04 · EVIDENCE-BASED TECHNOLOGY LANDSCAPE</p>
              <h2>技术选择的本质，是原料约束下的路径匹配</h2>
              <p className="section-deck inverted">以成熟度、原料适应性、产品品质潜力、规模化潜力与分选依赖度构成多维证据坐标。</p>
            </div>
            <div className="view-toggle" aria-label="切换技术路线图表">
              <button className={matrixView === "heat" ? "active" : ""} onClick={() => setMatrixView("heat")}>多维属性矩阵</button>
              <button className={matrixView === "bubble" ? "active" : ""} onClick={() => setMatrixView("bubble")}>成熟度—复杂度图谱</button>
            </div>
          </div>

          <div className="technology-board">
            <div className="tech-selector" role="tablist" aria-label="选择技术路线">
              {technologyRoutes.map((route, index) => (
                <button
                  key={route.id}
                  role="tab"
                  aria-selected={selectedTech === route.id}
                  className={selectedTech === route.id ? "active" : ""}
                  onClick={() => setSelectedTech(route.id)}
                >
                  <span>0{index + 1}</span>
                  <strong>{route.name}</strong>
                  <small>{route.evidence}</small>
                </button>
              ))}
            </div>

            <div className="chart-area">
              {matrixView === "heat" ? (
                <div className="heatmap-wrap">
                  <div className="heatmap" role="img" aria-label="主要T2T技术路线多维属性比较热力图">
                    <div className="heat-spacer" />
                    {matrixLabels.map((label) => <div className="heat-label" key={label}>{label}</div>)}
                    {technologyRoutes.map((route) => (
                      <div className={`heat-row ${selectedTech === route.id ? "selected" : ""}`} key={route.id} onClick={() => setSelectedTech(route.id)}>
                        <div className="heat-name"><strong>{route.name}</strong><span>{route.evidence}</span></div>
                        {route.values.map((value, index) => (
                          <div className={`heat-cell score-${value}`} key={`${route.id}-${index}`} title={`${matrixLabels[index]}：${value}/5`}>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="heat-legend"><span>定性指数</span><i className="score-1" /><i className="score-2" /><i className="score-3" /><i className="score-4" /><i className="score-5" /><span>低 → 高</span></div>
                </div>
              ) : (
                <div className="bubble-chart" role="img" aria-label="技术成熟度、原料复杂度与潜在规模气泡图">
                  <div className="axis-y"><span>成熟度高</span><span>成熟度低</span></div>
                  <div className="bubble-grid">
                    {technologyRoutes.map((route, index) => (
                      <button
                        key={route.id}
                        className={`tech-bubble bubble-${index + 1} ${selectedTech === route.id ? "selected" : ""}`}
                        onClick={() => setSelectedTech(route.id)}
                        aria-label={`${route.name}，证据成熟度${route.evidence}`}
                      >
                        <strong>{route.short}</strong><span>{route.evidence}</span>
                      </button>
                    ))}
                  </div>
                  <div className="axis-x"><span>原料复杂度低</span><span>原料复杂度高</span></div>
                </div>
              )}
            </div>

            <aside className="tech-insight" aria-live="polite">
              <p>SELECTED EVIDENCE PATHWAY</p>
              <h3>{technology.name}</h3>
              <div><span>公开证据等级</span><strong>{technology.evidence}</strong></div>
              <p>{technology.focus}</p>
              <ul className="case-list">
                {technology.cases.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <small>矩阵中的 1–5 为基于论文证据的定性综合指数，用于路线间相对比较，不代表统一量纲下的实测值。</small>
            </aside>
          </div>
        </div>
      </section>

      <section className="roadmap section-shell" id="roadmap">
        <div className="roadmap-heading">
          <p className="eyebrow">05 · INDUSTRIAL TRANSITION 2026—2030</p>
          <h2>从可控原料出发，建立可验证、可复制的闭环能力</h2>
          <p>演进框架遵循“证据底座—单材放大—复杂原料突破”的序列，使技术扩张与原料质量、产品性能和商业运行证据保持同步。</p>
        </div>
        <div className="timeline">
          <article>
            <div className="year">2026</div>
            <span className="phase-dot" />
            <p>阶段 I · 证据底座</p>
            <h3>分选标准化与可控场景闭环</h3>
            <ul><li>建立材料分类与进料品质分级</li><li>锁定产业废料、制服等稳定来源</li><li>形成批次追溯与质量验证体系</li></ul>
          </article>
          <article>
            <div className="year">2027–28</div>
            <span className="phase-dot" />
            <p>阶段 II · 系统放大</p>
            <h3>PET、PA6 与纤维素路径规模化</h3>
            <ul><li>提升连续运行与稳定进料能力</li><li>耦合品牌、回收与再生制造网络</li><li>以产品性能与经济性校准扩张</li></ul>
          </article>
          <article>
            <div className="year">2029–30</div>
            <span className="phase-dot" />
            <p>阶段 III · 复杂原料突破</p>
            <h3>混纺分离与跨区域系统协同</h3>
            <ul><li>推动材料设计与回收端前置协同</li><li>构建多技术路线耦合的区域能力</li><li>将示范证据转化为可复制标准</li></ul>
          </article>
        </div>
        <div className="priority-strip">
          <div><span>STRATEGIC PRIORITY 01</span><strong>分选与标准化进料</strong><small>高紧迫度 · 基础能力</small></div>
          <div><span>STRATEGIC PRIORITY 02</span><strong>PET 闭环规模化</strong><small>较高成熟度 · 高潜在规模</small></div>
          <div><span>STRATEGIC PRIORITY 03</span><strong>复杂混纺定向示范</strong><small>高战略价值 · 长周期验证</small></div>
        </div>
      </section>

      <footer>
        <div><span className="brand-mark">T2T</span><strong>中国纺织循环研究图谱</strong></div>
        <p>EVIDENCE-BASED INTERACTIVE ATLAS · 论文数据与公开证据整理 · 2026</p>
        <a href="#top">返回顶部 ↑</a>
      </footer>
    </main>
  );
}
