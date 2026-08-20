"use client";

import { useState } from "react";

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
  },
  {
    id: "pa6-depoly",
    name: "PA6 解聚回收",
    short: "PA6",
    evidence: "E2–E3",
    values: [4, 2, 5, 3, 4],
    focus: "优先切入来源稳定的单一材质场景，再逐步扩大消费后原料占比。",
  },
  {
    id: "cotton-mech",
    name: "废棉机械再生",
    short: "C-M",
    evidence: "E3–E4",
    values: [5, 3, 2, 4, 2],
    focus: "成熟度高、导入快，但需要通过混配和纺纱优化缓解纤维长度损失。",
  },
  {
    id: "cellulose",
    name: "纤维素溶解再生",
    short: "CEL",
    evidence: "E2–E3",
    values: [3, 3, 5, 4, 3],
    focus: "高值化潜力突出，前处理纯化与溶剂体系决定产品稳定性和经济性。",
  },
  {
    id: "blend",
    name: "混纺分离与再生",
    short: "BLD",
    evidence: "E1–E2",
    values: [2, 5, 4, 4, 5],
    focus: "长期价值最高、系统难度最大，应以可追溯原料和定向示范项目积累证据。",
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
          <span>纺织循环数据观察</span>
        </a>
        <nav aria-label="页面导航">
          <a href="#overview">供给概览</a>
          <a href="#pathways">循环路径</a>
          <a href="#technology">技术比较</a>
          <a href="#roadmap">推进路线</a>
          <span className="status-dot">研究型原型</span>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">CHINA TEXTILE-TO-TEXTILE · 2025</p>
          <h1>从纤维供给，<br />看见下一次循环。</h1>
          <p className="hero-intro">
            将论文中的材料供给、废纺回收与技术成熟度组织成一个可交互的决策界面，
            帮助读者从“有多少”进一步理解“流向哪里、如何再生”。
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#overview">进入数据概览 <span>↘</span></a>
            <p>数据口径：论文文稿与公开资料整理</p>
          </div>
        </div>
        <div className="hero-visual" aria-label="7793万吨化纤产量数据图形">
          <div className="orb orb-main">
            <span className="orb-kicker">CHEMICAL FIBER</span>
            <strong>7,793</strong>
            <span>万吨 · 2025</span>
          </div>
          <div className="orb orb-small orb-a"><strong>83%</strong><span>涤纶占化纤</span></div>
          <div className="orb orb-small orb-b"><strong>515</strong><span>万吨废纺回收</span></div>
          <div className="orbit-line orbit-one" />
          <div className="orbit-line orbit-two" />
        </div>
      </section>

      <section className="overview section-shell" id="overview">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 · MATERIAL SUPPLY</p>
            <h2>供给规模，决定循环的起点</h2>
          </div>
          <p>同一单位呈现核心规模；比例为页面依据文稿数值计算后的辅助读数。</p>
        </div>
        <div className="metric-grid">
          <article className="metric-card metric-dark">
            <p>主要化学纤维产量</p>
            <div><strong>7,793</strong><span>万吨</span></div>
            <small>2025 · 总体规模</small>
          </article>
          <article className="metric-card metric-teal">
            <p>涤纶产量</p>
            <div><strong>6,477</strong><span>万吨</span></div>
            <small>主量材料 · 优先闭环</small>
          </article>
          <article className="metric-card metric-sand">
            <p>棉花产量</p>
            <div><strong>664.1</strong><span>万吨</span></div>
            <small>天然纤维 · 双路径再生</small>
          </article>
          <article className="metric-card metric-paper">
            <p>废旧纺织品回收量</p>
            <div><strong>≈515</strong><span>万吨</span></div>
            <small>回收端 · 待提升高值利用</small>
          </article>
        </div>
        <div className="supply-structure">
          <div className="structure-copy">
            <p className="eyebrow">COMPOSITION LENS</p>
            <h3>涤纶定义主量，其他材料定义复杂度</h3>
            <p>以文稿中的 2025 年数据为口径，涤纶约占主要化学纤维产量的 83.1%。这意味着 PET 是规模化闭环的首要入口；锦纶、氨纶与多组分混纺则决定分选和工艺复杂度。</p>
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

      <section className="pathways section-shell" id="pathways">
        <div className="pathway-title">
          <p className="eyebrow">02 · CIRCULAR PATHWAYS</p>
          <h2>点击材料，追踪从废纺到新纤维的路径</h2>
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
              <span>01</span><strong>消费后纺织品</strong><small>居民旧衣 · 产业废料</small>
            </div>
            <div className="flow-link"><i /><i /><i /></div>
            <div className="flow-stage focus">
              <span>02</span><strong>{material.label}</strong><small>识别 · 分选 · 标准化</small>
            </div>
            <div className="flow-link"><i /><i /><i /></div>
            <div className="flow-stage">
              <span>03</span><strong>纤维级再生</strong><small>重返纺织供应链</small>
            </div>
          </div>
          <div className="pathway-note" aria-live="polite">
            <div><span>主路径</span><strong>{material.route}</strong></div>
            <div><span>证据成熟度</span><strong>{material.maturity}</strong></div>
            <p>{material.insight}</p>
          </div>
        </div>
      </section>

      <section className="technology" id="technology">
        <div className="section-shell">
          <div className="technology-heading">
            <div>
              <p className="eyebrow">03 · TECHNOLOGY LANDSCAPE</p>
              <h2>没有一条路线解决所有原料</h2>
            </div>
            <div className="view-toggle" aria-label="切换技术路线图表">
              <button className={matrixView === "heat" ? "active" : ""} onClick={() => setMatrixView("heat")}>属性热力图</button>
              <button className={matrixView === "bubble" ? "active" : ""} onClick={() => setMatrixView("bubble")}>成熟度气泡图</button>
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
              <p>当前选择</p>
              <h3>{technology.name}</h3>
              <div><span>证据成熟度</span><strong>{technology.evidence}</strong></div>
              <p>{technology.focus}</p>
              <small>图中 1–5 为基于论文证据的定性综合表达，不代表统一量纲的实测值。</small>
            </aside>
          </div>
        </div>
      </section>

      <section className="roadmap section-shell" id="roadmap">
        <div className="roadmap-heading">
          <p className="eyebrow">04 · ROADMAP 2026—2030</p>
          <h2>先建立稳定闭环，再突破复杂混纺</h2>
          <p>路线图以“原料可控—单材规模化—混纺突破”为推进逻辑，强调每一阶段都应形成可验证的数据和产品证据。</p>
        </div>
        <div className="timeline">
          <article>
            <div className="year">2026</div>
            <span className="phase-dot" />
            <p>近期 · 建立底座</p>
            <h3>分选标准化与重点场景闭环</h3>
            <ul><li>统一分类与品质分级</li><li>锁定产业废料和制服等稳定来源</li><li>建立批次追溯与验证体系</li></ul>
          </article>
          <article>
            <div className="year">2027–28</div>
            <span className="phase-dot" />
            <p>中期 · 规模复制</p>
            <h3>PET、PA6 与纤维素路线扩容</h3>
            <ul><li>提升连续化与稳定进料能力</li><li>打通品牌—回收—再生产销链</li><li>以产品性能和经济性校准扩产</li></ul>
          </article>
          <article>
            <div className="year">2029–30</div>
            <span className="phase-dot" />
            <p>远期 · 系统突破</p>
            <h3>复杂混纺分离与跨区域协同</h3>
            <ul><li>推进材料设计与回收端协同</li><li>形成多路线组合的区域能力</li><li>把示范项目转化为可复制标准</li></ul>
          </article>
        </div>
        <div className="priority-strip">
          <div><span>优先级 01</span><strong>分选与标准化进料</strong><small>高紧迫度 · 高基础性</small></div>
          <div><span>优先级 02</span><strong>PET 闭环规模化</strong><small>高成熟度 · 高潜在规模</small></div>
          <div><span>优先级 03</span><strong>混纺定向示范</strong><small>高战略价值 · 长周期</small></div>
        </div>
      </section>

      <footer>
        <div><span className="brand-mark">T2T</span><strong>中国纺织循环数据观察</strong></div>
        <p>研究型交互原型 · 数据来自论文文稿与公开资料整理 · 更新时间 2026</p>
        <a href="#top">返回顶部 ↑</a>
      </footer>
    </main>
  );
}
