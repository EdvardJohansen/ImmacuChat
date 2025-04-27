import { supabase } from "$lib/supabase.js";

export default async function signUp(email, password, confirmPassword) {
  const redirectUrl = window.location.origin + "/home";

  let errors = {
    email: [],
    password: [],
    confirmPassword: [],
    other: [],
  };

  // Normalize input
  email = email.trim().toLowerCase();
  password = password.trim();
  confirmPassword = confirmPassword.trim();

  // --- Email Validation ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email.push("Email is required.");
  } else if (!emailRegex.test(email)) {
    errors.email.push("Please enter a valid email address.");
  }

  // --- Password Validation ---
  if (!password) {
    errors.password.push("Password is required.");
  } else {
    const passwordChecks = [
      { regex: /.{8,}/, error: "Password must be at least 8 characters long, " },
      { regex: /[A-Z]/, error: "password must contain at least one uppercase letter, " },
      { regex: /[a-z]/, error: "password must contain at least one lowercase letter, " },
      { regex: /[0-9]/, error: "password must contain at least one number, " },
      { regex: /[!@#$%^&*]/, error: "password must contain at least one special character (!@#$%^&*)." },
    ];
  
    passwordChecks.forEach(({ regex, error }) => {
      if (!regex.test(password)) errors.password.push(error);
    });
  }
  
  // --- Confirm Password Validation ---
  if (!confirmPassword) {
    errors.confirmPassword.push("Confirm Password is required.");
  } else if (password !== confirmPassword) {
    errors.confirmPassword.push("Passwords do not match.");
  }

  // --- Early return if validation fails ---
  if (
    errors.email.length > 0 ||
    errors.password.length > 0 ||
    errors.confirmPassword.length > 0
  ) {
    return errors;
  }

  // --- Try to register the user in Supabase ---
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: redirectUrl,
    },
  });

  if (error) {
    console.error("Supabase sign-up error:", error);

    // Optional: smarter error assignment
    if (error.message.toLowerCase().includes("email")) {
      errors.email.push(error.message);
    } else {
      errors.other.push(error.message || "An unexpected error occurred.");
    }
  }

  return errors;
}
