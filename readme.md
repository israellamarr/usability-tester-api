## Usability Tester API
Backend for the [Usability Tester](https://github.com/israellamarr/usability-tester) written in [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) & [Express](http://expressjs.com/en/starter/hello-world.html)

### Developing the Server
`yarn dev` start a live reload server with Webpack.<br/>
`yarn build` compile the src to a server.js file <br/>
`yarn start` execute the compiled server file

### Developing the Tests
`yarn dev-tests` live reload tests from src. Use [--spec | --suite](http://webdriver.io/guide/testrunner/organizesuite.html#Run-Suites-and-Test-Specs) to target files<br/>
`Example: yarn dev-tests --spec='tests/assetId/ASSETID-001.spec.js'`<br/>

`yarn build-tests` compile test source to 'tests-dist'<br/>
`yarn run-all` compile and run all tests

Load the [Postman](https://www.getpostman.com/) configuration file for server dev assistance.

### Running Selenium Server & API together
`docker-compose.yml` contains a variant of the production Docker compose configuration to streamline running the development environment locally.

- Install [Docker](https://docs.docker.com/engine/installation/) & [Docker Compose](https://docs.docker.com/compose/install/)
- Run  `docker-compose build`
- Start the resulting containers with `docker-compose up`
- Issue requests to the API at 3000

List running containers with `docker ps`

Explore the file system of a running container with: `docker exec -t -i <container_name> /bin/bash`

For example:
`docker exec -t -i usabilitytesterapi_app_1 /bin/bash`

### Testing Docs & Info
[WebdriverIO docs](http://webdriver.io/guide/getstarted/configuration.html)

