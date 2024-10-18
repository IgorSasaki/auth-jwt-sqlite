# User Management API - Tech Day IFSP Araraquara 2024

Este é o projeto prático do mini-curso "Desvendando o Poder do NodeJS: Construindo APIs Rest" apresentado por Igor Sasaki no **Tech Day IFSP Araraquara 2024**. O projeto consiste em uma API de gerenciamento de usuários, com foco em autenticação, criação de usuários, atualização de dados e exclusão de contas.

---

## **Objetivos do Mini-Curso**

- Introduzir os fundamentos do **Node.js** e **Express** para construção de APIs REST.
- Utilizar **SQLite** como banco de dados leve.
- Implementar autenticação segura com **JWT**.
- Criar operações básicas de CRUD (Create, Read, Update, Delete) para gerenciamento de usuários.
- Demonstrar boas práticas de desenvolvimento com **TypeScript**.

---

## **Funcionalidades**

- **Criação de Usuários**: Registro de novos usuários com senhas criptografadas.
- **Autenticação**: Autenticação de usuários com **JWT**.
- **Atualização de Dados**: Edição de dados do usuário autenticado.
- **Exclusão de Conta**: Exclusão da conta do usuário autenticado.
- **Consulta de Dados**: Retorna os dados do usuário autenticado, sem expor a senha.

---

## **Tecnologias Utilizadas**

- **Node.js**
- **Express**
- **SQLite**
- **JWT (jsonwebtoken)**
- **crypto-js** para criptografia de senhas
- **TypeScript** para tipagem estática
- **ESLint** para padronização de código

---

## **Instalação e Configuração**

### **Pré-requisitos**

Certifique-se de que você tem o **Node.js** (versão 14 ou superior) e o **npm** instalados em sua máquina.

### **Passos de Instalação**

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o banco de dados e as tabelas executando o script de migração:

   ```bash
   npm run init-db
   ```

---

## **Executando o Projeto**

### **Modo de Desenvolvimento**

Para iniciar a aplicação em modo de desenvolvimento (com **nodemon**):

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:3333`

### **Modo de Produção**

1. Compile o projeto:

   ```bash
   npm run build
   ```

2. Inicie o servidor:

   ```bash
   npm start
   ```

---

## **Documentação da API**

### **Base URL**

```
http://localhost:3333
```

### **Autenticação**

Para todas as rotas protegidas, é necessário fornecer o token JWT no cabeçalho da requisição:

```
Authorization: Bearer <seu_token_jwt>
```

### **Endpoints**

#### **1. Criação de Usuário**

- **Endpoint**: `/users`
- **Método**: `POST`
- **Descrição**: Cria um novo usuário.
- **Corpo da Requisição**:

  ```json
  {
    "name": "Igor Sasaki",
    "email": "igor-sasaki@hotmail.com",
    "password": "minhasenha123"
  }
  ```

- **Exemplo de Resposta**:

  ```json
  {
    "userId": "uuid-do-usuario",
    "name": "Igor Sasaki",
    "email": "igor-sasaki@hotmail.com",
    "createdAt": "2024-10-17T08:45:35.422Z",
    "updatedAt": "2024-10-17T08:45:35.422Z"
  }
  ```

---

#### **2. Login do Usuário**

- **Endpoint**: `/users/login`
- **Método**: `POST`
- **Descrição**: Autentica o usuário e retorna um token JWT.
- **Corpo da Requisição**:

  ```json
  {
    "email": "igor-sasaki@hotmail.com",
    "password": "minhasenha123"
  }
  ```

- **Exemplo de Resposta**:

  ```json
  {
    "token": "seu_token_jwt",
    "user": {
      "userId": "uuid-do-usuario",
      "name": "Igor Sasaki",
      "email": "igor-sasaki@hotmail.com"
    }
  }
  ```

---

#### **3. Atualizar Dados do Usuário (Autenticado)**

- **Endpoint**: `/users`
- **Método**: `PUT`
- **Descrição**: Atualiza os dados do usuário autenticado (apenas o nome).
- **Cabeçalho**:

  ```
  Authorization: Bearer <seu_token_jwt>
  ```

- **Corpo da Requisição**:

  ```json
  {
    "name": "Igor Sasaki"
  }
  ```

- **Exemplo de Resposta**:

  ```json
  {
    "userId": "uuid-do-usuario",
    "name": "Igor Sasaki",
    "email": "igor-sasaki@hotmail.com",
    "createdAt": "2024-10-17T08:45:35.422Z",
    "updatedAt": "2024-10-18T12:30:45.123Z"
  }
  ```

---

#### **4. Obter Dados do Usuário Autenticado**

- **Endpoint**: `/users`
- **Método**: `GET`
- **Descrição**: Retorna os dados do usuário autenticado.
- **Cabeçalho**:

  ```
  Authorization: Bearer <seu_token_jwt>
  ```

- **Exemplo de Resposta**:

  ```json
  {
    "userId": "uuid-do-usuario",
    "name": "Igor Sasaki",
    "email": "igor-sasaki@hotmail.com",
    "createdAt": "2024-10-17T08:45:35.422Z",
    "updatedAt": "2024-10-17T08:45:35.422Z"
  }
  ```

---

#### **5. Deletar Conta do Usuário (Autenticado)**

- **Endpoint**: `/users`
- **Método**: `DELETE`
- **Descrição**: Exclui a conta do usuário autenticado.
- **Cabeçalho**:

  ```
  Authorization: Bearer <seu_token_jwt>
  ```

- **Exemplo de Resposta**:

  ```json
  {
    "message": "User deleted successfully"
  }
  ```

---

## **Contribuindo**

1. Faça um fork deste repositório.
2. Crie uma branch para sua feature: `git checkout -b minha-feature`.
3. Commit suas alterações: `git commit -m 'Adicionando minha feature'`.
4. Faça o push para a branch: `git push origin minha-feature`.
5. Abra um pull request.

---

## **Licença**

Este projeto é licenciado sob os termos da **MIT License**.
