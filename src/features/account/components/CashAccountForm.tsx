import CommandSelect from "@/components/form/CommandSelect";
import LoadingSpinner from "@/components/spinner/LoadingSpinner";
import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/lib/shadcnUi";
import { getCurrencyList } from "@/utils/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { CashAccount } from "../types/cashAccount";
import { getAuthInfo } from "@/features/auth/hooks/authInfo";

const formSchema = z.object({
  accountName: z.string({
    required_error: "Account name is required",
  }),
  currency: z.string({
    required_error: "Currency is required",
  }),
});

type Inputs = z.infer<typeof formSchema>;

interface CashAccountFormProps {
  defaultValues?: Inputs;
  onSubmit: (value: CashAccount) => void;
}

function CashAccountForm(props: CashAccountFormProps) {
  const { t } = useTranslation();

  const [isSubmitLoading, setSubmitLoading] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: props.defaultValues,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const authInfo = getAuthInfo();
    const value = {
      accountId: 0,
      userId: authInfo.getId() ?? "",
      accountName: data.accountName,
      currency: data.currency,
    };
    try {
      setSubmitLoading(true);
      await Promise.resolve(props.onSubmit(value));
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{t("add.account")}</DialogTitle>
          <DialogDescription>{t("add.account.description")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">
                    {t("account.name")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      {...field}
                      readOnly={isSubmitLoading}
                    />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">{t("currency")}</FormLabel>
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
                        onSelect={(value) => form.setValue("currency", value)}
                        placeholder={t("select.currency")}
                        searchInputPlaceholder={t("search.currency")}
                        emptySearchDisplay={t("search.currency.empty")}
                        readonly={isSubmitLoading}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="col-span-3 col-start-2" />
                </div>
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isSubmitLoading}>
            {isSubmitLoading && <LoadingSpinner className="mr-2 h-4 w-4" />}
            {t("save")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default CashAccountForm;
