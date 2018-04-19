import request from './request';

const customValidators = [
  {
    name: 'emailDomain',
    validator: (value, options) => {
      const email = value || '';
      const emailExt = /(?:\.([^.]+))?$/.exec(email.trim())[1];
      const wrongEmailExts = ['con', 'vom', 'comm', 'cim', 'come', 'cpm', 'comc', 'comd', 'comcom', 'comi', 'xom', 'cm',
        'som', 'coms', 'comto', 'col', 'ccom', 'coml', 'comm', 'cok', 'ckm', 'ccm', 'om', 'clm', 'comei', 'conm', 'como',
        'cokp', 'comb', 'gom', 'fom', 'cin', 'xlm', 'comr', 'kom', 'coom', 'comq', 'coma', 'comv', 'von', 'conn', 'comes',
        'nrt', 'ney', 'nett', 'bet', 'neu', 'netf', 'ner', 'met', 'edi', 'efu'];
      if (wrongEmailExts.indexOf(emailExt) !== -1) {
        return options.message || 'invalid email domain';
      }
      return null;
    },
  },
  {
    name: 'validFile',
    validator: (value, options) => {
      const fileTypes = options.allowedFileTypes && options.allowedFileTypes.length > 0 ? options.allowedFileTypes : ['images'];
      let allowedMimeTypes = [];
      if (fileTypes.indexOf('images') !== -1) {
        allowedMimeTypes = allowedMimeTypes.concat(['image/png', 'image/jpeg', 'image/svg+xml', 'image/gif']);
      }
      if (fileTypes.indexOf('pdf') !== -1) {
        allowedMimeTypes.push('application/pdf');
      }
      if (allowedMimeTypes.length === 0) {
        return null;
      }
      if (value && value.length > 0) {
        const file = value[0];
        if (!file.type) {
          return options.message || 'unknown file format, try uploading an image or a pdf file.';
        }
        if (allowedMimeTypes.indexOf(file.type.toLowerCase()) === -1) {
          return options.message || 'file format not allowed, try uploading an image or a pdf file.';
        }
      }
      return null;
    },
  },
  {
    name: 'asyncValidUSZipCode',
    validator: (value, options, key, attributes) => {
      return new Promise((resolve) => {
        if (attributes.countryCode && attributes.countryCode !== 'us') {
          resolve();
          return;
        }
        const filterObj = {
          where: {
            postalCode: value,
          },
        };

        const params = {
          method: 'GET',
          query: {
            filter: JSON.stringify(filterObj),
          },
        };
        const requestURL = `${API_URL}/us`;
        request(requestURL, params).then((res) => {
          if (res.length) {
            resolve();
          } else {
            resolve('Invalid US postal code.');
          }
        });
      });
    },
  },
];

export default customValidators;
