import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'//זה תופס את כל השגיאות

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]//מחזיר רק את הטוקן בלי במילה הראשונה(BEARER)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')//מחזיר את הכל חוץ מהסיסמא
            next()

        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')

        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

export { protect }