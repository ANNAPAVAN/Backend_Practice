// signup a new user
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../utils/customError.js"
import User from "../models/user.schema.js"

//      with out asyncHandler
// -------------------------------
// export const signUp = async(req,res) => {
//     try {     
//     } catch (error) {     
//     }
// }

export const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),  // in 3 days
    httpOnly: true    // can't be accessed in client side
}   


export const signUp = asyncHandler(async(req,res) => {
    //1.  get data from the user  , all data will come from req.body , so that we have to destructure it
    const { name,email,password } = req.body 


    //2.  validation 
    if(!name || !email || !password){
        // throw new Error("Required Field is empty")   --> in coase if we not use Custom Class
        throw new CustomError("Please add alll fields",400)
    }

    //3. lets add this data to database

    //check if user already exists
    const existingUser = await User.findOne({email})

    if(existingUser){
        throw new CustomError("User already Exists",400)
    }

    const user = await User.create({
        name,      // as it is new version no need key value pair
        email,
        password
    })

    const token = user.getJWTtoken()

    // safety
   user.password = undefined    // why this ? --> at the time of User.create  : select:false is not responded  , it only respond when we have select operations like findById()...etc

   // store this token in user's cookie 
   res.cookie("token",token,cookieOptions)

    // send back a response to user
    res.status(200).json({
        success: true,
        token,
        user,
    })


})


export const login = asyncHandler(async (req,res) => {
    const {email,password} = req.body;

    // validation 
    if(!email || !password){
        throw new CustomError("Please fill the details" , 400)
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        throw new CustomError("Invalid credentials" , 400)
    }

    const isPasswordMatched = await user.comparePassword(password)

    if(isPasswordMatched){
        const token = user.getJWTtoken()
        user.password = undefined
        res.cookie("token",token,cookieOptions)
        return res.status(200).json({
            success:true,
            token,
            user
        })
    }

    throw new CustomError("password is incorrect",400)
})


export const logout = asyncHandler(async (req,res) => {
    res.cookie("token", null , {
        expires : new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

export const getProfile = asyncHandler( async(req,res) => {
    const {user} = req 

    if(!user){
        throw new CustomError('User Not Found',401)
    }

    res.status(200).json({
        success: true,
        user
    })
})