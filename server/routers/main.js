import express from 'express';
import fs from 'fs';

const router = express.Router();

router.use(express.static(`${__dirname}/../../build/`))
router.get("/", (req, res) => {
    try {
        fs.readFile(`index.html`, 'utf8', (err, data) => {
            if(err) throw err;
            res.status(200).send(data);
        })
    }
    catch(err) {
        console.error(err)
    }
});

export default router;