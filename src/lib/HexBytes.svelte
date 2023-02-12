<script>
    import HexByte from "./HexByte.svelte";
    export let value;

    $: num_bytes = value.byteLength;
</script>

<style>
p {
    font-family: monospace;
    display: inline;
}
</style>

{#each Array(num_bytes) as _, i}
    <HexByte value={value[i]}></HexByte>
    <p>&nbsp;</p>
{/each}
