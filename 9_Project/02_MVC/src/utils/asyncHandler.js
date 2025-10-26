
// const asyncHandler = () => {}
// const asyncHandler = (func) => {()=>{}}
// const asyncHandler = (func) => async ()=>{}

// Method 1 

// const asyncHandler = (requesthandler) => async (req,res,next) => {
//     try{
//         await requesthandler(requestIdleCallback,res,next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// export default asyncHandler;

// Method 2

const asyncHandler = (requesthandler) => {
   return (req,res,next) =>{
    Promise.resolve(requesthandler(req,res,next)).catch((err)=> next(err));
   } 
}

export default asyncHandler;