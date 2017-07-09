# Tizen Webpack Base
This repository contains a base that is intended to develop apps for
the Tizen OS.

The project is based on framework version 3.0, adds the TAU framework
and is configured to use a modern javascript development environment.

You'll find a basic environment configured with

* Webpack
* Typescript
* Sass (scss)
* TAU (Tizen Advanced UI framework)
* Tizen type definitions (to use intellisense within typescript when
referencing to tizen API)

The basic config.xml has been taken directly from the tizen-cli.

**Important!** It seems that the TAU that comes with the example apps
of Tizen Studio was broken, several images were missing. I managed to
recover an old version of it and created some other images myself.
I will try to update the TAU framework when a new version comes out,
hoping that the Tizen team realizes that advanced js tools exist.

## Requirements
To use this scaffold you need to have installed npm or yarn.
You'll also need to have the tizen studio installed in order to
actually test / build the final package.

## Usage

Develop your application code under the `src` directory, making sure
to insert some bootstrapping code in the `app.ts` file.

All your styles will go under the `css` directory, you can import third
party libraries as usual using the `@import` statement. The base
TAU css is already included and if you wish to change the theme you
can do so by editing the `default` theme to other TAU themes.
(Possible values are `black`, `blue`, `brown`, `changeable`, `default`)

## Build

To build the final distribution run `yarn build` or `npm run build`.

This will generate the final application in the `build` directory.

You can then use the `tizen-cli` to test the application and then build
the final application distributable.

Whole process on Linux:
```
yarn build
cd build
tizen package -t wgt -s <yourProfileName> -- ./
tizen install -n <outputName> -t <deviceName> -- ./
```

You need to have defined the [signing certificate](https://developer.tizen.org/development/tizen-studio/web-tools/cli#Issue_tizen_cert)
and the [signing profile](https://developer.tizen.org/development/tizen-studio/web-tools/cli#Manage_sec_prof)
in order to install the package (it won't install otherwise).