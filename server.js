const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/bookmarks_db');

const Bookmark = db.define('bookmarks', {
  name: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
  category: {
    type: Sequelize.STRING,
  },
});
