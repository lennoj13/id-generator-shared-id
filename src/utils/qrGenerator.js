import QRCode from 'qrcode';

/**
 * Generate a QR code as a data URL (base64 PNG).
 * Encodes authentic student record metadata that strictly matches
 * the IDs, name, major, email, and term generated on the Schedule and ID card.
 *
 * @param {object} studentData - The generated student data object.
 * @param {object} config - The university template config.
 * @returns {Promise<string>} A data URL (base64 PNG) of the QR code.
 */
export async function generateStudentQR(studentData, config) {
  if (!studentData || !config) return null;

  const tag = (config.shortName || config.id || 'UNIV').toUpperCase().replace(/\s+/g, '');

  const qrText = [
    `${tag}-STUDENT-RECORD`,
    `ID: ${studentData.techId}`,
    `${(config.idLabel || 'ID').toUpperCase()}: ${studentData.studentId}`,
    `NAME: ${studentData.fullName}`,
    ...(studentData.dobShort || studentData.dob ? [`DOB: ${studentData.dobShort || studentData.dob}`] : []),
    `PROGRAM: ${studentData.majorName}`,
    `EMAIL: ${studentData.email}`,
    `TERM: ${studentData.termCode || config.termCode || 'F26'}`,
    ...(studentData.receiptNumber ? [`RECEIPT: ${studentData.receiptNumber}`] : []),
    `STATUS: ENROLLED`,
  ].join('\n');

  try {
    const dataUrl = await QRCode.toDataURL(qrText, {
      width: 400,
      margin: 1,
      color: {
        dark: '#000000',
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
