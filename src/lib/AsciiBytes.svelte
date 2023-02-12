<script>
    import AsciiByte from "./AsciiByte.svelte";
    export let value;
</script>

{#each value as val}
    <AsciiByte value={val}></AsciiByte>
{/each}
