const express = require('express')
const app = express()

app.use(express.json())

const tarefas = [
  {
    id: 1,
    titulo: "atividade1",
    descricao: "Revisao",
    status: "Pendente!"
  },
  {
    id: 2,
    titulo: "atividade 2",
    descricao: "Exercício",
    status: "Em andamento!"
  }
]

app.get("/", function (req, res) {
  res.send("Hello World! Tarefas fucionando!")
})

app.get("/tarefas", function (req, res) {
  const titulo = req.query.titulo

  if (!titulo) {
    return res.json(tarefas)
  }

  const tarefasFiltradas = tarefas.filter(t => t.titulo.toLowerCase().includes(titulo.toLowerCase()))

  res.json(tarefasFiltradas)
})

app.post("/tarefas", function (req, res) {
  if (!req.body) {
    return res.status(400).json({ erro: "Corpo da requisição não enviado!" })
  }

  const titulo = req.body.titulo
  const descricao = req.body.descricao

  if (!titulo) {
    return res.status(400).json({ erro: "Título é obrigatório!" })
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo: titulo,
    descricao: descricao,
    status: "Pendente"
  }

  tarefas.push(novaTarefa)
  res.status(201).json(novaTarefa)
})

app.get("/tarefas/:id", function (req, res) {
  const id = parseInt(req.params.id)
  const tarefa = tarefas.find(t => t.id == id)

  if (tarefa) {
    return res.json(tarefa)
  } else {
    res.status(404).json("Tarefa não encontrada")
  }
})

app.put("/tarefas/:id", function (req, res) {
  const id = parseInt(req.params.id)
  const { titulo, descricao, status } = req.body

  if (!titulo || !descricao) {
    return res.status(400).json("titulo e descricao são obrigatorios")
  }

  const index = tarefas.findIndex(t => t.id == id)

  if (index === -1) {
    return res.status(404).json("Tarefa não encontrada")
  }

  if (tarefas[index].status === "Concluida!") {
    return res.status(400).json("Tarefa já concluída não pode ser alterada")
  }

  tarefas[index].titulo = titulo
  tarefas[index].descricao = descricao
  tarefas[index].status = status

  return res.json(tarefas[index])
})

app.delete("/tarefas/:id", function (req, res) {
  const id = parseInt(req.params.id)
  const index = tarefas.findIndex(t => t.id === id)

  if (index === -1) {
    return res.status(404).json("Tarefa não encontrada")
  }

  tarefas.splice(index, 1)
  return res.status(204).send()
})

app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000")
})
