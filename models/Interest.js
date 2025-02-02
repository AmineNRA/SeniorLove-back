import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/database.js";


class Interest extends Model { };

Interest.init({
    name: {
        type: DataTypes.STRING
    }
},
    {
        sequelize,
        timestamps: false,
        modelName: 'Interest',
        tablename: 'Interest'
    }
);

export default Interest