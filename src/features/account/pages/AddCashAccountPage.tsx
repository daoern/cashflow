import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/lib/shadcnUi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores/appStore";
import { useToast } from "@/lib/shadcnUi/components/use-toast";
import { addCashAccount } from "../slice/accountSlice";
import CashAccountForm, {
  CashAccountFormInputs,
} from "../components/CashAccountForm";
import { getAuthInfo } from "@/features/auth/hooks/authInfo";

function EditCashAccountPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { toast } = useToast();

  async function onSubmit(value: CashAccountFormInputs) {
    const userId = getAuthInfo().getId();
    try {
      if (!userId) {
        throw "Missing user id";
      }
      const newCashAccount = await dispatch(
        addCashAccount({
          accountName: value.accountName,
          currency: value.currency,
          userId: userId,
        }),
      ).unwrap();
      toast({
        title: t("new.account.added"),
        description: `${newCashAccount?.accountName} (${newCashAccount?.currency})`,
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
          <DialogTitle>{t("add.account")}</DialogTitle>
          <DialogDescription>{t("add.account.description")}</DialogDescription>
        </DialogHeader>
        <CashAccountForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}

export default EditCashAccountPage;
