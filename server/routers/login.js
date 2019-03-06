import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../schemas/user';

const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        res.send({userName : req.session.user.userName});  
    }
    else {
        res.send("login require");
    }
})

router.post('/', (req, res) => {
    User.find({
        username: req.body.name
    })
        .then((user) => {
            if (user.length == 0)
                res.send(false);
            else {
                bcrypt.compare(req.body.password, user[0].password)
                .then(result => {
                    if(result){
                        req.body.userAgent = req.get('User-Agent');
                        req.session.user = {
                            userName: user[0].username,
                        }
                        res.send(user[0].username);
                    }
                    else {
                        res.send(false);
                    }
                })
            }
            
        })
        .catch((err) => {
            console.error(err)
            res.send(false)
        })
})

export default router;