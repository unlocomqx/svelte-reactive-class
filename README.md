# Svelte Reactive Class

A typescript class decorator for creating svelte reactive classes.

## How to use

```typescript
// Create your class and decorate it
import { reactive } from "./reactive";

@reactive()
export class Clock {

  public time = (new Date()).getSeconds();

  tick () {
    this.time = (new Date()).getSeconds();
  }
}

```

```svelte
<!-- Use the class inside your svelte component -->
<script lang="ts">
  import { onMount } from "svelte";
  import { Clock } from "./Clock";

  const clock = new Clock();

  onMount(() => {
    let interval = setInterval(() => {
      clock.tick();
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<p>
  The current time is {$clock.time}
</p>
```

The reactive decorator converts your class to a svelte store under the hood, which allows you to use
the svelte dollar syntax to access the properties.
