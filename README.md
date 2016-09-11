# Redux, ngRedux, & Sagas: A Gentle Introduction for Angular Developers

You either have heard of Redux from the React crowd, or perhaps have learned a little functional programming, and are looking how to incorporate it into your Angular 1 and/or Angular 2 applications. Jesse will cover what Redux is, why it's helpful, how it's different from Flux/MobX, and how it's used in an Angular 1.5+ application. He'll also cover to use of Sagas, and how they make dealing with complicated asynchronous actions a lot easier to code if you're used to imperative/OOP languages, as well as testing them. Finally, he'll cover some of the pain points you can run into, refactoring strategies, and tooling setup needed.

## Who

- Jesse Warden
- Manager at Capital One
- 16 years of mainly front-end dev
- Director, Flash, Flex, Corona, Web


## What We'll Cover

- What & Why of Redux
- Thunks & Sagas
- Logging
- ngRedux
- Tips & Tricks
- Entity Component System

# What & Why

## Synopsis

- What: predictable state container
- Why: consistent/predictable applications, easy to test
- Er, What: who’s changing my data, when, and where in a predictable fashion
- Er, Why: more hints as to where the defects are… and they are easier to unit test

## Predicatable

- comes from functional programming
- pure functions / avoiding side effects
- examples of pure functions

## State

- "Who is the logged in user right now?"
- the data your front-end application shows and edits
- Where you put things
- Often called mutable state

## Examples of State

- window state
- Backbone state
- Angular Factory State

## Examples of Changing State

- set variable
- have function do it
- Object.assign

## Examples of Container

- show how immutable + Object.assign

## Tests: Imperative

- Examples



## Tests: Functional

- Examples

# Redux

**In a nutshell**: Data for entire app in a single object. You only change it by dispatching actions with your new value. To actually change the data, you use pure functions.

**Compared To**: Data for entire app spread out over multiple classes. You change through method calls. To change data, you'd use getter/setters, or $watchers.

## Initial State

- data right now
- our data model
- starts as a basic domain
- eventually tree gets pretty big & specialized
- show default Object

## Actions

- what happened
- show basic action
- show different types
- show WHY action creators (pure functions)


## Reducers

- change your data in response to what happened
- pure as possible
- like Array.reduce
- talk about initial state again
- both in switch default
- and in ES6 default
- combineReducers shrinks size, not a requirement

## Store

- holds your state. There is only 1.
- you access it through `getState`
- update state via `dispatch(action)`
- for views/GUI, listen via `subscribe(listener)`
- can set default state via 2nd param of `createStore`

## Data Flow

- store.dispatch(action)
- reducer handles change request
- new state and/or tree, saves it
- new state of your app via `store.subscribe(listener)`

## Async

- show the 3 states
- state machines
- Thunks use Promises
- Sagas

## Generator Functions

- function *name vs. function name
- Iterator (omg Java)
- pausable function; all state saved
- primitive away async/await works


## Memoized Selectors

- selector: function to get data from your state tree
- memoized: cached
- yes, you can compose them
- if you don't know what that us, go play with Lodash chain first, then flow, RxJS
- memoized important for UI's, ecspecially with lists

## Conclusions

- Redux gives you a framework to make sure your data is as pure (functional) as possible
- clear flow of data
- single data store, scale to multiple functions & class files










