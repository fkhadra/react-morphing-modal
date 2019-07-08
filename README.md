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

### Use different trigger for the same modal

```javascript
import React from 'react';
import { useModal, Modal } from 'react-morphing-modal';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function App() {
  const { modalProps, triggerProps, activeModal } = useModal();

  return (
    <div>
      <button {...triggerProps()}>Trigger 1</button>
      <button {...triggerProps()}>Trigger 2</button>
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
