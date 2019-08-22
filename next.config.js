const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const withTM = require('next-transpile-modules')

module.exports = withPlugins([
  [withTM, {
    transpileModules: [
      'gsap/TweenLite',
      'gsap/TimelineLite',
      'gsap/EasePack',
      'gsap/CSSPlugin'
    ],
  }],
  [withCSS, {
    cssLoaderOptions: {
      url: false
    }
  }]
], {})
