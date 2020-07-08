+++
date = "2020-07-07T00:07:00+00:00"
draft = false
tags = ['security','scanner']
title = "Decouverte de l'ip derriere cloudflare"
author = "claw"
+++


## Qu'est ce que Cloudflare

Cloudflare est un reverse proxy, quad un utilisateurs veut aller sur xxxx.xx, la resolution dns va pointer sur un serveur Cloudflare qui lui, de son coté va renvoyé la reponse du serveur.
De ce fait un utilisateur ne va pas directement communiquer avec le serveur xxxx.xx .

![cloudflare](/img/cloudflare.png)

#### Avantage de Cloudflare

Le principale avantage de Cloudflare (en simplifiant un maximum) est de pouvoir bloquer les attaques dos et ddos **Réseau** (inutile contre les dos ou ddos espace disque etc ..)


#### Pourquoi vouloir decouvrir la veritable ip du serveur

Principalement pour le dos ou ddosser tout simplement.

##### Comment trouver la vertiable ip

Il y a plusieur technique pour decouvrir l'ip du serveur.

Un [article](https://www.secjuice.com/finding-real-ips-of-origin-servers-behind-cloudflare-or-tor/) explique ici les methodes (dns history, ssl certs etc).


Mais on peut également, sous certaines conditions (voir comment se protger), scanner l'integralité du net (le fameux 0.0.0.0/0) et en comparant le contenu de la page.

exemple avec **curl**:

```sh
curl https://target-website.com --resolve target-website.com:443:127.0.0.5

# Ou alors 

curl https://127.0.0.5 -H "host: target-website.com"
```

j'ai donc ecrit [discloudflR](https://yourlabs.io/drClaw/discloudflr) (Discovery cloudflaire) un programme en "go" pour executer cette tache.
L'avantage du go est d'etre tres rapide (goroutine), il faut 1 seconde pour scanner un range en /24 

Pour evité d'avoir a forcement scanner l'integralité du web, j'y ai rajouté quelques filtres:

```

    -a|--amazon For scan all amazon ip.
    -s|--service For scan specific amazon service (EC2, S3).
    -c|--country For scan all ip from a specific country.
    -o|--ovh For scanning all ovh cluster.
    -C|--custom-range For scan a specific range

```

Un exemple de son utilisation:

```sh
  ./discloudflR -t https://xxxxx.ch
      Scan 0.0.0.0 (l'integralité du web)

  ./discloudflR -t https://xxxxx.ch -c ch
      Scanner toutes les ips de Suisse

  ./discloudflR -t https://xxxxx.ch -C X.X.X.X/24
      Scanner le range  X.X.X.X/24

  ./discloudflR -t https://xxxxx.ch -s 'EC2'
      Scanner seulement les ips amazon du service EC2
``` 


### Comment se proteger

Les principaux point pour éviter que ce programme fonctionne il faut:

- Changer les ips si il y a historique dns qui pointe sur le domaine
- Utiliser un Firewall et ne whitelister que les ips de cloudflare 
