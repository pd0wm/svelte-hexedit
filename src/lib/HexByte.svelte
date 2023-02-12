<script>
    import { val_to_color } from "./helpers";

    export let value;
    $: hex = value.toString(16).padStart(2, '0');
    $: color = val_to_color(value);
</script>

<style>
p {
    font-family: monospace;
    font-variant-ligatures: none;
    display: inline;
}
</style>

<p style="color: {color};">{hex}</p>
