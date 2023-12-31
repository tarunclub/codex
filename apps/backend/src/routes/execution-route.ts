import { Router } from 'express';
import { run } from '../controllers/execution-controller';

const router = Router();

router.post('/run', run);

export default router;
