'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "curates-secret",

  FACEBOOK_ID: '707591282673426',
  FACEBOOK_SECRET: 'c911cd1b443c533ec59d908d3e765ece',

  TWITTER_ID: 'Js3w8SDBKV5SrK1xkaq3vBauz',
  TWITTER_SECRET: 'zHMV5y0wCZ7QXEcJIjEu4y0Syzb820LBhr7Xc330qZCbBtp2H1',

  GOOGLE_ID: '421081801730.apps.googleusercontent.com',
  GOOGLE_SECRET: 't9uSvOLG_BFaQS3pxR3pu1hB',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
