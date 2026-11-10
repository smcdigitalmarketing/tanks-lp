import type { Route } from "./+types/seven-reasons";
import { conceptMeta, loadConceptOffer, mustConcept } from "~/lib/concept-route";
import { offerFromSegment } from "~/content/offers";
import { SevenReasons } from "~/components/listicle/seven-reasons";

export const loader = ({ params }: Route.LoaderArgs) =>
  loadConceptOffer(params.concept, params.offer);

export const meta: Route.MetaFunction = ({ params }) =>
  conceptMeta(params.concept, offerFromSegment(params.offer) ?? "standard", "reasons");

export default function Page({ loaderData }: Route.ComponentProps) {
  return <SevenReasons concept={mustConcept(loaderData.slug)} offerId={loaderData.offerId} />;
}
