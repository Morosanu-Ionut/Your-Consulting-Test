module.exports = (sequelize, DataType) => {
    let model4 = sequelize.define('Junction', {
      id_person: {
        type: DataType.INTEGER
      },
      id_car: {
        type: DataType.INTEGER
      },
    }, {
      timestamps: true
    });

    return model4;
  };
  