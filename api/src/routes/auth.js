import express from 'express';
import validate from '../middleware/validate';
import { loginValidators } from '../validators/auth';
import { csrf, login, logout } from '../controllers/auth';

const auth = express.Router();

auth.get('/csrf', csrf);
auth.post('/login', loginValidators, validate(), login);
auth.get('/logout', logout);

export default auth;
