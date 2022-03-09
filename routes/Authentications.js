const router = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authorize = require('../config/auth')
require('dotenv').config();

//importing the model file
const User = require('../models/User');

//create a user
router.post("/add", async (req,res) => {

    try{
        let fullName = req.body.fullName;
        let email = req.body.email;
        let nic = req.body.nic;
        let username = req.body.username;
        let mobileNumber = req.body.mobileNumber;
        let password = req.body.password;

        const isExisting = await User.findOne({"NIC": nic});

        if (isExisting){
            res.json({status:400, message:'User already exist'})
        }
        else{
            //salting the password for more sec
            const salt = await bcrypt.genSalt();
            //hashing the password
            const hashedPassword = await bcrypt.hash(password, salt);

            //user object
            const user = new User({
                fullName: fullName,
                email: email,
                NIC: nic,
                username: username,
                mobileNumber: mobileNumber,
                password: hashedPassword,
            });

            user.save().then((doctor) => {
                res.json({status:201, doctor:doctor})
            })
        }
    }catch{
        res.status(500).send()
    }

})


router.post('/login', async (req, res) => {
    
    let getUser;
    User.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        getUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            username: getUser.username,
            userId: getUser._id
        }, 'X7ZUG_hmbC58ZCUCko1usvKMVCVwNKMC-XCcNX_zXh3EwYFSz6dxCAOJ3w885nqmrZNVujk-TqyNXOCu1MXg1v8y28hil_sQTLxKOtNq-w3qS1yTcFuXVSoiJEpYrACAevY98rI53NTp3ki-uWjUVayGNi16_pRpWwfzMhYHUyp-AX9NnbFSwwelYgZmjzoxqXe0bjgDZBLVUiU9-Vge8NO4tXJaZwrWQ5N9zIjAbyieuh4lXHUB1_UdMY9E5BN6Cxpu9rBBNOHK6We2BmEcQHfs7uK7FB0jl7R8xWrGwRchHuGIqwagHPXTKYYuAMNRXfb2TgR1rY8i5ofX0_RlwQ', {expiresIn: 3600});

        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            user: getUser._id
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Authentication failed"
        });
    });
})

router.put("/update/:userID", authorize, async (req,res) => {

    try{
        let userID = req.params.userID;
        let fullName = req.body.fullName;
        let email = req.body.email;
        let nic = req.body.nic;
        let username = req.body.username;
        let mobileNumber = req.body.mobileNumber;

        let updatedValue = {
            fullName: fullName,
            email: email,
            NIC: nic,
            username: username,
            mobileNumber: mobileNumber,
        }
        const  updateValue = await User.findByIdAndUpdate(userID,updatedValue).then(() => {
            res.json({status:200, message:'User details successfully updated'})
        }).catch((err) => {
            res.json({status:400, error:err})
        })
    }
    catch(err){
        console.log(err);
    }

})


//delete appointment
router.get("/delete/:userID", authorize, async (req,res) => {

    const userID = req.params.userID;

    User.findOne({
        _id: req.body.userID
    })

    User.findByIdAndDelete(userID).then(() => {
        res.json({status:200, message:'Successfully deleted'})
    }).catch((err) => { 
        res.json({err});
    })

})

module.exports = router;