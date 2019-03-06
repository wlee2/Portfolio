import express from 'express';
import getFileData from '../controllers/projectListsController';
const router = express.Router();

router.get("/",getFileData);

export default router;