// 1.  data base connection + load modelds

import Sequelize from 'sequelize';

import User from '../app/models/user';
import File from '../app/models/file';
import Appointment from '../app/models/appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
  }

  // 1.
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();