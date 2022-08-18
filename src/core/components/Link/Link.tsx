import React from "react";
import NextLink from "next/link";

import { Anchor,  type AnchorProps } from "@laodeaksarr/design-system";
import trackEvent from "~/lib/tracking";

type Props = {
  href: any;
  tracking?: any;
} & AnchorProps;

const Link = ({
  href,
  children,
  tracking,
  ...rest
}: React.PropsWithChildren<Props>) => {
  function handleOutboundLinkClicked() {
    trackEvent({
      event: "click",
      name: "Outbound Link",
      value: href,
      type: "url",
    });
    handleTracking();
  }

  function handleTracking() {
    if (tracking) {
      trackEvent(tracking);
    }
  }

  if (href.match(/^(http|https|mailto):/g)) {
    return (
      <Anchor
        href={href}
        target="_blank"
        rel="noopener noreferer"
        onClick={handleOutboundLinkClicked}
        {...rest}
      >
        {children}
      </Anchor>
    );
  }

  return (
    <NextLink href={href} passHref>
      <Anchor onClick={handleTracking} {...rest}>
        {children}
      </Anchor>
    </NextLink>
  );
};

export default Link;
