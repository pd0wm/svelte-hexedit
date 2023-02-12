<script>
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import HexEditorRow from './HexEditorRow.svelte';

    export let data;

    let num_bytes = 16;
    $: num_blocks = Math.ceil(data.byteLength / num_bytes);
</script>

<style>
.my-grid {
    --mdc-layout-grid-gutter-desktop: 0px;
}
</style>


<div class="my-grid">
    <LayoutGrid>
        {#each Array(num_blocks) as _, i}
            <Cell span="12">
                <HexEditorRow addr={i * num_bytes} data={data.slice(i * num_bytes, (i + 1) * num_bytes)}></HexEditorRow>
            </Cell>
        {/each}
    </LayoutGrid>
</div>
