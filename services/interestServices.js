import Interest from "../models/Interest.js";
import Profile from "../models/Profile.js";

const interestServices = async (profile_id) => {
    // Récupère les interets de l'utilisateur
    const interestsUser = await Interest.findAll({
        include: [{
            model: Profile,
            as: "interested_profiles",
            through: { attributes: [] },
            where: { id: profile_id }
        }]
    })

    // Récupération de tous les ids de la liste
    const interestId = interestsUser.map((interest) => interest.id)

    // Récupération de tous les interets
    const allInterest = await Interest.findAll();

    // Pour chaque interet on va ajouter la clé selected avec la valeur true si l'utilisateur a choisi cet interet
    allInterest.forEach((interest) => {
        if (interestId.includes(interest.id)) {
            interest.dataValues.selected = true
        }
    })

    return allInterest;

}

export default interestServices;