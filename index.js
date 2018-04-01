const puppeteer = require('puppeteer')
const chalk = require('chalk')
const pkg = require('./package.json')

console.log(pkg.name + " " + pkg.version)

run()

async function run(){
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  if(!process.argv[2]) {
    console.log(chalk.red('No website was provided.'))
    process.exit(1)
    return
  }

  await page.goto(process.argv[2]) // get website from the first parameter after the script

  let foundationVersion
  let jqueryVersion
  let bootstrapVersion

  let webpackUsed
  let googleanalyticsUsed
  let isotopeUsed
  let masonryUsed
  let outlayerUsed
  let packeryUsed
  let googlewebfontsUsed
  let wpUsed
  let youtubeUsed

  try {
    foundationVersion = await page.evaluate('Foundation.version')
  } catch(err){}

  try {
    jqueryVersion = await page.evaluate('jQuery.fn.jquery')
    jqueryVersion = jqueryVersion.split(/ (.+)/)
    jqueryVersion = jqueryVersion[1]
                    ? `${jqueryVersion[0]} (${jqueryVersion[1]})`
                    : jqueryVersion
  } catch(err){}

  try {
    bootstrapVersion = await page.evaluate('bootstrap.Tooltip.VERSION || $.fn.tooltip.Constructor.VERSION')
  } catch(err){}

  try {
    webpackUsed = await page.evaluate('webpackJsonp')
  } catch(err){}

  try {
    googleanalyticsUsed = await page.evaluate('GoogleAnalyticsObject || ga')
  } catch(err){}

  try {
    isotopeUsed = await page.evaluate('Isotope')
  } catch(err){}

  try {
    masonryUsed = await page.evaluate('Masonry')
  } catch(err){}

  try {
    outlayerUsed = await page.evaluate('Outlayer')
  } catch(err){}

  try {
    packeryUsed = await page.evaluate('Packery')
  } catch(err){}

  try {
    googlewebfontsUsed = await page.evaluate('WebFontConfig && WebFontConfig.google')
  } catch(err){}

  try {
    wpUsed = await page.evaluate('wp')
  } catch(err){}

  try {
    youtubeUsed = await page.evaluate('YT')
  } catch(err){}

  typeof foundationVersion !== 'undefined'
         ? console.info(chalk.green(`Found Foundation ${chalk.yellow(foundationVersion)}.`))
         : console.log(chalk.red('No Foundation found.'))

  typeof jqueryVersion !== 'undefined'
         ? console.info(chalk.green(`Found jQuery ${chalk.yellow(jqueryVersion)}.`))
         : console.log(chalk.red('No jQuery found.'))

  typeof bootstrapVersion !== 'undefined'
         ? console.info(chalk.green(`Found Bootstrap ${chalk.yellow(bootstrapVersion)}.`))
         : console.log(chalk.red('No Bootstrap found.'))

  typeof webpackUsed !== 'undefined'
         ? console.info(chalk.green(`Found webpack.`))
         : console.log(chalk.red('No webpack found.'))

  typeof googleanalyticsUsed !== 'undefined'
         ? console.info(chalk.green(`Found Google Analytics.`))
         : console.log(chalk.red('No Google Analytics found.'))

  typeof isotopeUsed !== 'undefined'
         ? console.info(chalk.green(`Found Isotope.`))
         : console.log(chalk.red('No Isotope found.'))

  typeof mansonryUsed !== 'undefined'
         ? console.info(chalk.green(`Found Masonry.`))
         : console.log(chalk.red('No Masonry found.'))

  typeof outlayerUsed !== 'undefined'
         ? console.info(chalk.green(`Found Outlayer.`))
         : console.log(chalk.red('No Outlayer found.'))

  typeof packeryUsed !== 'undefined'
         ? console.info(chalk.green(`Found Packery.`))
         : console.log(chalk.red('No Packery found.'))

  typeof googlewebfontsUsed !== 'undefined'
         ? console.info(chalk.green(`Found Google Webfonts.`))
         : console.log(chalk.red('No Google Webfonts found.'))

  typeof wpUsed !== 'undefined'
         ? console.info(chalk.green(`Found WordPress.`))
         : console.log(chalk.red('No WordPress found.'))

  typeof youtubeUsed !== 'undefined'
         ? console.info(chalk.green(`Found YouTube.`))
         : console.log(chalk.red('No YouTube found.'))

  await browser.close()
}
