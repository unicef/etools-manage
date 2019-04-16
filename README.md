# Etools Front End Module Template

## Introduction

This is a base scaffolding for any potential module migrations or whole new modules to be built with.

### Stack
React w/ Typescript -  base framework

[Material UI](https://github.com/mui-org/material-ui) - Material Design React Components Library

[Redux](https://redux.js.org/) - state management

[Redux First Router](https://github.com/faceyspacey/redux-first-router) -  Routing via redux

[Redux Saga](https://redux-saga.js.org/) - Async requests/ Side Effects management

[Webpack](https://webpack.js.org/) - Module bundling / code splitting / build process / dev server


## The idea behind the scaffolding architecture

### UI Components
Since the UI of existing Etools modules is based on Material Design, all core components are included in Material UI with
a `css-in-js` styling solution. From these components it is easy to compose new ones or customize.
UNPP already uses this library.

### Typescript
The example code shows how to type everything from the shape of the redux store to component props etc. We can create type safety for module specific data / responses in various areas of the architecture, but examples are there for most situations.

### Routing / Code Splitting

The example here shows the use of `react-universal-component` to create a `redux-first-router` based code splitting setup.
This allows us to dynamically load bundles on route changes which becomes a huge performance benefit in the more JS bloated modules. As you can see in the file `page-loader.tsx` , the reducers and sagas are also dynamically injected once the corresponding page is loaded.

### Redux-Saga/ Requests

`redux-saga` was chosen for its flexibility of managing requests and separating side effects from UI logic. We are able to interrupt and cancel requests / async actions on demand. Redux saga also gives us a consistent pattern of performing async requests and the way the data is persisted to the redux store , an invaluable benefit in terms of ability to maintain and extend a module's features / api.

Sagas are also very flexible in terms of testing. Check the docs for more info.

Another method of sending and receiving requests is shown as an example via `useFetch` react hook. It is for simpler use cases where persisting the fetched data to the redux store is not necessary.

### Redux

`redux-starter-kit` helpers are used as an attempt to simplify creation of actions and reducers. Feel free to use the additional helpers as described in the [Redux starter kit docs](https://redux-starter-kit.js.org/).

The example also shows how Sagas are injected into store creation and the ability to add middlewares. We can use middlewares to add various tracking and analysis tools in one place.

### Testing

`Jest` is used as the test framework and test runner. It comes fully loaded with everything we need to mock, execute, and create assertions on the source code. Snapshots are especially helpful in reducing test boilerplate.

### Webpack

The webpack setup was mostly stripped from the `create-react-app` ejection script. It will search for .env files and make the env vars available throughout the app. The config is environment oriented so we are able to customize what we would like to include in dev / test / production environments by just following the existing patterns.
We can use next gen ES features via babel. There are also a lot of production only plugins that are very well documented in the webpack config.

### Linting

Eslint is fully set up and integrated with module resolutions of webpack / typescript. A vscode settings file is also included which make the dev experience for this particular stack very pleasant.


More to be added here...

