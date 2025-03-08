import { check, validationResult } from 'express-validator';

const validatorParams = [
  check('email').isEmail(),
  check('password').isLength({ min: 8, max: 15 }),
  check('name').isString({ min: 1, max: 200 }),
  check('lastName').isString({ min: 1, max: 200 }),
];


function validator(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}

export default { validatorParams, validator };
