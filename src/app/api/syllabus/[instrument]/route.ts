import { NextRequest, NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

interface SyllabusData {
  title: string;
  grades: string;
  board: string;
  objectives: string[];
  curriculum: { grade: string; topics: string[] }[];
  examFormat: string[];
  materials: string[];
}

const syllabusData: Record<string, SyllabusData> = {
  piano: {
    title: 'Piano',
    grades: 'Initial - Grade 8 + Diplomas',
    board: 'Trinity College London / ABRSM',
    objectives: ['Develop proper posture, hand position, and finger independence', 'Build sight-reading fluency across all grade levels', 'Master scales, arpeggios, and technical exercises progressively', 'Perform repertoire spanning Baroque to Contemporary eras', 'Prepare confidently for graded examinations'],
    curriculum: [
      { grade: 'Initial - Grade 1', topics: ['Five-finger positions & basic hand coordination', 'Simple melodies with single-note bass', 'C, G, F major scales (one octave)', 'Basic music reading: treble & bass clef', 'Simple time signatures: 2/4, 3/4, 4/4'] },
      { grade: 'Grade 2 - Grade 3', topics: ['Two-octave major & minor scales', 'Broken chords and arpeggios introduction', 'Dynamics: piano, forte, crescendo, diminuendo', 'Pedal technique introduction', 'Sight-reading with both hands'] },
      { grade: 'Grade 4 - Grade 5', topics: ['All major & harmonic minor scales (two octaves)', 'Chromatic scales', 'Repertoire: Baroque, Classical, Romantic selections', 'Musical interpretation and expression', 'Theory Grade 5 preparation (ABRSM requirement)'] },
      { grade: 'Grade 6 - Grade 8', topics: ['Advanced scales: melodic minor, dominant 7ths', 'Complex repertoire across all style periods', 'Advanced pedalling and voicing techniques', 'Performance presentation and stage craft', 'Diploma preparation pathway'] },
    ],
    examFormat: ['Three prepared pieces from the exam syllabus', 'Scales & arpeggios (as per grade requirements)', 'Sight-reading of an unprepared piece', 'Aural tests covering intervals, rhythm, and musical perception'],
    materials: ['Trinity or ABRSM syllabus book (current edition)', 'Grade-specific repertoire books', 'Scales & arpeggios manual', 'Manuscript notebook for theory work'],
  },
  violin: {
    title: 'Violin',
    grades: 'Initial - Grade 8 + Diplomas',
    board: 'Trinity College London / ABRSM',
    objectives: ['Establish correct bow hold, posture, and tone production', 'Develop intonation accuracy across all positions', 'Master vibrato, shifting, and double-stop techniques', 'Perform solo and ensemble repertoire', 'Achieve examination readiness at each grade level'],
    curriculum: [
      { grade: 'Initial - Grade 1', topics: ['Open strings and first finger patterns', 'Basic bowing: detache and legato', 'A, D, G major scales (one octave)', 'Simple folk melodies and etudes', 'Reading first position notation'] },
      { grade: 'Grade 2 - Grade 3', topics: ['All first-position finger patterns', 'Introduction to third position', 'Two-octave scales and arpeggios', 'Martele and staccato bowing', 'Basic vibrato introduction'] },
      { grade: 'Grade 4 - Grade 5', topics: ['Shifting between 1st, 2nd, and 3rd positions', 'Three-octave scales', 'Spiccato and sautille bowing', 'Vibrato development', 'Baroque and Classical concerto movements'] },
      { grade: 'Grade 6 - Grade 8', topics: ['All positions up to 7th', 'Advanced double stops: 3rds, 6ths, octaves', 'Complex bowing combinations', 'Romantic and 20th-century repertoire', 'Concerto and sonata performance'] },
    ],
    examFormat: ['Three prepared pieces from the syllabus lists', 'Scales & arpeggios (grade-specific requirements)', 'Sight-reading of an unprepared passage', 'Aural tests: pitch, rhythm, and musical awareness'],
    materials: ['Grade-specific exam repertoire book', 'Scales manual for violin', 'Etude collections: Wohlfahrt, Kreutzer, Sevcik', 'Rosin, spare strings, shoulder rest'],
  },
  'guitar-classical': {
    title: 'Guitar (Classical)',
    grades: 'Initial - Grade 8',
    board: 'Trinity College London / ABRSM',
    objectives: ['Develop proper classical guitar technique and posture', 'Build fingerpicking dexterity and coordination', 'Read standard notation fluently for guitar', 'Perform graded repertoire across musical periods', 'Prepare for international graded examinations'],
    curriculum: [
      { grade: 'Initial - Grade 1', topics: ['Sitting position and right-hand technique', 'Free stroke (tirando) on open strings', 'First-position chords and melodies', 'Simple pieces in C, G, and A minor', 'Basic music reading for guitar'] },
      { grade: 'Grade 2 - Grade 3', topics: ['Rest stroke (apoyando) technique', 'Barre chord introduction', 'Two-octave scales in common keys', 'Arpeggio patterns (p-i-m-a)', 'Renaissance and folk repertoire'] },
      { grade: 'Grade 4 - Grade 5', topics: ['Position playing: II-VII positions', 'Slur techniques: hammer-on, pull-off', 'Tremolo introduction', 'Classical period repertoire: Sor, Giuliani, Carcassi', 'Sight-reading with position changes'] },
      { grade: 'Grade 6 - Grade 8', topics: ['Advanced right-hand techniques', 'Harmonics: natural and artificial', 'Full fingerboard navigation', 'Concert repertoire: Bach, Tarrega, Villa-Lobos', 'Performance interpretation and expression'] },
    ],
    examFormat: ['Three prepared pieces from the syllabus', 'Scales & arpeggios as per grade level', 'Sight-reading of an unseen piece', 'Aural tests on intervals, chords, and rhythm'],
    materials: ['Classical guitar with nylon strings', 'Footstool or guitar support', 'Grade-specific repertoire book', 'Scales and arpeggio manual for guitar'],
  },
  singing: {
    title: 'Singing',
    grades: 'Initial - Grade 8 + Diplomas',
    board: 'Trinity College London / ABRSM',
    objectives: ['Develop healthy vocal technique and breath support', 'Build range, tone quality, and projection', 'Master diction in English and other languages', 'Perform solo vocal repertoire across genres', 'Achieve distinction-level results in graded exams'],
    curriculum: [
      { grade: 'Initial - Grade 1', topics: ['Posture and diaphragmatic breathing basics', 'Vowel formation and clear diction', 'Simple songs in comfortable range', 'Basic pitch matching and ear training', 'Understanding musical notation for singers'] },
      { grade: 'Grade 2 - Grade 3', topics: ['Extended range development', 'Dynamic control: soft and loud singing', 'Songs in English and one additional language', 'Introduction to vocal registers', 'Basic sight-singing'] },
      { grade: 'Grade 4 - Grade 5', topics: ['Vowel modification across registers', 'Art song and folk song repertoire', 'Italian and German diction', 'Musical interpretation and phrasing', 'Theory Grade 5 preparation'] },
      { grade: 'Grade 6 - Grade 8', topics: ['Advanced resonance and projection', 'Opera aria and art song performance', 'Songs in three or more languages', 'Recital programming', 'Diploma preparation pathway'] },
    ],
    examFormat: ['Three prepared songs from the syllabus song lists', 'Sight-singing of a short unprepared melody', 'Aural tests on pitch, rhythm, and musical perception', 'Viva voce (discussion about prepared pieces)'],
    materials: ['Grade-specific song album', 'Sight-singing practice book', 'Water bottle (for vocal hydration)', 'Personal copy of all performance scores'],
  },
  drums: {
    title: 'Drums',
    grades: 'Debut - Grade 8 (Rockschool)',
    board: 'Rock School of Music London',
    objectives: ['Develop stick control, grip, and coordination', 'Read drum notation and rhythmic charts', 'Master grooves across rock, pop, funk, and jazz styles', 'Build fill vocabulary and improvisational skills', 'Prepare for Rockschool graded examinations'],
    curriculum: [
      { grade: 'Debut - Grade 1', topics: ['Matched grip and basic strokes', 'Quarter and eighth note grooves', 'Simple fills using snare and toms', 'Hi-hat technique: closed and open', 'Playing along to backing tracks'] },
      { grade: 'Grade 2 - Grade 3', topics: ['Sixteenth note grooves and ghost notes', 'Basic syncopation patterns', 'Crash and ride cymbal patterns', 'Rock, pop, and shuffle feels', 'Simple drum chart reading'] },
      { grade: 'Grade 4 - Grade 5', topics: ['Advanced ghost note placement', 'Linear drumming patterns', 'Odd time signatures: 5/4, 7/8', 'Funk and R&B grooves', 'Drum solo construction'] },
      { grade: 'Grade 6 - Grade 8', topics: ['Advanced independence exercises', 'Jazz comping and brush technique', 'Latin rhythms: samba, bossa nova', 'Double bass drum / double pedal technique', 'Session drumming and chart reading'] },
    ],
    examFormat: ['Two prepared pieces played to backing tracks', 'Technical exercises (rudiments and coordination)', 'Unprepared playback or improvisation section', 'Ear tests and general musicianship questions'],
    materials: ['Rockschool drums grade book (current edition)', 'Practice pad and sticks', 'Audio backing tracks (included with book)', 'Metronome'],
  },
  'music-theory': {
    title: 'Music Theory',
    grades: 'Grade 1 - Grade 8',
    board: 'ABRSM / Trinity College London',
    objectives: ['Understand fundamental music notation and terminology', 'Analyse keys, scales, intervals, and chords', 'Compose short musical passages', 'Develop harmonic and structural awareness', 'Pass Grade 5 Theory (ABRSM prerequisite for practical Grade 6+)'],
    curriculum: [
      { grade: 'Grade 1 - Grade 2', topics: ['Note values, rests, and time signatures', 'Treble and bass clef reading', 'Major scales up to 2 sharps / 2 flats', 'Tonic triads', 'Musical terms and signs'] },
      { grade: 'Grade 3 - Grade 4', topics: ['All major and minor scales up to 4 sharps / 4 flats', 'Intervals: major, minor, perfect', 'Simple and compound time signatures', 'Transposition at the octave', 'Four-bar rhythm composition'] },
      { grade: 'Grade 5', topics: ['All major and minor keys', 'All diatonic intervals', 'Chords: I, II, IV, V, VI in root position and inversions', 'Cadences: perfect, plagal, imperfect, interrupted', 'Orchestral instruments and clefs (alto, tenor)'] },
      { grade: 'Grade 6 - Grade 8', topics: ['Four-part harmony and voice leading', 'Figured bass realization', 'Melody composition with modulation', 'Harmonic and structural analysis', 'Score reading and orchestration basics'] },
    ],
    examFormat: ['Written examination (online for ABRSM, paper for Trinity)', 'Questions on notation, keys, intervals, chords', 'Short composition or completion of a musical passage', 'Analysis of musical excerpts'],
    materials: ['ABRSM or Trinity Theory workbook for your grade', 'Music manuscript paper', 'Pencil and eraser', 'Reference: The AB Guide to Music Theory (recommended)'],
  },
  flute: {
    title: 'Flute',
    grades: 'Initial - Grade 8',
    board: 'Trinity College London / ABRSM',
    objectives: ['Develop embouchure, breath control, and tone quality', 'Build finger technique and coordination', 'Master articulation: legato, staccato, tonguing', 'Perform solo and ensemble flute repertoire', 'Prepare for international graded examinations'],
    curriculum: [
      { grade: 'Initial - Grade 1', topics: ['Headjoint exercises for tone production', 'Basic fingerings: first octave', 'Long tones and breathing exercises', 'Simple melodies in C and G major', 'Introduction to tonguing'] },
      { grade: 'Grade 2 - Grade 3', topics: ['Second octave development', 'Two-octave scales and arpeggios', 'Legato and staccato articulation', 'Dynamics and tone colour', 'Duet playing introduction'] },
      { grade: 'Grade 4 - Grade 5', topics: ['Third octave introduction', 'Chromatic scales', 'Vibrato development', 'Baroque sonata movements', 'Sight-reading with varied articulations'] },
      { grade: 'Grade 6 - Grade 8', topics: ['Full three-octave range mastery', 'Advanced articulation: double and triple tonguing', 'Extended techniques: flutter tongue, harmonics', 'Concerto and sonata performance', 'Orchestral excerpt preparation'] },
    ],
    examFormat: ['Three prepared pieces from the syllabus', 'Scales & arpeggios as per grade requirements', 'Sight-reading of an unseen passage', 'Aural tests on pitch, rhythm, and musical awareness'],
    materials: ['Concert flute (C flute)', 'Grade-specific repertoire book', 'Scales manual for flute', 'Cleaning rod and cloth'],
  },
  'keyboard-electronic': {
    title: 'Keyboard (Electronic)',
    grades: 'Initial - Grade 8',
    board: 'Trinity College London / Rockschool',
    objectives: ['Develop keyboard technique and finger coordination', 'Understand chord progressions and accompaniment styles', 'Master voice and tone selection for different genres', 'Learn auto-accompaniment and rhythm programming', 'Prepare for graded keyboard examinations'],
    curriculum: [
      { grade: 'Initial - Grade 1', topics: ['Keyboard layout and basic fingering', 'Single-finger and fingered chord modes', 'Simple melodies with auto-accompaniment', 'C, F, G major scales', 'Basic rhythm patterns'] },
      { grade: 'Grade 2 - Grade 3', topics: ['Two-handed coordination', 'Chord inversions and voicings', 'Registration and voice changes', 'Pop and rock accompaniment patterns', 'Introduction to MIDI'] },
      { grade: 'Grade 4 - Grade 5', topics: ['Advanced chord progressions: 7ths, sus, dim', 'Style-based performance: jazz, Latin, ballad', 'Multi-layered arrangements', 'Introduction to sound design', 'Full arrangement performance'] },
      { grade: 'Grade 6 - Grade 8', topics: ['Advanced synthesis and programming', 'Complex arrangements with splits and layers', 'Live performance setup and management', 'Session keyboard skills', 'Professional repertoire performance'] },
    ],
    examFormat: ['Two or three prepared pieces (board-dependent)', 'Technical work: scales, chords, arpeggios', 'Sight-reading or improvisation section', 'Aural and general musicianship tests'],
    materials: ['Electronic keyboard (61 keys minimum, touch-sensitive)', 'Grade-specific exam book', 'Audio backing tracks', 'Sustain pedal (recommended)'],
  },
};

function generatePDF(data: SyllabusData): ArrayBuffer {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentW = pageW - margin * 2;
  let y = 0;

  function checkPage(needed: number) {
    if (y + needed > 275) {
      doc.addPage();
      y = 20;
    }
  }

  // ── Header ──
  doc.setFillColor(26, 31, 61); // navy
  doc.rect(0, 0, pageW, 45, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.title} Syllabus`, pageW / 2, 18, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(data.grades, pageW / 2, 27, { align: 'center' });

  // Board badge
  doc.setFillColor(201, 168, 76); // gold
  const badgeText = data.board.toUpperCase();
  const badgeW = doc.getTextWidth(badgeText) + 14;
  doc.roundedRect((pageW - badgeW) / 2, 31, badgeW, 8, 4, 4, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(badgeText, pageW / 2, 36.5, { align: 'center' });

  y = 55;

  // ── Section heading ──
  function sectionHeading(title: string) {
    checkPage(14);
    doc.setFillColor(26, 31, 61);
    doc.rect(margin, y, contentW, 9, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin + 4, y + 6.5);
    y += 14;
  }

  // ── Bullet point ──
  function bullet(text: string, indent = 0) {
    checkPage(8);
    const bulletX = margin + 3 + indent;
    const textX = bulletX + 5;
    const textW = contentW - 8 - indent;

    doc.setFontSize(7);
    doc.setTextColor(201, 168, 76);
    doc.text('\u2666', bulletX, y + 0.5);

    doc.setFontSize(9);
    doc.setTextColor(55, 65, 81);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, textW);
    doc.text(lines, textX, y);
    y += lines.length * 4.5 + 2;
  }

  // ── Learning Objectives ──
  sectionHeading('LEARNING OBJECTIVES');
  data.objectives.forEach((obj) => bullet(obj));
  y += 4;

  // ── Curriculum ──
  sectionHeading('GRADE-WISE CURRICULUM');
  data.curriculum.forEach((block) => {
    checkPage(16);
    doc.setFillColor(248, 246, 242);
    doc.roundedRect(margin + 2, y - 1, contentW - 4, 8, 2, 2, 'F');
    doc.setFontSize(10);
    doc.setTextColor(201, 168, 76);
    doc.setFont('helvetica', 'bold');
    doc.text(block.grade, margin + 6, y + 4.5);
    y += 11;

    block.topics.forEach((topic) => bullet(topic, 4));
    y += 3;
  });

  // ── Exam Format ──
  sectionHeading('EXAMINATION FORMAT');
  data.examFormat.forEach((item) => bullet(item));
  y += 4;

  // ── Materials ──
  sectionHeading('RECOMMENDED MATERIALS');
  data.materials.forEach((item) => bullet(item));
  y += 6;

  // ── Footer ──
  checkPage(25);
  doc.setDrawColor(201, 168, 76);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);
  y += 6;

  doc.setFontSize(11);
  doc.setTextColor(26, 31, 61);
  doc.setFont('helvetica', 'bold');
  doc.text('Harmonic Learning Studio', pageW / 2, y, { align: 'center' });
  y += 5;

  doc.setFontSize(8);
  doc.setTextColor(107, 114, 128);
  doc.setFont('helvetica', 'normal');
  doc.text('Founded by Divyanshu Vashistha  |  KMMC Chennai Alumni', pageW / 2, y, { align: 'center' });
  y += 4;
  doc.text('Visit our website or contact us to book a trial lesson', pageW / 2, y, { align: 'center' });

  return doc.output('arraybuffer');
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ instrument: string }> }
) {
  const { instrument } = await params;
  const data = syllabusData[instrument];

  if (!data) {
    return NextResponse.json({ error: 'Syllabus not found' }, { status: 404 });
  }

  const pdfBuffer = generatePDF(data);
  const filename = `${data.title.replace(/[^a-zA-Z0-9]/g, '_')}_Syllabus_Harmonic.pdf`;

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
