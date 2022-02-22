module.exports = {
  default: `
    --require ./src/test/bdd/step-definitions/**/*.ts
    --require-module ts-node/register
    --format @cucumber/pretty-formatter
    --format html:./src/test/bdd/report/bdd-report.html
    --format-options '{"theme":{"feature keyword":["magenta","bold"],"scenario keyword":["magenta","bold"],"step keyword":["bold"], "location": ["grey"], "datatable": ["grey"]}}'
    --publish-quiet
    `
}
