import '@shopify/ui-extensions/preact';
import {render} from "preact";

const ORDER_CONFIRMATION_BASE_URL = "https://prabha-kala-production.up.railway.app/order-confirmation";

// 1. Export the extension
export default async () => {
  render(<Extension />, document.body)
};

function Extension() {
  const orderConfirmation = shopify.orderConfirmation.value;
  const orderId = orderConfirmation?.order?.id?.split("/").pop();

  if (!orderId) {
    return null;
  }

  const confirmationUrl = `${ORDER_CONFIRMATION_BASE_URL}?order_id=${orderId}`;

  // 2. Render a link to our own order confirmation page
  return (
    <s-banner heading={shopify.i18n.translate("bannerHeading")}>
      <s-stack gap="base">
        <s-text>{shopify.i18n.translate("bannerBody")}</s-text>
        <s-link href={confirmationUrl} target="_blank">
          {shopify.i18n.translate("viewOrderConfirmation")}
        </s-link>
      </s-stack>
    </s-banner>
  );
}
