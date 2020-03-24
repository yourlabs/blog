+++
date = "2015-01-04T11:26:28+00:00"
draft = false
tags = ["linux", "dedibox", "ansible"]
title = "Install Arch Linux on a dedicated server via Ubuntu Live"
author = "jpic"
+++

In the process of making YourLabs new cloud, I ordered a first dedicated server at online.net. They don't provide an installer for Arch Linux, but they do provide a "rescue mode" which is at this time Ubuntu 13.04 Live. Boot that and get an Arch Linux install on BtrFS with just one command:

Format [`/dev/sda` to BtrFS Partionning](https://wiki.archlinux.org/index.php/partitioning#Btrfs_Partitioning) and install arch linux in subvolumes with just one command:

    ansible-playbook -i "yourhostname," -e "hostname=your_host_name" --ask-sudo-pass rescue_reinstall_arch_linux.yml

If you just want to debug your arch root on `/dev/sda` through Ubuntu Live,
then this command will make it operationnal in /tmp/root.x86_64/mnt:

    ansible-playbook -i "yourhostname," --ask-sudo-pass rescue_mount_arch_linux.yml
    # you may chroot /tmp/root.x86_64/mnt on the server now and have a working arch

If you just want to build an [Arch Linux
chroot](https://wiki.archlinux.org/index.php/Install_from_Existing_Linux#Creating_the_chroot) in `/tmp/root.x86_64` by default:

    ansible-playbook -i "yourhostname," --ask-sudo-pass rescue_arch_linux_chroot.yml

It's ansible, you can override any variable you find in
`roles/rescue/vars/main.yml` with `-e 'var=bar'`.


[Get sources for install-arch-linux-server](https://github.com/jpic/install-arch-linux-server).
