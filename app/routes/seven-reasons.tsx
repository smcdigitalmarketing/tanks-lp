import type { Route } from "./+types/seven-reasons";
import { brand } from "~/content/store";
import { loadOffer, offerPageMeta } from "~/lib/store-route";
import { SevenReasons } from "~/components/listicle/seven-reasons";

/** /pages/7-reasons, plus an offer segment. */
export const loader = ({ params }: Route.LoaderArgs) => loadOffer(params.offer);

export const meta: Route.MetaFunction = ({ data }) =>
  offerPageMeta("reasons", data?.offerId);

export default function Page({ loaderData }: Route.ComponentProps) {
  return <SevenReasons concept={brand} offerId={loaderData.offerId} />;
}
