import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const qrcode = require('../index.node');

type QRCodeResult = {
  qrcode: ArrayBuffer;
};

export function generateQRCode(data: string): QRCodeResult {
  return qrcode.generateQRCode(data);
}
