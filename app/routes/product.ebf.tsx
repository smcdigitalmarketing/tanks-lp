import type { Route } from "./+types/product.ebf";
import { conceptMeta, loadConcept, mustConcept } from "~/lib/concept-route";
import { PdpTemplate } from "~/components/pdp-template";

const OFFER = "early-black-friday";

export const loader = ({ params }: Route.LoaderArgs) => loadConcept(params.concept);

export const meta: Route.MetaFunction = ({ params }) => conceptMeta(params.concept, OFFER, "product");

export default function Page({ loaderData }: Route.ComponentProps) {
  return <PdpTemplate concept={mustConcept(loaderData.slug)} offerId={OFFER} />;
}
