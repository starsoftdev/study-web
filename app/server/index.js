import compress from 'compression';
import serveStatic from 'serve-static';
import express from 'express';
import logger from 'winston';
import './lib/initialize';
import { config } from './lib';

const app = express();
const PORT = config.PORT || 8080;
const PUBLIC_PATH = `${__dirname}/../public`;

app.use(compress());
app.set('view engine', 'ejs');
app.use(serveStatic(PUBLIC_PATH, { maxAge: '1y' }));

app.get('/*', async (req, res) => {
  const options = {
    environment: config.NODE_ENV
  };

  res.header('Cache-Control', 'no-cache, no-store');
  res.render(`${PUBLIC_PATH}/index.ejs`, { options });
});

app.listen(PORT, (err) => {
  if (err) logger.error(err);
  logger.info('==> 🌎 Listening on PORT %s. Open up http://0.0.0.0:%s/ in your browser.', PORT, PORT);
});
