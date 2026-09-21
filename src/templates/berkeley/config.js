/**
 * University of California, Berkeley — Template Configuration
 * Berkeley Blue & California Gold public university aesthetic
 */
const berkeleyConfig = {
  id: 'berkeley',
  name: 'University of California, Berkeley',
  shortName: 'UC Berkeley',
  location: 'Berkeley, California',
  tagline: 'Fiat Lux — Let There Be Light',
  logoUrl: '/logos/berkeley.svg',
  colors: {
    primary: '#003262',
    primaryDark: '#002040',
    primaryDeep: '#001428',
    accent: '#FDB515',
    accentLight: '#FFF5D6',
    accentSoft: '#FFFAEB',
  },
  emailDomain: 'berkeley.edu',
  idFormat: 'berkeleyId',
  idLabel: 'Student ID (SID)',
  secondaryIdLabel: 'CalNet ID',
  secondaryIdFormat: 'username',
  term: 'Fall Semester 2026',
  termCode: 'F26',
  termDates: 'August 26, 2026 – December 18, 2026',
  enrollmentDate: 'August 19, 2026',
  costPerCredit: 1,
  tuitionFlat: '$7,842.00 (In-State) / $22,896.00',
  registrarOffice: 'Office of the Registrar',
  registrarPhone: '(510) 664-9181',
  helpDesk: 'Student Technology Services: (510) 642-4357',
  portalName: 'CalCentral Portal',

  majors: {
    eecs: {
      name: 'B.S. Electrical Engineering & Computer Sciences (EECS)',
      college: 'College of Engineering',
      courses: [
        { code: 'CS 61A', crn: '24102', title: 'The Structure and Interpretation of Computer Programs', cr: '4.0', times: 'Mon/Wed/Fri 13:00-13:50', loc: 'Wheeler Hall Auditorium', room: 'Wheeler Aud', inst: 'Prof. John DeNero', type: 'In-Person', desc: 'Python, scheme, SQL, recursion, object-oriented programming, data abstraction, and interpreter design.' },
        { code: 'CS 61B', crn: '24150', title: 'Data Structures & Advanced Programming in Java', cr: '4.0', times: 'Mon/Wed/Fri 10:00-10:50', loc: 'Pimentel Hall 1', room: 'Pimentel 1', inst: 'Prof. Josh Hug', type: 'In-Person', desc: 'Asymptotic analysis, amortized complexity, search trees, hash tables, graph algorithms, sorting.' },
        { code: 'CS 61C', crn: '24185', title: 'Great Ideas in Computer Architecture (Machine Structures)', cr: '4.0', times: 'Tue/Thu 14:00-15:20', loc: 'Valley Life Sciences 2050', room: 'VLSB 2050', inst: 'Prof. Dan Garcia', type: 'In-Person', desc: 'C, RISC-V assembly language, CPU pipelining, cache memory, multi-threading, and parallel processing.' },
        { code: 'EECS 16A', crn: '24210', title: 'Designing Information Devices and Systems I', cr: '4.0', times: 'Tue/Thu 11:00-12:20', loc: 'Stanley Hall 105', room: 'Stanley 105', inst: 'Prof. Laura Waller', type: 'In-Person', desc: 'Linear algebra, circuit analysis, sensors, resistive touchscreens, tomography, and eigenvalue analysis.' }
      ]
    },
    data: {
      name: 'B.A. Data Science',
      college: 'College of Computing, Data Science, and Society (CDSS)',
      courses: [
        { code: 'DATA 8', crn: '25100', title: 'Foundations of Data Science', cr: '4.0', times: 'Mon/Wed/Fri 11:00-11:50', loc: 'Zellerbach Hall Auditorium', room: 'Zellerbach Aud', inst: 'Prof. Ani Adhikari', type: 'In-Person', desc: 'Computational and statistical thinking: hypothesis testing, bootstrapping, prediction, causality.' },
        { code: 'DATA 100', crn: '25210', title: 'Principles and Techniques of Data Science', cr: '4.0', times: 'Tue/Thu 12:30-13:50', loc: 'Dwinelle Hall 155', room: 'Dwinelle 155', inst: 'Prof. Fernando Perez', type: 'In-Person', desc: 'Data wrangling, exploratory analysis, linear regression, logistic regression, cross-validation.' },
        { code: 'STAT 134', crn: '25315', title: 'Concepts of Probability', cr: '4.0', times: 'Mon/Wed/Fri 14:00-14:50', loc: 'Evans Hall 60', room: 'Evans 60', inst: 'Prof. David Aldous', type: 'In-Person', desc: 'Random variables, conditional expectation, law of large numbers, Poisson and normal approximations.' },
        { code: 'MATH 54', crn: '21105', title: 'Linear Algebra and Differential Equations', cr: '4.0', times: 'Tue/Thu 09:30-10:50', loc: 'Hearst Field Annex A1', room: 'HFA A1', inst: 'Dr. Michael Christ', type: 'In-Person', desc: 'Matrix algebra, orthogonality, eigenvalues, symmetric matrices, linear differential equations.' }
      ]
    },
    haas: {
      name: 'B.S. Business Administration',
      college: 'Haas School of Business',
      courses: [
        { code: 'UGBA 100', crn: '26100', title: 'Business Communication & Strategic Leadership', cr: '3.0', times: 'Tue/Thu 10:00-11:20', loc: 'Chou Hall N300', room: 'Chou N300', inst: 'Prof. Holly Schroth', type: 'In-Person', desc: 'Managerial communication, persuasive presentation, negotiation tactics, and strategic team leadership.' },
        { code: 'UGBA 102A', crn: '26115', title: 'Financial Accounting for Business Decision Making', cr: '3.0', times: 'Mon/Wed 09:00-10:20', loc: 'Cheit Hall C250', room: 'Cheit C250', inst: 'Prof. Yaniv Konchitchki', type: 'In-Person', desc: 'Financial statements, revenue measurement, inventory valuation, long-term liabilities, and equity.' },
        { code: 'UGBA 103', crn: '26210', title: 'Introduction to Corporate Finance', cr: '4.0', times: 'Mon/Wed 11:00-12:20', loc: 'Chou Hall Spieker Forum', room: 'Chou Forum', inst: 'Prof. Terrance Odean', type: 'In-Person', desc: 'Capital budgeting, CAPM, capital structure, dividend policy, market efficiency, and options.' },
        { code: 'UGBA 106', crn: '26315', title: 'Marketing Organization and Strategy', cr: '3.0', times: 'Tue/Thu 14:00-15:20', loc: 'Cheit Hall C210', room: 'Cheit C210', inst: 'Prof. Zsolt Katona', type: 'In-Person', desc: 'Consumer behavior, market segmentation, brand positioning, pricing strategies, and digital channels.' }
      ]
    }
  }
};

export default berkeleyConfig;
