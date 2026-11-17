import { BRAND } from "./brand";
import { DeloitteWordmark } from "./DeloitteWordmark";

import "./DeloitteLogo.scss";

export const DeloitteLogo = ({ className }: { className?: string }) => (
  <DeloitteWordmark className={className} />
);

export const BrandLockup = () => (
  <div className="brand-lockup" aria-label={BRAND.name}>
    <DeloitteLogo className="brand-lockup__logo" />
    <span className="brand-lockup__product excalifont">
      {BRAND.productName}
    </span>
  </div>
);