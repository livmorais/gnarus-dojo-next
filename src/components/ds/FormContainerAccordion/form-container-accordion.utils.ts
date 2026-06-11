import {
  FORM_CONTAINER_ACCORDION_CLOSED_VALUE,
  FORM_CONTAINER_ACCORDION_ITEM_VALUE,
} from "./form-container-accordion.constants";

export function resolveAccordionValue(open?: boolean) {
  return open
    ? FORM_CONTAINER_ACCORDION_ITEM_VALUE
    : FORM_CONTAINER_ACCORDION_CLOSED_VALUE;
}
