<script>
    import VirtualList from 'svelte-tiny-virtual-list';
    import HexEditorRow from './HexEditorRow.svelte';

    export let data;

    let num_bytes = 16;
    $: num_rows = Math.ceil(data.byteLength / num_bytes);
</script>

<style>
.my-grid {
    overflow-y: scroll; /* Show vertical scrollbar */
}
</style>


<div class="my-grid">
    <VirtualList height={1024} itemCount={num_rows} itemSize={21} overscanCount={100}>
        <div slot="item" let:index let:style {style}>
            <HexEditorRow addr={index * num_bytes} data={data.slice(index * num_bytes, (index + 1) * num_bytes)}></HexEditorRow>
        </div>
    </VirtualList>
</div>
