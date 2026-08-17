// ============================================================
// SREYANKO // DIGITAL UNIVERSE — Site Configuration
// ============================================================
// Update this file to change all portfolio content.
// No need to modify UI components.
// ============================================================

export const siteConfig = {
  // ── Personal Info ──────────────────────────────────────────
  name: 'SREYANKO',
  fullName: 'SREYANKO SINHA',
  role: 'SOFTWARE ENGINEER',
  identities: [
    'COMPUTER SCIENCE',
    'BIOINFORMATICS',
    'WEB DEVELOPMENT',
    '3D / CREATIVE TECHNOLOGY',
  ],
  tagline: 'COMPUTER SCIENCE × TECHNOLOGY',
  description:
    'BUILDING DIGITAL EXPERIENCES, SOFTWARE SYSTEMS AND INTERACTIVE TECHNOLOGY.',
  status: 'BUILDING THE NEXT SYSTEM',

  // ── Navigation ─────────────────────────────────────────────
  navLinks: [
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'JOURNEY', href: '#journey' },
    { label: 'CONTACT', href: '#contact' },
  ],

  // ── Skills ─────────────────────────────────────────────────
  skills: [
    { name: 'REACT', category: 'frontend', level: 0.9 },
    { name: 'JAVASCRIPT', category: 'language', level: 0.9 },
    { name: 'THREE.JS', category: 'frontend', level: 0.8 },
    { name: 'JAVA', category: 'language', level: 0.85 },
    { name: 'PYTHON', category: 'language', level: 0.85 },
    { name: 'C++', category: 'language', level: 0.8 },
    { name: 'HTML', category: 'frontend', level: 0.95 },
    { name: 'CSS', category: 'frontend', level: 0.9 },
    { name: 'NODE.JS', category: 'backend', level: 0.8 },
    { name: 'EXPRESS.JS', category: 'backend', level: 0.8 },
    { name: 'SQL', category: 'backend', level: 0.75 },
    { name: 'GIT', category: 'tools', level: 0.85 },
    { name: 'SUPABASE', category: 'backend', level: 0.7 },
  ],

  // ── Projects ───────────────────────────────────────────────
  projects: [
    {
      id: 'nava-taran',
      title: 'NAVA-TARAN',
      subtitle: 'SPACE INTELLIGENCE & MISSION CONTROL PLATFORM',
      description:
        'A full-stack space intelligence platform focused on satellite tracking, space exploration, and an interactive mission-control experience.',
      technologies: ['React', 'Node.js', 'Express.js', 'Supabase', 'Vercel', 'Three.js'],
      features: [
        'REAL-TIME SATELLITE TRACKING',
        'SPACE EXPLORATION',
        'AI SPACE ASSISTANT',
        'EXOPLANET FEATURES',
        'MISSION CONTROL INTERFACE',
      ],
      url: 'https://navataran.vercel.app/',
      theme: 'space',
    },
    {
      id: 'travel-assistant',
      title: 'TRAVEL ASSISTANT',
      subtitle: 'INTERACTIVE TRAVEL PLANNING EXPERIENCE',
      description:
        'A responsive travel planning website built with HTML, CSS and JavaScript.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      features: [
        'DESTINATION EXPLORATION',
        'WEATHER-BASED DESTINATION RECOMMENDATIONS',
        'BUDGET ESTIMATION',
        'DESTINATION MATCHMAKER',
        'SMART PACKING ASSISTANT',
        'MULTILINGUAL SUPPORT',
        'DARK/LIGHT MODE',
      ],
      url: 'https://travel-assistant-seven-gray.vercel.app/', // Replace with actual project URL
      theme: 'earth',
    },
    {
      id: 'mini-search-engine',
      title: 'MINI-SEARCH-ENGINE',
      subtitle: 'MULTIMODAL INTELLIGENT DOCUMENT SEARCH ENGINE',
      description:
        'A multimodal intelligent search engine built with Python and C++ that enables document searching through text, image-based input and voice commands.',
      technologies: ['PYTHON', 'C++', 'MEDIAPIPE', 'TESSERACT OCR'],
      features: [
        'NAIVE STRING MATCHING',
        'KMP ALGORITHM',
        'RABIN-KARP ALGORITHM',
        'VOICE COMMANDS',
        'IMAGE-BASED INPUT'
      ],
      url: 'https://github.com/Sreyanko/Mini-Search-Engine',
      theme: 'search',
    },
  ],

  // ── Journey / Timeline ─────────────────────────────────────
  journey: [
    {
      year: '2024',
      events: [
        {
          title: 'COMPUTER SCIENCE JOURNEY BEGINS',
          description: 'Started my B.Tech journey in Computer Science, building a foundation in programming, problem solving and core computing concepts.'
        },
      ],
    },
    {
      year: '2025',
      events: [
        {
          title: 'BUILDING & EXPLORING',
          description: 'Strengthened my Computer Science fundamentals while exploring web development, databases, algorithms and software projects.'
        },
      ],
    },
    {
      year: '2026',
      events: [
        {
          title: 'ENGINEERING & CREATING',
          description: 'Focused on building technically ambitious projects across software development, algorithms, interactive web experiences and 3D technology.'
        },
      ],
    },
    {
      year: 'FUTURE',
      events: [
        {
          title: 'BUILD. EXPLORE. EVOLVE.',
          description: 'Continue growing as a software engineer, building impactful products and exploring new technologies.'
        },
      ],
    },
  ],


  // ── Social Links ───────────────────────────────────────────
  social: {
    email: 'https://mail.google.com/mail/?view=cm&fs=1&to=sreyankosinha@gmail.com',
    github: 'https://github.com/Sreyanko',
    linkedin: 'https://www.linkedin.com/in/sreyanko-sinha-39088326b/',  // Replace with actual LinkedIn URL
  },

  // ── Footer ─────────────────────────────────────────────────
  footer: {
    brand: 'SREYANKO // DIGITAL UNIVERSE',
    status: 'SYSTEM STATUS: ONLINE',
    copyright: '© 2026 SREYANKO SINHA',
    builtWith: 'BUILT WITH REACT × THREE.JS',
  },

  // ── Loading Screen Messages ────────────────────────────────
  loadingMessages: [
    'INITIALIZING 3D ENGINE',
    'LOADING PROJECTS',
    'CALIBRATING SYSTEMS',
    'INITIALIZING INTERFACE',
    'ESTABLISHING CONNECTION',
    'COMPILING SHADERS',
    'MAPPING DIGITAL UNIVERSE',
  ],
};

export default siteConfig;
