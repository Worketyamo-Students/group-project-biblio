# 📚 API Bibliothèque

Une API RESTful pour la gestion d’une bibliothèque (utilisateurs et livres).

## 🚀 Technologies utilisées

- Node.js
- Express
- TypeScript
- Prisma ORM (MongoDB)
- JWT pour l’authentification

## 📘 Endpoints Livres

### 🔍 1. Liste des livres disponibles

- **Méthode :** `GET`
- **URL :** `/books`
- **Description :** Retourne tous les livres disponibles.
- **Réponse :**

```json
{
  "msg": "Books list",
  "data": [ ... ]
}
```

### ➕ 2. Ajouter un nouveau livre

- **Méthode :** `POST`
- **URL :** `/books/create`
- **Données requises :**

```json
{
  "title": "Le Long chemin",
  "author": "KerKopski",
  "description": "Raconte l'histoire d'un jeune homme qui traverse des moments difficiles.",
  "year": "1899",
  "isbn": "rut4r2"
}
```

- **Réponse :**

```json
{
  "msg": "book created",
  "data": { ... }
}
```

### 📖 3. Détails d’un livre

- **Méthode :** `GET`
- **URL :** `/books/:BookId`
- **Exemple :** `/books/profile/68702d5efef8cdff2509ea1b`
- **Réponse :**

```json
{
  "msg": "books profile",
  "data": { ... }
}
```

### ✏️ 4. Modifier un livre

- **Méthode :** `PUT`
- **URL :** `/books/update/:BookId`
- **Exemple :** `/books/update/68702d5efef8cdff2509ea1b`
- **Données requises :**

```json
{
  "title": "La Grande Voie",
  "author": "Mbida Tchaptchep",
  "description": "Raconte l'histoire d'un jeune homme qui traverse des moments difficiles pour accomplir ses reves.",
  "year": "2009",
  "isbn": "sz7ut4r2"
}
```

- **Réponse :**

```json
{
  "msg": "book upated",
  "data": { ... }
}
```

### ❌ 5. Supprimer un livre

- **Méthode :** `DELETE`
- **URL :** `/books/delete/:BookId`
- **Exemple :** `/books/delete/68702d5efef8cdff2509ea1b`
- **Réponse :**

```json
{
  "msg": "book deleted"
}
```

## 🔐 Authentification

> Certaines routes (comme la création, mise à jour ou suppression de livre) nécessitent une authentification par token JWT.

**Header requis :**

```
Authorization: Bearer <votre_token>
```

## 📫 Auteur

Projet développé par **Néhémie-Emmanuel**  
Nom du projet : `group-project-biblio`
