// import { Router } from "express";
const router = require("express");

// import path from "path";

const loginRouter = new router();

loginRouter.get("/", (req, res) => {
  // verifica login
});

loginRouter.get("/login", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    // muestro nombre
  } else {
    // no existe
  }
});

loginRouter.get("/logout", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    req.session.destroy((err) => {
      if (!err) {
        console.log("todo ok");
      } else {
        console.log(err);
      }
    });
  } else {
    // no se existe
  }
});

//registro
loginRouter.post("/login", (req, res) => {
  console.log("post");
  req.session.nombre = req.body.nombre;
});

module.exports = loginRouter;
