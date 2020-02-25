// 1.  data base connection + load modelds

import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/user';
import File from '../app/models/file';
import Appointment from '../app/models/appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  // 1.
  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  // mongo connection
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://192.168.99.100/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
