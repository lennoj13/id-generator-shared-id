/**
 * Stanford University — Template Configuration
 * Cardinal Red & Palo Alto aesthetic
 */
const stanfordConfig = {
  id: 'stanford',
  name: 'Stanford University',
  shortName: 'Stanford',
  location: 'Stanford, California',
  tagline: 'Die Luft der Freiheit weht — The wind of freedom blows',
  logoUrl: '/logos/stanford.svg',
  colors: {
    primary: '#8C1515',
    primaryDark: '#6B0F1A',
    primaryDeep: '#4C0913',
    accent: '#B1040E',
    accentLight: '#F5F5F5',
    accentSoft: '#FCF5F5',
  },
  emailDomain: 'stanford.edu',
  idFormat: 'stanfordId',
  idLabel: 'SUID',
  secondaryIdLabel: 'SUNet ID',
  secondaryIdFormat: 'username',
  term: 'Autumn Quarter 2026',
  termCode: 'A26',
  termDates: 'September 21, 2026 – December 11, 2026',
  enrollmentDate: 'September 14, 2026',
  costPerCredit: 1,
  tuitionFlat: '$61,731.00',
  registrarOffice: 'Office of the University Registrar',
  registrarPhone: '(650) 723-7772',
  helpDesk: 'University IT Help: (650) 725-4357',
  portalName: 'Axess Portal',

  majors: {
    cs: {
      name: 'B.S. Computer Science',
      college: 'Stanford School of Engineering',
      courses: [
        { code: 'CS 106B', crn: '18492', title: 'Programming Abstractions in C++', cr: '5.0', times: 'Mon/Wed/Fri 10:30-11:20', loc: 'Hewlett Teaching Center 200', room: 'Hewlett 200', inst: 'Prof. Julie Zelenski', type: 'In-Person', desc: 'Abstraction and its implementation in C++. Classes, recursion, data structures (linked lists, trees, graphs), algorithm analysis.' },
        { code: 'CS 107', crn: '18501', title: 'Computer Organization & Systems', cr: '5.0', times: 'Tue/Thu 13:30-14:50', loc: 'Gates Computer Science B01', room: 'Gates B01', inst: 'Prof. Nick Troccoli', type: 'In-Person', desc: 'Introduction to computer systems: memory hierarchy, processor architecture, machine-level representations of C programs.' },
        { code: 'CS 161', crn: '18530', title: 'Design and Analysis of Algorithms', cr: '4.0', times: 'Mon/Wed 15:00-16:20', loc: 'Skilling Auditorium', room: 'Skilling Aud', inst: 'Prof. Moses Charikar', type: 'In-Person', desc: 'Worst-case and average-case analysis. Divide-and-conquer, dynamic programming, greedy algorithms, network flows, and NP-completeness.' },
        { code: 'MATH 51', crn: '12104', title: 'Linear Algebra and Differential Multivariable Calculus', cr: '5.0', times: 'Mon/Tue/Wed/Thu 09:00-09:50', loc: 'Building 380 (Sloan) 380F', room: 'Bldg 380-380F', inst: 'Dr. Brian Conrad', type: 'In-Person', desc: 'Linear algebra and multivariable calculus: vector spaces, matrices, eigenvalues, gradients, and optimization.' }
      ]
    },
    symsys: {
      name: 'B.S. Symbolic Systems',
      college: 'School of Humanities and Sciences',
      courses: [
        { code: 'SYMSYS 1', crn: '19100', title: 'Minds and Machines: Cognition & AI', cr: '4.0', times: 'Tue/Thu 10:00-11:20', loc: 'Bishop Auditorium', room: 'Bishop Aud', inst: 'Prof. Paul Skokowski', type: 'In-Person', desc: 'Philosophical, psychological, and computational approaches to mind, brain, and artificial intelligence.' },
        { code: 'CS 221', crn: '18650', title: 'Artificial Intelligence: Principles & Techniques', cr: '4.0', times: 'Mon/Wed 13:30-14:50', loc: 'Memorial Auditorium', room: 'MemAud', inst: 'Prof. Percy Liang', type: 'In-Person', desc: 'Machine learning, search, game playing, Markov decision processes, constraint satisfaction, and graphical models.' },
        { code: 'LINGUIST 130A', crn: '14210', title: 'Introduction to Linguistic Semantics', cr: '4.0', times: 'Mon/Wed 10:00-11:20', loc: 'Margaret Jacks Hall 105', room: 'Bldg 460-105', inst: 'Prof. Christopher Potts', type: 'In-Person', desc: 'Linguistic meaning, compositional semantics, pragmatic inference, and computational language interpretation.' },
        { code: 'PHIL 150', crn: '16120', title: 'Mathematical Logic and Formal Systems', cr: '4.0', times: 'Tue/Thu 15:00-16:20', loc: 'Building 200 (History) 203', room: 'Bldg 200-203', inst: 'Prof. Johan van Benthem', type: 'In-Person', desc: 'Propositional and first-order predicate logic, completeness, soundness, and Gödel incompleteness.' }
      ]
    },
    me: {
      name: 'B.S. Mechanical Engineering',
      college: 'Stanford School of Engineering',
      courses: [
        { code: 'ENGR 14', crn: '17200', title: 'Applied Mechanics: Statics', cr: '3.0', times: 'Mon/Wed/Fri 09:00-09:50', loc: 'Thornton Center 110', room: 'Thornton 110', inst: 'Prof. Sheri Sheppard', type: 'In-Person', desc: 'Equilibrium of particles and rigid bodies, distributed loads, trusses, frames, machines, and friction.' },
        { code: 'ME 103', crn: '17315', title: 'Energy Resources and Technologies', cr: '4.0', times: 'Tue/Thu 11:30-12:50', loc: 'Building 550 (d.school) 550A', room: 'd.school 550A', inst: 'Prof. Arun Majumdar', type: 'In-Person', desc: 'Thermodynamics of energy conversion systems, solar, wind, nuclear, and carbon capture engineering.' },
        { code: 'ME 203', crn: '17420', title: 'Design and Manufacturing Project', cr: '4.0', times: 'Mon/Wed 14:00-16:50', loc: 'Product Realization Lab', room: 'PRL Shop Lab', inst: 'Prof. David Beach', type: 'Lab', desc: 'Integrated product design, rapid prototyping, CNC machining, casting, and functional testing.' },
        { code: 'ENGR 30', crn: '17150', title: 'Engineering Thermodynamics', cr: '3.0', times: 'Tue/Thu 09:00-10:15', loc: 'Huang Engineering Center 018', room: 'Huang 018', inst: 'Prof. Reginald Mitchell', type: 'In-Person', desc: 'The fundamental laws of thermodynamics, entropy, power cycles, refrigeration, and combustion.' }
      ]
    },
    econ: {
      name: 'B.A. Economics',
      college: 'School of Humanities and Sciences',
      courses: [
        { code: 'ECON 50', crn: '15100', title: 'Economic Analysis I: Microeconomics', cr: '5.0', times: 'Mon/Wed 10:00-11:50', loc: 'Cubberley Auditorium', room: 'Cubberley Aud', inst: 'Prof. Mark Duggan', type: 'In-Person', desc: 'Individual consumer behavior, firm theory, market equilibrium, welfare economics, and monopoly.' },
        { code: 'ECON 102A', crn: '15210', title: 'Introduction to Statistical Methods', cr: '5.0', times: 'Tue/Thu 13:30-14:50', loc: 'Landau Economics Building 140', room: 'Landau 140', inst: 'Prof. Scott泛 Peterson', type: 'In-Person', desc: 'Probability distributions, estimation, hypothesis testing, sampling theory, and econometric analysis.' },
        { code: 'ECON 111', crn: '15320', title: 'Money and Banking & Financial Institutions', cr: '5.0', times: 'Mon/Wed 13:30-14:50', loc: 'Building 320 (Geology) 105', room: 'Bldg 320-105', inst: 'Prof. John B. Taylor', type: 'In-Person', desc: 'Central banking, monetary policy rules, interest rates, financial crises, and international liquidity.' }
      ]
    }
  }
};

export default stanfordConfig;
