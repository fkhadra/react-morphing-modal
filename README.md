# React-Morphing-Modal

![Travis (.org)](https://img.shields.io/travis/fkhadra/react-morphing-modal.svg?label=%F0%9F%9A%A7Build&style=for-the-badge)
![npm](https://img.shields.io/npm/dm/react-morphing-modal.svg?label=%E2%8F%ACdownloads&style=for-the-badge)
![npm](https://img.shields.io/npm/v/react-morphing-modal.svg?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/react-morphing-modal.svg?label=%F0%9F%93%9Clicense&style=for-the-badge)
![Coveralls github](https://img.shields.io/coveralls/github/fkhadra/react-morphing-modal.svg?label=%E2%9B%B1coverage&style=for-the-badge)

![React Morphing Modal](https://user-images.githubusercontent.com/5574267/60773620-6bafbb80-a108-11e9-8644-fb6002ab6ffe.gif 'React Morphing Modal')

- [React-Morphing-Modal](#React-Morphing-Modal)
  - [Demo](#Demo)
  - [Installation](#Installation)
  - [Features](#Features)
  - [Usage](#Usage)
    - [Basic example](#Basic-example)
    - [With a component](#With-a-component)
      - [Simple case](#Simple-case)
      - [Real app use case](#Real-app-use-case)
    - [Use different trigger for the same modal](#Use-different-trigger-for-the-same-modal)
    - [Attribute an id to the trigger](#Attribute-an-id-to-the-trigger)
    - [Define onOpen and onClose callback](#Define-onOpen-and-onClose-callback)
      - [Gloabaly](#Gloabaly)
      - [Per trigger](#Per-trigger)
    - [Define background](#Define-background)
      - [Gloabaly](#Gloabaly-1)
      - [Per trigger](#Per-trigger-1)
    - [Use another event to trigger the modal](#Use-another-event-to-trigger-the-modal)
      - [Gloabaly](#Gloabaly-2)
      - [Per trigger](#Per-trigger-2)
    - [Hide the close button](#Hide-the-close-button)
    - [Remove body padding](#Remove-body-padding)
  - [Api](#Api)
    - [useModal](#useModal)
      - [HookOptions](#HookOptions)
      - [open](#open)
      - [close](#close)
      - [activeModal](#activeModal)
      - [modalProps](#modalProps)
      - [triggerProps](#triggerProps)
    - [Modal Component](#Modal-Component)
  - [Browser Support](#Browser-Support)
  - [Release Notes](#Release-Notes)
  - [Contribute](#Contribute)
  - [License](#License)

## Demo

[Demo time](https://fkhadra.github.io/react-morphing-modal/)

## Installation

```
$ npm install --save react-morphing-modal
//or
$ yarn add react-morphing-modal
```

## Features

- Easy to setup for real, you can make it work in less than 10sec! 🚀
- Super easy to customize 👌
- Fancy 😎

## Usage

> The library expose 2 ways to display the modal: `triggerProps` and `open`. For the basic use case `triggerProps` is fine. But for most of the cases
> using `open` is the way to go. Please look at the api for more details.

### Basic example

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function App() {
  const { modalProps, triggerProps } = useModal();

  return (
    <div>
      <button {...triggerProps()}>Show modal</button>
      <Modal {...modalProps}>Hello World</Modal>
    </div>
  );
}
```

### With a component

#### Simple case

If you just want to open the modal you can stick with `triggerProps`.

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

const Button = props => <button {...props.triggerProps()}>Show modal</button>;

function App() {
  const { modalProps, triggerProps } = useModal();

  return (
    <div>
      <Button triggerProps={triggerProps} />
      <Modal {...modalProps}>Hello World</Modal>
    </div>
  );
}
```

#### Real app use case

Most of the time you need to perform different task when a user click a button like calling an api. In that case
use the `open` method as follow.

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

const Button = ({ openModal }) => {
  const btnRef = useRef(null);
  function handleClick() {
    // do some complicated stuff
    openModal(btnRef);
  }

  return (
    <button ref={btnRef} onClick={handleClick}>
      Show modal
    </button>
  );
};

function App() {
  const { modalProps, open } = useModal();

  return (
    <div>
      <Button openModal={open} />
      <Modal {...modalProps}>Hello World</Modal>
    </div>
  );
}
```

### Use different trigger for the same modal

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function App() {
  const { modalProps, triggerProps, activeModal, open } = useModal();
  const triggerRef = useRef(null);

  const handleTrigger3 = () => open(triggerRef);

  return (
    <div>
      <button {...triggerProps()}>Trigger 1</button>
      <button {...triggerProps()}>Trigger 2</button>
      <button ref={triggerRef} onClick={handleTrigger3}>
        Trigger 3
      </button>
      <Modal {...modalProps}>Hello World</Modal>
    </div>
  );
}
```

### Attribute an id to the trigger

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function App() {
  const { modalProps, triggerProps, activeModal } = useModal();

  return (
    <div>
      <button {...triggerProps('trigger1')}>Trigger 1</button>
      <button {...triggerProps('trigger2')}>Trigger 2</button>
      {/* You can also pass an object  */}
      <button {...triggerProps({ id: 'trigger3' })}>Trigger 3</button>
      <span>{activeModal}</span>
      <Modal {...modalProps}>Hello World</Modal>
    </div>
  );
}
```

### Define onOpen and onClose callback

#### Gloabaly

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function App() {
  const { modalProps, triggerProps, activeModal } = useModal({
    onOpen() {
      console.log('onOpen');
    },
    onClose() {
      console.log('onClose');
    },
  });

  return (
    <div>
      <button {...triggerProps()}>Trigger</button>
      <Modal {...modalProps}>Hello World</Modal>
    </div>
  );
}
```

#### Per trigger

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function App() {
  const { modalProps, triggerProps, activeModal } = useModal();

  return (
    <div>
      <button
        {...triggerProps({
          onOpen: () => console.log('open'),
          onClose: () => console.log('close'),
        })}
      >
        Trigger
      </button>
      <Modal {...modalProps}>Hello World</Modal>
    </div>
  );
}
```

### Define background

By default, the modal background is the same as the trigger one. However, you are free to define yours.

#### Gloabaly

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function App() {
  const { modalProps, triggerProps, activeModal } = useModal({
    background: '#666',
  });

  return (
    <div>
      <button {...triggerProps()}>Trigger</button>
      <Modal {...modalProps}>Hello World</Modal>
    </div>
  );
}
```

#### Per trigger

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function App() {
  const { modalProps, triggerProps, activeModal } = useModal();

  return (
    <div>
      <button
        {...triggerProps({
          background: '#666',
        })}
      >
        Trigger
      </button>
      <Modal {...modalProps}>Hello World</Modal>
    </div>
  );
}
```

### Use another event to trigger the modal

By default, the `onClick` event is used on the trigger.

#### Gloabaly

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function App() {
  const { modalProps, triggerProps, activeModal } = useModal({
    event: 'onDoubleClick',
  });

  return (
    <div>
      <button {...triggerProps()}>Trigger</button>
      <Modal {...modalProps}>Hello World</Modal>
    </div>
  );
}
```

#### Per trigger

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function App() {
  const { modalProps, triggerProps, activeModal } = useModal();

  return (
    <div>
      <button
        {...triggerProps({
          event: 'onDoubleClick',
        })}
      >
        Trigger
      </button>
      <Modal {...modalProps}>Hello World</Modal>
    </div>
  );
}
```

### Hide the close button

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function App() {
  const { modalProps, triggerProps, activeModal } = useModal();

  return (
    <div>
      <button {...triggerProps()}>Trigger</button>
      <Modal {...modalProps} closeButton={false}>
        Hello World
      </Modal>
    </div>
  );
}
```

### Remove body padding

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function App() {
  const { modalProps, triggerProps, activeModal } = useModal();

  return (
    <div>
      <button {...triggerProps()}>Trigger</button>
      <Modal {...modalProps} padding={false}>
        Hello World
      </Modal>
    </div>
  );
}
```

## Api

### useModal

#### HookOptions

```js
import { useModal } from 'react-morphing-modal';

const { open, close, activeModal, modalProps, triggerProps } = useModal({
  event: 'onClick',
  onOpen: () => console.log('will open'),
  onClose: () => console.log('will close'),
  background: 'purple',
});
```

| Props      | Type     | Default | Description                                               |
| ---------- | -------- | ------- | --------------------------------------------------------- |
| event      | string   | onClick | Any valid react dom event: onClick, onDoubleClick, etc... |
| onOpen     | function | -       | A function to call when the modal will open               |
| onClose    | function | -       | A function to call when the modal will close              |
| background | string   | -       | Any valid css background: #fffff, rgb(1,1,1), etc         |

#### open

`open` have 2 signatures

```js
import { useModal } from 'react-morphing-modal';

const { open } = useModal();
// pass a ref to your trigger
const myRef = React.useRef(null);

//somewhere in your app
<MyComponent ref={myRef} />;

open(myRef, 'modalId');
open(myRef, {
  id: 'modalId',
  onOpen: () => console.log('will open'),
  onClose: () => console.log('will close'),
  background: 'purple',
});
```

| Props      | Type                               | Default | Description                                              |
| ---------- | ---------------------------------- | ------- | -------------------------------------------------------- |
| id         | string \| number \| symbol \| null | -       | Specify a modal id. It will be assigned to `activeModal` |
| onOpen     | function                           | -       | A function to call when the modal will open              |
| onClose    | function                           | -       | A function to call when the modal will close             |
| background | string                             | -       | Any valid css background: #fffff, rgb(1,1,1), etc        |

#### close

`close` does not require any options.

```js
import { useModal } from 'react-morphing-modal';

const { close } = useModal();

close();
```

#### activeModal

`activeModal` hold the displayed modalId. `activeModal` is set to `null` if not id has been used.

```js
import { useModal } from 'react-morphing-modal';

const { open, activeModal } = useModal();

open(triggerRef, 'modalId');
console, log(activeModal); // print modalId
```

#### modalProps

`modalProps` hold the props that must be passed to the Modal component.

```js
import { useModal, Modal } from 'react-morphing-modal';

const { modalProps } = useModal();

<Modal {...modalProps} />;
```

#### triggerProps

`triggerProps` is a convenient method for the simple use case. Under the hood a ref is created and bound to `open`.
`triggerProps` has also 2 signatures.

```js
import { useModal } from 'react-morphing-modal';

const { triggerProps } = useModal();

<button {...trigger('modalId')}>trigger</button>;
<button {...trigger({
  id: 'modalId',
  event: 'onDoubleClcik'
  onOpen: () => console.log('will open'),
  onClose: () => console.log('will close'),
  background: 'purple'
})}>trigger</button>
```

| Props      | Type                               | Default | Description                                               |
| ---------- | ---------------------------------- | ------- | --------------------------------------------------------- |
| id         | string \| number \| symbol \| null | -       | Specify a modal id. It will be assigned to `activeModal`  |
| event      | string                             | onClick | Any valid react dom event: onClick, onDoubleClick, etc... |
| onOpen     | function                           | -       | A function to call when the modal will open               |
| onClose    | function                           | -       | A function to call when the modal will close              |
| background | string                             | -       | Any valid css background: #fffff, rgb(1,1,1), etc         |

### Modal Component

```js
import { Modal } from 'react-morphing-modal';

<Modal closeButton={true} padding={true}>
  hello
</Modal>;
```

| Props       | Type    | Default | Description                                                      |
| ----------- | ------- | ------- | ---------------------------------------------------------------- |
| closeButton | boolean | true    | Display a close button                                           |
| padding     | boolean | true    | Remove the default padding. Useful when doing some customisation |

## Browser Support

| ![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ❌                                                                                                        | ✅                                                                                                            | ✅                                                                                                             | ✅                                                                                                            | ✅                                                                                            |

## Release Notes

You can find the release note for the latest release [here](https://github.com/fkhadra/react-morphing-modal/releases/latest)

You can browse them all [here](https://github.com/fkhadra/react-morphing-modal/releases)

## Contribute

Show your ❤️ and support by giving a ⭐. Any suggestions are welcome ! Take a look at the contributing guide.

You can also find me on [reactiflux](https://www.reactiflux.com/). My pseudo is Fadi.

## License

Licensed under MIT
