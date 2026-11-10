import type { Route } from "./+types/advertorial";
import { brand } from "~/content/store";
import { loadOffer, offerPageMeta } from "~/lib/store-route";
import { AdvertorialPage } from "~/components/advertorial/advertorial";

/** /pages/a-note-from-hallie (the advertorial), plus an offer segment. */
export const loader = ({ params }: Route.LoaderArgs) => loadOffer(params.offer);

export const meta: Route.MetaFunction = ({ data }) =>
  offerPageMeta("story", data?.offerId);

export default function Page({ loaderData }: Route.ComponentProps) {
  return <AdvertorialPage concept={brand} offerId={loaderData.offerId} />;
}
