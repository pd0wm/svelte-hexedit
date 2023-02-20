<script>
    import HexEditorRow from './HexEditorRow.svelte';
    import { range } from './helpers';

    export let data;

    // Config
    let height = 1024;
    let row_height = 21;
    let num_bytes = 16;
    let extra_rows = 5; // Extra rows to preload on either side of the visible rows

    $: num_rows = Math.ceil(data.byteLength / num_bytes);
    let visible_rows = Math.ceil(height / row_height) + (2 * extra_rows);
    $: rows = range(0, Math.min(visible_rows + extra_rows, num_rows - 1));


    let box;
    function parseScroll() {
        let offset_rows = Math.floor(box.scrollTop / row_height);

        let start_row = Math.max(0, offset_rows - extra_rows);
        let end_row = Math.min(num_rows - 1, offset_rows + visible_rows + extra_rows);

        rows = range(start_row, end_row );
    }
</script>

<div style="overflow-y:scroll;">
    <div style="height:{height}px;width:100%;overflow:auto;" bind:this={box} on:scroll={parseScroll}>
        {#if num_rows > 0}
            <div style="display:flex;flex-direction:column; height:{num_rows * row_height}px;position:relative;">
                {#each rows as i}
                    <div style="height={row_height}px;position:absolute;top:{i * row_height}px;display:block;">
                        <HexEditorRow addr={i * num_bytes} data={data.slice(i * num_bytes, (i + 1) * num_bytes)}></HexEditorRow>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
