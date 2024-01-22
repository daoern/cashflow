import { Dialog, DialogContent } from "@/lib/shadcnUi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores/appStore";
import { useToast } from "@/lib/shadcnUi/components/use-toast";
import { addCashAccount } from "../slice/accountSlice";
import { CashAccount } from "../types/cashAccount";
import CashAccountForm from "../components/CashAccountForm";

function AddCashAccountPage() {
  const { t } = useTranslation();

  const { toast } = useToast();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  async function onSubmit(value: CashAccount) {
    try {
      await dispatch(addCashAccount(value)).unwrap();
      toast({
        title: t("new.account.added"),
        description: `${value.accountName} (${value.currency})`,
      });
      navigate("..");
    } catch (e) {
      console.log(e);
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
        <CashAccountForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}

export default AddCashAccountPage;
