# qrcode-rs

![CI](https://github.com/napi-rs/package-template/workflows/CI/badge.svg)

Um gerador de QR Code de alta performance escrito em Rust com bindings para Node.js usando NAPI-RS.

## Características

- **Alta Performance**: Escrito em Rust para máxima velocidade e eficiência
- **Zero Dependências Nativas**: Não requer ferramentas de build como gcc/llvm ou node-gyp
- **Cross-Platform**: Suporte nativo para Windows, macOS, Linux e FreeBSD
- **Compatibilidade N-API**: Funciona com Node.js 12.22.0+
- **Saída em Buffer**: Retorna imagens PNG diretamente como Node.js Buffer

## Instalação

```bash
npm install qrcode-rs
# ou
yarn add qrcode-rs
```

## Uso

```javascript
const { generateQRCode } = require('qrcode-rs')
const fs = require('fs')

// Gerar QR Code
const qrCodeBuffer = generateQRCode('https://github.com')

// Salvar como arquivo PNG
fs.writeFileSync('qrcode.png', qrCodeBuffer)

// Ou usar diretamente em uma resposta HTTP
app.get('/qrcode', (req, res) => {
  const data = req.query.data || 'Hello World'
  const qrCode = generateQRCode(data)

  res.setHeader('Content-Type', 'image/png')
  res.send(qrCode)
})
```

### TypeScript

O pacote inclui definições de tipos TypeScript:

```typescript
import { generateQRCode } from 'qrcode-rs'

const qrCode: Buffer = generateQRCode('https://example.com')
```

## API

### `generateQRCode(data: string): Buffer`

Gera um QR Code a partir de uma string.

**Parâmetros:**

- `data` (string): O texto ou URL para codificar no QR Code

**Retorna:**

- `Buffer`: Imagem PNG do QR Code como Buffer do Node.js

**Exemplo:**

```javascript
const qrCode = generateQRCode('Hello, World!')
// Retorna um Buffer contendo a imagem PNG
```

## Plataformas Suportadas

Este pacote fornece binários pré-compilados para:

- **Windows**: x86_64, ARM64
- **macOS**: x86_64 (Intel), ARM64 (Apple Silicon)
- **Linux**: x86_64 (glibc), x86_64 (musl), ARM64 (glibc), ARM64 (musl)
- **FreeBSD**: x86_64

## Requisitos

- Node.js >= 12.22.0 (qualquer versão com suporte a N-API)

## Desenvolvimento

### Pré-requisitos

- Rust (versão mais recente)
- Node.js 10+
- Yarn 1.x

### Build Local

```bash
# Instalar dependências
yarn install

# Build em modo debug
yarn build:debug

# Build em modo release
yarn build

# Executar testes
yarn test

# Executar benchmark
yarn bench
```

### Estrutura do Projeto

- `src/lib.rs` - Código Rust principal
- `index.d.ts` - Definições TypeScript (gerado automaticamente)
- `index.js` - Wrapper JavaScript (gerado automaticamente)
- `__test__/` - Testes com AVA
- `benchmark/` - Benchmarks de performance

## Licença

MIT

## Autor

AaronKing <aaron.cmfor@gmail.com>

## Tecnologias

- [Rust](https://www.rust-lang.org/) - Linguagem de programação de sistemas
- [NAPI-RS](https://napi.rs/) - Framework para criar addons nativos do Node.js
- [qrcode](https://crates.io/crates/qrcode) - Biblioteca Rust para geração de QR Code
- [image](https://crates.io/crates/image) - Biblioteca Rust para processamento de imagens
