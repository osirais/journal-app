import { ResetPasswordCard } from "@/components/auth/reset-password-card";
import { Message } from "@/components/form-message";

export const metadata = {
  title: "Reset Password"
};

export default async function ResetPassword(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="grid h-screen place-items-center">
      <ResetPasswordCard message={searchParams} />
    </div>
  );
}
