import { SignUp } from "@clerk/nextjs";

type SignUpProps = {
  searchParams: {
    redirectUrl: string;
  };
};

export default function SingUpPage({
  searchParams: { redirectUrl },
}: SignUpProps) {
  return (
    <section className="flex items-center justify-center">
      <SignUp signInUrl="/sign-in" fallbackRedirectUrl={redirectUrl} />
    </section>
  );
}
