import { SignIn } from "@clerk/nextjs";

type SignInProps = {
  searchParams: {
    redirectUrl: string;
  };
};

export default function SingInPage({
  searchParams: { redirectUrl },
}: SignInProps) {
  return (
    <section className="flex items-center justify-center">
      <SignIn signUpUrl="/sign-up" fallbackRedirectUrl={redirectUrl} />
    </section>
  );
}
