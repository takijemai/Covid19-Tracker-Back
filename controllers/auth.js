const Joi = require('joi')
const HttpStatus = require('http-status-codes')
const User = require('../models/usermodel')
const dbConfig= require('../secret/secret')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')





module.exports= {

   async signup(req,res){
    try {
        const useremail = await User.findOne({ email: req.body.email });
        if (useremail) {
          return res
            .status(HttpStatus.StatusCodes.BAD_REQUEST)
            .json({ message: "user email exists" });
        }
    
        const username = await User.findOne({ username: req.body.name });
        if (username) {
          return res
            .status(HttpStatus.StatusCodes.BAD_REQUEST)
            .json({ message: "username exists" });
        }
    
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        const body = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedpassword,
          });
      
          const user = await User.create(body);
          const token = jwt.sign(
            { _id: user._id, username: user.username },
            dbConfig.secret,
            { expiresIn: "2h" }
          );
          res.cookie("auth", token);
          res
            .status(HttpStatus.StatusCodes.OK)
            .json({ message: "user created", user, token });
        } catch (err) {
          res
            .status(HttpStatus.StatusCodes.BAD_REQUEST)
            .json({ message: "create user error" });
        }

   },


   async login(req, res) {
    if (!req.body.email || !req.body.password) {
      res
        .status(HttpStatus.StatusCodes.BAD_REQUEST)
        .json({ message: "empty fields" });
    }
    await User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res
            .status(HttpStatus.StatusCodes.BAD_REQUEST)
            .json({ message: "email doesn't exist" });
        }
        return bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (!result) {
              res
                .status(HttpStatus.StatusCodes.BAD_REQUEST)
                .json({ message: "wrong password" });
            }
            const token = jwt.sign(
              { _id: user._id, username: user.username },
              dbConfig.secret,
              { expiresIn: "2h" }
            );
            console.log(token)
            res.cookie("auth", token);
            return res
              .status(HttpStatus.StatusCodes.OK)
              .json({ message: "login successful", user, token });
          })
          .catch((err) => {
            res
              .status(HttpStatus.StatusCodes.BAD_REQUEST)
              .json({ message: "login error" });
          });
      })
      .catch((err) => {
        res
          .status(HttpStatus.StatusCodes.BAD_REQUEST)
          .json({ message: "login error" });
      });
  }
  






}