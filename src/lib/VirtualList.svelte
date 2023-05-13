<script>
    import { range } from './helpers';

    // Config
    export let num_rows;
    export let row_height;
    export let height = 1024;
    export let extra_rows = 100; // Extra rows to preload on either side of the visible rows

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
                {#each rows as i (i)}
                    <slot name="item" style="height={row_height}px;position:absolute;transform:translateY({i * row_height}px);display:block;" index={i}></slot>
                {/each}
            </div>
        {/if}
    </div>
</div>
