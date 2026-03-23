# API Escola - Nodee.Js + Express
API REST simples para gerenciar Tarefas
## Pré-requisitos 
-Node.js instalado
## Como rodar
### Instalar dependencias
```bash
npm i
```
### Iniciar o servidor
```bash
node index.js
```
### Acessar
Abra o navegador em: `http://localhost:3000`
## Endpoints
### Tarefas
| Metodo | Endpoint | Descrição |
|--------|----------|-----------|
|GET | `/tarefas` | Lista todos as tarefas|
|POST | `/tarefas` | Cria uma nova tarefa |
|PUT  | `/tarefas/:id` | Atualiza uma tarefa|
|DELETE | `/tarefas/:id` | Remove uma tarefa|
## Tecnologias
- Node.js
- Express
