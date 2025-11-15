# 📚 Controle de Presença Escolar

Sistema completo para registro digital de frequência escolar, composto por:

- **Backend:** API REST em Spring Boot + PostgreSQL
- **Frontend:** Aplicativo Mobile/Web em React Native + Expo

O objetivo é modernizar o processo de chamada escolar, trazendo rapidez, precisão e melhor acompanhamento das turmas.

---

# 🚀 Visão Geral do Sistema

O sistema possui três perfis principais:

## 👨‍💼 ADMIN
- Credenciais fixas (chumbadas)
- Permissões:
  - Cadastrar Professores
  - Cadastrar Alunos
  - Criar Turmas
  - Associar Professores às Turmas
  - Associar Alunos às Turmas
- Pode logar apenas para fins administrativos
- **Não marca presença**

## 👨‍🏫 PROFESSOR
- Criado pelo Admin
- Faz login no aplicativo
- Visualiza somente as turmas vinculadas a ele
- Permissões:
  - Ver alunos da turma
  - Marcar presença (✔)
  - Marcar ausência (❌)

## 👦 ALUNO
- Criado pelo Admin
- **Não possui login**
- Apenas aparece na lista de chamada do professor

---

# 🧩 Funcionalidades do Sistema

- Login para Admin e Professores
- Cadastro de Professores
- Cadastro de Alunos
- Cadastro de Turmas
- Associação de Professores ↔ Turmas
- Associação de Alunos ↔ Turmas
- Visualização de turmas do professor
- Lista de alunos da turma
- Registro de presença e ausência
- Persistência em banco PostgreSQL
- Comunicação entre app e API via HTTP/JSON

---

# 🛠️ Tecnologias Utilizadas

## 🔵 Backend
- Java 17+
- Spring Boot 3+
- Spring Web
- Spring Data JPA
- PostgreSQL / AWS RDS
- Maven
- Lombok
- JUnit

## 🟣 Frontend
- React Native + Expo
- React Native Web
- Expo Router
- TypeScript
- Zustand
- TanStack Query
- React Hook Form + Zod
- NativeWind (Tailwind)
- Axios
- AsyncStorage

---

# 🧱 Arquitetura Geral

CONTROLE DE PRESENÇA ESCOLAR
│
├── Backend (API Spring Boot)
│   ├── Autenticação Admin/Professor
│   ├── Cadastro de Professores, Alunos e Turmas
│   ├── Registro de Presença
│   └── Banco PostgreSQL
│
└── Frontend (React Native + Web)
    ├── Login
    ├── Seleção de Turma
    ├── Lista de Alunos
    └── Registro de Presença

---

# 🗂️ Estrutura Completa do Projeto

## 🟦 Backend

src/main/java/org/universidade/controlepresenca/
├── config/                         # Configurações globais
├── domain/                         # Entidades JPA
│   ├── Aluno.java
│   ├── Professor.java
│   ├── Turma.java
│   └── Presenca.java
├── dto/                            # Transferência de dados
├── repo/                           # Interfaces JPA
├── service/                        # Regras de negócio
├── web/                            # Controllers REST
└── ControlePresencaApplication.java

src/main/resources/
├── application.properties
└── application.yml                  # Não utilizado

src/test/http/
└── API tests.http                   # Testes manuais de endpoints

---

## 🟪 Frontend

app/
├── (auth)/                          # Login
├── (tabs)/                          # Navegação principal
├── admin/                           # Futuro painel do Admin
├── images/
└── _layout.tsx

src/
├── api/                             # Axios + Services
├── auth/                            # Lógica de Autenticação e Sessão
├── components/
├── constants/
├── hooks/
├── theme/
├── types/
└── utils/

assets/                              # Fonts, ícones, imagens

---

# 🔧 Configuração do Ambiente

## ▶️ Backend – application.properties

spring.datasource.url=jdbc:postgresql://<HOST>:5432/<DB_NAME>
spring.datasource.username=<USERNAME>
spring.datasource.password=<PASSWORD>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

### Rodar o backend:

mvn spring-boot:run

### Ou via IntelliJ:
Executar **Run** na classe principal.

---

## ▶️ Frontend

Instalar dependências:

npm install

Rodar o app:

npm start

Rodar no navegador:

npm run web

Criar arquivo .env:

EXPO_PUBLIC_API_URL=https://seu-backend.com/api

---

# 📡 Endpoints da API

## 🔑 Autenticação
Método | Rota | Quem usa | Descrição
------ | ----- | -------- | ----------
POST | /auth/login | Admin/Professor | Realiza login

## 👨‍💼 Admin
Método | Rota | Descrição
------ | ----- | ----------
POST | /admin/professores | Criar professor
POST | /admin/alunos | Criar aluno
POST | /admin/turmas | Criar turma
POST | /admin/turmas/{id}/vincular-professor | Associar professor
POST | /admin/turmas/{id}/vincular-aluno | Associar aluno

## 👨‍🏫 Professor
Método | Rota | Descrição
------ | ----- | ----------
GET | /professor/turmas | Minhas turmas
GET | /professor/turmas/{id}/alunos | Alunos da turma
POST | /professor/presenca | Registrar presença

---

# 🧪 Testes

Rodar testes automatizados:

mvn test

Testes manuais via arquivo:

src/test/http/API tests.http

---

# 🛣 Roadmap (Próximos Passos)

- [ ] Modo offline com sincronização automática
- [ ] Implementação de Autenticação JWT
- [ ] Painel Web completo para o Admin
- [ ] Relatórios detalhados de presença
- [ ] Notificações automáticas para faltas
- [ ] Exportação CSV/PDF
- [ ] Dashboard gráfico
- [ ] Melhorias de UX no registro de chamada

---
