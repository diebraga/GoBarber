import User from '../models/user';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    // check if user is provider
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    // if he is not a provider error
    if (!isProvider) {
      return res.status(401).json({ error: 'You are not a provider' });
    }
    // list notifications, use mongoose, limit of 20, ordered desc
    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }
}

export default new NotificationController();
