import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default () => {
    const connect = () => {
        if(process.env.NODE_ENV !== 'production'){
            mongoose.set('debug', true);
        }
        mongoose.connect(process.env.DB, {dbName: 'portfolio'}), (err) => {
            if(err) {
                console.error(`can not connect to mongoDB :${err}`);
            } else {
                console.log('success to make connection!');
            }
        };
    };
    connect();
    mongoose.connection.on('error', (err) => {
        console.error(`can not connect to mongoDB :${err}`);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('connection lost... retry');
        connect();
    });
    require('./user');
    require('./projectLists');
}