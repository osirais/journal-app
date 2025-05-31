import { ForgotPasswordCard } from "@/components/auth/forgot-password-card";

export const metadata = {
  title: "Forgot Password"
};

export default async function ForgotPassword() {
  return <ForgotPasswordCard />;
}
