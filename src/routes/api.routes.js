import { Router } from 'express';

import projectsRoutes from './projectsRoutes/projects.routes';
import tasksRoutes from './tasksRoutes/tasks.routes';
import authRoutes from './authRoutes/auth.routes';

import authProtectedRoute from '../middlewares/authProtectedRoute';

const router = Router();

router.use('/auth', authRoutes);

router.use(authProtectedRoute.privateRouteMiddleware);

router.use('/projects', projectsRoutes);

router.use('/tasks', tasksRoutes);

export default router;
