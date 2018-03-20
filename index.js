const puppeteer = require('puppeteer');
const chalk = require('chalk');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  if(!process.argv[2]) {
    console.log(chalk.red('No website was provided.'));
    process.exit(1);
    return;
  }
  await page.goto(process.argv[2]);
  const foundationVersion = await page.evaluate('Foundation.version');
  foundationVersion ? console.info(chalk.green(`Found Foundation ${chalk.yellow(foundationVersion)}`)) : console.log(chalk.red('No Foundation version found / loaded.'));
  const jqueryVersion = await page.evaluate('jQuery.fn.jquery');
  jqueryVersion ? console.info(chalk.green(`Found jQuery ${chalk.yellow(jqueryVersion)}`)) : console.log(chalk.red('No jQuery version found / loaded.'));
  await browser.close();
})();
