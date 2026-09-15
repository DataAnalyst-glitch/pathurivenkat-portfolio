// Short "problem" framing for each seeded project's case study card. Derived directly
// from what each project's own description/status already says it does — not new
// claims, just naming the gap the built thing fills. Keyed by Firestore doc id.
export const caseStudyProblems = {
  digihostel:
    'Hostels were tracking attendance, fees, outing passes, and notices manually across Warden, Student, and Parent roles, with no shared system.',
  srdevelopers:
    'A real estate business needed a professional website built, deployed, and handed over — not just a design file.',
  'pranavis-boutique':
    'A boutique client needed to sell online with real inventory tracking, not just a static catalog page.',
  'review-pulse-ai':
    "Reading hundreds of competitor reviews by hand to find the real pros and cons doesn't scale.",
  hostelos:
    'Karthikeya Hostel needed real-time visibility into attendance, meals, and gate check-ins instead of manual logs.',
}

export const defaultCaseStudyProblem =
  'A growing business needed reliable, practical software instead of manual workarounds.'
