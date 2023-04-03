---
title: "Connect To Lighsail with SSH"
description: "https&#x3A;//www.wpcraze.com/how-to-connect-to-amazon-lightsail-using-putty-ssh/1 Log into your Lightsail account.2 On the top right, click on Account"
date: 2021-12-12T03:02:48.801Z
tags: ["Lightsail"]
---
https://www.wpcraze.com/how-to-connect-to-amazon-lightsail-using-putty-ssh/

### Step 1: Get the Private Key
1 Log into your Lightsail account.
2 On the top right, click on Account > Account.
3 Navigate to the SSH Keys tab.
4 Click the Download link which is next to the instance’s region.
(You can also upload or create new)
5 A LightsailDefaultKey-us-east-1.pem file will be downloaded.

### Step 2: In PuTTYgen Generating an *.ppk File
1 Open the PuTTYgen client.
2 Go to File > Load private key.
3 In the Windows Browse dialog, switch from browsing just PuTTY Private Key Files (*.ppk) to All Files (*.*)
4 Open LightsailDefaultKey-us-east-1.pem file downloaded before.
5 Click on the Save private key button.
6 Click on Yes to Save it without the passphrase for convenience.
7 Give a file name and save it as a *.ppk file.

### Step 3: SSHing with PuTTY
1 Launch PuTTY
2 Copy your website’s static IP address.
3 In PuTTY, paste the IP in the Host Name field.
4 From the left, navigate to Connection > SSH > Auth.
5 Browse and open the *.ppk file that you created previously.
6 Click on Open.
Confirm the trust connection dialog.
7 For Login as: enter the username.


ubuntu or root on ubuntu AMIs
ec2-user on Amazon Linux AMI
centos on Centos AMI
debian or root on Debian AMIs
ec2-user or fedora on Fedora
ec2-user or root on: RHEL AMI, SUSE AMI, other ones.