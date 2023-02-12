<script>
    import { is_printable_ascii, val_to_color } from "./helpers";

    export let value;
    $: ascii = is_printable_ascii(value) ? String.fromCharCode(value) : '.';
    $: color = val_to_color(value);
</script>


<style>
p {
    font-family: monospace;
    display: inline;
}
</style>

<p style="color: {color};">{ascii}</p>
