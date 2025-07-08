import Tesseract from 'tesseract.js';

export async function ocrImage(imageBuffer) {
  const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');
  return text;
}