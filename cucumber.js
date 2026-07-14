const path = require('path');
process.env.TS_NODE_PROJECT = path.resolve(__dirname, 'cucumber.tsconfig.json');

module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['features/support/**/*.ts', 'features/step_definitions/**/*.ts'],
    format: [
      'progress',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    snippetInterface: 'async-await'
  }
};
