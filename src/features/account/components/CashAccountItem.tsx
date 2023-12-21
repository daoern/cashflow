import { formatCurrencyNum } from "@/utils/format";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface CashAccountItemProps {
  accountName: string;
  accountCurrency: string;
  balance: number;
  currentMonthChange: number;
}

function CashAccountItem(props: CashAccountItemProps) {
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
    </div>
  );
}

export default CashAccountItem;
