import { Request, Response } from 'express';
import { Product } from '../models/product'; // Ajusta la ruta si es distinta
import { Sequelize } from 'sequelize';

export const updateStock = async (req: Request, res: Response): Promise<void> => {
    const { productos } = req.body;

    try {
        for (const producto of productos) {
            const { id, cantidad } = producto;

            await Product.update(
                { stock: Sequelize.literal(`stock - ${cantidad}`) },
                { where: { id } }
            );
        }

        res.status(200).send('Stock actualizado correctamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el stock');
    }
};
