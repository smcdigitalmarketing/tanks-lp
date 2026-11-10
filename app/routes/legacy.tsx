import { data } from "react-router";
import type { Route } from "./+types/legacy";
import { legacyRedirect } from "~/lib/store-route";

/** Old six-concept URLs (/soft/advertorial ...) redirect; anything else is a 404. */
export function loader({ request }: Route.LoaderArgs) {
  const old = legacyRedirect(new URL(request.url).pathname);
  if (old) throw old;
  throw data("Not found", { status: 404 });
}

export default function Legacy() {
  return null;
}
