import { DataTypes } from "sequelize";
import sequelize from "../database/connection";


export const Product = sequelize.define(
    'Product',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        size: { type: DataTypes.STRING, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.INTEGER, allowNull: false },
        stock: { type: DataTypes.INTEGER, allowNull: false },
        status: { type: DataTypes.INTEGER, allowNull: false }
    }
)
