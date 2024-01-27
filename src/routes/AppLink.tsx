import React, { ReactElement } from "react";
import { Link, LinkProps, NavLink } from "react-router-dom";
import { AppRoutes, ExtractParams } from ".";

// export type AppLinkProps<T extends AppRoutes> = Omit<
//   LinkProps & {
//     to: T;
//     params: ExtractParams<T>;
//   },
//   T extends `${infer A}:${infer B}` ? 0 : "params"
// >;
export type AppLinkProps<T extends AppRoutes> = LinkProps & {
  to: T;
  params?: ExtractParams<T>;
};

const AppLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  AppLinkProps<AppRoutes>
>(({ params, to, ...props }, ref) => {
  let parsedTo: string = to;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      parsedTo = parsedTo.replace(`:${key}`, value);
    }
  }
  return (
    <Link ref={ref} to={parsedTo} {...props}>
      {props.children}
    </Link>
  );
});
AppLink.displayName = "AppLink";

export type NavAppLinkProps<T extends AppRoutes> = LinkProps & {
  to: T;
  params?: ExtractParams<T>;
};

const NavAppLink = React.forwardRef<
  React.ElementRef<typeof NavLink>,
  AppLinkProps<AppRoutes>
>(({ params, to, ...props }, ref) => {
  let parsedTo: string = to;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      parsedTo = parsedTo.replace(`:${key}`, value);
    }
  }
  return (
    <NavLink ref={ref} to={parsedTo} {...props}>
      {props.children}
    </NavLink>
  );
});
NavAppLink.displayName = "NavAppLink";

export { AppLink, NavAppLink };
