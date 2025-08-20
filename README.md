# 📱 Leitor de Código de Barras

Este é um aplicativo mobile que funciona como **leitor de código de barras** genérico, podendo ser usado por qualquer pessoa, **ou integrado com um sistema via Socket.IO** (como um terminal de leitura de produtos).

---

## ⚙️ Tecnologias Utilizadas

- React Native (via Expo)
- TypeScript
- Expo Camera
- Socket.IO Client

---

## 🚀 Funcionalidades

- Lê códigos de barras usando a câmera.
- Exibe o código lido na tela.
- Se estiver conectado a um backend via `Socket.IO`, envia os dados automaticamente.

---

## 📦 Pré-requisitos

Antes de rodar o app, você precisa ter instalado:

- **Node.js**
- **Expo CLI**
- Um emulador Android/iOS ou dispositivo físico com o app **Expo Go**

---

## 🧪 Como rodar o app

1. **Clone o repositório:**

```bash
git clone https://github.com/tatianysouza/BarCodeScanner.git
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Crie o arquivo ```config.ts``` dentro das pasta src do projeto com as seguintes variáveis:**
```bash
API_URL=http://SEU_IP_LOCAL:5000
SOCKET_URL=http://SEU_IP_LOCAL:3000
```
  ##### 🧠 Para descobrir seu IP local:

 ``` No terminal (Windows): ipconfig → procure por Endereço IPv4.```

 ``` No terminal (Linux/macOS): ifconfig ou ip a. ```

4. **Execute o projeto:**

```bash
npm start
```

---

## Contribuições

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir uma Issue ou fazer um Pull Request.
