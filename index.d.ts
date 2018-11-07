declare module 'typed-json-transform' {
  /*
  String
  */
  function startsWith(string: string, s: string): boolean
  function beginsWith(string: string, s: string): boolean
  function endsWith(string: string, s: string): boolean
  function replaceAll(str: string, find: string, rep: string): string
  function trim(str: string): string

  interface CamelOptions {
    delimiter?: string
    upperCase?: boolean
    capsLock?: boolean
  }

  function toCamel(input: string, options?: CamelOptions): string
  function fromCamel(input: string, options?: CamelOptions): string
  /* 
  * Container Methods
  */
  interface ComparisonOptions {
    [index: string]: boolean;
    strict: boolean;
  }


  interface SIO { [index: string]: any }

  function each<T>(iter: { [index: string]: T } | T[], fn: (val: T, index?: string | number, breakLoop?: () => void) => void): void
  function replace<A, B>(target: A & SIO, source: B & SIO): A & B
  function extend<A, B>(target: A & SIO, source: B & SIO): A & B
  function extendOwn<A, B>(target: A & SIO, source: B & SIO): A & B
  function existentialExtend<A, B>(target: A & SIO, source: B & SIO): A & B
  function extendN<T>(target: T & SIO, ...sources: Array<SIO>): T
  function flatten<A>(arr: A[][]): A[]
  function assign<A, B>(a: A, b: B): A & B
  function combine<A, B>(a: A, b: B): A & B
  function combineN<T>(retType: T, ...args: SIO[]): T

  type MergeMethod = '!' | '&' | '!' | '=' | '?' | '+' | '|' | '-' | '^';

  interface MergeOptions {
    arrayMergeMethod?: MergeMethod
    objectMergeMethod?: MergeMethod
  }

  function merge<T>(target: T & { [index: string]: any }, setter: any, options?: MergeOptions): T
  function mergeN<T>(target: T & { [index: string]: any }, ...args: any[]): T
  function or<A, B>(a: A, b: B): A & B
  function any<T>(iter: { [index: string]: T } | T[], fn: (val: T, index?: string | number) => boolean): boolean
  function every<T>(iter: { [index: string]: T } | T[], fn: (val: T, index?: string | number) => boolean): boolean
  function all<T>(iter: { [index: string]: T } | T[], fn: (val: T, index?: string | number) => boolean): boolean
  function map<R, I>(iter: { [index: string]: I } | I[], fn: (val: I, index: any) => R): R[]
  function amap<R, I>(iter: { [index: string]: I } | I[], fn: (val: I, index: any) => R | Promise<R>): Promise<R[]>
  function keysAndValues<T>(object: { [index: string]: T }): { keys: string[], values: T[] }
  function reduce<T, S>(input: Array<T>, fn: (input: T, memo: S) => S, base?: S): S
  function reduce<T, S>(input: { [index: string]: T }, fn: (input: T, memo: S) => S, base?: S): S
  function sum<T>(input: { [index: string]: T } | Array<T>, fn: (input: T) => number): number
  function greatestResult<T>(input: { [index: string]: T } | Array<T>, fn: (input: T) => number): number
  function sumIfEvery<T>(input: { [index: string]: T } | Array<T>, fn: (input: T) => number): number
  function geoSum<T>(input: { [index: string]: T } | Array<T>, fn: (input: T, memo: number) => number): number
  function union<T>(...args: T[][]): T[]
  function concat<T>(...args: T[][]): T[]
  function intersect<T>(...args: T[][]): T[]
  function difference<T>(a: T[], b: T[]): T[]
  function contains<T>(set: any[], match: T): number
  function containsAny<T>(set: any[], match: any[]): number
  function containsAll<T>(set: any[], match: any[]): boolean
  function isEqual(actual: any, expected: any, opts?: ComparisonOptions): boolean
  function prune<T>(obj: T): T
  function clean<T>(obj: T): T
  function plain<T>(obj: T): T
  function clone<T>(input: T): T
  function arrayify<T>(val: T | T[]): T[]
  function okmap<R, I, IObject extends { [index: string]: I }, RObject extends { [index: string]: R }>(iterable: IObject | Array<I>, fn: (v: I, k?: string | number) => R): RObject
  function aokmap<R, I, IObject extends { [index: string]: I }>(iterable: IObject | Array<I>, fn: (v: I, k?: string | number) => R | Promise<R>): any
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
  function lastKey(kp: string): string
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

  function extractKeywordsAndSelectors(options: { [index: string]: boolean }): { keywords: string[], selectors: string[] }
  function cascade(tree: any, keywords: string[], selectors: string[]): any
  function hashField(tree: any, keywords: string[], selectors: string[]): any
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

  namespace OLHM {
    function parse(object: any): OLHM<any>;
    function safe<T>(olhm: OLHM<T>): T[];
  }

  namespace OLHV {
    function is(obj: any): boolean;
    function safe<T>(objOrVal: OLHV<T> | T): T;
  }
}
