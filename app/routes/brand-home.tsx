import type { Route } from "./+types/brand-home";
import { conceptMeta, loadConceptOffer, mustConcept } from "~/lib/concept-route";
import { offerFromSegment } from "~/content/offers";
import { BrandHome } from "~/components/home/brand-home";

export const loader = ({ params }: Route.LoaderArgs) =>
  loadConceptOffer(params.concept, params.offer);

export const meta: Route.MetaFunction = ({ params }) =>
  conceptMeta(params.concept, offerFromSegment(params.offer) ?? "standard", "home");

export default function Page({ loaderData }: Route.ComponentProps) {
  return <BrandHome concept={mustConcept(loaderData.slug)} offerId={loaderData.offerId} />;
}
