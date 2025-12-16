# personal-notes-manager-223170-223212

Notes Backend (Express)
- Runs on port 3001
- Swagger UI: http://localhost:3001/docs
- Health: GET http://localhost:3001/health

Endpoints
- GET /health
- GET /api/notes
- GET /api/notes/:id
- POST /api/notes
- PUT /api/notes/:id
- DELETE /api/notes/:id

Request/Response examples (curl)
- Health
  curl -s http://localhost:3001/health | jq

- List notes
  curl -s http://localhost:3001/api/notes | jq

- Create a note
  curl -s -X POST http://localhost:3001/api/notes \
    -H "Content-Type: application/json" \
    -d '{"title":"First note","content":"Hello world","tags":["personal","todo"]}' | jq

- Get a note by id
  NOTE_ID="<id-from-create>"
  curl -s http://localhost:3001/api/notes/$NOTE_ID | jq

- Update a note
  curl -s -X PUT http://localhost:3001/api/notes/$NOTE_ID \
    -H "Content-Type: application/json" \
    -d '{"title":"Updated title"}' | jq

- Delete a note
  curl -s -o /dev/null -w "%{http_code}\n" -X DELETE http://localhost:3001/api/notes/$NOTE_ID