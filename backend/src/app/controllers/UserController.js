// export methods to routes.js
// 1. create user & validation email exists

import * as Yup from 'yup';
import User from '../models/user';

class UserController {
  // yup validation scheme
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    // pass validation = true or false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // 1.
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Email already in use.' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    // yup validation scheme
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      lastPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        // conditional validation
        .when('lastPassword', (lastPassword, field) =>
          lastPassword ? field.required() : field
        ),
      comfirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    // pass validation = true or false
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // update user
    const { email, lastPassword } = req.body;

    const user = await User.findByPk(req.userId);
    // if email is different
    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });
      // pass validation if use exists
      if (userExists) {
        return res.status(400).json({ error: 'Email already in use.' });
      }
    }
    // pass validation ... if it match
    // lastPassword required
    if (lastPassword && !(await user.checkPassword(lastPassword))) {
      return res.status(401).json({ error: "Dosn't match" });
    }
    // update method
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
