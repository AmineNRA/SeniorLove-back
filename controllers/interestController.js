import Interest from "../models/Interest.js";

export const interestController = {
    getAllInterests: async (req, res) => {
        try {
            const interests = await Interest.findAll()

            if (interests.length > 0) {
                res.status(200).json(interests)
            }
            else {
                res.status(404).json({ success: false })
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}