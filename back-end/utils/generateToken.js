import jwt from "jsonwebtoken";

const generateToken = (id,name) => {
    return jwt.sign({ id: id}, process.env.JWT_SECRET,{
        expiresIn:'30d'//סתם הגדרות
    })
}
export default generateToken