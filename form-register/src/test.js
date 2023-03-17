// const sea = async ({nome, sobrenome, senha, id, acesso}) => {
//     const response = await fetch("uri/recurso", {
//     nome, sobrenome, senha, id, acesso},
//     {method: "POST",
//     headers:  {"Content-Type": "application/json"}})

async function sendData({ nome, sobrenome, senha, id, acesso }) {
  const response = await fetch(
    "uri/recurso",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({nome, sobrenome, senha, id, acesso})
    }
  );
}

