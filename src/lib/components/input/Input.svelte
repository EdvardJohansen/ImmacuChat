<script>
  import "$lib/components/input/input.css";

  export let id;
  export let type;
  export let labelText;
</script>

<div class="input-container">
  <label for={id}>{labelText}</label>
  <input {id} {type} class="input" />
</div>
