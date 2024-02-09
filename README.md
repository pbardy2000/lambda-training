# appdev-ts-lambda-training

A serverless microservice template.

## Pre-requisites
1) [jq](https://github.com/jqlang/jq)  - This is a lightweight and flexible command-line JSON processor. This can be installed using `brew install jq`
2) NodeJS - There are two main tools to do this. Please see `.nvmrc` for specific version of Node.
    - [n](https://github.com/tj/n) (Recommended) - This is a node version manager. It allows you to switch between node versions easily.
        - Install n using `brew install n`
        - Run `n <version>` to use/install the specific version of node
    - [nvm](https://github.com/nvm-sh/nvm) - This is another node version manager
        - Install nvm using `brew install nvm`
        - Run `nvm install <version>` to install the specific version of node
        - Run `nvm use <version>` to use the specific version of node
3) NPM (If using [n](https://github.com/tj/n) or  [nvm](https://github.com/nvm-sh/nvm), your `npm` version will be automatically managed)
4) Please see `./docker/README.md` for instructions on how to set up a local MySQL DB using Docker
5) Security
   - [Git secrets](https://github.com/awslabs/git-secrets)
   - [ScanRepo](https://github.com/UKHomeOffice/repo-security-scanner)
      - Unzip `repo-security-scanner_<version>_Darwin_<architercture>.tar.gz` and rename the executable inside the folder
        to `scanrepo` - Add executable to path (using `echo $PATH` to find your path)

## Structure

- All serverless functions live in dedicated directories in `src/functions`.
- Code that is common between multiple functions should reside in `src/common`.
- Where code is common between services/repos, we have centralised those elements within a [common repository](https://github.com/dvsa/mes-microservice-common).

As per the principles of [Hexagonal Architecture](https://www.happycoders.eu/software-craftsmanship/hexagonal-architecture/), each function has the following directories to help us separate concerns:

* `framework` - entry point for the function, contains the handler
* `application` - contains the business logic and data layer access
* `domain` - contains constants/interfaces/enums for the business logic
* 
## Getting started
Install required dependencies

```shell
npm install
```
or 
```shell
npm i
```

To clean install, i.e. to rebuild the `node_modules` folder from scratch based on `package-lock.json`, run:
```shell
npm ci
```

## Running locally

Use the following script to spin up the service locally

```shell
npm run start
```

When developing locally, we can mock the [environment variables](https://www.serverless.com/framework/docs/environment-variables) to emulate how AWS Lambda would work.

These environment variables can be placed inside a `.env` file in the root of the project. 

As an example, the contents of this file might look like:
```shell
ENVIRONMENT=local
HOST=myhost.com
```

A Serverless [plugin](https://github.com/neverendingqs/serverless-dotenv-plugin) loads these automatically upon running the start command, and then can be retrieved in the code using
```shell
process.env.ENVIRONMENT
process.env.HOST
```

## Build

To build a zip file for every function to `./artifacts`, run:

```shell
npm run package
```

This is useful for when you want to upload your changes to AWS to test them out on the lambda.

*N.b. The build requires [jq](https://github.com/jqlang/jq).*

## Test

To run the unit tests, simply run:

```shell
npm run test
```

To run unit tests & create code coverage, run:
```shell
npm run test:jasmine-coverage
```

This will produce a `./coverage` folder, as well as give the coverage output via your shell.

## Code style
- This project uses [husky](https://github.com/typicode/husky) to run a series of checks on `pre-commit` and `pre-push`
- This project uses `lint-staged`, `eslint` and a strict [extended config](https://github.com/dvsa/eslint-config-des) to enforce code styles
