<script lang="ts">
    import type { Snippet } from "svelte";

    type HeaderProps = {
        title?: string;
        children: Snippet;
    };
    const { title, children }: HeaderProps = $props();
</script>

<h1>{@render children()} {title ? `- ${title}` : ""}</h1>
