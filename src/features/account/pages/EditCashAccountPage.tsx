import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from "@/lib/shadcnUi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addCashAccount } from "../slice/accountSlice";
import { AppDispatch } from "@/stores/appStore";
import { useAuthInfo } from "@/features/auth/hooks/authInfo";
import { getCurrencyList } from "@/utils/currency";
import CommandSelect from "@/components/CommandSelect";

type Inputs = {
  accountName: string;
  currency: string;
};

function EditCashAccountPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const authInfo = useAuthInfo();

  const form = useForm<Inputs>({
    defaultValues: { accountName: "", currency: "" },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      addCashAccount({
        accountId: 0,
        userId: authInfo.getId() ?? "",
        accountName: data.accountName,
        currency: data.currency,
      }),
    );
  };

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>{t("add.account")}</DialogTitle>
              <DialogDescription>
                {t("add.account.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">
                        {t("account.name")}
                      </FormLabel>
                      <FormControl>
                        <Input className="col-span-3" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right">
                        {t("currency")}
                      </FormLabel>
                      <div className="col-span-2">
                        <FormControl>
                          <CommandSelect
                            value={field.value}
                            items={getCurrencyList().map((currency) => {
                              return {
                                label: `${currency.name} (${currency.code})`,
                                value: currency.code,
                              };
                            })}
                            onSelect={(value) =>
                              form.setValue("currency", value)
                            }
                            placeholder={t("select.currency")}
                            searchInputPlaceholder={t("search.currency")}
                            emptySearchDisplay={t("search.currency.empty")}
                          />
                        </FormControl>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">{t("save")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCashAccountPage;
