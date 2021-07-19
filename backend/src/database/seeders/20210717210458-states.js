module.exports = {
  up: (queryInterface, Sequelize) => {
    const states = [
      { name: "Acre", createdAt: new Date(), updatedAt: new Date() },
      { name: "Alagoas", createdAt: new Date(), updatedAt: new Date() },
      { name: "Amapá", createdAt: new Date(), updatedAt: new Date() },
      { name: "Amazonas", createdAt: new Date(), updatedAt: new Date() },
      { name: "Bahia", createdAt: new Date(), updatedAt: new Date() },
      { name: "Ceará", createdAt: new Date(), updatedAt: new Date() },
      {
        name: "Distrito Federal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: "Espírito Santo", createdAt: new Date(), updatedAt: new Date() },
      { name: "Goiás", createdAt: new Date(), updatedAt: new Date() },
      { name: "Maranhão", createdAt: new Date(), updatedAt: new Date() },
      { name: "Mato Grosso", createdAt: new Date(), updatedAt: new Date() },
      {
        name: "Mato Grosso do Sul",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: "Minas Gerais", createdAt: new Date(), updatedAt: new Date() },
      { name: "Pará", createdAt: new Date(), updatedAt: new Date() },
      { name: "Paraíba", createdAt: new Date(), updatedAt: new Date() },
      { name: "Paraná", createdAt: new Date(), updatedAt: new Date() },
      { name: "Pernambuco", createdAt: new Date(), updatedAt: new Date() },
      { name: "Piauí", createdAt: new Date(), updatedAt: new Date() },
      { name: "Rio de Janeiro", createdAt: new Date(), updatedAt: new Date() },
      {
        name: "Rio Grande do Norte",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rio Grande do Sul",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: "Rondônia", createdAt: new Date(), updatedAt: new Date() },
      { name: "Roraima", createdAt: new Date(), updatedAt: new Date() },
      { name: "Santa Catarina", createdAt: new Date(), updatedAt: new Date() },
      { name: "São Paulo", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sergipe", createdAt: new Date(), updatedAt: new Date() },
      { name: "Tocantins", createdAt: new Date(), updatedAt: new Date() },
      {
        name: "Distrito Federal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert("States", states);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("States", null, {});
  },
};
