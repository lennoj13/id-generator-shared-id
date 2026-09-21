/**
 * Minnesota State University, Mankato — Template Configuration
 * Purple & Gold academic aesthetic matching official registrar portal
 */
const mnsuConfig = {
  id: 'mnsu',
  name: 'Minnesota State University, Mankato',
  shortName: 'MNSU',
  location: 'Mankato, Minnesota',
  tagline: 'A member of the Minnesota State system',
  logoUrl: '/logos/mnsu.png',
  colors: {
    primary: '#49306E',
    primaryDark: '#362154',
    primaryDeep: '#27153E',
    accent: '#FEBD11',
    accentLight: '#FFD359',
    accentSoft: '#FFF9E8',
  },
  emailDomain: 'mnsu.edu',
  idFormat: 'starId',
  idLabel: 'StarID',
  secondaryIdLabel: 'Tech ID',
  secondaryIdFormat: 'numeric8',
  term: 'Fall Semester 2026',
  termCode: 'F26',
  termDates: 'August 24, 2026 – December 11, 2026',
  enrollmentDate: 'August 17, 2026',
  recordDate: 'September 7, 2026',
  costPerCredit: 405,
  tuitionFlat: '$6,480.00 USD',
  registrarOffice: 'Office of the Registrar',
  registrarPhone: '(507) 389-6266',
  helpDesk: 'IT Help Desk: (507) 389-6654',
  portalName: 'E-Services Portal',
  campusTimeLabel: 'MANKATO CAMPUS TIME',

  majors: {
    swe: {
      name: 'B.S. Computer Engineering',
      college: 'College of Science, Engineering & Technology (CSET)',
      courses: [
        { code: 'CIS 455-01', crn: '004892', title: 'Software Quality Assurance & Security Auditing', cr: '4.0', times: 'Tue 18:00-20:00 / Wed 18:00-21:00', loc: 'Online Zoom Live', room: 'Zoom Live MNSU', inst: 'Dr. M. Lindholm', type: 'Online Sync', desc: 'Comprehensive study of software testing methodologies, automated test suites, OWASP security principles, auditing metrics, and verification.' },
        { code: 'IT 440-01', crn: '004895', title: 'IT Project Management & Agile Systems', cr: '4.0', times: 'Tue 20:00-22:00 / Thu 18:00-21:00', loc: 'Online Zoom Live', room: 'Zoom Live MNSU', inst: 'Dr. S. K. Johnson', type: 'Online Sync', desc: 'Agile methodologies, sprint planning, project governance, risk mitigation, and team leadership in technical projects.' },
        { code: 'CIS 420-01', crn: '004901', title: 'Enterprise Application Architecture & UI', cr: '4.0', times: 'Mon 18:00-21:00 / Fri 18:00-21:00', loc: 'Wissink Hall 210', room: 'Friday: Online Sync', inst: 'Prof. R. Erickson', type: 'In-Person', desc: 'Enterprise application design patterns, user interface human factors, business process automation, and microservice integration.' },
        { code: 'CIS 485-01', crn: '004918', title: 'Senior Software Architecture & Web Cloud', cr: '4.0', times: 'Thu 21:00-23:00 / Fri 21:00-23:00', loc: 'Online Zoom Live', room: 'Zoom Live MNSU', inst: 'Dr. D. F. Keefe', type: 'Online Sync', desc: 'Distributed systems, REST/GraphQL cloud services, CI/CD pipeline automation, Docker containerization, and capstone engineering.' }
      ]
    },
    cs: {
      name: 'B.S. Computer Science',
      college: 'College of Science, Engineering & Technology (CSET)',
      courses: [
        { code: 'CS 320-01', crn: '003105', title: 'Theory of Computation & Automata', cr: '3.0', times: 'Mon/Wed/Fri 09:00-09:50', loc: 'Wissink Hall 215', room: 'WH 215', inst: 'Dr. G. Berg', type: 'In-Person', desc: 'Regular languages, finite state automata, context-free grammars, Turing machines, and decidability theory.' },
        { code: 'CS 350-01', crn: '003112', title: 'Data Structures & Algorithms in C++', cr: '4.0', times: 'Mon/Wed 10:00-11:50', loc: 'Wissink Hall 285', room: 'WH 285', inst: 'Dr. R. Rajaravivarma', type: 'In-Person', desc: 'Advanced tree structures, graph algorithms, asymptotic complexity analysis, dynamic programming, and memory management.' },
        { code: 'MATH 121-02', crn: '001289', title: 'Calculus I - Analytical Geometry', cr: '4.0', times: 'Mon/Tue/Wed/Fri 13:00-13:50', loc: 'Armstrong Hall 102', room: 'AH 102', inst: 'Dr. I. Cherif', type: 'In-Person', desc: 'Limits, derivatives, applications of differentiation, Riemann sums, definite integrals, and Fundamental Theorem of Calculus.' },
        { code: 'CS 460-01', crn: '003118', title: 'Operating Systems & System Programming', cr: '4.0', times: 'Tue/Thu 14:00-15:50', loc: 'Wissink Hall 281', room: 'WH 281', inst: 'Dr. N. Zaman', type: 'In-Person', desc: 'Process scheduling, concurrency, virtual memory management, file systems, and Unix POSIX kernel API programming.' }
      ]
    },
    cit: {
      name: 'B.S. Computer Information Technology',
      college: 'College of Science, Engineering & Technology (CSET)',
      courses: [
        { code: 'IT 210-01', crn: '004720', title: 'Telecommunications & Enterprise Networking', cr: '4.0', times: 'Mon/Wed 10:00-11:50', loc: 'Wissink Hall 283', room: 'WH 283', inst: 'Prof. C. Adams', type: 'In-Person', desc: 'OSI reference model, TCP/IP protocol suite, VLANs, subnetting, enterprise routing, and network security.' },
        { code: 'IT 380-01', crn: '004735', title: 'Linux Server Administration & DevOps', cr: '4.0', times: 'Tue/Thu 12:00-13:50', loc: 'Wissink Hall 285', room: 'WH 285 Lab', inst: 'Dr. D. Keefe', type: 'In-Person', desc: 'Unix system architecture, shell scripting, service daemon management, Docker containers, and security hardening.' },
        { code: 'CIS 350-01', crn: '004750', title: 'Database Modeling & Query Optimization', cr: '4.0', times: 'Mon/Wed 14:00-15:50', loc: 'Wissink Hall 281', room: 'WH 281', inst: 'Dr. M. Lindholm', type: 'In-Person', desc: 'Relational database design, normalization, complex SQL, transaction management, and indexing strategies.' },
        { code: 'IT 440-01', crn: '004895', title: 'IT Project Management & Agile Systems', cr: '4.0', times: 'Tue/Thu 16:00-17:50', loc: 'Online Zoom Live', room: 'Trafton Science CSET', inst: 'Dr. S. K. Johnson', type: 'Online Sync', desc: 'Agile methodologies, sprint planning, project governance, risk mitigation, and team leadership in technical projects.' }
      ]
    },
    me: {
      name: 'B.S. Mechanical Engineering',
      college: 'College of Science, Engineering & Technology (CSET)',
      courses: [
        { code: 'ME 336-01', crn: '002462', title: 'Fluid Mechanics & Thermal Systems', cr: '4.0', times: 'Tue/Thu 09:00-10:50', loc: 'Trafton Science N-230', room: 'TR N-230 Lab', inst: 'Dr. J. Slotten', type: 'In-Person', desc: 'Continuity, momentum and energy equations, laminar and turbulent flow, boundary layers, and pipe friction losses.' },
        { code: 'ME 212-01', crn: '002450', title: 'Statics & Mechanics of Materials', cr: '3.0', times: 'Mon/Wed/Fri 11:00-11:50', loc: 'Trafton Science C-124', room: 'TR C-124', inst: 'Dr. P. Leckband', type: 'In-Person', desc: 'Equilibrium of force systems, shear and bending moment diagrams, stress and strain tensors, and axial deformation.' },
        { code: 'EE 281-01', crn: '003204', title: 'Circuits & Instrumentation for Engineers', cr: '5.0', times: 'Mon/Wed/Fri 13:00-13:50', loc: 'Trafton Science E-102', room: 'TR E-102 Lab', inst: 'Dr. H. Chen', type: 'In-Person', desc: 'DC and AC circuit laws, operational amplifiers, transducers, signal conditioning, and laboratory data acquisition.' },
        { code: 'PHYS 221-01', crn: '001980', title: 'General Physics I (Calculus-Based)', cr: '4.0', times: 'Mon/Wed/Fri 14:00-14:50', loc: 'Trafton Science S-110', room: 'TR S-110', inst: 'Dr. M. Roberts', type: 'In-Person', desc: 'Newtonian mechanics, work and kinetic energy, rotational dynamics, harmonic oscillations, and wave motion.' }
      ]
    },
    nurs: {
      name: 'B.S. Nursing (Pre-Licensure)',
      college: 'College of Allied Health & Nursing',
      courses: [
        { code: 'NURS 282-01', crn: '005120', title: 'Pathophysiology for Nursing Practice', cr: '3.0', times: 'Mon/Wed 08:30-09:50', loc: 'Clinical Sciences 210', room: 'CSB 210', inst: 'Prof. L. Young', type: 'In-Person', desc: 'Mechanisms of disease, cellular adaptation, immune response, and systemic organ dysfunctions across the lifespan.' },
        { code: 'NURS 386-01', crn: '005128', title: 'Health Assessment & Clinical Skills', cr: '4.0', times: 'Tue 08:00-12:00', loc: 'Wissink Hall Sim Lab', room: 'WH 101 Sim', inst: 'Dr. K. Miller', type: 'In-Person', desc: 'Systematic physical assessment techniques, patient interviewing, health history, and core bedside clinical interventions.' },
        { code: 'BIOL 220-01', crn: '001430', title: 'Human Anatomy & Physiology I', cr: '4.0', times: 'Mon/Wed/Fri 11:00-11:50', loc: 'Trafton Science S-104', room: 'TR S-104', inst: 'Dr. D. Sharlin', type: 'In-Person', desc: 'In-depth exploration of integumentary, skeletal, muscular, and nervous organ systems.' },
        { code: 'CHEM 111-01', crn: '001890', title: 'Chemistry of Life Processes', cr: '4.0', times: 'Tue/Thu 13:00-14:50', loc: 'Trafton Science N-112', room: 'TR N-112', inst: 'Dr. S. Trent', type: 'In-Person', desc: 'Chemical principles essential for understanding biological systems, metabolism, and pharmacokinetics.' }
      ]
    },
    av: {
      name: 'B.S. Aviation - Professional Flight',
      college: 'College of Science, Engineering & Technology (CSET)',
      courses: [
        { code: 'AVIA 150-01', crn: '006100', title: 'Private Pilot Flight Theory', cr: '3.0', times: 'Mon/Wed/Fri 09:00-09:50', loc: 'Armstrong Hall 204', room: 'AH 204', inst: 'Capt. T. Miller', type: 'In-Person', desc: 'Aerodynamics, FAA regulations, aircraft instruments, navigation charts, and aviation weather analysis.' },
        { code: 'AVIA 250-01', crn: '006115', title: 'Instrument Rating Ground School', cr: '3.0', times: 'Tue/Thu 10:00-11:15', loc: 'Armstrong Hall 206', room: 'AH 206', inst: 'Capt. R. Larson', type: 'In-Person', desc: 'IFR flight planning, approach procedures, ATC communications, and cockpit glass avionics.' },
        { code: 'MET 101-01', crn: '001550', title: 'Aviation Meteorology & Weather Hazards', cr: '3.0', times: 'Mon/Wed/Fri 11:00-11:50', loc: 'Trafton Science N-110', room: 'TR N-110', inst: 'Dr. M. Clark', type: 'In-Person', desc: 'Atmospheric thermodynamics, fronts, icing, severe thunderstorms, wind shear, and METAR/TAF forecasting.' },
        { code: 'MATH 112-01', crn: '001210', title: 'College Algebra & Trigonometry', cr: '4.0', times: 'Mon/Tue/Wed/Thu 13:00-13:50', loc: 'Armstrong Hall 101', room: 'AH 101', inst: 'Prof. S. Davis', type: 'In-Person', desc: 'Functions, vectors, trigonometric identities, and algebraic problem-solving for aviation applications.' },
        { code: 'AVIA 151-01', crn: '006105', title: 'Primary Flight Lab - Mankato Airport (MKT)', cr: '2.0', times: 'Tue/Thu 15:00-16:50', loc: 'Mankato Regional Airport', room: 'MKT Hangar 3', inst: 'MNSU Flight Instructors', type: 'Flight Lab', desc: 'Dual flight instruction in Piper Archer aircraft, stalls, cross-country navigation, and FAA private pilot checkride.' }
      ]
    },
    acct: {
      name: 'B.S. Accounting',
      college: 'College of Business',
      courses: [
        { code: 'ECON 201-01', crn: '007300', title: 'Principles of Microeconomics', cr: '3.0', times: 'Tue/Thu 09:30-10:45', loc: 'Armstrong Hall 310', room: 'AH 310', inst: 'Dr. R. Kelly', type: 'In-Person', desc: 'Market demand and supply, consumer utility, market structures, monopolies, and elasticity.' },
        { code: 'ACCT 200-01', crn: '007100', title: 'Financial Accounting Principles', cr: '3.0', times: 'Mon/Wed/Fri 10:00-10:50', loc: 'Morris Hall 210', room: 'MH 210', inst: 'Dr. B. Smith', type: 'In-Person', desc: 'Accounting cycle, financial statements, revenue recognition, assets valuation, and GAAP standards.' },
        { code: 'ACCT 300-01', crn: '007115', title: 'Intermediate Financial Accounting I', cr: '3.0', times: 'Tue/Thu 11:00-12:15', loc: 'Morris Hall 102', room: 'MH 102', inst: 'Dr. C. Paulson', type: 'In-Person', desc: 'In-depth balance sheet reporting, revenue recognition models, inventory costing, and time value of money.' },
        { code: 'BLAW 200-01', crn: '007204', title: 'Legal Environment of Business', cr: '3.0', times: 'Mon/Wed/Fri 13:00-13:50', loc: 'Morris Hall 105', room: 'MH 105', inst: 'Prof. J. Thompson', type: 'In-Person', desc: 'Contract law, torts, corporate governance, employment law, and ethical decision-making in business.' },
        { code: 'FINA 320-01', crn: '007410', title: 'Business Finance & Capital Budgeting', cr: '3.0', times: 'Mon/Wed/Fri 14:00-14:50', loc: 'Morris Hall 215', room: 'MH 215', inst: 'Dr. T. Miller', type: 'In-Person', desc: 'Corporate valuation, risk and return trade-offs, capital asset pricing model (CAPM), and working capital management.' }
      ]
    }
  }
};

export default mnsuConfig;
