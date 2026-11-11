import { redirect } from "react-router";
import { LANDING_PAGES } from "~/content/store";

/** The letter (with or without an offer) lives on the Shopify store now. */
export const loader = () => redirect(LANDING_PAGES.letter, 302);

export default function Page() {
  return null;
}
