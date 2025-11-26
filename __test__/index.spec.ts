import test from 'ava'
import { writeFileSync, unlinkSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import { generateQRCode } from '../index'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

test('generateQRCode deve retornar um Buffer', (t) => {
  const result = generateQRCode('Hello World')
  t.true(Buffer.isBuffer(result))
})

test('generateQRCode deve gerar QR Code válido', (t) => {
  const result = generateQRCode('https://github.com')

  // Verifica se é um Buffer
  t.true(Buffer.isBuffer(result))

  // Verifica se tem conteúdo
  t.true(result.length > 0)

  // Verifica assinatura PNG (primeiros bytes devem ser: 89 50 4E 47)
  t.is(result[0], 0x89)
  t.is(result[1], 0x50)
  t.is(result[2], 0x4e)
  t.is(result[3], 0x47)
})

test('generateQRCode deve aceitar diferentes tipos de dados', (t) => {
  const testCases = [
    'texto simples',
    'https://example.com',
    'email@example.com',
    '{"json": "data"}',
    '12345',
    'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;',
  ]

  testCases.forEach((data) => {
    const result = generateQRCode(data)
    t.true(Buffer.isBuffer(result))
    t.true(result.length > 0)
  })
})

test('generateQRCode deve gerar QR Codes diferentes para dados diferentes', (t) => {
  const qr1 = generateQRCode('Data 1')
  const qr2 = generateQRCode('Data 2')

  t.true(Buffer.isBuffer(qr1))
  t.true(Buffer.isBuffer(qr2))
  t.false(qr1.equals(qr2))
})

test('generateQRCode deve gerar QR Codes iguais para mesmos dados', (t) => {
  const data = 'Same Data'
  const qr1 = generateQRCode(data)
  const qr2 = generateQRCode(data)

  t.true(qr1.equals(qr2))
})

test('generateQRCode deve conseguir salvar arquivo PNG', (t) => {
  const testFile = join(__dirname, 'test-qrcode.png')

  try {
    const qrCode = generateQRCode('Test Save File')
    writeFileSync(testFile, qrCode)

    // Verifica se o arquivo foi criado
    t.true(existsSync(testFile))

    // Verifica se o arquivo tem tamanho maior que 0
    t.true(qrCode.length > 0)
  } finally {
    // Limpa o arquivo de teste
    if (existsSync(testFile)) {
      unlinkSync(testFile)
    }
  }
})

test('generateQRCode deve funcionar com strings vazias', (t) => {
  const result = generateQRCode('')
  t.true(Buffer.isBuffer(result))
  t.true(result.length > 0)
})

test('generateQRCode deve funcionar com textos longos', (t) => {
  const longText = 'A'.repeat(1000)
  const result = generateQRCode(longText)

  t.true(Buffer.isBuffer(result))
  t.true(result.length > 0)
})

test('generateQRCode deve funcionar com caracteres especiais', (t) => {
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
  const result = generateQRCode(specialChars)

  t.true(Buffer.isBuffer(result))
  t.true(result.length > 0)
})

test('generateQRCode deve funcionar com emojis', (t) => {
  const emoji = '😀 🎉 🚀 ❤️'
  const result = generateQRCode(emoji)

  t.true(Buffer.isBuffer(result))
  t.true(result.length > 0)
})
