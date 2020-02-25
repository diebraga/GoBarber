import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointment from '../models/appointment';
import File from '../models/file';
import User from '../models/user';

class AppointmentController {
  async index(req, res) {
    // limit 20 appointrments
    const { page = 1 } = req.query;
    // list appointment not canceled, icluding provider, order 'date, include avatar.
    // return id, name both, avatar return id url path shows img
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'id'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'url', 'path'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  // create appointment
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    // check if provider_id is a provider

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    // check if provider is true
    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only book with providers' });
    }
    // it will store hours from the begining
    const hourStart = startOfHour(parseISO(date));
    // book in the past not allowed
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Not allowed' });
    }
    // check avalibility in an hour
    const avalibility = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });
    // if isn't avalible
    if (avalibility) {
      return res.status(400).json({ error: 'Not avalible' });
    }
    // create book 1 hour start
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
