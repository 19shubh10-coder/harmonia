export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  instrument: string;
  image: string;
  bio: string;
  qualifications: string[];
  experience: string;
  socialLinks: {
    website?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
  };
  featured: boolean;
}

export const faculty: FacultyMember[] = [
  {
    id: 'elena-vasquez',
    name: 'Dr. Elena Vasquez',
    role: 'Head of Piano & Woodwinds',
    instrument: 'Piano / Flute',
    image: '/images/faculty-1.png',
    bio: 'A Juilliard-trained concert pianist with over 20 years of performance and teaching experience, Dr. Vasquez has performed at Carnegie Hall, the Royal Albert Hall, and the Sydney Opera House. Her pedagogical approach blends rigorous classical technique with creative expression, and she has produced over 50 students who have gone on to professional careers in music.',
    qualifications: [
      'DMA in Piano Performance — The Juilliard School',
      'MM in Piano Pedagogy — Yale School of Music',
      'ABRSM Fellow Diploma (FRSM)',
      'Certified Suzuki Method Instructor',
    ],
    experience: '22 years',
    socialLinks: {
      website: 'https://elenavasquez.com',
      linkedin: 'https://linkedin.com/in/elenavasquez',
      youtube: 'https://youtube.com/@elenavasquez',
    },
    featured: true,
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'Guitar & Modern Music Director',
    instrument: 'Guitar / Keyboard',
    image: '/images/faculty-2.png',
    bio: 'A versatile guitarist and producer, Marcus has toured with Grammy-nominated artists and recorded on over 40 studio albums. His teaching philosophy emphasizes musical fluency across genres, encouraging students to develop their own artistic voice while building strong foundational skills.',
    qualifications: [
      'BM in Jazz Guitar — Berklee College of Music',
      'Certified Pro Tools Operator',
      'Guest Faculty — National Guitar Workshop',
      'Published author: "The Modern Guitarist Handbook"',
    ],
    experience: '18 years',
    socialLinks: {
      website: 'https://marcuschen.music',
      instagram: 'https://instagram.com/marcuschenguitar',
      youtube: 'https://youtube.com/@marcuschenmusic',
    },
    featured: true,
  },
  {
    id: 'ananya-sharma',
    name: 'Prof. Ananya Sharma',
    role: 'Head of Indian Classical Music',
    instrument: 'Violin / Hindustani Vocal',
    image: '/images/faculty-3.png',
    bio: 'A Sangeet Natak Akademi award-winning musician, Prof. Sharma is one of the foremost Indian classical violinists of her generation. Trained under legendary maestros, she bridges Eastern and Western musical traditions with rare depth and has performed at international festivals across 30 countries.',
    qualifications: [
      'MA in Indian Classical Music — University of Mumbai',
      'Sangeet Visharad — Prayag Sangeet Samiti',
      'Visiting Professor — SOAS, University of London',
      'Recipient, Sangeet Natak Akademi Award',
    ],
    experience: '25 years',
    socialLinks: {
      website: 'https://ananyasharma.in',
      youtube: 'https://youtube.com/@ananyasharmviolin',
    },
    featured: true,
  },
  {
    id: 'sophie-laurent',
    name: 'Sophie Laurent',
    role: 'Vocal Studies Director',
    instrument: 'Voice',
    image: '/images/faculty-4.png',
    bio: 'A former principal soprano at the Paris Opera, Sophie brings world-class vocal expertise to Harmonic. Her students have been accepted at the Royal Academy of Music, Conservatoire de Paris, and major opera companies worldwide. She specializes in both classical and contemporary vocal techniques.',
    qualifications: [
      'Diplome Superieur — Conservatoire de Paris',
      'MM in Vocal Performance — Royal Academy of Music',
      'Former Principal Soprano — Opera National de Paris',
      'Vocal pedagogy certification — Estill Voice Training',
    ],
    experience: '20 years',
    socialLinks: {
      website: 'https://sophielaurent.com',
      linkedin: 'https://linkedin.com/in/sophielaurentvoice',
      instagram: 'https://instagram.com/sophielaurent_voice',
    },
    featured: true,
  },
  {
    id: 'james-okafor',
    name: 'James Okafor',
    role: 'Percussion & Rhythm Studies',
    instrument: 'Drums / Percussion',
    image: '/images/faculty-1.png',
    bio: 'With roots in West African drumming traditions and a deep command of jazz, funk, and orchestral percussion, James brings an unmatched rhythmic vocabulary to his teaching. He has performed with the London Symphony Orchestra and maintains an active career as a session drummer.',
    qualifications: [
      'BMus in Percussion — Royal College of Music',
      'West African Drumming Certification — University of Ghana',
      'Session musician — over 100 commercial recordings',
      'Workshop leader — WOMAD, Glastonbury, Montreux Jazz Festival',
    ],
    experience: '16 years',
    socialLinks: {
      youtube: 'https://youtube.com/@jamesokafordrums',
      instagram: 'https://instagram.com/jamesokafor_drums',
    },
    featured: false,
  },
  {
    id: 'richard-hoffman',
    name: 'Dr. Richard Hoffman',
    role: 'Music Theory & Composition Chair',
    instrument: 'Composition / Theory',
    image: '/images/faculty-2.png',
    bio: 'An award-winning composer whose works have been premiered by the Berlin Philharmonic and the Chicago Symphony, Dr. Hoffman brings an extraordinary depth of theoretical knowledge to Harmonic. He believes that understanding music theory unlocks limitless creative potential.',
    qualifications: [
      'PhD in Music Composition — University of Cambridge',
      'MM in Music Theory — New England Conservatory',
      'Published in The Journal of Music Theory',
      'Winner, Royal Philharmonic Society Composition Prize',
    ],
    experience: '19 years',
    socialLinks: {
      website: 'https://richardhoffman.com',
      linkedin: 'https://linkedin.com/in/drhoffmancomposer',
    },
    featured: false,
  },
  {
    id: 'mei-tanaka',
    name: 'Mei Tanaka',
    role: 'Chamber Music & Ensemble Coach',
    instrument: 'Cello',
    image: '/images/faculty-3.png',
    bio: 'A former member of the Tokyo String Quartet, Mei is passionate about chamber music and collaborative musicianship. She coaches student ensembles with an emphasis on deep listening, musical dialogue, and the joy of shared performance.',
    qualifications: [
      'MM in Cello Performance — Curtis Institute of Music',
      'Former Member — Tokyo String Quartet',
      'Chamber Music Coach — Aspen Music Festival',
      'Recipient, Avery Fisher Career Grant',
    ],
    experience: '17 years',
    socialLinks: {
      website: 'https://meitanaka.com',
      youtube: 'https://youtube.com/@meitanakacello',
    },
    featured: false,
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    role: 'Music Technology & Production',
    instrument: 'Electronic Music / Production',
    image: '/images/faculty-4.png',
    bio: 'A pioneering figure in music technology education, David has worked with major recording studios and tech companies to develop innovative tools for musicians. He brings real-world production expertise and a passion for helping students harness technology creatively.',
    qualifications: [
      'MS in Music Technology — Georgia Tech',
      'BM in Music Production — NYU Steinhardt',
      'Certified Ableton Live Instructor',
      'Former audio engineer — Abbey Road Studios',
    ],
    experience: '14 years',
    socialLinks: {
      website: 'https://davidkimmusic.tech',
      linkedin: 'https://linkedin.com/in/davidkimmusic',
      youtube: 'https://youtube.com/@davidkimproduction',
    },
    featured: false,
  },
];

export function getFeaturedFaculty(): FacultyMember[] {
  return faculty.filter((f) => f.featured);
}

export function getFacultyById(id: string): FacultyMember | undefined {
  return faculty.find((f) => f.id === id);
}
