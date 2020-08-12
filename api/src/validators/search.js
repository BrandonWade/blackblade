import { check } from 'express-validator';

export default [check('q').isLength({ min: 1 })];
