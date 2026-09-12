/**
 * Massachusetts Institute of Technology — Template Configuration
 * MIT Red & Gray engineering aesthetic
 */
const mitConfig = {
  id: 'mit',
  name: 'Massachusetts Institute of Technology',
  shortName: 'MIT',
  location: 'Cambridge, Massachusetts',
  tagline: 'Mens et Manus — Mind and Hand',
  logoUrl: '/logos/mit.jpg',
  colors: {
    primary: '#A31F34',
    primaryDark: '#8A1A2B',
    primaryDeep: '#750E21',
    accent: '#8A8B8C',
    accentLight: '#C2C0BF',
    accentSoft: '#F5F5F5',
  },
  emailDomain: 'mit.edu',
  idFormat: 'mitId',
  idLabel: 'MIT ID',
  secondaryIdLabel: 'Kerberos',
  term: 'Fall Semester 2026',
  termCode: 'F26',
  termDates: 'September 8, 2026 – December 11, 2026',
  enrollmentDate: 'September 1, 2026',
  costPerCredit: 1,
  tuitionFlat: '$59,750.00',
  registrarOffice: "Registrar's Office",
  registrarPhone: '(617) 253-4781',
  helpDesk: 'IS&T Help: (617) 253-1101',
  portalName: 'WebSIS Portal',

  majors: {
    course6: {
      name: 'S.B. Electrical Engineering and Computer Science (Course 6-2)',
      college: 'MIT School of Engineering — EECS',
      courses: [
        { code: '6.1800', crn: '22100', title: 'Computer Systems Engineering', cr: '12', times: 'Mon/Wed/Fri 10:00-11:00', loc: 'Building 32-123', room: '32-123 (Stata)', inst: 'Prof. M. Frans Kaashoek', type: 'Lecture + Lab', desc: 'Design of computer systems: operating systems, networking, distributed systems, and fault tolerance.' },
        { code: '6.1220', crn: '22050', title: 'Design and Analysis of Algorithms', cr: '12', times: 'Tue/Thu 11:00-12:30', loc: 'Building 26-100', room: '26-100 (Compton)', inst: 'Prof. Erik Demaine', type: 'Lecture', desc: 'Techniques for algorithm design, complexity analysis, NP-completeness, approximation algorithms.' },
        { code: '6.3900', crn: '22200', title: 'Introduction to Machine Learning', cr: '12', times: 'Mon/Wed 14:00-15:30', loc: 'Building 34-101', room: '34-101', inst: 'Prof. Tommi Jaakkola', type: 'Lecture + Lab', desc: 'Supervised and unsupervised learning, neural networks, reinforcement learning, and generalization.' },
        { code: '18.06', crn: '20100', title: 'Linear Algebra', cr: '12', times: 'Mon/Wed/Fri 09:00-10:00', loc: 'Building 10-250', room: '10-250 (Walker)', inst: 'Prof. Gilbert Strang', type: 'Lecture', desc: 'Systems of equations, vector spaces, eigenvalues, positive definite matrices, and singular value decomposition.' }
      ]
    },
    course2: {
      name: 'S.B. Mechanical Engineering (Course 2)',
      college: 'MIT School of Engineering — MechE',
      courses: [
        { code: '2.001', crn: '23010', title: 'Mechanics and Materials I', cr: '12', times: 'Mon/Wed/Fri 11:00-12:00', loc: 'Building 1-190', room: '1-190', inst: 'Prof. Simona Socrate', type: 'Lecture', desc: 'Stress, strain, elasticity, beam bending, torsion, and material failure criteria.' },
        { code: '2.006', crn: '23050', title: 'Thermal-Fluids Engineering II', cr: '12', times: 'Tue/Thu 09:30-11:00', loc: 'Building 3-270', room: '3-270', inst: 'Prof. John Lienhard', type: 'Lecture + Lab', desc: 'Heat transfer, thermodynamic cycles, fluid dynamics, and energy conversion systems.' },
        { code: '2.670', crn: '23090', title: 'Mechanical Engineering Tools', cr: '6', times: 'Tue/Thu 14:00-16:00', loc: 'Building 35-520', room: '35-520 (Pappalardo)', inst: 'Prof. David Hardt', type: 'Lab', desc: 'Machine shop practice, CNC machining, measurement, and mechanical prototyping.' },
        { code: '2.004', crn: '23040', title: 'Dynamics and Control II', cr: '12', times: 'Mon/Wed/Fri 13:00-14:00', loc: 'Building 1-190', room: '1-190', inst: 'Prof. Kamal Youcef-Toumi', type: 'Lecture', desc: 'State-space control, stability, frequency response, PID control, and robotics applications.' }
      ]
    },
    course18: {
      name: 'S.B. Mathematics (Course 18)',
      college: 'MIT School of Science — Mathematics',
      courses: [
        { code: '18.100B', crn: '20200', title: 'Real Analysis', cr: '12', times: 'Mon/Wed/Fri 10:00-11:00', loc: 'Building 2-190', room: '2-190', inst: 'Prof. Larry Guth', type: 'Lecture', desc: 'Metric spaces, continuity, differentiation, Riemann-Stieltjes integral, and sequences of functions.' },
        { code: '18.701', crn: '20350', title: 'Algebra I', cr: '12', times: 'Tue/Thu 11:00-12:30', loc: 'Building 4-231', room: '4-231', inst: 'Prof. Bjorn Poonen', type: 'Lecture', desc: 'Group theory, ring theory, field extensions, and Galois theory.' },
        { code: '18.901', crn: '20400', title: 'Introduction to Topology', cr: '12', times: 'Mon/Wed 14:00-15:30', loc: 'Building 2-131', room: '2-131', inst: 'Prof. Haynes Miller', type: 'Lecture', desc: 'Topological spaces, connectedness, compactness, fundamental group, and covering spaces.' },
        { code: '18.650', crn: '20320', title: 'Fundamentals of Statistics', cr: '12', times: 'Tue/Thu 13:00-14:30', loc: 'Building 4-163', room: '4-163', inst: 'Prof. Philippe Rigollet', type: 'Lecture', desc: 'Statistical models, estimation, hypothesis testing, confidence intervals, and Bayesian inference.' }
      ]
    },
    course8: {
      name: 'S.B. Physics (Course 8)',
      college: 'MIT School of Science — Physics',
      courses: [
        { code: '8.04', crn: '21100', title: 'Quantum Physics I', cr: '12', times: 'Mon/Wed/Fri 10:00-11:00', loc: 'Building 6-120', room: '6-120', inst: 'Prof. Barton Zwiebach', type: 'Lecture', desc: 'Wave mechanics, Schrödinger equation, hydrogen atom, angular momentum, and spin.' },
        { code: '8.033', crn: '21050', title: 'Relativity', cr: '12', times: 'Tue/Thu 09:30-11:00', loc: 'Building 26-152', room: '26-152', inst: 'Prof. Jesse Thaler', type: 'Lecture', desc: 'Special relativity, Lorentz transformations, relativistic dynamics, and introduction to general relativity.' },
        { code: '8.321', crn: '21200', title: 'Quantum Theory I (Graduate)', cr: '12', times: 'Mon/Wed 14:00-15:30', loc: 'Building 4-231', room: '4-231', inst: 'Prof. Hong Liu', type: 'Lecture', desc: 'Hilbert spaces, observables, time evolution, symmetries, angular momentum, and identical particles.' },
        { code: '8.13', crn: '21080', title: 'Experimental Physics I', cr: '6', times: 'Thu 14:00-17:00', loc: 'Building 4-357', room: '4-357 (Junior Lab)', inst: 'Prof. Gunther Roland', type: 'Lab', desc: 'Advanced experimental techniques: Compton scattering, Mössbauer effect, optical pumping, and particle detection.' }
      ]
    }
  }
};

export default mitConfig;
