import { useAuthInfo } from "@/features/auth/hooks/authInfo";
import { AppDispatch, RootState } from "@/stores/appStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCashAccounts } from "../slice/accountSlice";
import { Link } from "react-router-dom";
import { Button, Skeleton } from "@/lib/shadcnUi";
import { useTranslation } from "react-i18next";
import CashAccountItem from "./CashAccountItem";

function CashAccountList() {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const authInfo = useAuthInfo();
  const cashAccountState = useSelector((state: RootState) => state.cashAccount);

  useEffect(() => {
    const loadCashAccountPromise = dispatch(
      loadAllCashAccounts(authInfo?.getId() ?? ""),
    );
    return () => {
      loadCashAccountPromise.abort();
    };
  }, [authInfo]);

  if (cashAccountState.status === "loading") {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  if (cashAccountState.status === "error") {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <p>{t("error.occured")}</p>
        <Link to={""}>
          <Button>{t("refresh")}</Button>
        </Link>
      </div>
    );
  }

  if (cashAccountState.cashAccounts.length == 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <p>{t("no.account.description")}</p>
        <Link to={"add"}>
          <Button>{t("add.account")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {cashAccountState.cashAccounts.map((cashAccount) => {
        return (
          <CashAccountItem
            key={cashAccount.accountId}
            accountId={cashAccount.accountId}
            accountName={cashAccount.accountName}
            accountCurrency={cashAccount.currency}
            balance={0}
            currentMonthChange={0}
          />
        );
      })}
    </div>
  );
}

export default CashAccountList;
