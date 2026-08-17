export interface AcademyEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  location?: string;
  description: string;
  image: string;
  category: string;
  slug: string;
  isFeatured: boolean;
  featured?: boolean;
  isPast?: boolean;
  registrationLink: string;
}

// Keep backward-compatible alias
export type Event = AcademyEvent;

export const eventCategories = [
  "All",
  "Concert",
  "Masterclass",
  "Open Day",
  "Workshop",
  "Festival",
] as const;

export const events: AcademyEvent[] = [
  {
    id: "1",
    title: "Summer Recital Series 2026",
    date: "2026-07-15",
    time: "7:00 PM",
    venue: "Harmonic Concert Hall",
    location: "Harmonic Concert Hall",
    description:
      "An enchanting evening featuring performances by our advanced students across piano, strings, and vocal programs. Experience the culmination of a year of dedicated practice and artistry.",
    image: "/images/events-concert.png",
    category: "Concert",
    slug: "summer-recital-series-2026",
    isFeatured: true,
    featured: true,
    isPast: false,
    registrationLink: "/contact",
  },
  {
    id: "2",
    title: "Masterclass with Guest Artist",
    date: "2026-08-10",
    time: "3:00 PM",
    venue: "Studio A, Harmonic Campus",
    location: "Studio A, Harmonic Campus",
    description:
      "Join us for an exclusive masterclass with internationally renowned pianist Maria Kozlova. Open to advanced students and auditors. Limited seats available.",
    image: "/images/events-concert.png",
    category: "Masterclass",
    slug: "masterclass-guest-artist",
    isFeatured: true,
    featured: false,
    isPast: false,
    registrationLink: "/contact",
  },
  {
    id: "3",
    title: "Open House & Enrollment Day",
    date: "2026-09-05",
    time: "10:00 AM - 4:00 PM",
    venue: "Harmonic Learning Studio",
    location: "Harmonic Learning Studio",
    description:
      "Explore our campus, meet our faculty, and discover our programs. Enjoy live performances, try instruments, and learn about our enrollment process. All ages welcome.",
    image: "/images/about-classroom.png",
    category: "Open Day",
    slug: "open-house-enrollment-day",
    isFeatured: true,
    featured: false,
    isPast: false,
    registrationLink: "/contact",
  },
  {
    id: "4",
    title: "Jazz Night: Student Showcase",
    date: "2026-09-20",
    time: "8:00 PM",
    venue: "Harmonic Lounge",
    location: "Harmonic Lounge",
    description:
      "Our contemporary and jazz students take the stage for an unforgettable evening of improvisation, soul, and groove. Refreshments and a vibrant atmosphere await.",
    image: "/images/events-concert.png",
    category: "Concert",
    slug: "jazz-night-student-showcase",
    isFeatured: false,
    featured: false,
    isPast: false,
    registrationLink: "/contact",
  },
  {
    id: "5",
    title: "Winter Gala Concert 2025",
    date: "2025-12-15",
    time: "7:30 PM",
    venue: "Harmonic Concert Hall",
    location: "Harmonic Concert Hall",
    description:
      "A dazzling evening celebrating the achievements of our 2025 cohort. Featured performances included concerto movements, chamber works, and vocal solos.",
    image: "/images/events-concert.png",
    category: "Concert",
    slug: "winter-gala-concert-2025",
    isFeatured: false,
    featured: false,
    isPast: true,
    registrationLink: "/contact",
  },
];
