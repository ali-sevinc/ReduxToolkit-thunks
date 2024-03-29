import { Fragment, ReactNode } from "react";
import MainHeader from "./MainHeader";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;
