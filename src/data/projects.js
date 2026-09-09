// Hardcoded for now — will move to Firestore once the admin CRUD batch is built.
export const projects = [
  {
    id: 'digihostel',
    name: 'DigiHostel',
    accent: '#facc15',
    description:
      'Multi-tenant SaaS hostel management app — any hostel can sign up and use it. Role-based dashboards for Warden, Student, and Parent, with location-verified attendance, fee tracking, outing pass approval, and notices & complaints.',
    tech: ['Python', 'FastAPI', 'Supabase', 'Android'],
    status: 'Live on Play Store · used by 2 hostels',
    link: 'https://play.google.com/store/apps/details?id=com.pathurivenkat.digihostel',
    linkLabel: 'View on Play Store',
    proves: 'Can design multi-tenant SaaS systems with role-based access control',
  },
  {
    id: 'srdevelopers',
    name: 'srdevelopers.live',
    accent: '#22d3ee',
    description: 'Business website built for a real estate client — delivered, live, and hosted.',
    tech: [],
    status: 'Delivered to a paying client · live and hosted',
    link: 'https://srdevelopers.live',
    linkLabel: 'Visit Site',
    proves: 'Can take a client brief and deliver a finished, deployed website',
  },
  {
    id: 'pranavis-boutique',
    name: "Pranavi's Boutique",
    accent: '#f472b6',
    description:
      'E-commerce website with inventory tracking and an analytics dashboard, built for a client.',
    tech: ['Supabase', 'Vercel'],
    status: '~90% complete · payment gateway integration remaining',
    link: null,
    linkLabel: 'Screenshot',
    proves: 'Can build e-commerce systems — catalogs, inventory, dashboards',
  },
  {
    id: 'review-pulse-ai',
    name: 'Review Pulse AI',
    accent: '#a3e635',
    description:
      'AI tool that analyzes up to 300 competitor product reviews from Amazon and Flipkart, producing a sentiment breakdown of pros and cons.',
    tech: [],
    status: null,
    link: null,
    linkLabel: 'Demo',
    proves: 'Can build practical AI/data tools for real business problems',
  },
  {
    id: 'hostelos',
    name: 'HostelOS',
    accent: '#fb923c',
    description:
      'Web-based hostel management system built for a real hostel (Karthikeya Hostel) — live attendance dashboard with inside/outside count, veg/non-veg meal tracking, smart gate check-in with student search, geo-fencing for location-verified check-ins, admin panel, and student roster.',
    tech: ['Web App', 'Real-Time Dashboard'],
    status: 'Live and in use by a real hostel',
    link: 'https://karthikeyahostel.in',
    linkLabel: 'Visit Site',
    proves: 'Can build and deploy a live operational tool a real business depends on daily, not just a demo',
  },
]
