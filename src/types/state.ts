export type LoadingState = {
  status: "loading";
};

export type SuccessState = {
  status: "success";
};

export type ErrorState = {
  status: "error";
  errorTitle: string;
  errorDescription: string;
};
