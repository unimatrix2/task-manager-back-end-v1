import { Router } from 'express';

import tasksPrivateRoutes from './private/routes';

const router = Router();

router.use('/private', tasksPrivateRoutes);

export default router;
