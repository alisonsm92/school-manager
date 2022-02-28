module.exports = {
  default: `
    --require ./test/acceptance/step-definitions/**/*.ts
    --require-module ts-node/register
    --format @cucumber/pretty-formatter
    --format html:./test/acceptance/report/acceptance-report.html
    --format-options '{"theme":{"feature keyword":["magenta","bold"],"scenario keyword":["magenta","bold"],"step keyword":["bold"], "location": ["grey"], "datatable": ["grey"]}}'
    --publish-quiet
    `
}
