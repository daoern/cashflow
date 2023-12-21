import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/shadcnUi";
import AppLayout from "../../../components/AppLayout";
import withAuth from "@/features/auth/hooks/withAuth";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import CashAccountList from "../components/CashAccountList";

function CashAccountPage() {
  const { t } = useTranslation();
  return (
    <AppLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("account")}</h2>
        <Link to={"add"}>
          <Button>{t("add.account")}</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("all.accounts")}</CardTitle>
        </CardHeader>
        <CardContent>
          <CashAccountList />
        </CardContent>
      </Card>
      <Outlet />
    </AppLayout>
  );
}

export default withAuth(CashAccountPage);
