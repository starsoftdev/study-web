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
];

export default customValidators;
