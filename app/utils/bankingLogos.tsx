
import { accountProviders } from "./providers"
import React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    provider: string;
};
export const BankLogo = React.forwardRef<HTMLOrSVGElement, ImageProps>(
    ({ provider, ...props }, ref) => {
        return (
            <img src={accountProviders[provider]} alt={provider} {...props} />
        )
    }
)