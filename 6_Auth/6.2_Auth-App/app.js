// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const md5 = require("md5");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "ashutosh",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect("mongodb+srv://AshutoshBirje:nojd2wsTSPH7D4Ma@clusterone.lg23t.mongodb.net/Auth-App", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schema and model
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);

// Method 1 (mongoose-encryption)
// const secretKey = process.env.SECERT_KEY || "ashutosh"
// userSchema.plugin(encrypt,{secret: secretKey, encryptedFields: ['password']});

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});



passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({ googleId: profile.id });
      }
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));


// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    res.redirect("/secrets");
  });

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
// Method 2 (MD5)
//   try {
//     const newUser = new User({
//       email: req.body.username,
//       password: md5(req.body.password)
//     });
//     await newUser.save(); // wait for the save to complete
//     res.status(200).render("secrets");
//   } catch (err) {
//     console.error(err);
//     res.status(400).send("Invalid user information");
//   }

// Method 3 (bcrypt)
   
bcrypt.hash(req.body.password, 10, async (err,hash) => {
    try {
    const newUser = new User({
      email: req.body.username,
      password: hash
    }); 
    await newUser.save(); // wait for the save to complete
    res.status(200).render("secrets");
  } catch (err) {
    console.error(err);
    res.status(400).send("Invalid user information");
  }
})

});

app.post("/login", async (req, res) => {
// Method 1 (mongoose-encryption) --> Auto E & D
// Method 2 (MD5)
//   try {
//     const { username, password } = req.body;

//     const foundUser = await User.findOne({ email: username });

//     if (foundUser) {
//       if (foundUser.password === md5(password)) {
//         res.status(200).render("secrets");
//       } else {
//         res.status(401).send("Incorrect password");
//       }
//     } else {
//       res.status(404).send("User not found");
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error during login");
//   }

// Method 3 (bcrypt)

    try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ email: username });

    if (foundUser) {
        bcrypt.compare(password, foundUser.password, function(err,result){
          if(result){
             res.status(200).render("secrets");
          } else {
             res.status(401).send("Incorrect password");
          }
        })
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error during login");
  }

});


app.post("/register", function(req,res){
  User.register({username: req.body.username}, req.body.password, function(err,user){
    if(err){
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req,res,function(){
        res.redirect("/secrets");
      });
    }
  });
});

app.post("/login", function(req,res){
   const user = new User({
    usrname: req.body.username,
    password: req.body.password
   })

   res.login(user, function(err){
    if(err){
      console.log(err);
    } else {
      passport.authenticate("local")(req,res,function(){
        res.redirect("/secrets");
      });
    }
   })

});

app.get("/secrets", async function(req, res) {
  try {
    const foundUsers = await User.find({ secret: { $ne: null } });
    res.render("secrets", { usersWithSecrets: foundUsers || [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching secrets");
  }
});


app.get("/submit", function(req, res){
  if (req.isAuthenticated()){
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", async function(req, res) {
  try {
    const submittedSecret = req.body.secret;

    // Check if user is authenticated
    if (!req.isAuthenticated() || !req.user) {
      return res.redirect("/login");
    }

    const foundUser = await User.findById(req.user.id);

    if (foundUser) {
      foundUser.secret = submittedSecret;
      await foundUser.save();
      res.redirect("/secrets");
    } else {
      res.status(404).send("User not found");
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving secret");
  }
});

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
