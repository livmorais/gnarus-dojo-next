import { redirect } from "next/navigation";
import { dsNavigationItems } from "../../lib/ds-navigation";

export default function DesignSystemIndexPage() {
  redirect(dsNavigationItems[0].href);
}
