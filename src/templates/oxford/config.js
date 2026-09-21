/**
 * University of Oxford — Template Configuration
 * Oxford Blue & Historic Collegiate British aesthetic
 */
const oxfordConfig = {
  id: 'oxford',
  name: 'University of Oxford',
  shortName: 'Oxford',
  location: 'Oxford, Oxfordshire, UK',
  tagline: 'Dominus Illuminatio Mea — The Lord is My Light',
  logoUrl: '/logos/oxford.svg',
  colors: {
    primary: '#002147',
    primaryDark: '#00142B',
    primaryDeep: '#000D1C',
    accent: '#C99700',
    accentLight: '#FBF5E6',
    accentSoft: '#FFFDF9',
  },
  emailDomain: 'ox.ac.uk',
  idFormat: 'oxfordId',
  idLabel: 'University Card No.',
  secondaryIdLabel: 'Oxford SSO',
  secondaryIdFormat: 'sso',
  term: 'Michaelmas Term 2026',
  termCode: 'M26',
  termDates: '11 October 2026 – 05 December 2026',
  enrollmentDate: '01 October 2026',
  costPerCredit: 1,
  tuitionFlat: '£9,250.00 / Term',
  registrarOffice: 'University Student Registry',
  registrarPhone: '+44 1865 270000',
  helpDesk: 'IT Services Help Desk: +44 1865 612345',
  portalName: 'Student Self Service (eVision)',

  majors: {
    cs: {
      name: 'BA Computer Science (Honours)',
      college: 'Mathematical, Physical and Life Sciences Division',
      courses: [
        { code: 'CS 101', crn: '31042', title: 'Functional Programming & Lambda Calculus', cr: '4.0', times: 'Mon/Wed 10:00-11:00', loc: 'Wolfson Building Lecture Theatre', room: 'Wolfson LT', inst: 'Prof. Richard Bird', type: 'In-Person', desc: 'Haskell programming, equational reasoning, higher-order functions, inductive types, and lazy evaluation.' },
        { code: 'CS 102', crn: '31055', title: 'Design and Analysis of Algorithms', cr: '4.0', times: 'Tue/Thu 11:00-12:00', loc: 'Department of Computer Science LT', room: 'DCS LT A', inst: 'Prof. Leslie Ann Goldberg', type: 'In-Person', desc: 'Asymptotic complexity, divide-and-conquer, greedy heuristics, dynamic programming, and graph algorithms.' },
        { code: 'CS 103', crn: '31088', title: 'Digital Systems & Computer Architecture', cr: '4.0', times: 'Mon/Wed 14:00-15:30', loc: 'Robert Hooke Building Lab', room: 'Hooke Lab', inst: 'Prof. Marta Kwiatkowska', type: 'Lab', desc: 'Combinational and sequential logic, microarchitecture, pipelining, cache memory, and hardware description.' },
        { code: 'MATH 101', crn: '30110', title: 'Linear Algebra and Discrete Mathematics', cr: '4.0', times: 'Tue/Thu 09:00-10:00', loc: 'Mathematical Institute L1', room: 'Andrew Wiles L1', inst: 'Prof. Frances Kirwan', type: 'In-Person', desc: 'Vector spaces, linear maps, eigenvalues, graph theory, combinatorics, and modular arithmetic.' }
      ]
    },
    ppe: {
      name: 'BA Philosophy, Politics and Economics (PPE)',
      college: 'Social Sciences & Humanities Division',
      courses: [
        { code: 'PHIL 101', crn: '32010', title: 'General Philosophy & Theory of Knowledge', cr: '4.0', times: 'Mon/Wed 11:00-12:00', loc: 'Schools Building High Street', room: 'Examination Schools', inst: 'Prof. Timothy Williamson', type: 'In-Person', desc: 'Epistemology, metaphysics, scepticism, mind and body, personal identity, and induction.' },
        { code: 'POL 101', crn: '32120', title: 'Theory of Politics & Political Institutions', cr: '4.0', times: 'Tue/Thu 10:00-11:00', loc: 'Manor Road Building Lecture Theatre', room: 'Manor Road LT', inst: 'Prof. Paul Collier', type: 'In-Person', desc: 'Classical political thought: Hobbes, Locke, Rousseau, Mill; contemporary political philosophy.' },
        { code: 'ECON 101', crn: '32230', title: 'Microeconomics & Macroeconomic Principles', cr: '4.0', times: 'Tue/Thu 14:00-15:30', loc: 'Department of Economics Theatre', room: 'Econ LT 1', inst: 'Prof. Simon Wren-Lewis', type: 'In-Person', desc: 'Consumer equilibrium, firm profit maximisation, market competition, national accounts, and IS-LM framework.' }
      ]
    },
    math: {
      name: 'MMath Mathematics (Honours)',
      college: 'Mathematical Institute — MPLS Division',
      courses: [
        { code: 'MATH 110', crn: '30200', title: 'Analysis I: Metric Spaces & Sequences', cr: '4.0', times: 'Mon/Wed/Fri 09:00-10:00', loc: 'Mathematical Institute L2', room: 'Andrew Wiles L2', inst: 'Prof. Martin Bridson', type: 'In-Person', desc: 'Real number completeness, sequences, series, Cauchy convergence, continuity, and differentiability.' },
        { code: 'MATH 120', crn: '30225', title: 'Linear Algebra II & Abstract Algebra', cr: '4.0', times: 'Tue/Thu 10:00-11:00', loc: 'Mathematical Institute L1', room: 'Andrew Wiles L1', inst: 'Prof. Ben Green', type: 'In-Person', desc: 'Groups, rings, vector spaces, Jordan canonical form, inner product spaces, and spectral theorem.' },
        { code: 'MATH 130', crn: '30250', title: 'Probability & Differential Equations', cr: '4.0', times: 'Mon/Wed 11:00-12:00', loc: 'Mathematical Institute L3', room: 'Andrew Wiles L3', inst: 'Prof. Alison Etheridge', type: 'In-Person', desc: 'Random variables, generating functions, central limit theorem, and analytical differential equations.' },
        { code: 'MATH 140', crn: '30275', title: 'Fourier Series and Complex Analysis', cr: '4.0', times: 'Tue/Thu 13:00-14:00', loc: 'Mathematical Institute L2', room: 'Andrew Wiles L2', inst: 'Prof. Terry Lyons', type: 'In-Person', desc: 'Holomorphic functions, Cauchy-Riemann equations, contour integrals, and residue calculus.' }
      ]
    }
  }
};

export default oxfordConfig;
