export interface Testimonial {
  id: string;
  studentName: string;
  course: string;
  image: string;
  quote: string;
  rating: number;
  achievement: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    studentName: 'Aarav Sharma',
    course: 'Piano Mastery',
    image: '/images/faculty-1.png',
    quote:
      'Harmonic transformed my relationship with music. Divyanshu sir helped me go from struggling with basic scales to performing Chopin at my first recital in just one year. The personalized attention and world-class facilities made all the difference in my journey.',
    rating: 5,
    achievement: 'Distinction in Trinity Grade 5 Piano',
  },
  {
    id: 'testimonial-2',
    studentName: 'Rohan Desai',
    course: 'Guitar Excellence',
    image: '/images/faculty-2.png',
    quote:
      'As a self-taught guitarist, I thought I knew the basics — but Divyanshu sir opened up an entirely new dimension of musicality for me. The curriculum is rigorous yet inspiring, and the jam sessions with fellow students are the highlight of every week.',
    rating: 5,
    achievement: 'Released debut EP on Spotify',
  },
  {
    id: 'testimonial-3',
    studentName: 'Sneha Verma',
    course: 'Hindustani Classical Vocal',
    image: '/images/faculty-3.png',
    quote:
      'Divyanshu sir is not just a teacher — he is a guru in the truest sense. Under his guidance, I discovered the profound depths of raga music and developed a vocal technique I never imagined possible. Harmonic honors tradition while embracing innovation.',
    rating: 5,
    achievement: 'Performed at National Classical Music Festival',
  },
  {
    id: 'testimonial-4',
    studentName: 'Karan Gupta',
    course: 'Music Composition',
    image: '/images/faculty-4.png',
    quote:
      'Divyanshu sir\'s composition guidance gave me the tools and confidence to write my first orchestral piece. Having it performed by the academy ensemble was a dream come true. The faculty here genuinely invest in your artistic vision.',
    rating: 5,
    achievement: 'Composition premiered at annual concert',
  },
  {
    id: 'testimonial-5',
    studentName: 'Aditya Iyer',
    course: 'Violin Virtuosity',
    image: '/images/faculty-1.png',
    quote:
      'Coming from a competitive background, I was worried about finding the same level of rigor elsewhere. Harmonic exceeded my expectations. Divyanshu sir and the team provide masterclass opportunities that are truly world-class.',
    rating: 5,
    achievement: 'Won regional concerto competition',
  },
  {
    id: 'testimonial-6',
    studentName: 'Anjali Singh',
    course: 'Classical Vocal Training',
    image: '/images/faculty-4.png',
    quote:
      'Divyanshu sir is an extraordinary vocal coach. He helped me overcome technical challenges I had struggled with for years and prepared me for my ABRSM exams with such care and expertise. I would not be where I am today without Harmonic.',
    rating: 5,
    achievement: 'Distinction in ABRSM Grade 7 Singing',
  },
  {
    id: 'testimonial-7',
    studentName: 'Vikram Chawla',
    course: 'Rhythmic Foundations',
    image: '/images/faculty-2.png',
    quote:
      'Divyanshu sir is the kind of teacher who makes you excited to practice. His knowledge of percussion traditions is incredible, and the facilities at Harmonic — especially the soundproofed practice rooms — are second to none.',
    rating: 5,
    achievement: 'Cleared Rockschool Grade 6 Drums',
  },
  {
    id: 'testimonial-8',
    studentName: 'Neha Reddy',
    course: 'Ear Training & Aural Skills',
    image: '/images/faculty-3.png',
    quote:
      'I enrolled in ear training to complement my piano studies, and Divyanshu sir completely changed how I listen to and understand music. The skills I gained here have made me a better musician in every way — sight-reading, improvisation, even composition.',
    rating: 5,
    achievement: 'Perfect score on ABRSM Grade 8 Aural',
  },
];
