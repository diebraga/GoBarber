// export models to controller and index.js

import Sequelize, { Model } from 'sequelize';

class File extends Model {
  // calling init() from Model
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
