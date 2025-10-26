const express = require('express')
const router = express.Router()

// middleware that is specific to this router
// const timeLog = (req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// }
// router.use(timeLog)

const auth = function (req,res,next) {
  console.log("I am inside auth-middleware");
  
  // Dummy data 
  req.user = {userId: 1 , role:"student"};
  
  if(req.user) {
    // if a valid user is there in req the proced to next middleware
    next();
  } else {
    // if not a valid user 
    res.json({
     success: false,
     message: "Not a Vaild User",
    })
  }
}

const isStudent = function (req,res,next) {
    console.log("I am inside student-middleware");
    
    if(req.user.role === "student") {
      next();
    } else {
      // if not a valid user 
      res.json({
       success: false,
       message: "Access Denied, this route is only for student",
      })
    }
}

const isAdmin = function (req,res,next) {
    console.log("I am inside admin-middleware");
    
    if(req.user.role === "admin") {
      next();
    } else {
      // if not a valid user 
      res.json({
       success: false,
       message: "Access Denied, this route is only for admin",
      })
    }
}

// define the home page route
router.get('/student',auth,isStudent, (req, res) => {
  console.log("I am inside the student route")
  res.send('STUDENT SECTION')
})

// define the about route
router.get('/admin',auth,isAdmin, (req, res) => {
  console.log("I am inside the student route")
  res.send('ADMIN SECTION')
})

module.exports = router