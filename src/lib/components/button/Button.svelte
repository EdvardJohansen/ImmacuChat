<script>
  import "$lib/components/button/button.css";

  export let id;
  export let variant = "primary";
  export let text;
</script>

<div class="button-container">
  <button on:click {id} class={variant}>{text}</button>
</div>
