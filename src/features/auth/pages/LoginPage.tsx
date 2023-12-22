import LoginForm from "../components/LoginForm";
import withAuth, { AuthState } from "../hooks/withAuth";

function LoginPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">...</p>
      </div>
    </div>
  );
}

export default withAuth(LoginPage, { allowedStates: [AuthState.signedOut] });
