import type { Route } from "./+types/advertorial.ebf";
import { conceptMeta, loadConcept, mustConcept } from "~/lib/concept-route";
import { AdvertorialPage } from "~/components/advertorial/advertorial";

const OFFER = "early-black-friday";

export const loader = ({ params }: Route.LoaderArgs) => loadConcept(params.concept);

export const meta: Route.MetaFunction = ({ params }) => conceptMeta(params.concept, OFFER, "advertorial");

export default function Page({ loaderData }: Route.ComponentProps) {
  return <AdvertorialPage concept={mustConcept(loaderData.slug)} offerId={OFFER} />;
}
