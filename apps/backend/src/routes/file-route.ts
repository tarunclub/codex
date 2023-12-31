import { Router } from 'express';
import { createFile } from '../controllers/file-controller';

const router = Router();

router.post('/create-file', createFile);

export default router;
