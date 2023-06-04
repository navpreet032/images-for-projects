const router = require("express").Router();
const User = require("../models/m_user");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const verify = require("../verifyToken")
dotenv.config();

//update , delete, get, get all, get all user stats

//UPDATE
// put is used for updating 
//For example, if the route is defined as router.put("/users/:id"), the handler function will be called whenever a client sends a PUT request to a URL like http://example.com/users/123. In this case, the id parameter will be set to 123, and the handler function can use this value to update the corresponding user record in a database or perform some other action based on the specific resource being targeted.
router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id ) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
      }
  
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  });
  
  //DELETE
  router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id ) {
      try {
        await User.findByIdAndDelete(req.params.contacts.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can delete only your account!");
    }
  });
  
  //GET
  
  router.get("/find/:id/:Cid", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { ...info } = user._doc;
      const t = await info.findById(req.params.Cid);
      res.status(200).json(t);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  
  
  module.exports = router;
//findByIdAndUpdate is a Mongoose method that takes two arguments: the ID of the document to be updated, and an object containing the updates to be applied. In this case, req.params.id is the ID of the document to be updated, and {$set:req.body} is an object containing the updates to be applied. The $set operator is used to update specific fields of the document, while leaving the other fields unchanged. req.body is an object that contains the new values of the fields that are to be updated, and it is assumed that it matches the schema of the Mongoose model.
// Once the update operation is complete, the updated document is stored in the updatesUser variable.
// sort({_id:-1}) to return the latest users in the DB