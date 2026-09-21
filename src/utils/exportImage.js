import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Capture a DOM element as a PNG and trigger a download.
 * @param {HTMLElement} element - The DOM node to capture.
 * @param {string} filename - The download filename (without extension).
 * @param {object} options - Optional overrides for html2canvas.
 */
export async function downloadElementAsImage(element, filename = 'download', options = {}) {
  if (!element) throw new Error('No element provided for capture.');

  const canvas = await html2canvas(element, {
    scale: 2, // retina quality
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    ...options,
  });

  const link = document.createElement('a');
  link.download = `${filename}.jpg`;
  link.href = canvas.toDataURL('image/jpeg', 1.0);
  link.click();
}

/**
 * Capture a DOM element and return a blob URL (for preview thumbnails).
 */
export async function captureElementAsBlob(element, options = {}) {
  if (!element) return null;

  const canvas = await html2canvas(element, {
    scale: 1.5,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    ...options,
  });

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob ? URL.createObjectURL(blob) : null);
    }, 'image/jpeg', 1.0);
  });
}

/**
 * Capture a DOM element and download it as a PDF.
 */
export async function downloadElementAsPDF(element, filename = 'download', options = {}) {
  if (!element) throw new Error('No element provided for capture.');

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    ...options,
  });

  const imgData = canvas.toDataURL('image/jpeg', 1.0);
  
  // Create a PDF with dimensions matching the canvas ratio
  // Decide whether to use portrait or landscape based on the image aspect ratio
  const orientation = canvas.width > canvas.height ? 'landscape' : 'portrait';
  
  const pdf = new jsPDF({
    orientation: orientation,
    unit: 'mm',
    format: 'a4'
  });
  
  // If we want it to fit perfectly inside the PDF page (or multiple pages)
  // Let's just scale the image to fit the first page
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
  const finalWidth = canvas.width * ratio;
  const finalHeight = canvas.height * ratio;
  
  // Center it
  const marginX = (pdfWidth - finalWidth) / 2;
  const marginY = (pdfHeight - finalHeight) / 2;

  pdf.addImage(imgData, 'JPEG', marginX, marginY, finalWidth, finalHeight);
  pdf.save(`${filename}.pdf`);
}
