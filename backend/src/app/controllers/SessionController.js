// 1. validation if use exist and psswrd ! matches
// 2. security token

import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/user';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    //valid schema
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // pass validation = true or false
    if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation fails' });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Not found' });
    }
    // 1.
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Dosn't match" });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      // 2.
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
