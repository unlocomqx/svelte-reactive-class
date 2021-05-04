import { writable } from "svelte/store";

export function reactive (): any {
  return function (constructor: Function) {
    // Initial value is set to null because we don't yet have an instance
    const store = writable(null);

    return function (...args) {
      let instance = new (constructor as any)(...args);

      // Set the store value as soon as we have an instance
      store.set(instance);

      // We hijack the original methods so that we can notify the store
      Object.getOwnPropertyNames(constructor.prototype)
        .forEach(method => {
          const originalFn: Function = constructor.prototype[method];
          constructor.prototype[method] = function (...args) {
            originalFn.call(instance, ...args);
            store.set(instance);
          };
        });

      // clone the store methods to get the store contract
      Object.keys(store)
        .forEach(method => constructor.prototype[method] = store[method]);

      return instance;
    };
  };
}

