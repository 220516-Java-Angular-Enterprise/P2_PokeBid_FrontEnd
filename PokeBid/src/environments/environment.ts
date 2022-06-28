// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//import { domain, clientId } from 'C:\Users\ethan\Documents\REVCODE\java-angular\projects\P2_PokeBid_FrontEnd2\P2_PokeBid_FrontEnd\PokeBid\auth_config.json';

export const environment = {
  production: false,
  POKEMONTCG_API_KEY: '3f83c220-4b9c-46be-a82e-d0239199c5a2',
  authDomain: 'dev-brpr8-au.us.auth0.com',
  authClientId: 'Xf98Atwi1t0HMDGtMvgMqgQvUnfj1rIx',
  auth: {
    domain: "dev-dk353-8s.us.auth0.com",
    clientId : "7bOmmburQviBhD3IkOi3Jz8Zqdj8hp7a",
    redirectUri: window.location.origin,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
