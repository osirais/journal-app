"use server";

import { defaultUrl } from "@/constants/url";
import { createClient } from "@/utils/supabase/server";
import { encodedRedirect } from "@/utils/utils";
import { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(email: string, password: string) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect("error", "/register", "Email and password are required");
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`
    }
  });

  if (authError) {
    console.error(authError.code + " " + authError.message);
    return encodedRedirect("error", "/register", authError.message);
  }

  if (!authData.user) {
    return encodedRedirect("error", "/register", "User creation failed");
  }

  return encodedRedirect(
    "success",
    "/register",
    "Thanks for signing up! Please check your email for a verification link."
  );
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error, data: authData } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return encodedRedirect("error", "/login", error.message);
  }

  const { user } = authData;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("onboarded")
    .eq("id", user.id)
    .single();

  if (userError && userError.code === "PGRST116") {
    // user might not exist yet since they are only in auth.users -> create new user
    const { error: insertError } = await supabase.from("users").insert({
      id: user.id,
      name: user.user_metadata.full_name || user.email,
      avatar_url: user.user_metadata.avatar_url || null
    });

    if (insertError) {
      return encodedRedirect("error", "/login", insertError.message);
    }

    return redirect("/onboarding");
  }

  if (userError) {
    return encodedRedirect("error", "/login", userError.message);
  }

  return redirect(userData?.onboarded ? "/dashboard" : "/onboarding");
}

export async function loginActionWithOAuth(provider: Provider) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`
    }
  });

  if (error) {
    return encodedRedirect("error", "/login", error.message);
  }

  return redirect(data.url);
}

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect("error", "/forgot-password", "Could not reset password");
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
}

export async function resetPasswordAction(formData: FormData) {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect("error", "/reset-password", "Password and confirm password are required");
  }

  if (password !== confirmPassword) {
    encodedRedirect("error", "/reset-password", "Passwords do not match");
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    encodedRedirect("error", "/reset-password", "Password update failed");
  }

  encodedRedirect("success", "/reset-password", "Password updated");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}
