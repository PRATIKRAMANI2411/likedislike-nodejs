import User from "../model/userModel.js";

export const createUser = async(req, res) =>{
    try {

        const userData = await new User(req.body);
        const savedData = await userData.save();
        res.status(200).json(savedData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}