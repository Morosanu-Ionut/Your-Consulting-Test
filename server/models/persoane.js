module.exports = (sequelize, DataType) => {
    let model3 = sequelize.define('Person', {
      nume: {
        type: DataType.TEXT
      },
      prenume: {
        type: DataType.TEXT
      },
      cnp: {
        type: DataType.TEXT
      },
      varsta: {
        type: DataType.INTEGER
      },
    }, {
      timestamps: true
    });

    return model3;
  };
  