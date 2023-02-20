<script>
    import HexEditorRow from './HexEditorRow.svelte';
    import VirtualList from './VirtualList.svelte';

    export let data;

    let num_bytes = 16;
    $: num_rows = Math.ceil(data.byteLength / num_bytes);
</script>

<VirtualList num_rows={num_rows} row_height={21}>
    <div slot="item" let:index let:style {style}>
        <HexEditorRow addr={index * num_bytes} data={data.slice(index * num_bytes, (index + 1) * num_bytes)}></HexEditorRow>
    </div>
</VirtualList>
