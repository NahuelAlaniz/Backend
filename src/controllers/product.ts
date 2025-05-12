import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/connection";
import { Request, Response } from "express";

// Definimos la interfaz para los atributos de un producto
interface ProductAttributes {
    id: number;
    name: string;
    size: string;
    category: string;
    image: string;
    description: string;
    price: number;
    stock: number;
    status: number;
}

// Interfaz para crear un producto, donde 'id' es opcional
interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }

// Clase Product exportada, que extiende de Model
export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public id!: number;
    public name!: string;
    public size!: string;
    public category!: string;
    public image!: string;
    public description!: string;
    public price!: number;
    public stock!: number;
    public status!: number;
}

// Inicialización de la clase Product
Product.init(
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
    },
    {
        sequelize,
        modelName: 'Product',
    }
);

// Función para registrar un producto
export const registerProduct = async (req: Request, res: Response) => {
    const { name, size, category, image, description, price, stock } = req.body;

    await Product.create({
        name,
        size,
        category,
        image,
        description,
        price,
        stock,
        status: 1,
    });

    res.json({
        msg: `Product ${name} created successfully`,
    });
}

// Función para obtener los productos
export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Product.findAll();
    res.json(listProducts);
}

// Función para registrar una compra
export const registerPurchase = async (req: Request, res: Response): Promise<void> => {
    const { productId, quantity } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
        res.status(404).json({ msg: "Product not found" });
        return; // Terminamos la ejecución aquí si no se encuentra el producto
    }

    if (product.stock < quantity) {
        res.status(400).json({ msg: "Not enough stock available" });
        return; // Terminamos la ejecución aquí si no hay suficiente stock
    }

    product.stock -= quantity;
    await product.save();

    res.json({ msg: `Purchase successful, new stock for ${product.name}: ${product.stock}` });
};
