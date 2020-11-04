---
title: YourLabs Business Service
subtitle: Services numériques depuis 1998
subtitle2: La pratique d'une ingénierie tel un sport, un art, au service d'êtres humains.
comments: false
hero: /img/backgrounds/abstract.jpg
hero_action_label: Nos services sur mesure
hero_action_url: '#services'
---

{{< rawhtml >}}
<style type="text/css">
main p {
  text-align: justify;
}
main h2 {
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 3rem;
  font-size: 3rem;
}
a h3 {
  color: #444fff;
}
</style>

<div id="index-background">
</div>

<div class="product-container" style="">
  <div class="homepage-content">
    <h2>Nos Offres</h2>
    <p>
    Découvrer nos offres, que vous soyez une PME ou une agence gouvernementale, nous avons ce qu'il vous faut.
    </p>
    <a name="services"></a>
    <div class="services">
      <div class="service">
        <a href="/secops/" class="overlay"></a>
        <img loading="lazy" src="/img/cybersecurity.svg" />
        <h2>Cyber-Sécurité</h2>
        <ul>
            <li>Audits personnalisés</li>
            <li>Contre audits</li>
            <li>Formations</li>
            <li>Blackbox, Whitebox</li>
            <li>Standards: OWASP, NIST...</li>
            <li>Red Team: Protection active</li>
        </ul>
      </div>
      <div class="service">
        <a href="/dev/" class="overlay"></a>
        <img loading="lazy" src="/img/web_development.svg" />
        <h2>Développement</h2>
        <ul>
            <li>
                Web: frontend, backend
            </li>
            <li>
                IOT, IA, Blockchain
            </li>
            <li>
                Création: Directeur Artistique
            </li>
            <li>
                Maitrise: Lean Sensei
            </li>
            <li>
                Scrum, Lean, Kanban, Scrumban
            </li>
            <li>
                Continuous Integration (CI)
            </li>
            <li>
                Test Driven Development (TDD)
            </li>
            <li>
                eXtreme Programing (XP)
            </li>
        </ul>
      </div>
      <div class="service">
        <a href="/devops/" class="overlay"></a>
        <img loading="lazy" src="/img/online_storage.svg" />
        <h2>DevOps</h2>
        <ul>
            <li>
                Continuous Delivery (CD)
            </li>
            <li>
                Réseaux Linux, BSD...
            </li>
            <li>ARP, TCP, IP, DNS...</li>
            <li>Containers, Virtualisation...</li>
            <li>GitHub, GitLab, Jenkins...</li>
            <li>Métriques, Statistiques, KPI...</li>
            <li>eXtreme DevOps (XD)</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="hero" style="background-image: url(/img/backgrounds/abstract.jpg); background-position: center; height: auto; padding: 3rem 0">
  <div class="hero-inner">
    <h2>Entreprise de services du numérique</h2>
    <div class="container">
      <span class="subtitle">
        YourLabs Business Service est une société de services du numérique immatriculée
        en France qui offre la meilleure expertise sur les <a href="/software/">logiciels de marque
        YourLabs</a> ainsi qu'une expertise particulièrement forte sur les
        languages Python, PHP, le framework Django et l'ecosystème de logiciels libres
        en général, et les systèmes Linux ou BSD.
      </span>
    </div>
  </div>
</div>



<script>
document.querySelector("body").onscroll = function myFunction() {  
    var scrolltotop = document.scrollingElement.scrollTop;
    var target = document.getElementById("index-background");
    var xvalue = "center";
    var factor = -0.4;
    var yvalue = scrolltotop * factor;
    target.style.backgroundPosition = xvalue + " " + yvalue + "px";
  }
</script>
{{< /rawhtml >}}
