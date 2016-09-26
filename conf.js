module.exports = {
  // port to listen on
  port: 8080,

  // Secure port for HTTPS connections. SSL certificate options MUST be set when enabled.
  // securePort: 443,

  // Force Transport Layer Security (TLS). Secure port and SSL certificates must be set.
  // forceTLS: true,

  // URL for OAuth callbacks, default autodetect
  // hostname: 'http://myhostname.example.com',

  proxyTo: {
    host: process.env.PROXY_HOST,
    port: process.env.PROXY_PORT,
    useUsername: process.env.USE_USERNAME, //yes for add the username to host username-host:port, or not(default)
  },

  // Session cookie options, see: https://github.com/expressjs/cookie-session
  sessionCookie: {
    name: '__nebtex',
    maxage: 24 * 60 * 60 * 1000, // milliseconds until expiration (or "false" to not expire)
    secret: process.env.SECRET_SALT // change me
  },

  // SSL certificates are required when securePort is set
  // ssl: {
  //   keyFile: '/path/to/keyfile.key',
  //   certFile: '/path/to/certfile.crt'
  //   // caFile: '/path/to/cafile.crt' // OPTIONAL: Intermediate CA certificate
  // }

  // Paths that bypass doorman and do not need any authentication.  Matches on the
  // beginning of paths; for example '/about' matches '/about/me'.  Regexes are also supported.
  // publicPaths: [
  //   '/about/',
  //   '/robots.txt',
  //   /(.*?).png$/
  // ],

  modules: {
    // Register a new oauth app on Github at
    // https://github.com/account/applications/new
    github: {
      appId: process.env.GITHUB_APP_ID,
      appSecret: process.env.GITHUB_APP_SECRET,
      entryPath: '/oauth/github',
      callbackPath: '/oauth/github/callback',
      // List of github email addresses that can authenticate
      // requiredEmail: ['user1@gmail.com', 'user2@yahoo.com'],
      // Only users with this organization name can authenticate. If an array is
      // listed, user may authenticate as a member of ANY of the domains.
      requiredOrganization: 'NebTex' // short organization name
    },

    // Simple password login, make sure you choose a very secure password.
    // password: {
    //  token: "YOUR-PASSWORD" // any user that knows this can log in
    // },

    // Register a new oauth app on Google Apps at
    // https://code.google.com/apis/console
    //google: {
    //  appId: 'YOUR-GOOGLE-CLIENT-ID',
    //  appSecret: 'YOUR-GOOGLE-CLIENT-SECRET',

      // If uncommented, user must authenticate with an account associated with one of
      // the emails in the list.
      // requiredEmail: ['user1@gmail.com', 'user2@gmail.com'],

      // User must be a member of this domain to successfully authenticate. If an array
      // is listed, user may authenticate as a member of ANY of the domains.
      //requiredDomain: 'yourdomain.com'
    //}
  }
};
