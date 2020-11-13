import { Router } from 'express';

import projectsPrivateRoutes from './private/routes';

const router = Router();

router.use('/private', projectsPrivateRoutes);

export default router;
