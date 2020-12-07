module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
      name: {
        type: Sequelize.STRING
      },
      ruc: {
        type: Sequelize.INTEGER
      },
      razonSocial: {
        type: Sequelize.STRING
      },
      fechaConteo: {
        type: Sequelize.DATE
      }
    });
  
    return Cliente;
  };