import QRCode from 'qrcode';

/**
 * Generate a QR code as a data URL (base64 PNG).
 * The QR encodes student data in the same format as the original:
 *
 *   {UNIVERSITY_TAG}-STUDENT
 *   ID: {techId}
 *   {ID_LABEL}: {studentId}
 *   NAME: {fullName}
 *   PROGRAM: {majorName}
 *   EMAIL: {email}
 *   TERM: {termCode}
 *   STATUS: ENROLLED
 *
 * @param {object} studentData - The generated student data object.
 * @param {object} config - The university template config.
 * @returns {Promise<string>} A data URL (base64 PNG) of the QR code.
 */
export async function generateStudentQR(studentData, config) {
  const tag = config.shortName.toUpperCase().replace(/\s+/g, '');

  const qrText = [
    `${tag}-STUDENT`,
    `ID: ${studentData.techId}`,
    `${config.idLabel.toUpperCase()}: ${studentData.studentId}`,
    `NAME: ${studentData.fullName}`,
    `PROGRAM: ${studentData.majorName}`,
    `EMAIL: ${studentData.email}`,
    `TERM: ${config.termCode}`,
    `STATUS: ENROLLED`,
  ].join('\n');

  try {
    const dataUrl = await QRCode.toDataURL(qrText, {
      width: 200,
      margin: 1,
      color: {
        dark: config.colors.primary,
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });
    return dataUrl;
  } catch (err) {
    console.error('QR generation failed:', err);
    return null;
  }
}
