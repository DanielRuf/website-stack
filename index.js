const puppeteer = require('puppeteer')
const chalk = require('chalk')
const pkg = require('./package.json')

console.log(pkg.name + ' ' + pkg.version)

run()

async function run(){
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  init()

  await page.goto(process.argv[2]) // get website from the first parameter after the script

  const detections = await getDetections()

  await outputResults(detections, page)

  process.exit(1)
  return

  let webpackUsed
  let googleanalyticsUsed
  let isotopeUsed
  let masonryUsed
  let outlayerUsed
  let packeryUsed
  let googlewebfontsUsed
  let wpUsed
  let youtubeUsed
  let modernizrUsed
  let ghostUsed
  let joomlaUsed
  let drupalUsed


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

  try {
    modernizrUsed = await page.evaluate('Modernizr')
  } catch(err){}

  try {
    ghostUsed = await page.evaluate('ghost')
  } catch(err){}

  try {
    joomlaUsed = await page.evaluate('Joomla')
  } catch(err){}

  try {
    drupalUsed = await page.evaluate('Drupal')
  } catch(err){}


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

  typeof modernizrUsed !== 'undefined'
         ? console.info(chalk.green(`Found Modernizr.`))
         : console.log(chalk.red('No Modernizr found.'))

  typeof ghostUsed !== 'undefined'
         ? console.info(chalk.green(`Found ghost.`))
         : console.log(chalk.red('No ghost found.'))

  typeof drupalUsed !== 'undefined'
         ? console.info(chalk.green(`Found Drupal.`))
         : console.log(chalk.red('No Drupal found.'))

  typeof joomlaUsed !== 'undefined'
         ? console.info(chalk.green(`Found Joomla.`))
         : console.log(chalk.red('No Joomla found.'))

  await browser.close()
}

function init(){
  if(!process.argv[2]) {
    console.log(chalk.red('No website was provided.'))
    process.exit(1)
    return
  }
}

async function outputResults(detections, page){
  const detections_length = detections.length
  for(i = 0; i < detections_length; i++){
      let result
      let name =  detections[i].name
      try {
          result = await page.evaluate(detections[i].check());
      } catch(err){}
      typeof result !== 'undefined'
      ? detections[i].output
        ? console.info(chalk.green('Found ' + name + ' ' + detections[i].output(result) + '.'))
        : console.info(chalk.green('Found ' + name + '.'))
      : console.log(chalk.red('No ' + name + ' found.'))
  }
}

function getDetections(){
  return [
    {
      name: 'Foundation',
      check: function(){
        return 'Foundation.version'
      },
      output: function(result){
        return chalk.yellow(result)
      }
    },
    {
      name: 'jQuery',
      check: function(){
          return 'jQuery.fn.jquery'
      },
      output: function(result){
        result = result.split(/ (.+)/)
        result = result[1]
                 ? `${result[0]} (${result[1]})`
                 : result
         return chalk.yellow(result)
      }
    },
    {
      name: 'Bootstrap',
      check: function(){
        return 'bootstrap.Tooltip.VERSION || $.fn.tooltip.Constructor.VERSION'
      },
      output: function(result){
        return chalk.yellow(result)
      }
    },
    {
      name: 'Firebase',
      check: function(){
        return 'Firebase.SDK_VERSION'
      },
      output: function(result){
        return chalk.yellow(result)
      }
    },
    {
      name: 'Backbone',
      check: function(){
        return 'Backbone.VERSION'
      },
      output: function(result){
        return chalk.yellow(result)
      }
    },
    {
      name: 'Ember',
      check: function(){
        return 'Ember.VERSION'
      },
      output: function(result){
        return chalk.yellow(result)
      }
    },
    {
      name: 'Handlebars',
      check: function(){
        return 'Handlebars.VERSION'
      },
      output: function(result){
        return chalk.yellow(result)
      }
    },
    {
      name: 'Hammer',
      check: function(){
        return 'Hammer.VERSION'
      },
      output: function(result){
        return chalk.yellow(result)
      }
    },
    {
      name: 'Angular.js',
      check: function(){
        return 'angular.version.full'
      },
      output: function(result){
        return chalk.yellow(result)
      }
    },
    {
      name: 'NProgress',
      check: function(){
        return 'NProgress.version'
      },
      output: function(result){
        return chalk.yellow(result)
      }
    },
    {
      name: 'UIkit',
      check: function(){
        return 'UIkit.version'
      },
      output: function(result){
        return chalk.yellow(result)
      }
    },
  ]
}
