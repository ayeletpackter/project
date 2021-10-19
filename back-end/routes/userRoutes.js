import express from "express"
const router = express.Router()
import {authUser,getUserProfile,deleteUser,registerUser,updateUserProfile,getUsers,getUserById,updateUser} from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js'


router.post('/login',authUser)
router.route('/').post(registerUser)

router.route('/').get(protect,admin,getUsers)

router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)//קודם יפעיל את פרוטקט ואחכ את גטיוזרפרופיל

router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser)



export default router