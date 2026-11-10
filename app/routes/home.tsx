import type { Route } from "./+types/home";
import { brand } from "~/content/store";
import { legacyRedirect, loadOffer, offerPageMeta } from "~/lib/store-route";
import { BrandHome } from "~/components/home/brand-home";

/** The homepage: / and /early-black-friday, /christmas. */
export function loader({ params, request }: Route.LoaderArgs) {
  const old = legacyRedirect(new URL(request.url).pathname);
  if (old) throw old;
  return loadOffer(params.offer);
}

export const meta: Route.MetaFunction = ({ data }) =>
  offerPageMeta("home", data?.offerId);

export default function Page({ loaderData }: Route.ComponentProps) {
  return <BrandHome concept={brand} offerId={loaderData.offerId} />;
}
