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
} from "@/lib/shadcnUi";
import { useState } from "react";
import { LoadingButton } from "../button/LoadingButton";
import { useTranslation } from "react-i18next";

interface AlertDialogAsyncProps extends React.PropsWithChildren {
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actionText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onAction?: () => void;
  onCancel?: () => void;
}

function AlertDialogAsync(props: AlertDialogAsyncProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {props.title && <AlertDialogTitle>{props.title}</AlertDialogTitle>}
          {props.description && (
            <AlertDialogDescription>{props.description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={props.onCancel}>
            {props.cancelText ?? t("cancel")}
          </AlertDialogCancel>
          <LoadingButton
            isLoading={isLoading}
            onClick={async () => {
              setLoading(true);
              try {
                await Promise.resolve(props.onAction?.());
                setOpen(false);
              } catch (e) {
                console.log("hi esssrror");
              } finally {
                setLoading(false);
              }
              // await Promise.resolve(props.onAction?.())
              //   .then(() => {
              //     setOpen(false);
              //   })
              //   .catch(() => {
              //     console.log("hi error");
              //   })
              //   .finally(() => {
              //     setLoading(false);
              //   });
            }}
          >
            {props.actionText ?? t("delete")}
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogAsync;
