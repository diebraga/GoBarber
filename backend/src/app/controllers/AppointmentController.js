import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import Appointment from '../models/appointment';
import File from '../models/file';
import User from '../models/user';
import Notification from '../schemas/Notification';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../lib/Queue';

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

    // if he is provider cant book to himself

    if (provider_id === req.userId) {
      return res.status(401).json({ error: 'You can not book to yourself ' });
    }

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
      date,
    });

    // notify provider when new appointment
    // using mongo schema
    const user = await User.findByPk(req.userId);
    const formattedDate = format(hourStart, "'Day' dd 'of' MMMM', at' H:mm'h'");

    await Notification.create({
      content: `${user.name} Book an appointment ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });
    // if it is not the owner of the appointment, it cant cancell
    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You can't cancel the appointment",
      });
    }
    // get 2 hours
    const dateWithSub = subHours(appointment.date, 2);
    // if the request is less than 2h , not allowed
    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You only cancel 2h in adivance',
      });
    }
    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
