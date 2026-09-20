/**
 * Deterministic meeting-minutes governance rules.
 */
export const RULESET_ID = 'meeting-mind'
export const RULESET_VERSION = '2026-09-17'

export interface RuleResult {
  ruleId: string
  name: string
  category: string
  severity: 'low' | 'medium' | 'high'
  passed: boolean
  message: string
  ref?: string
}

export function runAllRules(content: string, _context?: Record<string, string>): RuleResult[] {
  const text = String(content || '')
  return [
    {
      ruleId: 'MM-01',
      name: 'No fabricated attendees',
      category: 'claims',
      severity: 'high',
      passed: !/(100% attendance|everyone agreed|unanimous without)/i.test(text),
      message: 'Do not invent attendance or unanimous consent not present in the input.',
    },
    {
      ruleId: 'MM-02',
      name: 'Action items reviewable',
      category: 'quality',
      severity: 'medium',
      passed: /(action|owner|due|next step|follow-?up)/i.test(text) || text.length < 40,
      message: 'Prefer explicit action items with owners/due dates when the transcript supports them.',
    },
    {
      ruleId: 'MM-03',
      name: 'Decision-support framing',
      category: 'scope',
      severity: 'low',
      passed: true,
      message: 'MeetMind drafts minutes — humans confirm decisions before they become commitments.',
    },
  ]
}

export type RuleHit = { id: string; title: string; severity: 'low' | 'medium' | 'high'; passed: boolean; remediation?: string; ref?: string }
export function runDeterministicChecks(inputs: Record<string, string>): RuleHit[] {
  const blob = Object.values(inputs || {}).join('\n')
  return runAllRules(blob).map((r: any) => ({
    id: String(r.id || r.ruleId || 'R'),
    title: String(r.name || r.title || 'check'),
    severity: (r.severity as 'low' | 'medium' | 'high') || 'medium',
    passed: !!r.passed,
    remediation: r.message || r.remediation,
    ref: r.ref || r.source,
  }))
}

