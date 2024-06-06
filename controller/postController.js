import Post from "../model/postModel.js";
import User from "../model/userModel.js";

export const createPost = async(req, res) =>{
    try {

        const postData = await new Post(req.body);
        const savedData = await postData.save();
        res.status(200).json(savedData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const like = async(req, res) =>{
    try {

        const postId = req.params.postId;
        const usreId = req.params.userId;

        const postExist = await Post.findById(postId);
        const userExist = await User.findById(usreId);

        if(!postExist){
            return res.status(400).json({message: "Post not found"});
        }

        if(!userExist){
            return res.status(400).json({message: "User not found"});
        }

        if(postExist.likedBy.includes(usreId)){
            return res.status(400).json({message: "Post already liked"});
        }

        if(postExist.dislikedBy.includes(usreId)){
            postExist.dislikedBy.pull(usreId);
            postExist.dislikes -= 1;
        }

        postExist.likedBy.push(usreId);
        postExist.likes += 1;

        const savedLikes = await postExist.save();
        res.status(200).json(savedLikes);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const dislike = async(req, res) =>{
    try {

        const postId = req.params.postId;
        const usreId = req.params.userId;

        const postExist = await Post.findById(postId);
        const userExist = await User.findById(usreId);

        if(!postExist){
            return res.status(400).json({message: "Post not found"});
        }

        if(!userExist){
            return res.status(400).json({message: "User not found"});
        }

        if(postExist.dislikedBy.includes(usreId)){
            return res.status(400).json({message: "Post already disliked"});
        }

        if(postExist.likedBy.includes(usreId)){
            postExist.likedBy.pull(usreId);
            postExist.likes -= 1;
        }

        postExist.dislikedBy.push(usreId);
        postExist.dislikes += 1;

        const savedDislikes = await postExist.save();
        res.status(200).json(savedDislikes);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}