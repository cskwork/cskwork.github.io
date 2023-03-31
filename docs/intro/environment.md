---
title: Hugo Install
---

<head>
  <title>Hugo Install | Hugo Install Instructions</title>
  <meta
    name="description"
    content="Hugo Install Instructions"
  />
</head>

### 1 Install release Files
https://github.com/gohugoio/hugo/releases?ref=techielass.com
windows
Windows
"hugo_version_windows-amd64.zip"

### 2 Unzip in windows Path ex) C:\Hugo\bin

### 3 Set System Environment Variable Path for Hugo.exe

### 4 Go to git bash and check
```bash
hugo version
hugo v0.111.3-5d4eb5154e1fed125ca8e9b5a0315c4180dab192 windows/amd64 BuildDate=2023-03-12T11:40:50Z VendorInfo=gohugoio
```

### 5 Setup sample Hugo Site
```bash
# Create the directory structure for your project in the quickstart directory.
hugo new site quickstart
cd quickstart
# Initialize an empty Git repository in the current directory.
git init
# Clone the Ananke theme into the themes directory, adding it to your project as a Git submodule.
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke themes/ananke
# Append a line to the site configuration file, indicating the current theme.
echo "theme = 'ananke'" >> config.toml
# Start Hugo’s development server to view the site.
hugo server
```
### 6 Run Server and Check
![](https://velog.velcdn.com/images/csk917work/post/d3dc20cb-3099-4d5e-942f-cdaef934d950/image.png)
