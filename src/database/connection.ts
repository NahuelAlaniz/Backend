import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('api_node.js', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize