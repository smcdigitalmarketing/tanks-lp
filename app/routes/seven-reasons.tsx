import { redirect } from "react-router";
import { LANDING_PAGES } from "~/content/store";

/** /pages/7-reasons (with or without an offer) lives on the Shopify store now. */
export const loader = () => redirect(LANDING_PAGES.reasons, 302);

export default function Page() {
  return null;
}
