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

  await page.goto(process.argv[2]); // get website from the first parameter after the script
  let foundationVersion;
  let jqueryVersion;
  let bootstrapVersion;

  try {
    foundationVersion = await page.evaluate('Foundation.version')
  } catch(err){};
  try {
    jqueryVersion = await page.evaluate('jQuery.fn.jquery')
    jqueryVersion = jqueryVersion.split(' ');
    jqueryVersion = `${jqueryVersion[0]} (${jqueryVersion[1]})`;
  } catch(err){};
  try {
    bootstrapVersion = await page.evaluate('bootstrap.Tooltip.VERSION || $.fn.tooltip.Constructor.VERSION')
  } catch(err){};


  typeof foundationVersion !== 'undefined' ? console.info(chalk.green(`Found Foundation ${chalk.yellow(foundationVersion)}`)) : console.log(chalk.red('No Foundation version found / loaded.'));
  typeof jqueryVersion !== 'undefined' ? console.info(chalk.green(`Found jQuery ${chalk.yellow(jqueryVersion)}`)) : console.log(chalk.red('No jQuery version found / loaded.'));
  typeof bootstrapVersion !== 'undefined' ? console.info(chalk.green(`Found Bootstrap ${chalk.yellow(bootstrapVersion)}`)) : console.log(chalk.red('No Bootstrap version found / loaded.'));

  await browser.close();
})();
