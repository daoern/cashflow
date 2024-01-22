import { Button } from "@/lib/shadcnUi";
import React from "react";
import LoadingSpinner from "../spinner/LoadingSpinner";

export interface LoadingButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  isLoading: boolean;
}

const LoadingButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  LoadingButtonProps
>(({ isLoading, ...props }, ref) => (
  <Button ref={ref} {...props} disabled={isLoading}>
    {isLoading && <LoadingSpinner className="mr-2 h-4 w-4" />}
    {props.children}
  </Button>
));
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
