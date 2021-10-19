import expressAsyncHandler from 'express-async-handler'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'



//@desc      Auth user and get token
//@route      POST api/users/login
//@access      public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })//מוצאים אחד שתואם את האימיל שנשלח בבקשה

    if (user && (await user.matchPassword(password))) {//זה פונקציה שנמצאת ביוזר מודל
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})




//@desc      Register a new user
//@route      POST api/users
//@access      public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email: email })//מוצאים אחד שתואם את האימיל שנשלח בבקשה

    if (userExist) {
        res.status(400)
        throw new Error('user already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(401)
        throw new Error('invalid user data')
    }
})





//@desc      get user profile
//@route      GET api/users/profile
//@access      private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)//את זה מקבלים מהאוס מידלוור מפונקצית פרוטקטד

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })


    } else {
        res.status(404)
        throw new Error('user not found')
    }
})


//@desc      update user profile
//@route      PUT api/users/profile
//@access      private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)//את זה מקבלים מהאוס מידלוור מפונקצית פרוטקטד

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password//זה יוצפן אוטומטית בגלל המידלוור שעשינו....
        }
        const updatedUser=await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })

    } else {
        res.status(404)
        throw new Error('user not found')
    }
})


//@desc      get all user 
//@route      GET api/users
//@access      private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})//את זה מקבלים מהאוס מידלוור מפונקצית פרוטקטד
res.json(users)
    
})



//@desc      delete user 
//@route      DELETE api/users/:id
//@access      private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message:'User removed'})

    }else{
        res.status(404)
        throw new Error('User not found')
    }
   
    
})


//@desc      get  user  by id
//@route      GET api/users/:id
//@access      private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')//שולחים הכל חוץ מהססימא
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }

    
})



//@desc      update user 
//@route      PUT api/users/:id
//@access      private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
       user.isAdmin=req.body.isAdmin//אין כאן או כדי שהערך של זה ישתנה ולא ישאר כל הזמן אדמין גם אם שיננו אותו ליוזר רגיל

        const updatedUser=await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })

    } else {
        res.status(404)
        throw new Error('user not found')
    }
})



export { authUser, getUserProfile,deleteUser, registerUser,updateUserProfile,getUsers,getUserById ,updateUser}