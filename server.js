const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/bookmarks_db');
const express = require('express');
const app = express();

app.get('/', async(req,res) => {
  await res.redirect('/bookmarks');
})

app.get('/bookmarks', async(req,res) => {
  try{
    const bookmarks = await Bookmark.findAll();
    await res.send(bookmarks);
  }
  catch(ex){}
})

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

const syncAndSeed = async() => {
  await db.sync({force: true});
  const wiki = await Bookmark.create({name: 'Wiki', url: 'https://en.wikipedia.org/wiki/Main_Page', category: 'Information'});
  const youtube = await Bookmark.create({name: 'YouTube', url:'https://www.youtube.com/', category:'Entertainment'});
  const fullstack = await Bookmark.create({name: 'Fullstack', url: 'https://www.fullstackacademy.com/', category: 'Education'});

  await Promise.all([wiki.save(), youtube.save(), fullstack.save()]);
//   const promises = [wiki.save(),youtube,fullstack];

// const [wikiResponse,youtubeResponse, fullstackResponse] = await Promise.all(promises);
}


const init = async() => {
  try{
    await db.authenticate();
    if (process.env.SYNC) {
      await syncAndSeed();
    }
  
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  }
  catch(ex){

}}
init();