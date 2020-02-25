import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/appointment';
import User from '../models/user';

class BookController {
  // show booklist provider
  async index(req, res) {
    // check if user is provider
    const checkProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }
    // appointment list logged user, nor cancled, between start and end day
    // ordered
    const { date } = req.query;
    const parseDate = parseISO(date);

    const appointments = await Appointment.findOne({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      order: ['date'],
    });

    return res.json({ appointments });
  }
}

export default new BookController();
