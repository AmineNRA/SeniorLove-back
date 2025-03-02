import interestServices from "../services/interestServices.js"

export const testController = {
    interestService: async (req, res) => {
        const profile_id = req.user.id;
        const interest = await interestServices(profile_id);
        res.status(200).json(interest)
    }
}


