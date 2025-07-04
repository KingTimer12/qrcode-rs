import fs from 'fs'
import { generateQRCode } from 'qrcode-rs'

const data = 'https://github.com/KingTimer12/qrcode-rs'
console.log('Generating QR code for:', data)
const { qrcode } = generateQRCode(data)
console.log('QR code generated successfully')
fs.writeFileSync('qrcode.png', qrcode)
console.log('QR code generated and saved as qrcode.png')
