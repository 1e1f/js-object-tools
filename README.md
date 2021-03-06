## typed-json-transform [![Build Status](https://travis-ci.org/1e1f/typed-json-transform.svg?branch=master)](https://travis-ci.org/1e1f/typed-json-transform) [![Coverage Status](https://coveralls.io/repos/github/1e1f/typed-json-transform/badge.svg?branch=master)](https://coveralls.io/github/1e1f/typed-json-transform?branch=master)
[![NPM](https://nodei.co/npm/typed-json-transform.png?downloads=true)](https://nodei.co/npm/typed-json-transform/)

## _ like library written in typescript using templated generics where reasonable

usage
```typescript
import { map } from 'typed-json-transform';

const strings = ['apple', 'bannana'];
const lengths = map(strings, (str: string) => {
    return str.length;
})
```
'lengths' is typed as Array<number> because map() is templated to return an array of types deduced by the map function

its value is as expected:
```
[ 5, 7 ]
```

this library is NOT a drop-in replacement for underscore ot lodash, however functions with similiar names should do the same thing.

documentation = index.d.ts:

```typescript
declare module 'typed-json-transform' {
  /* 
  * Container Methods
  */

  interface SIO { [index: string]: any }
  function each<T>(iter: { [index: string]: T } | T[], fn: (val: T, index?: string | number, breakLoop?: () => void) => void): void
  function extend<T, U>(target: T & SIO, source: U & SIO): T & U
  function extendN<T>(target: T & SIO, ...sources: Array<SIO>): T
  function assign<A, B>(a: A, b: B): A & B
  function combine<A, B>(a: A, b: B): A & B
  function combineN<T>(retType: T, ...args: SIO[]): T
  function any(iterable: Array<any>, fn: Function): boolean
  function every<T>(iterable: any[], fn: Function): boolean
  function map<R, I>(iter: { [index: string]: I } | I[], fn: (val: I, index: any) => R): R[]
  function reduce<T, S>(input: Array<T>, fn: (input: T, memo: S) => S, base?: S): S
  function reduce<T, S>(input: { [index: string]: T }, fn: (input: T, memo: S) => S, base?: S): S
  function sum<T>(input: { [index: string]: T } | Array<T>, fn: (input: T) => number): number
  function greatestResult<T>(input: { [index: string]: T } | Array<T>, fn: (input: T) => number): number
  function sumIfEvery<T>(input: { [index: string]: T } | Array<T>, fn: (input: T) => number): number
  function geoSum<T>(input: { [index: string]: T } | Array<T>, fn: (input: T, memo: number) => number): number
  function union<T>(...args: T[][]): T[]
  function intersect<T>(...args: T[][]): T[]
  function difference<T>(a: T[], b: T[]): T[]
  function contains<T>(set: any[], match: T): boolean
  function containsAny<T>(set: any[], match: any[]): boolean
  function containsAll<T>(set: any[], match: any[]): boolean
  interface ComparisonOptions {
    [index: string]: boolean;
    strict: boolean;
  }
  function isEqual(actual: any, expected: any, opts?: ComparisonOptions): boolean
  function prune<T>(obj: T): T
  function plain<T>(obj: T): T
  function clone<T>(input: T): T
  function arrayify<T>(val: T | T[]): T[]
  function okmap<T>(iterable: Object | Array<any>, fn: (v: any, k: string) => { [index: string]: T }): { [index: string]: T }
  function stringify(value: any, replacer?: (number | string)[], space?: string | number): string

  /*
  * Keypath
  */
  namespace Keypath {
    interface Options extends SIO {
      allLevels?: boolean;
      diffArrays?: boolean;
    }
  }

  function setValueForKeyPath(value: any, keyPath: string, input: SIO): void
  function mergeValueAtKeypath(value: any, keyPath: string, obj: SIO): void
  function valueForKeyPath(keyPath: string, input: SIO): any
  function unsetKeyPath(keyPath: string, obj: SIO): boolean
  function keyPathContainsPath(keyPath: string, ignorePath: string): boolean
  function filteredKeyPaths(_keyPaths: string[], ignore?: string[]): string[]
  function keyPaths(obj: SIO, _options?: Keypath.Options, _stack?: string[], parent?: string): string[]
  function allKeyPaths(obj: SIO): string[]
  function flatObject(object: any, options?: { includeBranches?: boolean }): SIO

  /*
  * Diff / Mongo Method
  */

  namespace Mongo {
    interface Document extends SIO {
      _id: string;
    }

    interface Collection {
      findOne: Function;
      find: Function;
      update: Function;
    }

    interface UpdateOptions {
      collection?: Collection;
      get?: Function;
      set?: Function;
      ignore?: string[];
    }

    interface Modifier {
      $set?: SIO;
      $unset?: SIO;
    }
  }

  function forwardDiffToModifier(prev: SIO, doc: SIO, fieldsToIgnore?: string[]): Mongo.Modifier
  function shouldSet(val: any, prev: any): boolean
  function shouldUnset(val: any, prev: any): boolean
  function diffToModifier(prev: SIO, doc: SIO, fieldsToIgnore?: string[], pruneEmptyObjects?: boolean): Mongo.Modifier
  function modifierToObj(modifier: Mongo.Modifier): SIO
  function objToModifier(obj: SIO): Mongo.Modifier
  function apply<T>(dest: T, source: Mongo.Modifier): T
  function $set(dest: SIO, source: Mongo.Modifier): void
  function $addToSet<T>(dest: T[], src: T): T[]
  function $unset(dest: Object, source: Mongo.Modifier): void
  function update(doc: Mongo.Document, options: Mongo.UpdateOptions): Mongo.Modifier
  function mapModifierToKey(modifier: Mongo.Modifier, key: string): Mongo.Modifier

  /*
  * Check
  */

  function check(value: any, type: any): boolean
  function isNumeric(n: any): boolean
  function isArguments(object: any): boolean
  function isEmpty(input: { [index: string]: string }): boolean
  function isUndefinedOrNull(value: any): boolean
  /*
  * Cascade
  */

  function cascadeShallow<T>(tree: T, keywords: string[], selectors: string[]): T
  function cascade<T>(tree: T, keywords: string[], selectors: string[]): T
  function select(input: string[], cssString: string): boolean;

  /*
  Graph
  */

  class Graph<T> {
    [index: string]: any;

    addNode(node: string, data?: T): void;
    removeNode(node: string): void;
    hasNode(node: string): boolean;
    getNodeData(node: string): any;
    setNodeData(node: string, data?: T): void;
    addDependency(from: string, to: string): void;
    removeDependency(from: string, to: string): void;
    dependenciesOf(node: string, leavesOnly: boolean): any[];
    dependantsOf(node: string, leavesOnly: boolean): any[];
    overallOrder(leavesOnly: boolean): any[];
  }

  /*
  Optionally Linked Hash Maps
  */

  class OLHV<T> {
    require?: string;
    value: T
  }
  class OLHM<T> {
    [index: string]: OLHV<T>;
  }
  function map<T>(olhm: OLHM<T>, fn: (v: any, k?: string) => T): T[];
  function okmap<T>(olhm: OLHM<T>, fn: (v: any, k?: string) => OLHV<T> | T): OLHM<T>;
  function parseOLHM(object: any): OLHM<any>;
  function safeOLHM<T>(olhm: OLHM<T>): T[];

}
```