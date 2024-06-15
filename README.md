# Simple Task Manager

### table of content
- [Introduction](#introduction)
- [Disclaimer](#disclaimer)
- [Prerequisites](#prerequisites)
- [Specifications](#specifications)
- [Structure](#structure)
- [Setup](#setup)
  - [With IDX](#with-idx)
  - [Locally](#locally)
- [Running the dev server](#running-the-dev-server)

## Introduction
This is a demo to showcase the implementations of various design patterns including:

- Architectural: [N-layer](https://en.wikipedia.org/wiki/Multitier_architecture), [Flux](https://facebookarchive.github.io/flux/docs/in-depth-overview/);
- Structural: [Adaptor](https://refactoring.guru/design-patterns/adapter);
- Behavioral: [Memento](https://refactoring.guru/design-patterns/memento);
- Creational: [Factory Method](https://refactoring.guru/design-patterns/factory-method).

For the purpose of experimentation and analysis to have a better understanding of their benefits and limitations. This acts as the scope of the project.

## Disclaimer

Please keep in mind that this project in all of its entirety is for the purpose of experimentation and analysis, it is by no means should be considered an example to follow as the understanding and implementation of some patterns if not all could be wrong.

## Prerequisites

Before jumping into the code there are a few requirements that is expected to be able to understand what's going on since this is a rather somewhat advance topic:

1. Intermediate understanding of functional programming, reactive programming and OOP;
2. Intermediate knowledge of web development (JavaScript, HTML, CSS, ...);
3. Intermediate understanding of the Angular framework;
4. And basic understanding of design patterns.

## Specifications

This project's foundation is built upon the strict rule of immutability even tho Angular's inner mechanisms promote and encourage the use of mutable objects thru the principles of OOP. In other words, every object and process which are of the application and created throughout the application will only be immutable where it makes sense. Moreover, cloning objects by copying over property values is very expensive and vanilla JavaScript is not built to support the use of immutability so in order to achieve it, some data structures are required.

This project's core mechanisms rely on three libraries:

1. [ImmutableJS](https://immutable-js.com/) - provides a JS friendly API that allows the integration of Immutable [Persistent Data Structures](https://en.wikipedia.org/wiki/Persistent_data_structure).
2. [Effect](https://effect.website/docs/introduction)  - provides a TypeScript styled API that models functional programming.
3. [RxJS](https://rxjs.dev/) - Angular's integrated reactive programming library to handle async operations.

And for Flux design pattern to work, a state manager is required:

- [NgRx](https://ngrx.io/docs) - an Angular based state manager similar to [Redux](https://redux.js.org/).

It also depends on a plethora of other libraries to hide code complexity and increase productivity:

 - Angular Material - Pre-made UI components
 - AgGrid - Pre-made datatable
 - Luxon - Time manipulation API
 - RxDB - Offline first database (Make use of the browser's IndexedDB)
 - TailwindCSS - Utility style classes

## Structure

Based on the N-Layer architectural pattern, the project is divided into three layers:

1. @core - The core layer
    - Contains the core mechanism of the project: data access, utility interfaces, services, ...
2. @domain/application - The application layer
    - Contains the business logic of the project: domain services, app services, entities, models, app constants, ...
3. @presentation - The presentation
    - Contains the UI logic of the project: components, stores, UI constants, ...

Each layer is dependent on the previous layer, respectively. Then are used to compose a complete application in the `app` folder.

## Setup

There are two ways this project can be set up: __locally__ or via __IDX (Recommended)__. This project is configured to be able to run on both environments but having it on IDX would cut off the hassle of manually cloning the project and installing dependencies.

### With IDX

One small heads-up is that using IDX requires a Google account so have that setup beforehand then continue with the below instruction.

To set up the project via IDX click the button:

<a href="https://idx.google.com/import?url=https%3A%2F%2Fgithub.com%2Fjackmiller2708%2Ftask-manager">
  <img height="32" alt="Open in IDX" src="https://cdn.idx.dev/btn/open_dark_32.svg">
</a>

And follow the instructions and visual cues. That's it!! The dev server will even be automatically started once it's done installing all project's dependencies at `port 4200`.

### Locally

This project is powered by [Bun](https://bun.sh/docs), the latest version can be found [here](https://bun.sh/docs/installation), or run

```
bun upgrade
```
to upgrade to the latest stable version. After installing the latest version of Bun, to set the project up, run the below command in the project's root folder:

```
bun install
```
This command will install all the required dependencies of the project.

## Running the dev server

If the project is set up via IDX, this step can be skipped since IDX is going to automatically launch a project preview by using the dev server. However, incase of manually dev server initiation is required follow the instruction below. 

To start the dev server, in the project's root folder, run the command:
```
bun start
```
This will initiate the dev server at `port 4200`.