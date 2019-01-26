# wm-builder

> Level builder for The White Mask. WIP.

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Adding Entity Types

To add to the list of placeable entities:

1.  Add to `board/entities.ts`.
1.  Game > Create New Item in Unity, using kebab-cased entity name.
