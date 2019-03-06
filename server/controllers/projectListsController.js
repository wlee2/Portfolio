import fs from 'fs';
import config from '../commons/Constants';

const getFileData = (req, res) => {
    
    if(req.query.filename){
        console.log(req.query.filename)
        fs.readFile(`${config.VIEW_PATH}/${req.query.filename}`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            }
            res.send(data);
        })
    }
    else if(req.query.folder) {
        fs.readdir(`${config.VIEW_PATH}/${req.query.folder}`, (err, data) => {
            if(err) console.error(err);
            const lists = data.map(list => {
                return `${req.query.folder}/${list}`
            })
            res.send({
                data: lists
            })
        })
    }
    else {
        fs.readdir(`${config.VIEW_PATH}`, (err, data) => {
            if(err) console.error(err);
            res.send({
                data: data
            })
        })
    }
}

export default getFileData;