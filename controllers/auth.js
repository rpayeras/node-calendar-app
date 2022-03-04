const bcrypt = require("bcryptjs");
const { generateJwt } = require("../helpers/jwt");
const User = require("../models/User");


const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try{
        let user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: "user not exists"
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'crendetials incorrect',
            })
        }

        const token = await generateJwt(user.id, user.name);

        return res.status(201).json({
            ok: true,
            data: {
                uid: user.id,
                name: user.name,
                token
            },
        })

    } catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Error on login user',
        })

        console.log(err)
    }
    
    res.json({
        ok: true,
        msg: 'login',
        name,
        email,
        password
    })
}

const createUser = async(req, res) => {
    const {email, password} = req.body;

    try{
        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                ok: false,
                msg: "user exists"
            })
        }

        user = new User(req.body)

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save()

        const token = await generateJwt(user.id, user.name);

        return res.status(201).json({
            ok: true,
            data: {
                uid: user.id,
                name: user.name,
                token
            }
        })
    } catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Error on save new user',
        })

        console.log(err)
    }
}

const renewUser = async(req, res) => {
    const token = await generateJwt(req.uid, req.name);

    res.status(201).json({
        ok: true,
        data: {
            token,
            uid: req.uid,
            name: req.name
        }
    })
}

module.exports = {
    loginUser,
    createUser,
    renewUser
}