/**
 * Created by mike on 6/7/16.
 */

require('dotenv').config();

const webpackAssets = require('./webpack-assets.json'); // eslint-disable-line
require('isomorphic-fetch');

if (process.env.CLOUDFLARE_API_KEY) {
// get the asset paths
  const assetValues = Object.keys(webpackAssets).map(key => webpackAssets[key]);

  const host = 'studykik.com';
  // combine the JS and CSS asset paths to clear
  const assets = [];
  for (const asset of assetValues) {
    if (asset.js) {
      assets.push(`https://${host}\\${asset.js}`);
    } else if (asset.css) {
      assets.push(`https://${host}\\${asset.css}`);
    }
  }

  fetch(`https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE}/purge_cache`, {
    headers: {
      'X-Auth-Email': process.env.CLOUDFLARE_EMAIL,
      'X-Auth-Key': process.env.CLOUDFLARE_API_KEY,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify({
      files: assets,
    }),
  }).then(() => {
    console.log('Cleared cache for Cloudflare successfully for webpack assets.'); // eslint-disable-line
    process.exit();
  }).catch(err => {
    console.log(`Clearing cache for Cloudflare for webpack assets failed with error message: ${err.message}.`); // eslint-disable-line
    process.exit(1);
  });
}
