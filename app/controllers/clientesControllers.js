const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;

// Crear nuevo cliente
exports.create = (req, res) => {
    // Validación
    if (!req.body.name) {
      res.status(400).send({
        message: "Debe ingresar datos correctos"
      });
      return;
    }
  
    // Creación
    const cliente = {
        name: req.body.name,
        ruc: req.body.ruc,
        razonSocial: req.body.razonSocial,
        fechaConteo: req.body.fechaConteo ? req.body.fechaConteo : false
    };
  
    // Guardado en base de datos
    Cliente.create(cliente)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al crear el cliente"
        });
      });
  };

  // Regresa todos los datos de este tipo.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    console.log("uno");
    Cliente.findAll({ where: condition })
      .then(data => {
        console.log("dos");
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error."
        });
      });
      console.log("tres")
  };
  
  // Busqueda por id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Cliente.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error Cliente con id=" + id
        });
      });
  };
  
  // Editar Cliente
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Cliente.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Cliente ha sido editado."
          });
        } else {
          res.send({
            message: `No se ha podido editar cliente con id=${id}. Puede que el cliente no se encontrara o los datos ingresados sean incorrectos!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al editar cliente con id=" + id
        });
      });
  };
  
  // Eliminar un cliente por id 
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Cliente.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Cliente fue eliminado!"
          });
        } else {
          res.send({
            message: `No se pudo  eliminar al cliente con id=${id}. Puede que el cliente no se encontrará!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "No se pudo eliminar al cliente con id=" + id
        });
      });
  };
  
  // Eliminar a todos los clientes en la base de datos
  exports.deleteAll = (req, res) => {
    Cliente.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Clientes fueron eliminados!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error durante la eliminación de los clientes"
        });
      });
  };
  
  // Listar a los clientes por razon social
  exports.findAllRazon = (req, res) => {
    Cliente.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error mientras se listaban a los clientes"
        });
      });
  };