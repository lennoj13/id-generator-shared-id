/**
 * Fake data generators for student records.
 * Each function produces realistic-looking but entirely fictional data.
 */

/** Generate a university email from first + last name and domain. */
export function generateEmail(firstName, lastName, domain) {
  const f = firstName.toLowerCase().replace(/[^a-z]/g, '');
  const l = lastName.toLowerCase().replace(/[^a-z]/g, '');
  return `${f}.${l}@${domain}`;
}

/** Generate a random numeric string of given length. */
function randomDigits(len) {
  let s = '';
  for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10);
  return s;
}

/** Random lowercase letter. */
function randomLetter() {
  return String.fromCharCode(97 + Math.floor(Math.random() * 26));
}

/**
 * Generate a student ID in a university-specific format.
 * Formats: 'starId' (ab1234cd), 'numeric8' (12345678), 'harvardId' (12345678), 'mitId' (912345678)
 */
export function generateStudentId(format = 'numeric8') {
  switch (format) {
    case 'starId': {
      // MNSU StarID: 2 letters + 4 digits + 2 letters
      return `${randomLetter()}${randomLetter()}${randomDigits(4)}${randomLetter()}${randomLetter()}`;
    }
    case 'harvardId':
      return randomDigits(8);
    case 'mitId':
      return `9${randomDigits(8)}`;
    case 'numeric8':
    default:
      return randomDigits(8);
  }
}

/** Generate a Tech ID / secondary ID. */
export function generateTechId() {
  return randomDigits(8);
}

/** Generate an enrollment ID. */
export function generateEnrollmentId(termCode, techId) {
  return `ENR-${termCode}-${techId}`;
}

/** Generate a payment reference. */
export function generatePaymentRef(termCode, techId) {
  return `PAY-${termCode}-${techId}`;
}

/** Calculate tuition total. */
export function generateTuition(totalCredits, costPerCredit) {
  return (totalCredits * costPerCredit).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

/**
 * Pick random courses from a major's catalog to fill a schedule.
 * Returns an array of course objects.
 */
export function pickCourses(majorConfig) {
  // Return all courses for the selected major (they are pre-designed to fit a schedule)
  return majorConfig.courses || [];
}

/** Sum total credits from a list of courses. */
export function totalCredits(courses) {
  return courses.reduce((sum, c) => sum + parseFloat(c.cr || 0), 0).toFixed(1);
}

/**
 * Build the full student data object from user input + template config.
 */
export function buildStudentData(firstName, lastName, customEmail, photoUrl, templateConfig, majorKey) {
  const major = templateConfig.majors[majorKey];
  if (!major) return null;

  const studentId = generateStudentId(templateConfig.idFormat || 'numeric8');
  const techId = generateTechId();
  const termCode = templateConfig.termCode || 'F26';
  const email = customEmail || generateEmail(firstName, lastName, templateConfig.emailDomain);
  const courses = pickCourses(major);
  const credits = totalCredits(courses);
  const tuition = generateTuition(parseFloat(credits), templateConfig.costPerCredit || 405);

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.toUpperCase(),
    email,
    studentId,
    techId,
    enrollmentId: generateEnrollmentId(termCode, techId),
    paymentRef: generatePaymentRef(termCode, techId),
    majorName: major.name,
    collegeName: major.college,
    term: templateConfig.term || 'Fall Semester 2026',
    termDates: templateConfig.termDates || 'August 24, 2026 – December 11, 2026',
    enrollmentDate: templateConfig.enrollmentDate || 'August 17, 2026',
    recordDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    courses,
    totalCredits: credits,
    tuition,
    status: `Enrolled • Full-Time (${credits} Credits)`,
    paymentStatus: 'PAID IN FULL',
    photoUrl: photoUrl || null,
  };
}
