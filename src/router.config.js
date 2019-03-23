import express from 'express';
import index from './pages/index';
import cpid from './pages/cpid';
import saveForm from './pages/saveForm';

const router = express.Router();
router.get('/', index);
router.get('/cp/:cpid', cpid);
router.post('/cp/:cpid', saveForm);

export default router;