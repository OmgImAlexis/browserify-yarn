# The Simon Stack

> A Vuejs 2.0 + Browserify + Feathersjs + Yarn stack.

### Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli).

``` bash
$ yarn global add vue-cli
$ vue init https://github.com/omgimalexis/simon my-project-name
```

After this you'll have my-project-name dir with a client and/or a server dir inside of it.
You'll need to cd into each of the client/server dirs and run `yarn install`.

To launch the client/server in development mode use `yarn start-dev`,
for production mode use `yarn start`.

### What's Included in the Client

- `yarn start-dev`: Browserify + Vueify +  with proper config for source map & hot-reload.

- `yarn start`: Same as above but without hot-reloading.

- `yarn build`: Production build with HTML/CSS/JS minification.

### What's Included in the Server

- `yarn start-dev`: Feathersjs using ES6 with a message and user route already setup.

- `yarn build`: Production build with minification.
