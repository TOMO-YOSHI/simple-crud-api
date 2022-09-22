import express from 'express';
const router = express.Router();
import v1Router from './v1';

// Defines routers for Version one of the APIs
export default router.use('/v1', v1Router);