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
  for(let i = 0; i < detections_length; i++){
      let result
      let name =  detections[i].name
      try {
          result = await page.evaluate(detections[i].check())
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
      check: () => 'Foundation.version',
      output: (result) => chalk.yellow(result)
    },
    {
      name: 'jQuery',
      check: () => 'jQuery.fn.jquery',
      output: (result) => {
        result = result.split(/ (.+)/)
        result = result[1]
                 ? `${result[0]} (${result[1]})`
                 : result
         return chalk.yellow(result)
      }
    },
    {
      name: 'Bootstrap',
      check: () => 'bootstrap.Tooltip.VERSION || $.fn.tooltip.Constructor.VERSION',
      output: (result) => chalk.yellow(result)
    },
    {
      name: 'Firebase',
      check: () => 'Firebase.SDK_VERSION',
      output: (result) => chalk.yellow(result)
    },
    {
      name: 'Backbone',
      check: () => 'Backbone.VERSION',
      output: (result) => chalk.yellow(result)
    },
    {
      name: 'Ember',
      check: () => 'Ember.VERSION',
      output: (result) => chalk.yellow(result)
    },
    {
      name: 'Handlebars',
      check: () => 'Handlebars.VERSION',
      output: (result) => chalk.yellow(result)
    },
    {
      name: 'Hammer',
      check: () => 'Hammer.VERSION',
      output: (result) => chalk.yellow(result)
    },
    {
      name: 'Angular.js',
      check: () => 'angular.version.full',
      output: (result) => chalk.yellow(result)
    },
    {
      name: 'NProgress',
      check: () => 'NProgress.version',
      output: (result) => chalk.yellow(result)
    },
    {
      name: 'UIkit',
      check: () => 'UIkit.version',
      output: (result) => chalk.yellow(result)
    },
    {
      name: 'webpack',
      check: () => 'webpackJsonp'
    },
    {
      name: 'Google Analytics',
      check: () => 'GoogleAnalyticsObject || ga'
    },
    {
      name: 'Isotope',
      check: () => 'Isotope'
    },
    {
      name: 'Masonry',
      check: () => 'Masonry'
    },
    {
      name: 'Outlayer',
      check: () => 'Outlayer'
    },
    {
      name: 'Packery',
      check: () => 'Packery'
    },
    {
      name: 'Google Webfonts',
      check: () => 'WebFontConfig && WebFontConfig.google'
    },
    {
      name: 'WordPress',
      check: () => 'wp'
    },
    {
      name: 'YouTube',
      check: () => 'YT'
    },
    {
      name: 'Modernizr',
      check: () => 'Modernizr'
    },
    {
      name: 'ghost',
      check: () => 'ghost'
    },
    {
      name: 'Joomla',
      check: () => 'Joomla'
    },
    {
      name: 'Drupal',
      check: () => 'Drupal'
    }
  ]
}
