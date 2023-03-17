const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded());

app.get("/consultarusuarios", async (req, res) => {
  const data = await fetch("http://localhost:3000/users");  

  res.json(await data.json());
});

app.post("/cadastrarusuario", async (req, res) => {
  const resultado = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!resultado.ok)
    res
      .status(400)
      .json({ message: "tivemos um erro ao tentar salvar no banco de dados!" });

  res.status(200).json({
    message: `os seguintes dados foram salvos no JSON server (db): ${JSON.stringify(
      req.body
    )}`,
  });
});

app.delete(`/delete`, async (req, res) => {
  try {
    const response = await fetch(
      `http://localhost:3000/users/${req.query.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Tivemos um problema com a requisição! ${reponse.ok}`);
    }

    res.status(200).json({ message: "deletado com sucesso!" });
  } catch (erro) {
    res.status(400).json({ message: erro });
  }
});

app.put(`/rename`, async (req, res) => {
  try {
    const response = await fetch(
      `http://localhost:3000/users/${req.query.id}`,
      {
        method: "PUT",

        body: JSON.stringify(req.body), //-> como se tá mandando dados pelo corpo da requisição, se vai precisar de um body

        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Tivemos um problema com a requisição: ${response.ok}`);
    }

    res.status(200).json({ message: `Atualizado com sucesso ${JSON.stringify(req.body)} ` });
  } catch (erro) {
    res.status(400).json({ message: erro });
  }
});

app.listen(4000); 