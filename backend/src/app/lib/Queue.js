// import job from folder 'jobs'

import Bee from 'bee-queue';
import CancellationMail from '../jobs/CancellationMail';
import redisConfig from '../../config/redis';

const jobs = [CancellationMail];

class Qeuee {
  // eacch background job will have his own queue
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // connect to redis
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.process(handle);
    });
  }
}

export default new Qeuee();
