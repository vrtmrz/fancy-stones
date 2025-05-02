<script lang="ts">
    import { onMount } from "svelte";

    let message = $state("Hello world");
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
    documentation
</p>

<input type="text" placeholder="Type your message here" bind:value={message} />
<p>Your message: {message}</p>
