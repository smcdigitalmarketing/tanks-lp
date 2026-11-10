import type { Route } from "./+types/product";
import { brand } from "~/content/store";
import { loadOffer, offerPageMeta } from "~/lib/store-route";
import { PdpTemplate } from "~/components/pdp-template";

/** /products/everyday-tank, plus /early-black-friday and /christmas. */
export const loader = ({ params }: Route.LoaderArgs) => loadOffer(params.offer);

export const meta: Route.MetaFunction = ({ data }) =>
  offerPageMeta("product", data?.offerId);

export default function Page({ loaderData }: Route.ComponentProps) {
  return <PdpTemplate concept={brand} offerId={loaderData.offerId} />;
}
