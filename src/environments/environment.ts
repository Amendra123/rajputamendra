// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultauth: 'fake-backend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  },
  chartColor: ["#4cc8d8", "#35a3d3", "#f4b3ce", "#e2a493", "#ffc8ba", "#74c0e1", "#ccaada", "#9ad9c7", "#eaeabb", "#bcb3bb", "#3daabe", "#267ca9", "#ffcade", "#4cc8d8", "#c49083", "#85dfff", "#ad8077", "#ae8fbc", "#669e8d", "#c6c499", "#8e8b8e"],
   base_url_node: "http://localhost:8080/api/",
   //base_url_node: "https://4dhamyatra.in:8080/backend/api/",
   base_url_node_local: "http://localhost.in:8080/api/",
   base_url_img: "https://4dhamyatra.in:8080/",
   
  securitySession : false
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
