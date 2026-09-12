/**
 * Harvard University — Template Configuration
 * Crimson & White Ivy League aesthetic
 */
const harvardConfig = {
  id: 'harvard',
  name: 'Harvard University',
  shortName: 'Harvard',
  location: 'Cambridge, Massachusetts',
  tagline: 'Faculty of Arts and Sciences',
  logoUrl: '/logos/harvard.jpg',
  colors: {
    primary: '#A51C30',
    primaryDark: '#8C1515',
    primaryDeep: '#6B0F1A',
    accent: '#1E1E1E',
    accentLight: '#F5F5F5',
    accentSoft: '#FDF6F7',
  },
  emailDomain: 'college.harvard.edu',
  idFormat: 'harvardId',
  idLabel: 'HUID',
  secondaryIdLabel: 'ID Number',
  term: 'Fall Semester 2026',
  termCode: 'F26',
  termDates: 'September 2, 2026 – December 10, 2026',
  enrollmentDate: 'August 28, 2026',
  costPerCredit: 1,
  tuitionFlat: '$56,550.00',
  registrarOffice: 'University Registrar',
  registrarPhone: '(617) 495-1543',
  helpDesk: 'HUIT Help: (617) 495-7777',
  portalName: 'my.harvard Portal',

  majors: {
    cs: {
      name: 'A.B. Computer Science',
      college: 'Harvard John A. Paulson School of Engineering and Applied Sciences',
      courses: [
        { code: 'CS 161', crn: '12485', title: 'Operating Systems', cr: '4.0', times: 'Tue/Thu 11:30-13:00', loc: 'Maxwell Dworkin G115', room: 'MD G115', inst: 'Prof. James Mickens', type: 'Lecture', desc: 'Process and memory management, file systems, networking, and security in modern operating systems.' },
        { code: 'CS 124', crn: '12301', title: 'Data Structures and Algorithms', cr: '4.0', times: 'Mon/Wed/Fri 10:30-11:45', loc: 'Science Center Hall C', room: 'SC Hall C', inst: 'Prof. Michael Mitzenmacher', type: 'Lecture', desc: 'Design and analysis of algorithms. Sorting, searching, graph algorithms, dynamic programming.' },
        { code: 'CS 181', crn: '12520', title: 'Machine Learning', cr: '4.0', times: 'Mon/Wed 13:30-14:45', loc: 'Northwest Science Building B103', room: 'NW B103', inst: 'Prof. Finale Doshi-Velez', type: 'Lecture', desc: 'Introduction to machine learning. Supervised and unsupervised learning, neural networks, and deep learning.' },
        { code: 'MATH 25A', crn: '10890', title: 'Honors Linear Algebra and Real Analysis I', cr: '4.0', times: 'Mon/Wed/Fri 09:00-10:15', loc: 'Science Center Hall A', room: 'SC Hall A', inst: 'Prof. Dennis Gaitsgory', type: 'Lecture', desc: 'Linear algebra, inner product spaces, multilinear algebra, and introduction to real analysis.' }
      ]
    },
    econ: {
      name: 'A.B. Economics',
      college: 'Harvard Faculty of Arts and Sciences',
      courses: [
        { code: 'ECON 1010A', crn: '14200', title: 'Intermediate Microeconomics (Advanced)', cr: '4.0', times: 'Tue/Thu 09:00-10:15', loc: 'Sever Hall 113', room: 'Sever 113', inst: 'Prof. Raj Chetty', type: 'Lecture', desc: 'Consumer theory, production, market equilibrium, welfare economics, and game theory.' },
        { code: 'ECON 1011A', crn: '14215', title: 'Intermediate Macroeconomics (Advanced)', cr: '4.0', times: 'Mon/Wed 10:30-11:45', loc: 'Emerson Hall 105', room: 'Emerson 105', inst: 'Prof. N. Gregory Mankiw', type: 'Lecture', desc: 'National income, business cycles, fiscal and monetary policy, economic growth models.' },
        { code: 'ECON 1126', crn: '14340', title: 'Quantitative Methods in Economics', cr: '4.0', times: 'Mon/Wed/Fri 13:00-14:15', loc: 'Science Center Hall D', room: 'SC Hall D', inst: 'Prof. Maximilian Kasy', type: 'Lecture', desc: 'Econometrics, causal inference, regression analysis, and statistical methods for economics.' },
        { code: 'STAT 110', crn: '15010', title: 'Introduction to Probability', cr: '4.0', times: 'Tue/Thu 13:30-14:45', loc: 'Science Center Hall B', room: 'SC Hall B', inst: 'Prof. Joe Blitzstein', type: 'Lecture', desc: 'Probability, random variables, distributions, expectation, conditional probability, and Markov chains.' }
      ]
    },
    gov: {
      name: 'A.B. Government',
      college: 'Harvard Faculty of Arts and Sciences',
      courses: [
        { code: 'GOV 1061', crn: '16100', title: 'Classical Political Philosophy', cr: '4.0', times: 'Tue/Thu 10:30-11:45', loc: 'Sever Hall 102', room: 'Sever 102', inst: 'Prof. Harvey Mansfield', type: 'Lecture', desc: 'Classical political thought from Plato through Machiavelli.' },
        { code: 'GOV 1780', crn: '16250', title: 'International Relations Theory', cr: '4.0', times: 'Mon/Wed 13:30-14:45', loc: 'Emerson Hall 210', room: 'Emerson 210', inst: 'Prof. Stephen Walt', type: 'Lecture', desc: 'Realism, liberalism, constructivism, and critical theories in international relations.' },
        { code: 'GOV 1540', crn: '16180', title: 'The American Presidency', cr: '4.0', times: 'Mon/Wed/Fri 11:00-12:15', loc: 'Sanders Theatre', room: 'Sanders', inst: 'Prof. Roger Porter', type: 'Lecture', desc: 'Constitutional powers, executive leadership, and the modern presidency.' },
        { code: 'GOV 2005', crn: '16350', title: 'Quantitative Research Methods', cr: '4.0', times: 'Tue/Thu 14:00-15:15', loc: 'CGIS Knafel K354', room: 'CGIS K354', inst: 'Prof. Gary King', type: 'Seminar', desc: 'Statistical methods, experimental design, and causal inference in political science research.' }
      ]
    },
    bio: {
      name: 'A.B. Human Evolutionary Biology',
      college: 'Harvard Faculty of Arts and Sciences',
      courses: [
        { code: 'HEB 1380', crn: '18100', title: 'Human Genetics and Genomics', cr: '4.0', times: 'Mon/Wed 10:00-11:15', loc: 'Biological Labs 1080', room: 'BioLabs 1080', inst: 'Prof. Pardis Sabeti', type: 'Lecture', desc: 'Human genome structure, population genetics, CRISPR gene editing, and genomic medicine.' },
        { code: 'HEB 1330', crn: '18050', title: 'Human Evolutionary Anatomy', cr: '4.0', times: 'Tue/Thu 09:00-10:15', loc: 'Peabody Museum 53', room: 'Peabody 53', inst: 'Prof. Daniel Lieberman', type: 'Lecture', desc: 'Functional morphology, biomechanics, and the evolutionary basis of human anatomy.' },
        { code: 'MCB 60', crn: '17200', title: 'Molecular Biology: Biochemical Mechanisms', cr: '4.0', times: 'Mon/Wed/Fri 12:00-13:00', loc: 'Science Center Hall E', room: 'SC Hall E', inst: 'Prof. Rachelle Gaudet', type: 'Lecture', desc: 'Protein structure, enzyme kinetics, metabolic pathways, and cellular signaling.' },
        { code: 'ANTHRO 1610', crn: '18300', title: 'Primate Social Behavior', cr: '4.0', times: 'Thu 14:00-16:45', loc: 'Tozzer Library 203', room: 'Tozzer 203', inst: 'Prof. Richard Wrangham', type: 'Seminar', desc: 'Primate cognition, tool use, social structures, and the origins of human behavior.' }
      ]
    }
  }
};

export default harvardConfig;
