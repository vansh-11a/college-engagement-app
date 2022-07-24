const express = require("express");
const {getProfile} = require("../controllers/profileController");
const isAuth = require("../middlewares/isAuth");
const User = require("../model/user")
const router = express.Router();
const request = require("request")

// name // username //email
router.get("/profile", isAuth, getProfile);
router.get("/search/:username", async (req, res) => {
    
    const username = req.params.username;
    console.log(username)
    let data = await User.findOne({username: username});

    if (data) {
        let msg = {
            message: "User exists"
        }
        let dataToSend = await JSON.stringify(msg);
        res.send(dataToSend)
    }else{
        let msg = {
            message: "Username can be used"
        }
        let dataToSend = await JSON.stringify(msg);
        res.send(dataToSend)
    }
})
module.exports = router;
