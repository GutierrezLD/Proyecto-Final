const { DataTypes, UUIDV4 } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('product', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: UUIDV4,
            unique: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 1
        },
        image: { //DEBERÍA SER UN ARRAY, PUEDE HABER MAS DE UNA FOTO POR PRODUCTO
            // type: DataTypes.BLOB,
            type: DataTypes.STRING,
            // type: DataTypes.ARRAY(
            //     DataTypes.BLOB),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("active", "inactive"),
            defaultValue: "active"
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created: { //esto va a ser deleteado cuando de deployee la cuestion.
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        sizes: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    },
        { timestamps: false })

};

// Posts ()
// Id. - NUMBER
// Name. - STRING
// Price.  - NUMBER
// Details. - STRING
// Rating. - NUMBER
// Image-
// Status (Active, Inactive). - BOOLEAN
// Stock. - NUMBER
// Reviews. - TUPLE [NUMBER & STRING]
// Questions and answers - TUPLE [ date, string, strings].
