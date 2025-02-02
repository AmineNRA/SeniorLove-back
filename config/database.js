import { Sequelize } from 'sequelize';
import "../models/associations.js";
import * as dotenv from 'dotenv';

dotenv.config();

console.log("PG_URL", process.env.PG_URL)

const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        underscored: true,
    },
    logging: console.log,
})

export default sequelize; 
