import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const qrcode = require('qrcode-rs');

type QRCodeResult = {
  qrcode: ArrayBuffer;
};

export function generateQRCode(data: string): QRCodeResult {
  return qrcode.createQrcode(data);
}