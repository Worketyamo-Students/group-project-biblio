# 📚 API de Gestion de Bibliothèque

Une API RESTful complète développée avec **Node.js**, **Express**, **TypeScript**, **Prisma** et **MongoDB** pour gérer les **utilisateurs**, **livres**, et **emprunts (loans)**.

---

## 🚀 Démarrage

### Installation

```bash
npm install
npx prisma generate
npm run dev
```

Crée un fichier `.env` :

```env
PORT=4000
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="..."
JWT_R_SECRET="..."
```

---

## 🌐 Base URL

```
http://localhost:4000
```

---

## 🔐 Authentification

Certaines routes nécessitent un **token JWT** dans l’en-tête :

```
Authorization: Bearer <token>
```

---

## 👤 Endpoints Utilisateurs

### ✅ Inscription

```
POST /users/signup
```

**Body JSON** :

```json
{
  "name": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "password": "123456"
}
```

**Réponse** :

```json
{
  "msg": "user created",
  "data": { "id": "abc123", "name": "Jean Dupont", "email": "jean.dupont@example.com" }
}
```

### 🔑 Connexion

```
POST /users/login
```

**Body JSON** :

```json
{
  "email": "jean.dupont@example.com",
  "password": "123456"
}
```

**Réponse** :

```json
{
  "msg": "welcome back Jean Dupont",
  "token": "<jwt_token>"
}
```

### 👁️‍🗨️ Profil utilisateur

```
GET /users/profile
```

**Header** :

```
Authorization: Bearer <token>
```

**Réponse** :

```json
{
  "msg": "user",
  "data": { "id": "abc123", "name": "Jean Dupont", "email": "jean.dupont@example.com" }
}
```

### 📝 Mise à jour

```
PUT /users/update
```

**Body JSON** :

```json
{
  "name": "Jean D.",
  "email": "jean.d@example.com",
  "password": "newpassword"
}
```

### ❌ Suppression

```
DELETE /users/delete
```

---

## 📚 Endpoints Livres

### 📘 Créer un livre

```
POST /books/create
```

**Body JSON** :

```json
{
  "title": "Le Long chemin",
  "author": "KerKopski",
  "description": "Un jeune homme traverse des moments difficiles.",
  "year": "1899",
  "isbn": "rut4r2"
}
```

### 📚 Lister tous les livres

```
GET /books/
```

### 🔍 Détails d’un livre

```
GET /books/profile/:BookId
```

### ✏️ Mise à jour

```
PUT /books/update/:BookId
```

### 🗑️ Suppression

```
DELETE /books/delete/:BookId
```

---

## 📄 Endpoints Emprunts (Loans)

### ➕ Créer un emprunt

```
POST /loans/create
```

**Body JSON** :

```json
{
  "userId": "abc123",
  "booksIds": ["book123", "book456"],
  "back": "2025-08-01"
}
```

**Validations** :

* Vérifie que l’utilisateur existe.
* Vérifie que chaque livre existe.
* Vérifie que le livre n’est **pas déjà emprunté**.

### 📄 Lister les emprunts

```
GET /loans/
```

### 🔍 Détails d’un emprunt

```
GET /loans/profile/:LoanId
```

### ✏️ Mise à jour

```
PUT /loans/update/:LoanId
```

**Body JSON** :

```json
{
  "booksIds": ["book123", "book789"],
  "back": "2025-08-15"
}
```

### 🗑️ Suppression

```
DELETE /loans/delete/:LoanId
```

---

## 🛠️ Technologies

* Node.js
* Express.js
* TypeScript
* MongoDB
* Prisma ORM
* JWT
* Bcrypt
* Joi

---

## ✅ Règles de Validation

* Champs requis vérifiés via **Joi**.
* Email unique et formaté.
* Mot de passe requis.
* Vérification des doublons lors des créations.

---

## ✍️ Auteur

**Nehemie Sighe Nde**
Développeur Full Stack 💻
Cameroon 🇨🇲

---

