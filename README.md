# ai-agile-coach

Quick guide how to start project on your machine. 
After you successfully pulled repo, go to server folder, and create ```.env``` file with this values: 
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=messages
POSTGRES_HOST=postgres
POSTGRES_PORT=5432

PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=pgadmin4

OPENAI_API_KEY={insert-your-openai-api-key-here}
```
After that. Lauch CLI in root of repo, and execute this command, to build and run docker-compose:
```docker-compose up --build```
You are good to go! 
Client will be listening on ```http://localhost:5173/```
