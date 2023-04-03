---
title: "AWS-IAM(Identity,Access)-Doc"
description: "Granting specific resource permission with having to give admin password or access key. Different, granular permissions can be specified. Safe crediti"
date: 2022-09-08T05:11:48.851Z
tags: []
---

## IAM Features
### P
Granting specific resource permission with having to give admin password or access key. 
### S
Different, granular permissions can be specified. Safe creditians and permission for application to access other AWS resources such as S3 Bucket, Dynamo DB tables.

### P
How to secure account from leak, risk of hacking
### S
MFA(Multi-factor Authentication) can be used for extrac security. Also support for FIDO (fast identity online) Security.
CloudTrail can log info. about requests for resources in account - based on IAM identity. 

### P
Access of IAM from different platform/services
### S
IAM can be accessed through console, CLI, SDK, and HTTPS API

## Understanding how IAM works
![](/images/a2508d39-05d2-47ac-958c-14b2469c3d7a-image.png)
### P 
Lack of understanding when using IAM Resources, identities
### S
- Know that user, group, role, policy, ID provider objects are stored in IAM resources.
- **IAM identities** are IAM resource objects used to identify and group and attach policies. Identities can be separated into users, groups, and roles
![](/images/5c19bcc9-694d-4493-b62b-ce8fde0d8469-image.png)
- **IAM entities** resource object that use AWS for AUTH. IAM users and roles. \
- **Principals** Person or application that uses AWS account root user, an IAM user, or an IAM role to sign in and make request to AWS. 
![](/images/9d78c5e4-4a74-475d-b216-19f03b5ff97e-image.png)


### Source
https://docs.aws.amazon.com/IAM/latest/UserGuide/intro-structure.html
