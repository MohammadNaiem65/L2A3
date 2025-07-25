# Library Management System API

A RESTful API built with Express.js and MongoDB for managing a library's book inventory and borrowing system.

## Features

- Book Management (CRUD operations)
- Book Borrowing System
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
3. Run the development server:
   ```bash
   pnpm run dev
   ```

## API Usage Examples

### Create a Book

#### Request:

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

#### Response:

```bash
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "FICTION",
    "isbn": "978-0743273565",
    "description": "A story of decadence and excess.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### Get all Books

```bash
GET /api/books

{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    },
    {...}
  ]
}
```

This API supports `filter`, `sort`, `sortby`, `page` and `limit` query parameters.

### Get a Specific Book

```bash
GET /api/books/:bookId

{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

### Update a Book

#### Request:

```bash
PUT /api/books/:bookId
Content-Type: application/json

{
  "copies": 10
}
```

#### Response:

```bash
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 10,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```

### Delete a Book

```bash
DELETE /api/books/:bookId

{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

### Borrow a Book

#### Request:

```bash
POST /api/borrow
Content-Type: application/json

{
  "book": "bookId",
  "quantity": 1,
  "dueDate": "2025-08-22T00:00:00.000Z"
}
```

#### Response:

```bash
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```

### Get Borrowed Books Summary

```bash
GET /api/borrowed

{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

All API endpoints for testing can be found [here](https://crimson-robot-330313.postman.co/workspace/My-Workspace~536b5db0-0232-427a-8f26-8103a975ce73/collection/29761864-6d258013-4ea2-48af-a45f-f35f0ec49a62?action=share&creator=29761864).

## Error Handling

The API includes comprehensive error handling for:

- Validation errors
- Resource not found
- Server errors
- Invalid requests
