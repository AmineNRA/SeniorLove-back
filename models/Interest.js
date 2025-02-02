import { Model, Datatypes } from "sequelize";
import sequelize from "../config/database.js";
import Profile from "./Profile.js";


class Interest extends Model { };

Interest.init({
    name: {
        type: Datatypes.STRING
    }
},
    {
        sequelize,
        modelName: 'Interest',
        tablename: 'Interest'
    }
);

Interest.belongsToMany(Profile, { through: 'profile_interest' });

export default Interest