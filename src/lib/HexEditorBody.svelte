<script>
	import VirtualList from '@sveltejs/svelte-virtual-list';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import HexEditorRow from './HexEditorRow.svelte';

    export let data;

    let num_bytes = 16;
    $: idx = [...Array(Math.ceil(data.byteLength / num_bytes)).keys()]
    $: things = idx.map(x => {return {i: x}});
</script>

<style>
.my-grid {
    --mdc-layout-grid-gutter-desktop: 0px;
}
</style>


<div class="my-grid">
    <VirtualList height="1024px" items={things} let:item>
        <HexEditorRow addr={item.i * num_bytes} data={data.slice(item.i * num_bytes, (item.i + 1) * num_bytes)}></HexEditorRow>
    </VirtualList>
</div>
