const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi Explorers!");
});

const explorers = [];

function validateExplorerId(req, res, next) {
  const { id } = req.params;

  const explorer = explorers.find((explorer) => explorer.id === id);

  if (explorer) {
    return next();
  } else {
    return res.status(400).json({ erro: "Id not found!" });
  }
}

app.get("/explorers", (req, res) => {
  return res.json(explorers);
});

app.post("/explorers", (req, res) => {
  const { id, name } = req.body;

  const explorer = {
    id,
    name,
    stacks: [],
  };

  explorers.push(explorer);

  return res.json(explorer);
});

app.put("/explorers/:id", validateExplorerId, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const explorer = explorers.find((explorer) => explorer.id === id);

  explorer.name = name;

  return res.json(explorer);
});

app.delete("/explorers/:id", validateExplorerId, (req, res) => {
  const { id } = req.params;

  const explorer = explorers.find((explorer) => explorer.id === id);

  explorers.splice(explorer, 1);

  return res.status(204).json();
});

app.post("/explorers/:id/stacks", validateExplorerId, (req, res) => {
  const { id } = req.params;
  const { stack } = req.body;

  const explorer = explorers.find((explorer) => explorer.id === id);

  explorer.stacks.push(stack);

  return res.json(explorer);
});

app.listen(3338, () => {
  console.log("Server OK!!!");
});
