from pathlib import Path

p = Path("app.component.html")
text = p.read_text(encoding="utf-8")

old = """        <motion class="kpi-tile kpi-tile-accent">
          <div class="kpi-tile-top">
            <span class="kpi-tile-label">Rollout complete</span>
            <span class="kpi-status-dot" [class.ok]="completionStatus === 'On track'" [class.warn]="completionStatus !== 'On track'" title="{{ completionStatus }}"></span>
          </div>
          <span class="kpi-tile-value">{{ formatPercent(completionRate) }}</span>
          <span class="kpi-tile-meta" [class.kpi-meta-ok]="completionStatus === 'On track'" [class.kpi-meta-warn]="completionStatus !== 'On track'">{{ completionStatus }}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-tile-label">Active work</span>
          <span class="kpi-tile-value">{{ formatNumber(inProgress, 'km') }}</span>
          <span class="kpi-tile-meta">In progress</span>
        </div>
        <motion class="kpi-tile">
          <span class="kpi-tile-label">Pending</span>
          <span class="kpi-tile-value">{{ formatNumber(pending, 'km') }}</span>
          <span class="kpi-tile-meta">Queued / not started</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-tile-label">Delayed projects</span>
          <span class="kpi-tile-value kpi-tile-num">{{ delayedCount !== null ? delayedCount : '—' }}</span>
          <span class="kpi-tile-meta">&lt; 40% completion threshold</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-tile-label">Rings active</span>
          <span class="kpi-tile-value kpi-tile-num">{{ ringProgressData.length }}</span>
          <span class="kpi-tile-meta">Current scope</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-tile-label">Contractors</span>
          <span class="kpi-tile-value kpi-tile-num">{{ contractorChartData.length }}</span>
          <span class="kpi-tile-meta">Field execution</span>
        </div>"""

old = old.replace("motion", "motion")  # no-op placeholder
old = """        <div class="kpi-tile kpi-tile-accent">
          <motion class="kpi-tile-top">""".replace("motion", "div")
# build old properly without typos
old = """        <div class="kpi-tile kpi-tile-accent">
          <div class="kpi-tile-top">
            <span class="kpi-tile-label">Rollout complete</span>
            <span class="kpi-status-dot" [class.ok]="completionStatus === 'On track'" [class.warn]="completionStatus !== 'On track'" title="{{ completionStatus }}"></span>
          </div>
          <span class="kpi-tile-value">{{ formatPercent(completionRate) }}</span>
          <span class="kpi-tile-meta" [class.kpi-meta-ok]="completionStatus === 'On track'" [class.kpi-meta-warn]="completionStatus !== 'On track'">{{ completionStatus }}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-tile-label">Active work</span>
          <span class="kpi-tile-value">{{ formatNumber(inProgress, 'km') }}</span>
          <span class="kpi-tile-meta">In progress</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-tile-label">Pending</span>
          <span class="kpi-tile-value">{{ formatNumber(pending, 'km') }}</span>
          <span class="kpi-tile-meta">Queued / not started</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-tile-label">Delayed projects</span>
          <span class="kpi-tile-value kpi-tile-num">{{ delayedCount !== null ? delayedCount : '—' }}</span>
          <span class="kpi-tile-meta">&lt; 40% completion threshold</span>
        </div>
        <motion class="kpi-tile">
          <span class="kpi-tile-label">Rings active</span>
          <span class="kpi-tile-value kpi-tile-num">{{ ringProgressData.length }}</span>
          <span class="kpi-tile-meta">Current scope</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-tile-label">Contractors</span>
          <span class="kpi-tile-value kpi-tile-num">{{ contractorChartData.length }}</span>
          <span class="kpi-tile-meta">Field execution</span>
        </div>"""

# fix accidental motion in old string
old = old.replace('<motion class="kpi-tile">', '<motion class="kpi-tile">').replace("motion", "div") if False else old
old = """        <motion class="kpi-tile kpi-tile-accent">"""

new = """        <article class="kpi-hero-card dashboard-card">
          <span class="label-muted">Rollout complete</span>
          <p class="kpi-hero-value">{{ formatPercent(completionRate) }}</p>
          <span
            class="status-badge"
            [class.status-track]="completionStatus === 'On track'"
            [class.status-risk]="completionStatus !== 'On track'"
          >{{ completionStatus }}</span>
        </article>
        <article class="kpi-hero-card dashboard-card">
          <span class="label-muted">Active work</span>
          <p class="kpi-hero-value">{{ formatNumber(inProgress, 'km') }}</p>
          <span class="kpi-hero-footnote">In progress across current scope</span>
        </article>
        <article class="kpi-hero-card dashboard-card">
          <span class="label-muted">Delayed projects</span>
          <p class="kpi-hero-value">{{ delayedCount !== null ? delayedCount : '—' }}</p>
          <span class="kpi-hero-footnote">Below 40% completion threshold</span>
        </article>
        <article class="kpi-hero-card dashboard-card">
          <span class="label-muted">Pending queue</span>
          <p class="kpi-hero-value">{{ formatNumber(pending, 'km') }}</p>
          <span class="kpi-hero-footnote">{{ ringProgressData.length }} rings · {{ contractorChartData.length }} contractors</span>
        </article>"""

start = text.find('        <div class="kpi-tile kpi-tile-accent">')
end = text.find('      </section>', start)
block = text[start:end]
if 'kpi-tile-accent' not in block:
    raise SystemExit('block not found')
text = text[:start] + new + text[end:]
p.write_text(text, encoding='utf-8')
print('patched', len(new), 'chars')
