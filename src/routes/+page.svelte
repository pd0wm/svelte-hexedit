<script>
    // import '@fontsource/roboto/300.css';
    // import '@fontsource/roboto/400.css';
    // import '@fontsource/roboto/500.css';
    // import '@fontsource/roboto/700.css';
    // import '@material/typography/dist/mdc.typography.css';
    import 'svelte-material-ui/bare.css';

    import HexEditorBody from '../lib/HexEditorBody.svelte';

    let files;
    let buffer;
    let data;

    $: if (files) {
        let file = files[0];
        let reader = new FileReader();
        reader.onload = (event) => {
            buffer = event.target.result;
        };
        reader.readAsArrayBuffer(file);
    }

    $: data = new Uint8Array(buffer);
</script>

<style>
    .container {
        margin: 0 auto;
        width: 1200px;
    }
</style>


<div class="container">
    <label for="avatar">Upload a file:</label>
    <input type="file" bind:files />


    {#if data}
        <HexEditorBody data={data}></HexEditorBody>
    {/if}
</div>
