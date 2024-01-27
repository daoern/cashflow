import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Skeleton,
} from "@/lib/shadcnUi";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores/appStore";
import { useToast } from "@/lib/shadcnUi/components/use-toast";
import { updateCashAccount } from "../slice/accountSlice";
import CashAccountForm, {
  CashAccountFormInputs,
} from "../components/CashAccountForm";
import { getAuthInfo } from "@/features/auth/hooks/authInfo";
import { EditCashAccountPageParams } from "@/routes";

function EditCashAccountPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { toast } = useToast();

  const { id } = useParams<EditCashAccountPageParams>();
  const accountId = parseInt(id ?? "");

  const cashAccountState = useSelector((state: RootState) => state.cashAccount);

  async function onSubmit(value: CashAccountFormInputs) {
    const userId = getAuthInfo().getId();
    try {
      if (!userId) {
        throw "Missing user id";
      }
      const result = await dispatch(
        updateCashAccount({
          accountId: accountId,
          cashAccount: {
            accountName: value.accountName,
            currency: value.currency,
            userId: userId,
          },
        }),
      ).unwrap();
      toast({
        title: t("success"),
        description: `${result?.cashAccount?.accountName} (${result?.cashAccount?.currency}) account information updated.`,
      });
      navigate("..");
    } catch (e) {
      console.log(e);
      toast({
        title: t("error"),
        description: `${e}`,
      });
    }
  }

  let content;
  if (cashAccountState.status == "loading") {
    content = (
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  } else if (cashAccountState.status == "error") {
    content = (
      <div>
        <h6>{cashAccountState.errorTitle}</h6>
        <p>{cashAccountState.errorDescription}</p>
      </div>
    );
  } else if (cashAccountState.status == "success") {
    const cashAccount = cashAccountState.cashAccounts.find(
      (value) => value.accountId === accountId,
    );
    content = (
      <CashAccountForm
        onSubmit={onSubmit}
        defaultValues={{
          accountName: cashAccount?.accountName ?? "",
          currency: cashAccount?.currency ?? "",
        }}
      />
    );
  }

  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          navigate("..");
        }
      }}
    >
      <DialogContent className="sm:max-w-[32em]">
        <DialogHeader>
          <DialogTitle>{t("edit.account")}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}

export default EditCashAccountPage;
