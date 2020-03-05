// export to  queue.js

import { format, parseISO } from 'date-fns';
import Mail from '../lib/Mail';

// job to send email
class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Appointment canceled',
      template: `cancelation`,
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'Day' dd 'of' MMMM', at' H:mm'h'"
        ),
      },
    });
  }
}

export default new CancellationMail();
