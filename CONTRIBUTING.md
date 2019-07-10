# Contributing

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

When contributing to this repository, please first discuss the change you wish to make via issue before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## General Guidelines

- If adding a new feature, write the corresponding test
- Ensure that nothing get broke. You can use the playground for that
- If applicable, update the readme
- When solving a bug, please provide the steps to reproduce it(codesandbox is our best friend for that)
- Tchill and enjoy 👌

## Setup

### Pre-requisites

- _Node:_ `^10.0.0`
- _Yarn_ or _Npm_

### Install

Clone the repository and create a local branch:

```sh
git clone https://github.com/fkhadra/react-morphing-modal.git
cd react-morphing-modal

git checkout -b my-branch
```

Install dependencies:

```sh
yarn # or npm install
```

Install example dependencies:

```sh
cd example
yarn # or npm install
```

## Developing

```sh
# Watch sources, sccs and example sources
# The example is accesible via localhost:1234
yarn start

# Run tests 💩
yarn test
```

### Project structure

#### Scss

All the style rules lives in the `scss` directory. The filename are self-explanatory about their content.

#### Example

The example let you test your changes, it's like the demo of react-morphing-modal. Most of the time you don't need to modify it unless you add new features or change the api.

#### Src

- `classname.ts` is a mapping to the css classes in use
- `DOMutils.ts` contains all the function for DOM operation, compute scale value, get background etc...
- `hooks.ts` most of the logic live there
- `Modal.tsx` contain the modal component
- `types.ts` contain ts interfaces and types used accross the project

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
