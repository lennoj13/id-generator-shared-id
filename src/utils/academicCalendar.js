/**
 * Academic Calendar & Dynamic Term Calculator
 * Calculates realistic academic terms, registration deadlines, census dates,
 * tuition payment dates, and student ID expiration dates based on authentic
 * university calendar structures across any given year.
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Format a Date object into 'Month DD, YYYY' (e.g. 'September 7, 2026')
 */
export function formatFullDate(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) return '';
  const month = MONTH_NAMES[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

/**
 * Format a Date object into 'MM/DD/YYYY' (e.g. '09/07/2026')
 */
export function formatShortDate(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) return '';
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

/**
 * Format a Date object into 'MM/YYYY' (e.g. '08/2026')
 */
export function formatMonthYear(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) return '';
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${yyyy}`;
}

/**
 * Calculate realistic academic term parameters for a given date or year.
 *
 * Real University Cycles (North America & UK):
 * - Fall Semester: Late August to Mid-December.
 *   - Enrollment: ~August 17
 *   - Classes Start: ~August 24
 *   - Census / Record Date (Add/Drop deadline): First Monday after start, ~September 7
 *   - Term Ends: ~December 11
 *   - ID Card Issued: 08/YYYY, Expires: 08/(YYYY+1) (1 full academic year)
 *
 * - Spring Semester: Early/Mid January to Early May.
 *   - Enrollment: ~January 5
 *   - Classes Start: ~January 11
 *   - Census / Record Date: ~January 25
 *   - Term Ends: ~May 7
 *   - ID Card Issued: 01/YYYY, Expires: 01/(YYYY+1)
 *
 * - Summer Term: Early June to Early August.
 *   - Enrollment: ~May 20
 *   - Classes Start: ~June 1
 *   - Census / Record Date: ~June 10
 *   - Term Ends: ~August 7
 *
 * @param {Date|string|number} inputDate - Reference date, year, or ISO string.
 * @param {string} termOverride - 'auto', 'fall', 'spring', or 'summer'.
 * @param {object} templateConfig - University config with optional static fallbacks.
 * @returns {object} Academic term metadata
 */
export function getAcademicTermInfo(inputDate = new Date(), termOverride = 'auto', templateConfig = null) {
  let refDate = new Date();
  if (typeof inputDate === 'number') {
    refDate = new Date(inputDate, 8, 1); // default to September of that year
  } else if (inputDate instanceof Date && !isNaN(inputDate.getTime())) {
    refDate = inputDate;
  } else if (typeof inputDate === 'string' && inputDate.trim()) {
    const parsed = new Date(inputDate);
    if (!isNaN(parsed.getTime())) refDate = parsed;
  }

  const year = refDate.getFullYear();
  const month = refDate.getMonth(); // 0-indexed: 0 = Jan, 7 = Aug, 8 = Sep, 11 = Dec

  // Determine term type
  let termType = termOverride.toLowerCase();
  if (termType === 'auto') {
    if (month >= 7 && month <= 11) {
      termType = 'fall'; // Aug - Dec
    } else if (month >= 0 && month <= 4) {
      termType = 'spring'; // Jan - May
    } else {
      termType = 'summer'; // Jun - Jul
    }
  }

  const year2Digits = String(year).slice(-2);

  if (termType === 'fall') {
    const termCode = `F${year2Digits}`;
    const termName = `Fall Semester ${year}`;
    const startDate = new Date(year, 7, 24); // Aug 24
    const endDate = new Date(year, 11, 11);  // Dec 11
    const enrollmentDate = new Date(year, 7, 17); // Aug 17
    const recordDate = new Date(year, 8, 7);      // Sep 7 (Census / Add-Drop)
    const tuitionPaymentDate = new Date(year, 7, 17); // Same as enrollment deadline
    const statementDate = new Date(year, 8, 7);
    const idIssuedDate = `08/${year}`;
    const idExpiryDate = `08/${year + 1}`; // Valid for 1 academic year

    return {
      termType: 'fall',
      term: termName,
      termCode,
      academicYear: `${year} - ${year + 1}`,
      termDates: `${formatFullDate(startDate)} – ${formatFullDate(endDate)}`,
      startDate: formatFullDate(startDate),
      endDate: formatFullDate(endDate),
      enrollmentDate: formatFullDate(enrollmentDate),
      recordDate: formatFullDate(recordDate),
      tuitionPaymentDate: formatFullDate(tuitionPaymentDate),
      statementDate: formatFullDate(statementDate),
      idIssuedDate,
      idExpiryDate,
      daysConfirmedBadge: `Registered courses confirmed for ${termName}`
    };
  }

  if (termType === 'spring') {
    const termCode = `S${year2Digits}`;
    const termName = `Spring Semester ${year}`;
    const startDate = new Date(year, 0, 11); // Jan 11
    const endDate = new Date(year, 4, 7);    // May 7
    const enrollmentDate = new Date(year, 0, 5);  // Jan 5
    const recordDate = new Date(year, 0, 25);     // Jan 25
    const tuitionPaymentDate = new Date(year, 0, 5);
    const statementDate = new Date(year, 0, 25);
    const idIssuedDate = `01/${year}`;
    const idExpiryDate = `01/${year + 1}`;

    return {
      termType: 'spring',
      term: termName,
      termCode,
      academicYear: `${year - 1} - ${year}`,
      termDates: `${formatFullDate(startDate)} – ${formatFullDate(endDate)}`,
      startDate: formatFullDate(startDate),
      endDate: formatFullDate(endDate),
      enrollmentDate: formatFullDate(enrollmentDate),
      recordDate: formatFullDate(recordDate),
      tuitionPaymentDate: formatFullDate(tuitionPaymentDate),
      statementDate: formatFullDate(statementDate),
      idIssuedDate,
      idExpiryDate,
      daysConfirmedBadge: `Registered courses confirmed for ${termName}`
    };
  }

  // Summer Term
  const termCode = `U${year2Digits}`;
  const termName = `Summer Term ${year}`;
  const startDate = new Date(year, 5, 1);  // Jun 1
  const endDate = new Date(year, 7, 7);   // Aug 7
  const enrollmentDate = new Date(year, 4, 20); // May 20
  const recordDate = new Date(year, 5, 10);     // Jun 10
  const tuitionPaymentDate = new Date(year, 4, 20);
  const statementDate = new Date(year, 5, 10);
  const idIssuedDate = `05/${year}`;
  const idExpiryDate = `05/${year + 1}`;

  return {
    termType: 'summer',
    term: termName,
    termCode,
    academicYear: `${year - 1} - ${year}`,
    termDates: `${formatFullDate(startDate)} – ${formatFullDate(endDate)}`,
    startDate: formatFullDate(startDate),
    endDate: formatFullDate(endDate),
    enrollmentDate: formatFullDate(enrollmentDate),
    recordDate: formatFullDate(recordDate),
    tuitionPaymentDate: formatFullDate(tuitionPaymentDate),
    statementDate: formatFullDate(statementDate),
    idIssuedDate,
    idExpiryDate,
    daysConfirmedBadge: `Registered courses confirmed for ${termName}`
  };
}

/**
 * Generate a realistic university student birth date (typically 19-23 years old).
 */
export function generateStudentDOB(referenceYear = 2026) {
  // Student between 20 and 22 years old
  const birthYear = referenceYear - (20 + Math.floor(Math.random() * 3));
  const birthMonth = Math.floor(Math.random() * 12);
  const birthDay = 1 + Math.floor(Math.random() * 28);
  const dobDate = new Date(birthYear, birthMonth, birthDay);

  return {
    raw: dobDate,
    iso: `${birthYear}-${String(birthMonth + 1).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`,
    formatted: formatFullDate(dobDate), // e.g. "April 15, 2004"
    short: formatShortDate(dobDate)     // e.g. "04/15/2004"
  };
}

/**
 * Format user-provided DOB string (e.g. "2004-04-15") into full and short formats.
 */
export function parseCustomDOB(dobString) {
  if (!dobString || typeof dobString !== 'string') return null;
  const parts = dobString.split(/[-/]/);
  if (parts.length !== 3) return null;

  let y, m, d;
  if (parts[0].length === 4) {
    // YYYY-MM-DD
    y = parseInt(parts[0], 10);
    m = parseInt(parts[1], 10) - 1;
    d = parseInt(parts[2], 10);
  } else {
    // MM/DD/YYYY
    m = parseInt(parts[0], 10) - 1;
    d = parseInt(parts[1], 10);
    y = parseInt(parts[2], 10);
  }

  const dateObj = new Date(y, m, d);
  if (isNaN(dateObj.getTime())) return null;

  return {
    raw: dateObj,
    iso: `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    formatted: formatFullDate(dateObj),
    short: formatShortDate(dateObj)
  };
}
