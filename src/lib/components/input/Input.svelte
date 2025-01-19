<script>
  import "$lib/components/input/input.css";

  export let id;
  export let type;
  export let labelText;
  export let className = "";
</script>

<div class="input-container" {className}>
  <label for={id}>{labelText}</label>
  <input {id} {type} class="input" {className} />
</div>
