const apps = require('./dist');

switch (process.argv[2]) {
  case '1':
    apps.main1();
    break;
  case '2':
    apps.main2();
    break;
  case '3':
    apps.main3();
    break;
  case '4':
    apps.main4();
    break;
  default:
    console.log('Usage: node %s <appId>', process.argv[1]);
    console.log('App ids: 1 - circular dependencies');
    console.log('         2 - access resolution path');
    console.log('         3 - inject resolution path');
    console.log('         4 - asynchronous resolution');
}
