module.exports = (sequelize, DataType) => {
    let model2 = sequelize.define('Car', {
      denumire_marca: {
        type: DataType.TEXT
      },
      denumire_model: {
        type: DataType.TEXT
      },
      an_fabricatie: {
        type: DataType.INTEGER
      },
      capacitate_cilindrica: {
        type: DataType.INTEGER
      },
      taxa_impozit: {
        type: DataType.INTEGER
      },
    }, {
      timestamps: true
    });

    return model2;
  };
  