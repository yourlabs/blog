+++
date = "2020-10-30T13:37:00+00:00"
draft = false
tags = ['devops']
title = "DevOps: la définition définitive ?"
author = "jpic"
+++

Le terme "DevOps" pâti de plusieurs significations étant donné qu'aucun
académicien n'a, à l'heure où j'écris ces lignes, pu développer une [définition
unique au terme "DevOps"](https://en.wikipedia.org/wiki/DevOps#Definition), et
donc, ça n'est pas le but de cet article.

Méthode ou outil ? Les dissonances entre la littérature thématique et la
pratique en entreprise sont courantes, il est vrai que "peu importe l'outil,
c'est la pratique qui compte" mais il n'y a pas de pratique à l'échelle
industrielle sans outil non plus.

Cet article tente de réconcilier les deux: si la boite à outils DevOps est un
fruit de l'application d'une **méthode** qui s'appelle le *TPS* dans le domaine
de l'informatique, cela n'empêche pas les entreprise traditionnelles de
bénéficier de la valeur ajouté de ces outils sans pour autant complètement de
politique au celas du bon sens commun, compréhensible par tous.

Explications.

<!--more-->

## Toyota Production System (TPS)

Bien que l'histoire du TPS soit l'une de mes grandes passions, on va (essayer
de) se contenter du minimum dans le contexte de cet article.

Le *Management Scientifique* de Fred Taylor fait de l'employé un rouage dans
une machine, payé simplement pour exécuter des actions pré planifiées le plus
rapidement possible.

Le *TPS* demande aux employés de **poursuivre la maitrise au travers de
l'amélioration continue** et leur donne un but supérieur - plus de qualité,
valeur et service client - ainsi qu'un niveau d'autonomie en leur donnant le
pouvoir d'expérimenter avec des idées d'améliorations et d'implémenter celles
qui marchent.

Il s'agit là de deux organisations fondamentalement différentes, en TPS:

- la **qualité du produit est l'objectif commun tous**,
- de l'ouvrier manutentionnaire jusqu'au CEO qui doivent donc se mélanger,
- en pratiquant l'**amélioration continue**: le
  fameux [Kaizen](https://en.wikipedia.org/wiki/Kaizen)

Il en découle notamment:

- la corde *andon* qui donne à **chaque ouvrier le pouvoir d'arrêter la chaine de production** si il identifie le moindre défaut ou problème qui puisse affecter le reste de la chaine ou le produit final
- d'**envoyer les employés en observation sur tous les postes de la chaine de production** pour comprendre comment son travail affecte les autres,

Je sais, ça se répète mais c'est que justement la boucle s'est bouclée depuis
longtemps et la méthode s'améliore d'elle même au fil du temps qu'elle sert à
améliorer le produit: nombreuses sont les versions (itérations) que la méthode
a subi aujourd'hui...

Il faudrait remonter toutes les rétros du monde pour découvrir qu'est-ce-qui
est arrivé avant quoi exactement, sans parler des différents groupes qui ne se
connaissaient pas et qui ont développés les mêmes idées dans des ordres
spécifiques à leurs chronologies respectives.

Mais il me semble que c'est la base pour comprendre comment de cette culture
qui a piloté Toyota au travers des ages quand General Motors se vautrait, faute
d'adopter le TPS qu'ils avaient déjà en place à l'usine de Freemont (devenue
NUMMI puis Tesla) depuis 25 ans, laissant les anciens dirigeants témoigner que
"on ne pensait pas que tout allait s'arrêter si on ne le faisait pas", parlant
de l'adoption du TPS dans le reste de leurs usines.

![DevOps Culture Drives Us](/img/devops-culture-drives-us.png)

Et combien d'entreprises se sont plantées en ne priorisant pas la qualité de
leur produit, de leur service client, ou l'optimisation de leur chaine de
production ? Il y en meurt tous les jours, d'où l'importance de s'intéresser à
leur histoire et de commencer à changer dès aujourd'hui.

Le TPS est également excellent pour le moral des troupes ce que précise
généralement la littérature thématique, je pense notamment a "Lean Enterprise"
de Jez Humble.

## Dev + Ops = DevOps

Dev est le diminutif de "développeur logiciel" qui, contextualisé à
l'informatique, consiste en une activité de programmation informatique "codage"
de logiciels.  Vous avez une idée: votre dev la code.

Ops est le diminutif de "opérateur logiciel", consiste en une activité de
gestion de machine/système/réseau/stockage physiques et/ou virtuel (cloud).
Vous avez un code: votre ops le met en ligne.

Si vous pratiquez le *Management scientifique* de Fred Taylor alors vous avez
tous vos devs dans un bureau et tous vos ops dans un autre. Vos devs font du
code et puis vous dites à vos ops de se débrouiller avec pour le mettre en
ligne.

Si vous pratiquez le *TPS* alors vos devs et vos ops sont dans même bureau,
vous leur donnez l'objectif commun de livrer un produit de qualité pour le
client ensemble, en mettant leurs métiers respectifs au service de l'autre: le
dev sert l'ops et l'ops sert le dev.

C'est ainsi que sont nés les **outils DevOps**, briques de la chaine de
production *TPS*, automatisée de bout en bout: de votre idée à la mise en ligne
en passant par le développement. Ils sont le fruit de la **méthode DevOps** qui
est partie de l'application du *TPS* dans le domaine du développement
informatique.

Les équipes de developpement les plus performantes mettent en ligne 30x fois
plus de versions, 200x plus rapidement, avec 60x moins d'échecs et récupèrent
en cas d'incident 168x plus vite.
([source](https://services.google.com/fh/files/misc/state-of-devops-2015.pdf)).

Les entreprises traditionnelles peuvent toutefois bénéficier dans une moindre
mais pertinente mesure des outils DevOps sans pour autant avoir à vraiment
changer leur politique, pas de manière notable hormis les détails nécessaires
pour établir une communication entre les devs et les ops.

Il n'est pas rare d'avoir 4 fois plus de déploiement, 10x plus rapidement et
avec 10x moins d'échecs, rien qu'en faisant le minimum nécessaire pour adopter
un minimum de pratique et d'outils DevOps.

## DevOps, TPS, Lean, eXtreme Programing: des dépendances récursives ?

Le but ultime du DevOps est de fluidifier la "chaine de production" pour
optimiser d'abord pour la qualité des livraisons de bout en bout.

Et si l'idée qu'il y ait une chaine de production aboutissant à mise en ligne
d'un code a commencé dans votre bureau de devs et d'ops, elle a fait son chemin
dans votre tête et c'est maintenant toute votre entreprise que vous voyez comme
une chaine de production et vous voulez optimisez les processus de bout en
bout: le DevOps gagne du terrain.

A partir de ce moment là, il me semble que la distinction entre le DevOps et le CD, le
TPS, l'Agile, le Lean, et l'eXtreme Programing devient de plus en plus flou
tout simplement parce que certains concepts sont partagés et/ou dépendent les
uns des autres: pour aller au bout de la méthode DevOps il va falloir passer au
TPS qui exige une qualité qu'en code on atteint avec l'eXtreme Programing, de
fluidité de chaine de production avec la livraison continue intrinsèque à
l'Agile dont les principes sont encore plus vastes.

Le DevOps et tous ses petits amis sortent ainsi du bureau de vos devs et vos
ops dans le but de mieux livrer de la meilleure qualité aux clients.

![DevOps Business Change](/img/devops-business-change.png)

## DevOps: mesurer l'efficacité de la chaine de production

Bien qu'en informatique notre chaine de production soit purement virtuelle, on
peut tout de même schématiser et mesurer l'efficacité de la chaine de
production comme si elle était parfaitement réele !

### Feature Delivery Flow

Le Feature Delivery Flow, "Flux de Livraison de Fonctionnalités" en Français,
est un schéma du processus "de l'idée à la mise en ligne" dans votre
organisation avec les différentes étapes, par exemple:

![DevOps Feature Delivery Flow](/img/devops-feature-delivery-flow.png)

### Value Stream Mapping (VSM)

Le Value Stream Mapping, Cartographie des chaines de valeur en Français, est
méthode de lean de cartographie du processus.

Le VSM est un outil fondamental dans une démarche lean. C'est le meilleur moyen
de pouvoir visualiser les différents flux au sein d'une production (matière et
information). Il est facile de mettre en avant les tâches à valeur ajoutée et
d'identifier les différents types de gaspillages comme les stocks et en-cours.

C'est un outil qui, s'il est bien utilisé, est compréhensible par tous et qui
offre la possibilité d'amener différentes personnes à s'investir pour améliorer
l'état actuel.

![DevOps Value Stream Mapping](/img/devops-value-stream-mapping.png)

## Équipe "DevOps": la désillusion

Voici une équipe DevOps typique, qui réunit donc tous les métiers nécessaires à
la chaine de production, en l'occurrence d'une système informatique:

Concrètement, l'impact organisationnel de cet état d'esprit et de restructurer
ses équipes par objectif de création de valeur pour les clients finaux, et non
par métier avec une équipe dev, une équipe design, une équipe déploiement, une
équipe test, etc, etc ... presque partout dans le paysage industriel jusqu'à la
fin des années 2000 lors de la sortie du manifeste Agile.

![DevOps Team](/img/devops-team.png)

Et là, c'est le drame: on ne fait pas une "équipe DevOps" en la composant de
gens qui partagent les spécialités autours des "outils DevOps" comme j'ai pu le
voir dans le passé, car cela va justement créer un "silo" ce que le véritable
DevOps vise à défaire en répartissant les compétences dans toutes les équipes.

Mais encore une fois, rien n'empêche une organisation classique de bénéficier
de la valeur ajoutée des outils DevOps et cela sera toujours un progrès
**mesurable**.

Le DevOps c'est donc la collaboration, elle même optimisée, et factorisée au
sein d'une culture qui fait sens et est compréhensible par tous. On peut
adopter cette culture même si c'est la première chose qu'on fait, vous verrez
qu'elle partage un certain nombre de valeurs humaines avec le manifeste Agile:

![DevOps Culture](/img/devops-culture.png)

## Le recrutement "DevOps"

Normalement, quand ils recrutent un devops, c'est évidemment sur un besoin
d'ops mais avec une expérience des outils et pratiquent DevOps qui sont devenus
des standards de l'industrie. Finit le déploiement tous les 3 mois à base de
zip de code par mail ! Tout est maintenant dans le "push to deploy" git.

Donc ne soyez pas triste si on vous demande des compétence systèmes et réseau
lorsque vous postulez sur un poste "DevOps": cela veut tout simplement dire
qu'ils cherchent des compétences sur les **outils DevOps**, de kubernetes à
openstack en passant par ansible (trois produits sur lesquels nous sommes très
compétents soit dit en passant).

Si vous voulez faire de la "méthode DevOps" en tant qu'agiliste alors placez
vous plutôt sur des offres de coach agile, scrum master voire product owner ou
product manager qui sont également des contextes dans lesquels on grandement
besoin d'agilistes aussi.

## Et les hackers dans tout ça ?

Comme vous le savez je suis en plein [coup de gueule contre l'emploie abusif du
terme "hacker"](https://yourlabs.fr/posts/2020-10-23-hackers-le-coup-de-gueule/).

C'est au tour de l'un de mes confrères, [Alec Roy, coach
agile](https://cv.aroy.fr/) de pousser un coup de gueule sur LinkedIn:

    Ça ne veut SURTOUT PAS dire que le développeur a des compétences d'Ops (automatisation, monitoring de la production, etc.).

    Ça ne veut SURTOUT PAS dire que l'ops doit savoir développer ou débugger en production si nécessaire.

Il a parfaitement raison, une personne qui cumule ces compétences est un
**hacker**, [selon la
RFC1392](https://yourlabs.fr/posts/2020-10-23-hackers-le-coup-de-gueule/).

Et si vous me dites que la plupart des DevOps sont des hackers ... je pense que
vous avez raison.

## Outils DevOps

Vous pouvez améliorer vos performances avec des outils DevOps ... mais à
condition de les utiliser à bon escient !

J'en ai entendu parler des gros projets Kubernetes dans de grosses orgas faire
du gros flop tout simplement parce que personne n'avait lu "Mastering
Kubernetes" qui, outre le fait d'être l'un des livres DevOps les plus
passionnants que j'ai eu la chance de lire, commencent dès le premier chapitre
par clarifier ce qu'est et surtout n'est **pas** Kubernetes !

Kubernetes est devenu l'exemple même du "DevOps theater", dans lequel on se
raconte qu'on fait du DevOps parce que c'est un gros outil DevOps mais en fait
derrière on pilote tout manuellement.

Non ! Kubernetes est un framework à **integrer proprement** dans sa chaine de
production, et non juste installer et demander aux développeurs de faire des
centaines de lignes de configurations répétitives à la main.

Il va falloir faire sa propre interface pour gérer les identités, le stockage,
le réseau, etc... De manière unifiée et transparente en vue d'intégrer
Kubernetes correctement dans sa chaine de production: de manière à ce que ça
soit rentable tout simplement.

Des produits finis basés sur Kubernetes et Open Source existent d'ailleurs, mes
favoris étant [Kelproject](http://www.kelproject.com/) et
[OpenShift](https://www.openshift.com/).

## Conclusion

L'essence du DevOps est que les différentes spécialités nécessaires pour amener
une idée en production de bout en bout partagent un objectif commun de qualité
au lieu de responsabilités individuelles.

Les outils qui en sont sortis sont vraiment très efficaces à condition d'être
utilisés à bon escient...
et non "l'un est responsable du code, l'autre du déploiement, l'autre du
design" qui sont justement les fameux "silos" hérités du Management
Scientifique (Taylorisme) que le DevOps entend briser.

## Pour aller plus loin

Bien entendu,

Concernant la méthode DevOps & ses amis, je vous invite à consulter mes
présentations "[From Taylorism to Lean](https://slides.com/jamespic/deck/)" et
[DevOps & CD: QuickStart](http://slides.com/jamespic/cd-devops) sur le livre
éponyme.

YourLabs a également quelques logiciels DevOps qui peuvent vous inspirer aussi:

- [Container Build Rootless Networkless avec Shlax et Buildah](https://yourlabs.org/posts/2020-10-27-shlax-preview/)
- [BigSudo: eXtreme DevOps Hacking Operations](https://blog.yourlabs.org/posts/2020-02-08-bigsudo-extreme-devops-hacking-operations/)
- [Distribution de roles Ansible](https://galaxy.ansible.com/yourlabs/)

Vous voulez voir des présentations en live ? C'est au [Hack'n'Dev
Meetup](https://www.meetup.com/Angouleme-Hack-Dev-Barcamp-1337/) au hackerspace
à Breuty, la Couronne !
