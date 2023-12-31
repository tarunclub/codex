import { Router } from 'express';
import { createProject } from '../controllers/project-controller';

const router = Router();

router.post('/create-project', createProject);

export default router;
