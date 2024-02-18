import Collection from "../models/collection.schema.js"
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../utils/customError"

export const createCollection = asyncHandler(async(req,res)=>{
    const {name} = req.body 

    if(!name){
        throw new CustomError("Collection name is required",400)
    }

    const collection = await Collection.create({
        name
    })

    res.status(200).json({
        success: true,
        message: "Collection created successfully",
        collection
    })
})

export const updateCollection = asyncHandler(async(req,res)=>{
    const {name} = req.body 
    const {id: collectionId} = req.params

    if(!name){
        throw new CustomError("Collection name is required",400)
    }

    let updatedCollection = await Collection.findByIdAndUpdate(collectionId,{
        name
    },{
        new: true,
        runValidators: true 
    })

    if(!updateCollection){
        throw new CustomError("Collection not found",400)
    }

    res.status(200).json({
        success: true,
        message: "Collection updated successfully",
        updatedCollection
    })
})


export const deleteCollection = asyncHandler(async(req,res)=>{
    const {id: collectionId} = req.params

    let collectionToDelete = await Collection.findById(collectionId)

    if(!collectionToDelete){
        throw new CustomError("Collection not found")
    }

    await collectionToDelete.remove();

    res.status(200).json({
        success: true,
        message: "Collection deleted successfully",
    })
})

export const getAllCollection = asyncHandler(async(req,res)=>{
     const collections = await Collection.find()

     if(!collections){
        throw new CustomError("No Collection Found",400)
     }

     res.status(200).json({
        success:true,
        collections
     })
})