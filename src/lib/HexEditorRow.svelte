<script>
    import LayoutGrid, { Cell, InnerGrid } from '@smui/layout-grid';
    import AsciiBytes from './AsciiBytes.svelte';
    import HexBytes from './HexBytes.svelte';

    export let addr;
    export let data;

    $: hex_addr = addr.toString(16).padStart(8, '0');
</script>


<style>
p {
    font-family: monospace;
    display: inline;
}
</style>

<InnerGrid>
    <Cell span="2">
        <p>0x{hex_addr}</p>
    </Cell>
    <Cell span="6">
        <HexBytes value={data}></HexBytes>
    </Cell>
    <Cell span="4">
        <AsciiBytes value={data}></AsciiBytes>
    </Cell>
</InnerGrid>
