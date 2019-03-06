import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../schemas/user';

const router = express.Router();

router.post('/', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) res.send(false)
            req.body.password = hash;
            const user = new User({
                username: req.body.name,
                password: req.body.password
            })
            user.save()
                .then(() => {
                    res.send(true)
                })
                .catch((err) => {
                    if (err.code == 11000) {
                        res.send("used name")
                    }
                    else {
                        res.send(false)
                    }
                })
        })
    })

});

export default router;