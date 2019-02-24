import express from 'express';
import index from './pages/index';
import cpid from './pages/cpid';

const router = express.Router();
router.get('/', index);
router.get('/cp/:cpid', cpid);
export default router;