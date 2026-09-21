/**
 * Yale University — Template Configuration
 * Yale Blue & Ivy League collegiate aesthetic
 */
const yaleConfig = {
  id: 'yale',
  name: 'Yale University',
  shortName: 'Yale',
  location: 'New Haven, Connecticut',
  tagline: 'Lux et Veritas — Light and Truth',
  logoUrl: '/logos/yale.svg',
  colors: {
    primary: '#00356B',
    primaryDark: '#00254D',
    primaryDeep: '#001A36',
    accent: '#286DC0',
    accentLight: '#EDF4FC',
    accentSoft: '#F6F9FD',
  },
  emailDomain: 'yale.edu',
  idFormat: 'yaleId',
  idLabel: 'Yale ID',
  secondaryIdLabel: 'NetID',
  secondaryIdFormat: 'netId',
  term: 'Fall Term 2026',
  termCode: 'F26',
  termDates: 'August 26, 2026 – December 18, 2026',
  enrollmentDate: 'August 21, 2026',
  costPerCredit: 1,
  tuitionFlat: '$64,700.00',
  registrarOffice: 'Office of the University Registrar',
  registrarPhone: '(203) 432-2330',
  helpDesk: 'Yale ITS Help Desk: (203) 432-9000',
  portalName: 'Yale Hub Portal',

  majors: {
    cs: {
      name: 'B.S. Computer Science',
      college: 'Yale College / Department of Computer Science',
      courses: [
        { code: 'CPSC 223', crn: '10482', title: 'Data Structures and Programming Techniques', cr: '1.0', times: 'Mon/Wed/Fri 10:30-11:20', loc: 'Dunham Laboratory 220', room: 'DL 220', inst: 'Prof. James Aspnes', type: 'In-Person', desc: 'Topics include linked lists, trees, hash tables, graphs, searching, sorting, and complexity.' },
        { code: 'CPSC 323', crn: '10512', title: 'Introduction to Systems Programming & OS', cr: '1.0', times: 'Tue/Thu 13:00-14:15', loc: 'Arthur K. Watson Hall 102', room: 'AKW 102', inst: 'Prof. Stanley Eisenstat', type: 'In-Person', desc: 'Machine architecture, assembly language, memory hierarchy, system calls, multi-threading.' },
        { code: 'CPSC 467', crn: '10634', title: 'Cryptography and Computer Security', cr: '1.0', times: 'Mon/Wed 14:30-15:45', loc: 'Davies Auditorium B12', room: 'Davies Aud', inst: 'Prof. Michael Fischer', type: 'In-Person', desc: 'Symmetric encryption, RSA, digital signatures, hash functions, zero-knowledge protocols.' },
        { code: 'MATH 225', crn: '10190', title: 'Linear Algebra and Matrix Theory', cr: '1.0', times: 'Mon/Wed/Fri 09:25-10:15', loc: 'Linsly-Chittenden Hall 101', room: 'LC 101', inst: 'Prof. Alexander Goncharov', type: 'In-Person', desc: 'Vector spaces, linear transformations, determinants, eigenvalues, inner products.' }
      ]
    },
    pli: {
      name: 'B.A. Political Science & Global Affairs',
      college: 'Yale College / Jackson School of Global Affairs',
      courses: [
        { code: 'PLSC 114', crn: '12100', title: 'Introduction to Political Philosophy', cr: '1.0', times: 'Tue/Thu 10:30-11:20', loc: 'William L. Harkness Hall 201', room: 'WLH 201', inst: 'Prof. Bryan Garsten', type: 'In-Person', desc: 'Foundations of democratic governance, justice, liberty, and the social contract.' },
        { code: 'PLSC 116', crn: '12150', title: 'Comparative Politics in a Global Era', cr: '1.0', times: 'Mon/Wed 13:30-14:20', loc: 'Yale Science Building OML 202', room: 'OML 202', inst: 'Prof. Frances Rosenbluth', type: 'In-Person', desc: 'Institutions, political culture, regime transitions, and party systems around the world.' },
        { code: 'GLBL 101', crn: '13200', title: 'Gateway to Global Affairs: Policy & Diplomacy', cr: '1.0', times: 'Tue/Thu 14:30-15:45', loc: 'Horchow Hall 105', room: 'Horchow 105', inst: 'Ambassador Harry Thomas', type: 'In-Person', desc: 'International law, statecraft, multilateral peacekeeping, and global economic coordination.' },
        { code: 'ECON 115', crn: '11050', title: 'Introductory Microeconomics', cr: '1.0', times: 'Mon/Wed/Fri 11:30-12:20', loc: 'Sheffield-Sterling-Strathcona 114', room: 'SSS 114', inst: 'Prof. Cormac O’Dea', type: 'In-Person', desc: 'Supply and demand, consumer choice, market failures, taxation, and international trade.' }
      ]
    },
    bme: {
      name: 'B.S. Biomedical Engineering',
      college: 'Yale School of Engineering & Applied Science',
      courses: [
        { code: 'BENG 249', crn: '14100', title: 'Introduction to Biomedical Engineering', cr: '1.0', times: 'Mon/Wed/Fri 09:25-10:15', loc: 'Mason Laboratory 211', room: 'Mason 211', inst: 'Prof. Mark Saltzman', type: 'In-Person', desc: 'Biomaterials, tissue engineering, drug delivery systems, and biomedical imaging.' },
        { code: 'BENG 355', crn: '14210', title: 'Physiological Systems & Cellular Transport', cr: '1.0', times: 'Tue/Thu 11:30-12:45', loc: 'Malone Engineering Center 228', room: 'MEC 228', inst: 'Prof. Laura Niklason', type: 'In-Person', desc: 'Quantitative analysis of cardiovascular, respiratory, renal, and endocrine physiology.' },
        { code: 'CHEM 161', crn: '15010', title: 'General Chemistry I: Structure & Bonding', cr: '1.0', times: 'Mon/Wed/Fri 11:30-12:20', loc: 'Sterling Chemistry Lab 110', room: 'SCL 110', inst: 'Prof. Patrick Vaccaro', type: 'In-Person', desc: 'Quantum mechanics, atomic structure, periodic trends, molecular geometry, and thermodynamics.' },
        { code: 'ENAS 194', crn: '14050', title: 'Ordinary and Partial Differential Equations', cr: '1.0', times: 'Mon/Wed/Fri 13:30-14:20', loc: 'Dunham Laboratory 107', room: 'DL 107', inst: 'Prof. Corey O’Hern', type: 'In-Person', desc: 'Differential equations, Laplace transforms, Fourier series, and boundary value problems.' }
      ]
    }
  }
};

export default yaleConfig;
