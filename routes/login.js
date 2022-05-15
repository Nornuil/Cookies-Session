const router = require("express");
const loginRouter = new router();

//reset de session
loginRouter.get("/login", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    res.json({ nombre: nombre });
  } else {
    res.json({ error: "Invalid" });
    // no existe
  }
});

//destroy de session
loginRouter.get("/logout", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    req.session.destroy((err) => {
      if (!err) {
        res.json({ success: true, msg: "Hasta luego" });
      } else {
        console.log(err);
      }
    });
  } else {
    res.json({ error: "no esta logueado" });
    // no se existe
  }
});

//registro
loginRouter.post("/login", (req, res) => {
  req.session.nombre = req.body.nombre;
  res.json(req.session.nombre);
});

module.exports = loginRouter;
