const { generateTemplateFiles } = require('generate-template-files');

generateTemplateFiles([
  {
    option: 'component',
    defaultCase: '',
    entry: {
      folderPath: './tools/templates/react/component',
    },
    stringReplacers: [{ question: 'Insert component name', slot: '__component__' }],
    output: {
      path: './components/__component__(kebabCase)/',
      pathAndFileNameDefaultCase: '(kebabCase)',
      overwrite: false,
    },
  },
]);

generateTemplateFiles([
  {
    option: 'page',
    defaultCase: '',
    entry: {
      folderPath: './tools/templates/react/page',
    },
    stringReplacers: [{ question: 'Insert page name', slot: '__page__' }],
    output: {
      path: './pages/__page__(kebabCase)/',
      pathAndFileNameDefaultCase: '(kebabCase)',
      overwrite: false,
    },
  },
]);