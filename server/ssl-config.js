/**
 * Created by mike on 5/3/16.
 */

const path = require('path');
const fs = require('fs');

exports.privateKey = fs.readFileSync(path.join(__dirname, './private/privatekey.development.pem')).toString();
exports.certificate = fs.readFileSync(path.join(__dirname, './private/certificate.development.pem')).toString();
