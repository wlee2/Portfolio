import express from 'express';
import fs from 'fs';
import path from 'path';
import Busboy from 'busboy';
import config from '../commons/Constants'
import rimraf from 'rimraf'

const router = express.Router();
const ensureLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        res.send('login require')
    }
}

router.get("/", ensureLogin, (req, res) => {
    fs.mkdir(`${config.STORAGE_PATH}`, err => {
        fs.mkdir(`${config.STORAGE_PATH}/${req.session.user.userName}`, err => {
            const mypath = `${config.STORAGE_PATH}/${req.session.user.userName}`
            if (req.query.filename) {
                console.log(req.query.filename)
                const stats = fs.statSync(`${mypath}/${req.query.filename}`)
                const fileSizeInBytes = stats["size"];
                console.log("file size = " + fileSizeInBytes);
                res.send({size: fileSizeInBytes});
            }
            else if (req.query.folder) {
                fs.readdir(`${mypath}/${req.query.folder}`, (err, data) => {
                    if (err) console.error(err)
                    const lists = data.map(list => {
                        return `${req.query.folder}/${list}`
                    })
                    res.send({
                        userName: req.session.user.userName,
                        lists: lists
                    })
                })
            }
            else {
                fs.readdir(mypath, (err, data) => {
                    if (err) console.error(err)
                    res.send({
                        userName: req.session.user.userName,
                        lists: data
                    })
                })
            }
        })
    });
});
router.put('/', ensureLogin, (req, res) => {
    console.log(req.body.folder)
    fs.mkdir(`${config.STORAGE_PATH}/${req.session.user.userName}/${req.body.folder}`, err => {
        if (err) res.send(err.code);
        else res.send(true);
    })
});

router.post('/', ensureLogin, (req, res) => {
    const mypath = `${config.STORAGE_PATH}/${req.session.user.userName}/`
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log(fieldname)
        const saveTo = path.join(mypath, fieldname, filename);
        console.log('Uploading: ' + saveTo);
        file.pipe(fs.createWriteStream(saveTo), (error) => {
            if (error) console.log(error);
        });
    });
    busboy.on('finish', (err) => {
        if (err) console.error(err);
        res.send(true)
    });
    req.pipe(busboy);

})



router.delete('/', ensureLogin, function (req, res) {
    if(req.query.filename) {
        const mypath = `${config.STORAGE_PATH}/${req.session.user.userName}/${req.query.filename}`
        console.log(mypath);
        fs.unlink(mypath, function (err) {
            if (err) console.error(err);
            res.send(true);
        });
    }
    else if(req.query.foldername) {
        const mypath = `${config.STORAGE_PATH}/${req.session.user.userName}/${req.query.foldername}`
        console.log(mypath);
        rimraf.sync(mypath);
        res.send(true);
    }
    
});

export default router;