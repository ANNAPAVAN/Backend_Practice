
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })
    }
}

export default asyncHandler;








// const asyncHandler = "PAVAN"
// const asyncHandler = () => {}
// const asyncHandler = (func) => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async ([1,2,3]) => { await func}

