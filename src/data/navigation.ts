export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
  megaMenu?: MegaMenuCategory[];
}

export interface MegaMenuCategory {
  title: string;
  items: { label: string; href: string; description: string }[];
}

export const mainNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Courses',
    href: '/courses',
    megaMenu: [
      {
        title: 'Instrumental',
        items: [
          { label: 'Piano', href: '/courses/piano', description: 'Classical and contemporary piano training' },
          { label: 'Guitar', href: '/courses/guitar', description: 'Acoustic, classical, and electric guitar' },
          { label: 'Violin', href: '/courses/violin', description: 'Western and Indian violin techniques' },
          { label: 'Drums', href: '/courses/drums', description: 'Percussion and rhythm mastery' },
          { label: 'Flute', href: '/courses/flute', description: 'Classical flute and bamboo flute' },
          { label: 'Keyboard', href: '/courses/keyboard', description: 'Electronic keyboard and synthesis' },
        ],
      },
      {
        title: 'Vocal',
        items: [
          { label: 'Classical Vocal', href: '/courses/classical-vocal', description: 'Western classical vocal training' },
          { label: 'Western Vocal', href: '/courses/western-vocal', description: 'Pop, jazz, and blues vocals' },
          { label: 'Hindustani Vocal', href: '/courses/hindustani-vocal', description: 'Traditional Indian vocal music' },
          { label: 'Contemporary', href: '/courses/contemporary-vocal', description: 'Modern vocal styles and techniques' },
        ],
      },
      {
        title: 'Music Theory',
        items: [
          { label: 'Ear Training', href: '/courses/ear-training', description: 'Develop your musical ear' },
          { label: 'Harmony & Counterpoint', href: '/courses/harmony', description: 'Study of chords and voice leading' },
          { label: 'Composition', href: '/courses/composition', description: 'Learn to write and arrange music' },
        ],
      },
    ],
  },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Contact', href: '/contact' },
];

export const footerLinks = {
  programs: [
    { label: 'Piano Lessons', href: '/courses/piano' },
    { label: 'Guitar Classes', href: '/courses/guitar' },
    { label: 'Violin Training', href: '/courses/violin' },
    { label: 'Vocal Coaching', href: '/courses/classical-vocal' },
    { label: 'Music Theory', href: '/courses/ear-training' },
    { label: 'Composition', href: '/courses/composition' },
  ],
  resources: [
    { label: 'Student Portal', href: '/portal' },
    { label: 'Practice Materials', href: '/resources/materials' },
    { label: 'Online Library', href: '/resources/library' },
    { label: 'Performance Videos', href: '/gallery' },
    { label: 'Blog & Articles', href: '/blog' },
    { label: 'FAQs', href: '/faq' },
  ],
  academy: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Faculty', href: '/faculty' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'Scholarships', href: '/scholarships' },
    { label: 'Careers', href: '/careers' },
  ],
  connect: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Visit Campus', href: '/visit' },
    { label: 'Events Calendar', href: '/events' },
    { label: 'Newsletter', href: '#newsletter' },
    { label: 'Alumni Network', href: '/alumni' },
    { label: 'Partnerships', href: '/partnerships' },
  ],
};
