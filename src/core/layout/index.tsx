import React from "react";
import { styled } from "@laodeaksarr/design-system";

import Footer from "../components/Footer";
import Header, { type HeaderProps } from "../components/Header";

export interface LayoutProps {
  footer?: boolean;
  header?: boolean;
  headerProps?: HeaderProps;
}

const Layout = (props: React.PropsWithChildren<LayoutProps>) => {
  const { children, header, footer, headerProps } = props;

  return (
    <Wrapper>
      {header && <Header {...headerProps} />}
      {children}
      {footer && <Footer />}
    </Wrapper>
  );
};

export default Layout;

export const Wrapper = styled("main", {
  background: "var(--laodeaksar-colors-body)",
  transition: "0.5s",
  overflow: "hidden",

  "&:focus:not(:focus-visible)": {
    outline: 0,
  },

  "&:focus-visible": {
    outline: "2px solid var(--laodeaksar-colors-brand)",
    backgroundColor: "var(--laodeaksar-colors-foreground)",
  },
});
