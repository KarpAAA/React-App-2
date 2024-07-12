# React_App

Project for task managmant

## Instalation

These instructions will help you get a copy of the project and run it on your local machine for development and testing.

1. Clone the project

```bash
git clone https://github.com/KarpAAA/React-App-2
```

2. Add tasks_backend/.env
<br>NOTE(You must have such database created)
```bash
#EXAMPLE
DATABASE_URL=postgres://postgres:root@localhost/trello_db#Database url
```

3. Add tasks_frontend/.env

```bash
#EXAMPLE
PORT=3006#Port for react dev server
REACT_APP_PUBLIC_URL=http://localhost:3000#Backend url
```

4.Install backend dependencies and run application
```bash
cd tasks_backend 
npm install
npm run start
```

5.Install frontend dependencies and run application
```bash
cd tasks_frontend
npm install
npm start
```