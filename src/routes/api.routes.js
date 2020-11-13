import { Router } from 'express';

import projectsRoutes from './projectsRoutes/projects.routes';
import tasksRoutes from './tasksRoutes/tasks.routes';
import authRoutes from './authRoutes/auth.routes';

const router = Router();

router.use('/projects', projectsRoutes);

router.use('/tasks', tasksRoutes);

router.use('/auth', authRoutes);

export default router;
