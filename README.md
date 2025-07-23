# Library Management System API

A RESTful API built with Express.js and MongoDB for managing a library's book inventory and borrowing system.

## Features

- Book Management (CRUD operations)
- Book Borrowing System
- Book Availability Tracking
- Borrowed Books Summary

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- RESTful API architecture

## API Endpoints

### Books

- `GET /api/books` - Get all books (with filtering and sorting)
- `GET /api/books/:bookId` - Get a specific book
- `POST /api/books` - Create a new book
- `PUT /api/books/:bookId` - Update a book
- `DELETE /api/books/:bookId` - Delete a book

### Borrowing

- `GET /api/borrow` - Get borrowed books summary
- `POST /api/borrow` - Borrow a book

## Data Models

### Book

```typescript
{
  title: string;
  author: string;
  genre: Genre; // FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}
```

### Borrow

```typescript
{
  book: ObjectId;
  quantity: number;
  dueDate: Date;
}
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Configure MongoDB connection in `src/server.ts`
4. Run the development server:
   ```bash
   pnpm run dev
   ```

## API Usage Examples

### Create a Book

```bash
POST /api/books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "FICTION",
  "isbn": "978-0743273565",
  "copies": 5,
  "description": "A story of decadence and excess."
}
```

### Borrow a Book

```bash
POST /api/borrow
Content-Type: application/json

{
  "book": "bookId",
  "quantity": 1,
  "dueDate": "2025-08-22T00:00:00.000Z"
}
```

All API endpoints can be found [here](https://crimson-robot-330313.postman.co/workspace/My-Workspace~536b5db0-0232-427a-8f26-8103a975ce73/collection/29761864-6d258013-4ea2-48af-a45f-f35f0ec49a62?action=share&creator=29761864).

## Error Handling

The API includes comprehensive error handling for:

- Validation errors
- Resource not found
- Server errors
- Invalid requests
