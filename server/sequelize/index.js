import Sequelize from 'sequelize';
import config from '../commons/Constants'

const sequelize = new Sequelize(config.pDatabase, config.pUser, config.pPassword, {
    host: config.pHost,
    dialect: 'postgres',
    port: config.pPort,
    dialectOptions: {
        ssl: true
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(() => {
        res.status(500).send('Unable to connect to the database:');
    });

const Blog = sequelize.define('Blog', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Title: Sequelize.STRING,
    ThumbNail: Sequelize.STRING,
    Author: Sequelize.STRING,
    PostTime: Sequelize.STRING,
    Contents: Sequelize.TEXT,
    HtmlContents: Sequelize.TEXT
});

const Comments = sequelize.define('Comments', {
    Id: {
        type: Sequelize.INTEGER
    },
    Author: Sequelize.STRING,
    Comments: Sequelize.STRING
});

Comments.hasMany(Blog);

const initalize = () => {
    sequelize.sync()
        .then(res => {
            console.log("Success")
        })
        .catch(err => {
            console.log(err)
        })
}
const addBlog = (data) => {
    return new Promise((resolve, reject) => {
        for (let i in data) {
            if (data[i] == "") data[i] = null;
        };
        Blog.create(data)
            .then((res) => {
                console.log(res);
                resolve("success");
            })
            .catch((err) => {
                reject(err);
            })
    })
}

const getBlog = () => {
    return new Promise((resolve, reject) => {
        Blog.findAll()
            .then(data => {
                resolve(data);
            })
            .catch(() => {
                reject("fail");
            });
    })
}

export default {
    initalize,
    addBlog,
    getBlog
};