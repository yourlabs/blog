import './main.sass'
import 'loading-attribute-polyfill/loading-attribute-polyfill.js'

var links = document.getElementsByTagName("a");
var sites = ['yourlabs.org', 'yourlabs.fr', window.location.hostname]
for (var i = 0, linksLength = links.length; i < linksLength; i++) {
  if (sites.indexOf(links[i].hostname) < 0) {
    links[i].target = '_blank';
  }
  if (links[i].pathname == window.location.pathname && links[i].hostname == window.location.hostname) {
    if (links[i].childNodes.length > 1) continue // it's an image or something we don't want to underline
    links[i].classList.add('active')
  }
}

import InstantClick from 'instantclick'
InstantClick.init()
var dnt = (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack);
var doNotTrack = (dnt == "1" || dnt == "yes");
if (!doNotTrack) {
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', 'UA-169189134-1', 'auto');
  ga('set', 'anonymizeIp', true);
  ga('send', 'pageview');
}

try {
  var header = document.querySelector('header.main-header')
  var hero = header.parentNode.children[1].children[1].classList[0]
  if (hero == 'hero') {
    header.classList.add('hero-header')
  }

  var headerScroll = function() {
    if (window.scrollY > 50 && header.classList.contains('transparent'))
        window.requestAnimationFrame(
          () => {
            header.classList.remove('transparent')
            document.querySelector('header.main-header img').src = '/img/yourlabs-transparent.png'
          }
        )

    else if (window.scrollY < 50 && !header.classList.contains('transparent'))
        window.requestAnimationFrame(() => {
          header.classList.add('transparent')
          document.querySelector('header.main-header img').src = '/img/yourlabs-transparent-whitetext.png'
        })
  }
  window.addEventListener('scroll', headerScroll)
  headerScroll()

} catch {
  console.log('u 1337 ? -> contact us')
}
