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
