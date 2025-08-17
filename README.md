# wiki abnormalis

A collection of interesting Wikipedia articles

## Development

Prerequisites: [Node.js](https://nodejs.org) (v22+)

```
npm i && npm run dev
```

## Add a new entry

```
npm run add
```

Just give the CLI tool the URL of the Wikipedia article to add. It will query the Wikipedia API for the title and description (just press Enter to accept defaults in parentheses)

Example:
```
$ npm run add

> wiki@1.0.0 add
> node ./scripts/add-article.js

URL: https://en.wikipedia.org/wiki/Snail_racing
Title (Snail racing): 
Description (Form of humorous entertainment): 
Date (2025-08-16):
Author: JK
Article added: Snail racing
```