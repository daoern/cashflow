import { Button } from "@/lib/shadcnUi";
import { useTranslation } from "react-i18next";
import { signIn } from "../api/signIn";
import useAuthState from "../hooks/useAuthState";

function LoginPage() {
  const { t } = useTranslation();

  const onLoginButtonClicked = () => {
    signIn();
  };

  const session = useAuthState();

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Login into your account using following provider
          </p>
        </div>
        <div>
          <div className="grid gap-6">
            <Button
              variant="outline"
              type="button"
              onClick={onLoginButtonClicked}
            >
              {t("github")}
            </Button>
          </div>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">...</p>
      </div>
    </div>
  );
}

export default LoginPage;
