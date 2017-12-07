// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  contentSecurityPolicy: {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-inline' 'unsafe-eval' connect.facebook.net",
    'connect-src': "'self'",
    'img-src': "'self' www.facebook.com",
    'style-src': "'self' 'unsafe-inline'",
    'frame-src': "s-static.ak.facebook.com static.ak.facebook.com www.facebook.com",
    'report-uri': "http://localhost:4200"
  },  
};
