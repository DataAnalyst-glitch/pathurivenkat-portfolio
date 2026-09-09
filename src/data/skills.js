// Hardcoded for now — will move to Firestore once the admin CRUD batch is built.
export const skillGroups = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React', 'HTML/CSS', 'JavaScript'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Python', 'FastAPI', 'Node.js'],
  },
  {
    id: 'database',
    label: 'Database',
    items: ['Firebase', 'Supabase', 'PostgreSQL'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    items: ['Android (Kotlin/Java basics)'],
  },
  {
    id: 'ai-assisted-development',
    label: 'AI-Assisted Development',
    items: ['Claude Code', 'Cursor', 'Prompt Engineering'],
  },
  {
    id: 'deployment',
    label: 'Deployment',
    items: ['Netlify', 'Vercel', 'Play Store Publishing'],
  },
]
