const router = require("express");
const loginRouter = new router();

loginRouter.get("/", (req, res) => {
  // verifica login
});

loginRouter.get("/login", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    res.json({ nombre: nombre });
  } else {
    res.json({ error: "Invalid" });
    // no existe
  }
});

loginRouter.get("/logout", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    req.session.destroy((err) => {
      if (!err) {
        // console.log("todo ok");
        res.json({ success: true });
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
  req.session.nombre = req.body.nombre;
  res.json(req.session.nombre);
});

module.exports = loginRouter;
