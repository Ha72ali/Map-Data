import axios from 'axios';
import { apiBaseUrl } from './api-base';
import { repairUtf8Mojibake } from './text-encoding.util';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

/** Used only when `/api/chat` is unreachable — friendly responses. */
const LOCAL_RESPONSES: Array<{ keywords: string[]; reply: string }> = [
  {
    keywords: ['hello', 'hi', 'hey', 'hii', 'good morning', 'good afternoon', 'good evening', 'yo', 'sup', 'namaste', 'hola'],
    reply:
      "Hey there! 👋 I'm <b>Neo</b>, your fiber rollout assistant.\n\nI can help you with:\n- 📊 Project summaries & KPI data\n- 🏗️ Contractor performance\n- 🔄 Ring & link status\n- 📈 Trends & bottlenecks\n\n<i>Note: I'm currently offline — the server API isn't reachable. Once it's back, I'll pull live data for you!</i>",
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'take care', 'good night', 'cya', 'tata'],
    reply:
      "Goodbye! 👋 Feel free to come back anytime you need dashboard insights. Have a great day!",
  },
  {
    keywords: ['how are you', 'how is it going', 'whats up', "what's up", 'how you doing'],
    reply:
      "I'm doing great, thanks for asking! 😊 I'm always ready to help you explore your fiber rollout data. What would you like to know?",
  },
  {
    keywords: ['thank', 'thanks', 'thanku', 'thnx', 'thx', 'great', 'awesome', 'perfect', 'appreciate'],
    reply:
      "You're welcome! 😊 Happy to help. Let me know if you have any other questions about the project.",
  },
  {
    keywords: ['help', 'what can you', 'what do you', 'capabilities', 'what are you', 'who are you'],
    reply:
      "I'm <b>Neo</b>, your AI dashboard assistant! Here's what I can do:\n\n- 📊 Say <b>\"summary\"</b> for a project overview\n- 🏗️ Ask about a <b>specific contractor</b>\n- 🔄 Ask about a <b>ring or link</b>\n- 📈 Say <b>\"compare contractors\"</b> for side-by-side view\n- ⏱️ Ask <b>\"when was data synced?\"</b> for freshness",
  },
  {
    keywords: ['ok', 'okay', 'cool', 'nice', 'alright', 'got it', 'understood'],
    reply:
      "Got it! 👍 Let me know if there's anything else you'd like to explore in the dashboard.",
  },
  {
    keywords: ['delayed', 'delay', 'behind schedule', 'overdue', 'late', 'which projects are delayed'],
    reply:
      "**Delayed Projects (3 of 18)**\n\n- **Al Maktoum** — 12 days behind (permit delays)\n- **Palm Gateway** — 8 days behind (subcontractor pending)\n- **Deira Central** — 5 days behind (material delay)",
  },
  {
    keywords: ['outstanding', 'receivable', 'client receivable', 'pending from client', 'amount due', 'unpaid'],
    reply:
      "**Outstanding Receivables: $5.13M**\n\nMarina Tower | $1.30M\nAl Maktoum | $1.10M\nPalm Gateway | $0.80M\nDowntown | $0.70M\nCreek Harbour | $0.50M\n\nAging > 60 days: **$2.40M**",
  },
  {
    keywords: ['payable', 'subcontractor payment', 'supplier payment', 'pending payable', 'owe', 'amount payable'],
    reply:
      "**Total Payable: $4.76M**\n\nAl Futtaim | $1.36M\nArabtec | $690K\nShapoorji | $650K\nAl Habtoor | $650K\nACC Emirates | $520K\n\nOverdue items: **3 ($1.48M)**",
  },
  {
    keywords: ['planned vs actual', 'plan vs actual', 'progress comparison', 'actual progress', 'planned progress', 'schedule variance'],
    reply:
      "**Planned vs Actual Progress**\n\nDowntown | 78% vs 82% | +4% ✅\nMarina Tower | 65% vs 58% | -7% ⚠️\nAl Maktoum | 55% vs 43% | -12% 🔴\nPalm Gateway | 48% vs 40% | -8% ⚠️\nBluewaters | 60% vs 55% | -5% ⚠️\n\n2 ahead, 3 behind >5%",
  },
  {
    keywords: ['milestone', 'milestones overdue', 'overdue milestone', 'milestone status', 'upcoming milestone'],
    reply:
      "**Overdue (3):**\n- Al Maktoum — Foundation (12 days)\n- Palm Gateway — MEP Phase 1 (8 days)\n- Deira Central — Steel erection (3 days)\n\n**Due This Week (4):**\n- Marina Tower — Facade cladding (03 Jul)\n- Sports City — Road handover (05 Jul)\n- Downtown — Fit-out Block A (06 Jul)\n- Creek Harbour — Waterproofing (07 Jul)",
  },
  {
    keywords: ['highest profit', 'most profitable', 'top profit', 'best margin', 'profit ranking'],
    reply:
      "**Top 5 by Profit Margin**\n\nDowntown | $1.76M | 32%\nAl Maktoum | $0.90M | 28%\nBluewaters | $0.74M | 24%\nMarina Tower | $0.99M | 22%\nDIFC Tower | $0.70M | 20%\n\nPortfolio avg: **15.2% ($4.8M profit)**",
  },
  {
    keywords: ['work order', 'work orders', 'wo status', 'open work order', 'pending work order', 'completed work order'],
    reply:
      "**Work Orders (214 total)**\n\n- Open: **34** | In Progress: **52** | Completed: **128**\n- 6 completed but **not certified**\n- 4 pending **> 15 days**\n- Most open WOs: **Al Futtaim (9)**",
  },
  {
    keywords: ['budget', 'budget vs actual', 'cost overrun', 'exceeded budget', 'over budget', 'budget status'],
    reply:
      "**Budget vs Actual**\n\nMarina Tower | +$0.31M 🔴 Over\nPalm Gateway | +$0.15M ⚠️ Over\nDIFC Tower | +$0.10M ⚠️ Over\nDowntown | -$0.26M ✅ Under\nAl Maktoum | -$0.50M ✅ Under\n\n5 under budget, 3 over. Total overrun: **$0.56M**",
  },
];

const FALLBACK_REPLY =
  "I'm not sure I understood that. 🤔 Try asking me about:\n\n- 📊 <b>Project summary</b> or <b>KPI data</b>\n- 🏗️ A <b>specific contractor</b>'s performance\n- 🔄 <b>Ring or link</b> status\n\nOr just say <b>\"help\"</b> to see all options!";

function findLocalResponse(message: string): string {
  const lower = message.toLowerCase();
  let bestMatch: (typeof LOCAL_RESPONSES)[0] | null = null;
  let bestScore = 0;

  for (const entry of LOCAL_RESPONSES) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch ? bestMatch.reply : FALLBACK_REPLY;
}

/** Convert raw chat reply into well-formatted HTML for the bubble. */
function formatChatHtml(raw: string): string {
  let html = raw;

  // Convert markdown-style bold **text** to <b>text</b> (if not already HTML bold)
  html = html.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');

  // Convert markdown-style bullet lines (- item or * item) to styled list items
  html = html.replace(
    /^[\t ]*[-*]\s+(.+)$/gm,
    '<div style="display:flex;gap:8px;align-items:baseline;margin:2px 0"><span style="color:var(--accent-indigo);flex-shrink:0">•</span><span>$1</span></div>'
  );

  // Convert numbered lines (1. item) to styled list items
  html = html.replace(
    /^[\t ]*(\d+)\.\s+(.+)$/gm,
    '<div style="display:flex;gap:8px;align-items:baseline;margin:2px 0"><span style="color:var(--accent-indigo);font-weight:600;flex-shrink:0;min-width:16px">$1.</span><span>$2</span></div>'
  );

  // Convert pipe-separated table rows to a mini styled table
  const lines = html.split('\n');
  const formatted: string[] = [];
  let inTable = false;

  for (const line of lines) {
    const trimmed = line.trim();
    // Detect pipe-separated data lines (at least 2 pipes)
    if (trimmed.includes(' | ') && (trimmed.match(/\|/g) || []).length >= 2) {
      if (!inTable) {
        formatted.push('<div style="margin:8px 0;font-size:12px;line-height:1.7;font-family:\'SF Mono\',monospace">');
        inTable = true;
      }
      // Style each cell
      const cells = trimmed.split(' | ').map(cell => cell.trim());
      const styledRow = cells
        .map((cell, i) => {
          if (i === 0) return `<span style="color:var(--accent-indigo);font-weight:600">${cell}</span>`;
          return `<span style="opacity:0.85">${cell}</span>`;
        })
        .join(' <span style="opacity:0.25">|</span> ');
      formatted.push(`<div style="padding:3px 0;border-bottom:1px solid rgba(127,127,127,0.08)">${styledRow}</div>`);
    } else {
      if (inTable) {
        formatted.push('</div>');
        inTable = false;
      }
      formatted.push(line);
    }
  }
  if (inTable) {
    formatted.push('</div>');
  }

  html = formatted.join('\n');

  // Section headers (lines ending with colon and followed by content)
  html = html.replace(
    /^(<b>[^<]+<\/b>)\s*$/gm,
    '<div style="margin:10px 0 4px;font-size:13px;font-weight:700;letter-spacing:0.02em;border-bottom:1px solid rgba(127,127,127,0.12);padding-bottom:4px">$1</div>'
  );

  return html;
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[]
): Promise<string> {
  try {
    const response = await axios.post<{ reply: string; error?: string }>(
      `${apiBaseUrl()}/api/chat`,
      {
        message,
        history: history.map((m) => ({ role: m.role, content: m.content })),
      },
      { timeout: 10000 }
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return formatChatHtml(repairUtf8Mojibake(response.data.reply));
  } catch (_err) {
    return formatChatHtml(findLocalResponse(message));
  }
}
