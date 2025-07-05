# qrcode-rs

**qrcode-rs:** Uma biblioteca leve para geração de códigos QR em JavaScript/TypeScript utilizando Rust para alto desempenho.

Este projeto foi inicializado com [create-neon](https://www.npmjs.com/package/create-neon ), combinando a velocidade do Rust com a flexibilidade do Node.js.

---

## 🧰 Sobre o Projeto
- **Tecnologia:** Implementação em Rust (via [Neon](https://neon-bindings.com )) com interface JavaScript/TypeScript
- **Funcionalidade:** Gera códigos QR a partir de strings de texto ou URLs
- **Compatibilidade:** Suporta todas as versões atuais e de manutenção do Node.js (ver [suporte Neon](https://github.com/neon-bindings/neon#platform-support))

---

## 🛠️ Requisitos de Build

Antes de construir:
1. Instale o [Node.js]( https://nodejs.org ) (v18+ recomendado)
2. Instale o [Rust](https://www.rust-lang.org/tools/install ) (v1.65+ necessário)

### Comandos de Build

```bash
# Instale dependências e construa o addon
npm install

# Construa manualmente (release mode)
npm run build

# Construa em modo debug
npm run debug

# Execute testes Rust
npm test
