module.exports = app => {
  const clientes = require("../controllers/clientesControllers");

  var router = require("express").Router();

  // Crear nuevo cliente
  router.post("/", clientes.create);

  // Regresa todos los clientes
  router.get("/", clientes.findAll);

  // Regresa clientes por razon social
  router.get("/razonSocial", clientes.findAllRazon);

  // Regresa clientes con id
  router.get("/:id", clientes.findOne);

  // Edita clientes por id
  router.put("/:id", clientes.update);

  // elimina cliente por id
  router.delete("/:id", clientes.delete);

  // Elimina todos los clientes
  router.delete("/", clientes.deleteAll);

  app.use('/api/tutorials', router);
};
