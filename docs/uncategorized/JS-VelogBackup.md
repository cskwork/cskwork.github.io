---
title: "JS-VelogBackup"
description: " app.js  crawler/index.js  crawler/query.js  backup.bat "
date: 2021-09-11T00:58:22.756Z
tags: []
---

### app.js
``` js
const { Command } = require('commander');
const fs = require('fs');
const Crawler = require('./crawler');

const program = new Command();

program.version('1.0.1');
program.option('-u, --username <username>', 'velog 유저이름');
program.option('-d, --delay <ms>', '요청 딜레이 시간')
program.option('-c, --cert <access_token>', 'velog 유저 access_token')

program.parse(process.argv);

// Backup Location
!fs.existsSync('./backup') && fs.mkdirSync('./backup');
!fs.existsSync('./backup/content') && fs.mkdirSync('./backup/content');
!fs.existsSync('./backup/images') && fs.mkdirSync('./backup/images');

const crawler = new Crawler(program.username, { 
  delay: program.delay || 0,
  cert: program.cert,
});

console.log('📙 백업을 시작합니다 / velog-backup');
crawler.parse();

```

### crawler/index.js
``` js
const axios = require('axios');
const fs = require('fs');
const { join } = require('path');

const { PostsQuery, PostQuery } = require('./query');

class Crawler {
  constructor(username, { delay, cert }) {
    this.username = username; 

    if (!username) {
      console.error('❌ 유저이름을 입력해주세요')
      process.exit(1);
    }

    // options
    this.delay = delay;
    this.cert = cert;

    this.__grahpqlURL = 'https://v2.velog.io/graphql';
    this.__api = axios.create({
      headers:{
        Cookie: cert ? `access_token=${cert};` : null,
      }, 
    });
  }

  async parse() {
    const posts = await this.getPosts();
    
    posts.map(async(postInfo, i) => { 
      if (this.delay > 0) await new Promise(r => setTimeout(r, this.delay * i));

      let post = await this.getPost(postInfo.url_slug);
      post.body = await this.getImage(post.body);

      await this.writePost(post);
      console.log(`✅ " ${post.title} " 백업 완료`);
    });
  }

  async getPosts() {
    const url = `https://velog.io/@${this.username}`;
    let response;
    let posts = [];

    try {
      await this.__api.get(url);
    } catch (e) {
      if (e.response.status === 404) {
        console.error(`⚠️  해당 유저를 찾을 수 없어요 \n username = ${this.username}`);
        process.exit(1);
      }

      console.error(e);
    }

    while (true) {
      try {
        if (response && response.data.data.posts.length >= 20) {
          response = await this.__api.post(this.__grahpqlURL, PostsQuery(this.username, posts[posts.length - 1].id));
        } else {
          response = await this.__api.post(this.__grahpqlURL, PostsQuery(this.username));
        }
      } catch(e) {
        console.error(`⚠️  벨로그에서 글 목록을 가져오는데 실패했습니다. \n error = ${e}`);
        process.exit(1);
      }
      
      posts = [...posts, ...response.data.data.posts];
      if (response.data.data.posts.length < 20) break;
    }

    console.log(`✅ ${this.username}님의 모든 글(${posts.length} 개) 을 가져옴`);

    return posts;
  }

  async getPost(url_slug) {
    let response;

    try {
      response = await this.__api.post(this.__grahpqlURL, PostQuery(this.username, url_slug));
    } catch (e) {
      console.error(`⚠️  벨로그에서 글을 가져오는데 실패했습니다. \n error = ${e} url = ${url_slug}`);
      process.exit(1);
    }
    
    return response.data.data.post;
  }

  async writePost(post) {
    const excludedChar = ['\\', '/', ':' ,'*' ,'?' ,'"' ,'<' ,'>' ,'|'];
    let title = post.title;

    for (const char of excludedChar) {
      title = title.replace(char, '');
    }

    const path = join('backup', 'content', `${title}.md`);

    post.body = '---\n'
                + `title: "${post.title}"\n`
                + `description: "${post.short_description.replace(/\n/g, ' ')}"\n`
                + `date: ${post.released_at}\n`
                + `tags: ${JSON.stringify(post.tags)}\n`
                + '---\n' + post.body;
                
    await fs.promises.writeFile(path, post.body, 'utf8');
  }

  async getImage(body) {
    const regex = /!\[[^\]]*\]\((.*?.png|.jpeg|.jpg|.webp|.svg|.gif|.tiff)\s*("(?:.*[^"])")?\s*\)|!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;
    
    body = body.replace(regex, (_, url) => {
      if (!url) return;

      const filename = url.replace(/\/\s*$/,'').split('/').slice(-2).join('-').trim();
      const path = join('backup', 'images', decodeURI(filename));
      
      this.__api({
        method: 'get',
        url: encodeURI(decodeURI(url)),
        responseType: 'stream',
      })
      .then(resp => resp.data.pipe(fs.createWriteStream(path)))
      .catch(e => console.error(`⚠️ 이미지를 다운 받는데 오류가 발생했습니다 / url = ${url} , e = ${e}`));

      return `undefined`;
    });

    return body;
  }

};

module.exports = Crawler;

```

### crawler/query.js
``` js
const PostsQuery = (username, cursor = null) => ({
  operationName:'Posts',
  variables: {
    username,
    tag: null,
    cursor,
  },

  query: `query Posts($cursor: ID, $username: String, $temp_only: Boolean, $tag: String, $limit: Int) {
    posts(cursor: $cursor, username: $username, temp_only: $temp_only, tag: $tag, limit: $limit) {
      id
      title
      short_description
      thumbnail
      user {
        id
        username
        profile {
          id
          thumbnail
          __typename
        }
        __typename
      }
      url_slug
      released_at
      updated_at
      comments_count
      tags
      is_private
      likes
      __typename
      }
    }`
});

const PostQuery = (username, url_slug) => ({
  operationName:'ReadPost',
  variables: {
    username,
    url_slug,
  },
  query: `query ReadPost($username: String, $url_slug: String) {
    post(username: $username, url_slug: $url_slug) {
      id
      title
      released_at
      updated_at
      tags
      body
      short_description
      is_markdown
      is_private
      is_temp
      thumbnail
      comments_count
      url_slug
      likes
      liked
      user {
        id
        username
        profile {
          id
          display_name
          thumbnail
          short_bio
          profile_links
          __typename
        }
        velog_config {
          title
          __typename
        }
        __typename
      }
      comments {
        id
        user {
          id
          username
          profile {
            id
            thumbnail
            __typename
          }
          __typename
        }
        text
        replies_count
        level
        created_at
        level
        deleted
        __typename
      }
      series {
        id
        name
        url_slug
        series_posts {
          id
          post {
            id
            title
            url_slug
            user {
              id
              username
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      linked_posts {
        previous {
          id
          title
          url_slug
          user {
            id
            username
            __typename
          }
          __typename
        }
        next {
          id
          title
          url_slug
          user {
            id
            username
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
  `
});

module.exports = {
  PostQuery,
  PostsQuery,
};
```

### backup.bat
``` shell
cd "backup_location"
node app.js -u csk917work
pause
```

### 출처
https://github.com/cjaewon/velog-backup