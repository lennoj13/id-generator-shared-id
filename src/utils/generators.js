import { getAcademicTermInfo, generateStudentDOB, parseCustomDOB } from './academicCalendar.js';

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
 */
export function generateStudentId(format = 'numeric8') {
  switch (format) {
    case 'starId':
      // MNSU StarID: 2 letters + 4 digits + 2 letters (e.g. cr4827rx)
      return `${randomLetter()}${randomLetter()}${randomDigits(4)}${randomLetter()}${randomLetter()}`;
    case 'harvardId':
      return randomDigits(8);
    case 'mitId':
      return `9${randomDigits(8)}`;
    case 'stanfordId':
      return `06${randomDigits(6)}`;
    case 'yaleId':
      return `9${randomDigits(8)}`;
    case 'oxfordId':
      return randomDigits(7);
    case 'berkeleyId':
      return `303${randomDigits(5)}`;
    case 'numeric8':
    default:
      return randomDigits(8);
  }
}

/** Generate a Tech ID / secondary ID based on format and student name. */
export function generateSecondaryId(format = 'numeric8', firstName = '', lastName = '') {
  const f = firstName.toLowerCase().replace(/[^a-z]/g, '') || 's';
  const l = lastName.toLowerCase().replace(/[^a-z]/g, '') || 'student';
  switch (format) {
    case 'username':
      return `${f}${l}`;
    case 'netId':
      return `${f}${l.slice(0, 2)}${randomDigits(3)}`;
    case 'sso':
      return `ox${randomDigits(4)}${randomLetter()}`;
    case 'numeric8':
    default:
      return randomDigits(8);
  }
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
 * Pick courses from a major's catalog.
 */
export function pickCourses(majorConfig) {
  return majorConfig.courses || [];
}

/** Sum total credits from a list of courses. */
export function totalCredits(courses) {
  return courses.reduce((sum, c) => sum + parseFloat(c.cr || 0), 0).toFixed(1);
}

/**
 * Build the full student data object from user input + template config.
 */
export function buildStudentData(
  firstName,
  lastName,
  customEmail,
  photoUrl,
  templateConfig,
  majorKey,
  customStudentId = null,
  customTechId = null,
  customDob = null,
  termOption = 'auto',
  customYear = null
) {
  const major = templateConfig.majors[majorKey] || Object.values(templateConfig.majors)[0];
  if (!major) return null;

  const studentId = customStudentId && customStudentId.trim()
    ? customStudentId.trim()
    : generateStudentId(templateConfig.idFormat || 'numeric8');
  const techId = customTechId && customTechId.trim()
    ? customTechId.trim()
    : generateSecondaryId(templateConfig.secondaryIdFormat || 'numeric8', firstName, lastName);

  // Compute academic term info based on calendar or selection
  const refYear = customYear ? parseInt(customYear, 10) : 2026;
  const termInfo = getAcademicTermInfo(refYear, termOption || 'auto', templateConfig);

  // Default to termInfo, but allow template config overrides if specified
  const term = (termOption === 'template' && templateConfig.term) ? templateConfig.term : termInfo.term;
  const termCode = (termOption === 'template' && templateConfig.termCode) ? templateConfig.termCode : termInfo.termCode;
  const termDates = (termOption === 'template' && templateConfig.termDates) ? templateConfig.termDates : termInfo.termDates;
  const enrollmentDate = (termOption === 'template' && templateConfig.enrollmentDate) ? templateConfig.enrollmentDate : termInfo.enrollmentDate;
  const recordDate = (termOption === 'template' && templateConfig.recordDate) ? templateConfig.recordDate : termInfo.recordDate;

  // Student Date of Birth (DOB)
  const dobObj = customDob ? (parseCustomDOB(customDob) || generateStudentDOB(refYear)) : generateStudentDOB(refYear);

  const email = customEmail || generateEmail(firstName, lastName, templateConfig.emailDomain);
  const courses = pickCourses(major);
  const credits = totalCredits(courses);
  const costPerCredit = templateConfig.costPerCredit || 405;
  const calculatedTuition = generateTuition(parseFloat(credits), costPerCredit);
  const tuition = templateConfig.tuitionFlat || calculatedTuition;

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`.toUpperCase(),
    email,
    studentId,
    techId,
    dob: dobObj.formatted,
    dobShort: dobObj.short,
    dobIso: dobObj.iso,
    enrollmentId: generateEnrollmentId(termCode, techId),
    paymentRef: generatePaymentRef(termCode, techId),
    statementNumber: `STMT-${termCode}-${techId}`,
    receiptNumber: `REC-${termCode}-${techId}`,
    majorName: major.name,
    collegeName: major.college,
    term,
    termCode,
    termDates,
    enrollmentDate,
    recordDate,
    tuitionPaymentDate: termInfo.tuitionPaymentDate,
    statementDate: termInfo.statementDate,
    idIssuedDate: termInfo.idIssuedDate,
    idExpiryDate: termInfo.idExpiryDate,
    courses,
    totalCredits: credits,
    costPerCredit,
    tuition,
    balanceDue: '$0.00 USD',
    paymentMethod: 'Electronic Check (ACH / e-Check)',
    paymentConfirmation: `CONF-${termCode}-${randomDigits(6)}`,
    status: `Enrolled • Full-Time (${credits} Credits)`,
    paymentStatus: 'PAID IN FULL',
    accountStatus: 'PAID IN FULL • GOOD FINANCIAL STANDING',
    photoUrl: photoUrl || null,
  };
}
