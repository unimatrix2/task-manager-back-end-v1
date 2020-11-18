import { Router } from 'express';

import authPublicRoutes from './public/routes';

const router = Router();

router.use('/public', authPublicRoutes);

export default router;
