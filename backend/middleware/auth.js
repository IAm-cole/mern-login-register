import User from "../model/user.js";
import jwt from "jsonwebtoken"


const protect = async (req, res, next) => {

    let token;

    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            return next()


        }
        
    } catch (error) {
        console.error("Token verification failed ", error.message)
        res.status(400).json({message: "Not authorization, token failed"})
        
    }

}
export default protect;

// the splits concept
// Authorization : ("Bearer") <token>, since we want the token we split it and call it by it's index number  
