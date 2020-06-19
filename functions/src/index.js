process.env.TZ = 'Asia/Tokyo';

const functions = require('firebase-functions');
const express = require('express');
const BodyParser = require('body-parser');
const cheerio = require('cheerio');

const init = () => {
  const app = express();

  // POSTリクエストを使えるようにする
  app.use(BodyParser.json({ limit: '1mb' }));

  app.post('/yahoo', (req, res) => {
    try {
      const $ = cheerio.load(req.body.source);
      const _li = $('main article section ul').eq(0).find('li');

      res.send(
        _li
          .map(function (i) {
            return {
              title: _li.eq(i).text(),
              url: _li.eq(i).find('a').attr()['href'],
            };
          })
          .get()
      );
    } catch (err) {
      res.sendStatus(500);
    }
  });

  return app;
};

const api = functions.region('asia-northeast1').https.onRequest(init());
module.exports = { api };
