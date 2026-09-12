import html2canvas from 'html2canvas';

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
