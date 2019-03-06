import sql from '../sequelize';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    sql.getBlog()
    .then(data => {
        res.send(data)
    })
})

router.post('/' , (req, res) => {
    sql.addBlog(req.body)
    .then(data => {
        res.send(true);
    })
    .catch(err => {
        res.send(err);
    })
})

export default router;
