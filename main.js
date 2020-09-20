import './main.sass'
import 'loading-attribute-polyfill/loading-attribute-polyfill.js'

var links = document.getElementsByTagName("a");
for (var i = 0, linksLength = links.length; i < linksLength; i++) {
   if (links[i].hostname != window.location.hostname) {
      links[i].target = '_blank';
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
