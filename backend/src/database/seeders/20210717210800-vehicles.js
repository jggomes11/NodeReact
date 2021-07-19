module.exports = {
  up: (queryInterface, Sequelize) => {
    const states = [
      { name: "Caminhão", createdAt: new Date(), updatedAt: new Date() },
      { name: "Carro", createdAt: new Date(), updatedAt: new Date() },
      { name: "Moto", createdAt: new Date(), updatedAt: new Date() },
    ];
    return queryInterface.bulkInsert("Vehicles", states);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Vehicles", null, {});
  },
};
