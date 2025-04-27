<script>
  import "./sign-up.css";
  import Input from "$lib/components/input/Input.svelte";
  import Button from "$lib/components/button/Button.svelte";
  import signUp from "$lib/helpers/auth";

  let email = "";
  let password = "";
  let confirmPassword = "";
  let errors = {
    email: [],
    password: [],
    confirmPassword: [],
    other: [],
  };

  async function handleSignup(event) {
    event.preventDefault();
    errors = await signUp(email, password, confirmPassword);

    // If no errors, optional: redirect manually instead of relying only on supabase magic
    if (
      errors.email.length === 0 &&
      errors.password.length === 0 &&
      errors.confirmPassword.length === 0 &&
      errors.other.length === 0
    ) {
      // Optionally: redirect immediately, or show "check your email" message
      window.location.href = "/home";
    }
  }
</script>

<div class="sign-up-container">
  <img src="/images/generic-logo.svg" alt="Generic Logo" class="generic-logo" />
  <p class="sign-up-header">Sign Up</p>

  <form action="" class="form-container">
    <Input
      id="sign-up-email"
      labelText="Email"
      type="email"
      bind:value={email}
    />
    {#if errors.email.length > 0}
      {#each errors.email as error}
        <h1 class="error-message">{error}</h1>
      {/each}
    {/if}

    <Input
      id="sign-up-password"
      labelText="Password"
      type="password"
      bind:value={password}
    />
    {#if errors.password.length > 0}
      <h1 class="error-message">
        {errors.password.join(" ")}
      </h1>
    {/if}

    <Input
      id="sign-up-confirm-password"
      labelText="Confirm Password"
      type="password"
      bind:value={confirmPassword}
    />
    {#if errors.confirmPassword.length > 0}
      {#each errors.confirmPassword as error}
        <h1 class="error-message">{error}</h1>
      {/each}
    {/if}

    <Button id="sign-up-button" text="Sign Up" on:click={handleSignup} />

    {#if errors.other.length > 0}
      {#each errors.other as error}
        <h1 class="error-message">{error}</h1>
      {/each}
    {/if}
  </form>

  <p class="sign-in-text">
    Already have an account? <a href="/login">Sign In</a>
  </p>
</div>
