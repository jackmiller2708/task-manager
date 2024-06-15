# Simple Task Manager

This is a demo to showcase the implementations of various design patterns including:

- Architectural: [N-layer](https://en.wikipedia.org/wiki/Multitier_architecture), [Flux](https://facebookarchive.github.io/flux/docs/in-depth-overview/);
- Structural: [Adaptor](https://refactoring.guru/design-patterns/adapter);
- Behavioral: [Memento](https://refactoring.guru/design-patterns/memento);
- Creational: [Factory Method](https://refactoring.guru/design-patterns/factory-method).

For the purpose of experimentation and analysis to have a better understanding of their benefits and limitations. This acts as the scope of the project.

## Prerequisites

Before jumping into the code there are a few requirements that is expected and assumed to already have to be able to understand what's going on since this is rather a somewhat advance topic:

1. Intermediate understanding of functional programming, reactive programming and OOP;
2. Intermediate knowledge of web development (JavaScript, HTML, CSS, ...);
3. Intermediate understanding of the Angular framework;
4. And basic understanding of design patterns.

## Specifications

This project's foundation is built upon the strict rule of immutability even tho Angular's inner mechanisms promote and encourage the use of mutable objects thru the principles of OOP. In other words, every object and process which are created throughout the application are immutable where it makes sense. But cloning objects is a very expensive operation and vanilla JavaScript is not built to support the use of immutability so in order to achieve it, data structures are required. 

This project's core mechanisms rely on three libraries:

1. [ImmutableJS](https://immutable-js.com/) - provides a JS friendly API that allows the integration of Immutable [Persistent Data Structures](https://en.wikipedia.org/wiki/Persistent_data_structure).
2. [Effect](https://effect.website/docs/introduction)  - provides a TypeScript styled API that models functional programming.
3. [RxJS](https://rxjs.dev/) - Angular's integrated reactive programming library to handle async operations.

And for Flux design pattern to work, a state manager is required:

- [NgRx](https://ngrx.io/docs) - an Angular based state manager similar to [Redux](https://redux.js.org/).

It also depends on a plethora of other libraries to reduce code complexity and increase productivity:

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

Then are composed into a complete application in the `app` folder.

## Setup

This project is powered by [Bun](https://bun.sh/docs) so you'd need to install the latest version of Bun: [here](https://bun.sh/docs/installation). After installing Bun, all you need to do to set the project up is to run a single command:

```
bun install
```
This command will install all the required dependencies of the project without you lifting a finger.

## Running the dev server

To start the project, run the command:
```
bun start
```
This will initiate the dev server at `port 4200`.

---
<div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
  <div style="font-weight: medium; font-size: 1.3rem">
    Wanna give it a try? Click the button below:
  </div>
  <a href="https://idx.google.com/import?url=https%3A%2F%2Fgithub.com%2Fjackmiller2708%2Ftask-manager">
    <img height="32" alt="Open in IDX" src="https://cdn.idx.dev/btn/open_dark_32.svg">
  </a>
</div>