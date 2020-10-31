+++
date = "2020-10-30T13:37:00+00:00"
draft = false
tags = ['devops']
title = "DevOps, théorie et pratique irréconciliable ?"
author = "jpic"
+++

Cet article théorise sur la signification du terme "DevOps": dans la
littérature thématique il s'agit d'une pratique collective, mais dans la
profession il s'agit de compétences techniques bien particulières.

Explications.

<!--more-->

Cet article théorique est une réaction à un autre billet théorique d'un Coach Agile sur LinkedIn. Je cite:

    "On recherche un DevOps".

    Aïe… Reprenons depuis le début.

    DevOps est un mouvement (au même titre que l'Agilité, son demi-frère) qui vise à unir deux mondes qui parfois ne se comprennent plus : le développement et les opérations. Dans l'idéal, les deux métiers travaillent quotidiennement ensemble dans un même lieu.

    [...]

    Retenez que DevOps est un état d'esprit.

    Ce trait indique que le collaborateur est capable de faire suffisamment preuve d'empathie pour pouvoir collaborer avec des individus ayant un métier différent, et a une appétence pour le travail bien fait et automatisé.

    Le développeur doit savoir ce que l'Ops attend du livrable et doit se conformer aux impératifs de production (quitte à développer différemment).

    L'Ops doit accepter de livrer régulièrement et doit automatiser les processus.

    Ne recherchez plus des DevOps, recherchez des Dévs ou des Ops qui ont *la compétence DevOps*.

    Et vous, saviez-vous que DevOps n'était ni un rôle ni un poste ?

Tout a fait d'accord et j'ai moi même longuement réfléchi a la question étant
donné que je ne trouvais pas que ce terme était utilisé dans la profession
comme il l'est dans la littérature sur cette thématique.

Cependant on constate qu'après l'éclatement du silo entre Dev et Ops - et je
parle de l'époque où on envoyait nos sources par mail tous les 3 mois pour le
déploiement en production - sont nés de nombreux outils, fruit de la
collaboration entre Dev et Ops: Ansible, OpenStack, Kubernetes, etc, etc...

Je pense que c'est pour cela que le poste DevOps implique une précédente
expérience de ces outils ET pratiques car bien entendu ça n'est pas l'outil qui
compte mais la pratique, enfin, il faudra bien un outil même si on veut
déployer, même en [IPoAC](https://fr.wikipedia.org/wiki/IP_over_Avian_Carriers) !

C'est donc non *par définition* mais *de facto* que le "DevOps" se retrouve a
être, quelque part, porteur du déploiement du code de l'équipe. Attention, être
porteur ne veut pas dire travailler tout seul dans un coin mais bien être
garant de la pratique tout en impliquant l'équipe de manière horizontale, par
exemple: je formalise, je code les tests, le code, je déploie, je valide,
j'envoie en prod, je surveille le monitoring, j'observe le comportement de mon
code, etc, etc... C'est un exemple de chaine de production qui va impliquer des
compétences transverses qu'on a rarement chez une seule personne, à moins que
celle-ci n'ait vraiment *beaucoup* d'experience dans tous les domaines
impliqués.

Les pratiques Agiles telles que la CI/CD nécessitent forcement des compétences
en systèmes et réseaux dont les ops sont traditionnellement spécialistes (mais
rien n'empêche un dev systèmes et réseau d'être également expert).

Quand ils recrutent un devops, c'est évidemment sur un besoin d'ops qu'ils
recrutent mais avec une expérience de dev et donc les évolutions suivantes:

- connaissances en développement système et réseau pour bien utiliser /
  développer / maintenir les outils de déploiements automatique: le devops
  n'est pas censé répéter des opérations de routine manuellement

- mais bien automatiser pour fluidifier la chaine de production et optimiser le
  TTM de bout en bout, être capable de réaliser un Value Stream Mapping par
  exemple pour identifier les goulots d'étranglement organisationnels, ainsi
  que d'assurer un workflow continu.

Donc voila, quand ils recrutent un devops c'est qu'ils ont tout simplement
besoin de compétences systèmes et réseaux ça me parait clair mais surtout
d'expérience sur les outils et pratiques qui ont émergés du mouvement devons a
ses débuts.

Par contre, il reste un bout de la citation avec laquelle je ne suis pas du
tout d'accord et que je cite ici:

    Ça ne veut SURTOUT PAS dire que le développeur a des compétences d'Ops (automatisation, monitoring de la production, etc.).

    Ça ne veut SURTOUT PAS dire que l'ops doit savoir développer ou débugger en production si nécessaire.

Cela va completement à l'encontre du KATA de Toyota, base même du DevOps, dans
lequel "chaque ouvrier doit tourner régulièrement entre tous les postes de la
chaine de production pour obtenir des compétences utiles de bout en bout de
cette chaine", c'est également excellent pour le moral ce que précise
généralement la littérature thématique, je pense notamment a "Lean Enterprise"
de Jez Humble.

Quel est l'intérêt de travail ensemble si c'est pour SURTOUT PAS apprendre quoi
que ce soit du métier de l'autre ? Aucun intérêt. Le but n'est pas de remplacer
mais de chercher à se comprendre pour collaborer plus efficacement ensemble.

L'essence du DevOps est que les différentes spécialités nécessaires pour amener
une idée en production de bout en bout partagent cet objectif commun, et non
"l'un est responsable du code, l'autre du déploiement" qui sont justement les
fameux "silos" que le DevOps entend briser.

Je vous invite à consulter ma présentation "From Taylorism to Lean" en savoir
plus sur le [Toyota Production System (TPS)](https://slides.com/jamespic/deck/)
