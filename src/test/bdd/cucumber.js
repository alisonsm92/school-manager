module.exports = {
  default: `
    --require ./src/test/bdd/step-definitions/**/*.ts
    --require-module ts-node/register
    --format cucumber-console-formatter
    --format html:./src/test/bdd/report/bdd-report.html
    --publish-quiet
    `
}
