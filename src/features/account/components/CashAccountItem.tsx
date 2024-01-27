import AlertDialogAsync from "@/components/alert/AlertDialogAsync";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  useToast,
} from "@/lib/shadcnUi";
import { formatCurrencyNum } from "@/utils/format";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useTranslation } from "react-i18next";
import { removeCashAccount } from "../slice/accountSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores/appStore";
import { AppLink } from "@/routes/AppLink";

interface CashAccountItemProps {
  accountId: number;
  accountName: string;
  accountCurrency: string;
  balance: number;
  currentMonthChange: number;
}

function CashAccountItem(props: CashAccountItemProps) {
  const { t } = useTranslation();
  const { toast } = useToast();

  const dispatch = useDispatch<AppDispatch>();

  async function deleteAccount() {
    try {
      await dispatch(removeCashAccount(props.accountId)).unwrap();
      toast({
        title: t("success"),
        description: t("account.removed", { item: props.accountName }),
      });
    } catch (e) {
      toast({
        title: t("error"),
        description: (e as Error).message,
      });
      throw e;
    }
  }

  return (
    <div className="flex items-center">
      <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 rounded-full border">
        <AvatarImage src="" alt="Avatar" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{props.accountName}</p>
        <p className="text-sm text-muted-foreground">Savings</p>
      </div>
      <div className="ml-auto font-medium">
        {formatCurrencyNum(props.accountCurrency, props.balance)}
      </div>
      <Button className="ml-4 space-y-1" variant="outline">
        View
      </Button>
      <AppLink
        to="/account/edit/:id"
        params={{ id: props.accountId.toString() }}
      >
        <Button className="ml-4 space-y-1" variant="outline">
          Edit
        </Button>
      </AppLink>

      <AlertDialogAsync
        title={t("delete.confirmation.title", { item: props.accountName })}
        description={t("delete.confirmation.desc")}
        onAction={deleteAccount}
      >
        <Button className="ml-4 space-y-1" variant="outline">
          {t("delete")}
        </Button>
      </AlertDialogAsync>
    </div>
  );
}

export default CashAccountItem;
