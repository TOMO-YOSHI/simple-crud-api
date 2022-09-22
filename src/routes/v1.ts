import express from 'express';
const router = express.Router();
import { login, signup } from '../controllers/authControllers';

router
  .post('/login', login)
  .post('/signup', signup)

export default router;