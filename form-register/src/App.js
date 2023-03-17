import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

export default function App() {
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [firstName, setName] = useState();
  const [lastName, setLastName] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit({ firstName, lastName }) {
    try {
      const response = await axios.post(
        "http://localhost:4000/cadastrarusuario",
        {
          firstName,
          lastName,
        },  
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/consultarusuarios"
      );
      const usuarios = response.data;
      console.log("resultado que vem do db", usuarios);
      setData(
        usuarios.map((e) => (
          <div
            className="users"
            style={{
              display: "flex",
              flexDirection: "column",
              paddingBottom: "12px",
            }}
          >
            <p
              style={{
                margin: "0rem 0rem 0rem 0rem",
              }}
            >{`Nome Completo: ${e.firstName} ${e.lastName}`}</p>
            <p
              style={{
                margin: "0rem 0rem 0rem 0rem",
              }}
            >{`ID: ${e.id}`}</p>
          </div>
        ))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async () => {
    const response = await axios.delete(
      `http://localhost:4000/delete?id=${id}`,
      {
        firstName,
        lastName,
      }
    );
  };

  async function renameUser({ firstName, lastName }) {
    const response = await axios.put(`http://localhost:4000/rename?id=${id}`, {
      firstName,
      lastName,
    });
  }

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="form-div"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("firstName")}
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            style={{
              height: "2.5rem",
              width: "10rem",
              border: "2px solid black",
              borderRadius: "5px",
              margin: "0px 0px 15px 0px",
              textAlign: "center",
              outline: "none",
            }}
          />
          <br />
          <input
            {...register("lastName")}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="Last Name"
            style={{
              height: "2.5rem",
              width: "10rem",
              border: "2px solid black",
              borderRadius: "5px",
              margin: "0px 0px 15px 0px",
              textAlign: "center",
              outline: "none",
            }}
          />
          <br />
          <input
            type="submit"
            value={"SUBMIT"}
            style={{
              height: "3rem",
              background: "cyan",
              width: "10.5rem",
              border: "2px solid black",
              borderRadius: "5px",
              margin: "0px 0px 15px 0px",
              textAlign: "center",
              outline: "none",
            }}
          />
        </form>
        <Button onClick={getUser} color="secondary">
          Consultar Dados
        </Button>
        <input
          onChange={(e) => setId(e.target.value)}
          type="text"
          placeholder="valor para deletar"
          style={{
            height: "2.5rem",
            width: "10rem",
            border: "2px solid black",
            borderRadius: "5px",
            margin: "10px 0px 15px 0px",
            textAlign: "center",
            outline: "none",
          }}
        />
        <Button onClick={deleteUser} variant="outlined" color="error">
          Delete User
        </Button>
        <button onClick={handleSubmit(renameUser)}>Change User</button>
      </div>
      <div
        className="users-container"
        style={{
          marginLeft: "30px",
        }}
      >
        {data}
      </div>
    </div>
  );
}
