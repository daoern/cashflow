import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/lib/shadcnUi";
import { useTranslation } from "react-i18next";
import { OAuthProvider, signInWithOAuth } from "../api/signIn";

function LoginForm() {
  const { t } = useTranslation();

  const onLoginButtonClicked = (provider: OAuthProvider) => {
    signInWithOAuth(provider);
  };
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{t("login.page.title")}</CardTitle>
        <CardDescription>{t("login.page.description")}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" disabled />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">{t("password")}</Label>
          <Input id="password" type="password" disabled />
        </div>
        <Button className="w-full" disabled>
          {t("sign.in")}
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("or.continue.with")}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Button
            variant="outline"
            onClick={() => onLoginButtonClicked(OAuthProvider.github)}
          >
            {t("github")}
          </Button>
          <Button
            variant="outline"
            onClick={() => onLoginButtonClicked(OAuthProvider.google)}
          >
            {t("google")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
