# Checkout launch plan

Prepared October 21, 2026. This branch prepares checkout; it does not activate payments, publish products, or approve a release. `main` is production. Keep this work on a review branch until approved.

## Recommended implementation

Keep the existing static storefront and use Shopify Basic + Shopify Payments + the Printful Shopify app. The Shopify adapter sends exact variant IDs and quantities to Shopify's hosted checkout using a cart permalink. Shopify holds authoritative prices, availability, shipping, tax settings, orders and refunds. Printful produces and ships only correctly synced products.

No private API keys belong in this repository. This approach needs no payment backend on the static site. The storefront's displayed prices are still manually maintained; the adapter does not fetch current stock or pricing. Keep catalog changes synchronized with Shopify and test the checkout amount. Longer term, a Shopify Storefront API cart integration can fetch current product availability and prices.

| Area | Existing Stripe adapter | Shopify adapter |
|---|---|---|
| Cart | Originally separate payments per line; no quantity transmission. Hardened version permits one total item only. | One cart, multiple exact variants and quantities. |
| Variant | Legacy product `buyUrl` + `client_reference_id` did not enforce size/color. | Exact `SIZE / COLOR` to Shopify variant ID; default/size-only fallback removed. |
| Payment | Hosted Payment Links. A dedicated link must contain the exact variant, price and fixed quantity. | Shopify Payments hosted checkout; business verification and payout account required. |
| Inventory | No native inventory sync in this implementation. | Managed in Shopify/Printful, not in this site's browser storage. Verify supplier availability settings. |
| Shipping | Configure collection of shipping address, delivery countries and rates on each link. No Printful quote logic exists. | Printful profiles or tested custom rates. Basic does not include Printful live carrier rates. |
| Fulfillment | No Printful connection exists in this code. Manual processing or a server/webhook integration is needed. | Official Printful integration after products and variants are synced. |
| Cost | Processing fees plus any automation/backend services; verify merchant-region pricing. | Basic currently $39/month, or $29/month billed yearly; advertised card rates from 2.9% + $0.30 USD. Confirm actual merchant terms. |

For a future full Stripe cart: build a server endpoint to resolve approved SKU IDs to provider Price IDs, validate availability/quantities, create a Checkout Session, and accept signed webhooks. Store paid orders durably; make fulfillment idempotent (retries cannot create duplicate orders); check payment status, handle asynchronous payment failures, and reconcile refunds/Printful failures. Do not treat a success redirect or `client_reference_id` as proof of payment or as a trusted fulfillment instruction.

## Product release scope

There are 20 designs. Nine NorCal Lights concepts (six apparel, three swim) remain `comingSoon: true`. Eleven other designs accept preview-cart selections but have no release approval. No exact Shopify variant or Stripe link is configured.

Prioritize the black Heritage Script Tee and UTC Crest Hoodie only after reviewing physical samples, artwork placement, print quality, measurements, care information and exact supplier variant records. A purchased sample proves that one configured garment was produced; it does not validate every size/color or approve a retail listing. Other tees, crewneck, snapback, stickers and patch require separate supplier verification. Do not assume custom swim piping, hardware, jacquard or crests can be made using standard print-on-demand swim blanks.

Retain model images as design visualizations. They cannot establish actual fabric, fit, embroidery or production readiness. Swim model image generation was blocked by the image service in this session; the existing three product-only concept boards remain unchanged. The requested model imagery is outstanding.

## Merchant and product setup

1. Owner selects Shopify and approves any subscription separately. Create or connect the owned merchant account, business/legal identity, payout bank, verified public support email, billing and two-step authentication. Do not collect credentials or banking details in this repository.
2. Verify applicable tax registrations, including California seller's-permit obligations, then configure Shopify tax collection. Tax calculation does not replace registration, filing or remittance obligations.
3. Connect the Printful app to the intended Shopify store; the Printful Stores screen inspected in this session showed no connected store. Confirm the correct billing method and ability to cover production/shipping before Shopify payouts arrive.
4. Prepare only approved launch items as unpublished drafts. Match supplier garment, print files, print areas, sizes, colors and retail prices. Sample fulfillment used DTG (ink printed directly onto fabric), not proof of embroidery. Replace inaccurate images/details before publishing. Keep unsupported options and all concepts out of every sales channel.
5. Sync each sellable variant to Printful and record each exact Shopify numeric variant ID as a string. Obtain current normal fulfillment quotes per size and print placement; sample invoice costs are not a complete retail cost sheet.
6. Start with a defined shipping market (proposed: contiguous United States) and customer-paid shipping. Test one tee, two tees, one hoodie and mixed carts. Printful's standard Shopify profiles may charge only first-item shipping for multiple items in one profile. Choose tested custom weight tiers or consciously budget the difference. Do not label flat rates as live carrier quotes.
7. Publish approved shipping, returns/exchanges, privacy and terms pages, with a monitored support email. Verify they appear in hosted checkout and through this storefront's policy links.

## Pricing and policy decisions

No retail prices were approved by this change. The source catalog preserves its earlier preview prices. Before changing them, calculate:

`contribution = retail price + customer shipping collected - production - supplier shipping - surcharges - payment fees - nonrecoverable taxes - packaging - expected refunds/replacements`

Contribution is the money left before advertising, fixed subscriptions, overhead and income tax. Use current full-price supplier costs, not assumed sample discounts. Check larger-size premiums and the fee on shipping/tax collected, too. The owner report contains private sample-cost evidence; do not commit invoices, personal addresses or billing information here.

Policy decisions still needed:

- Shipping destinations, checkout rates, production/transit estimates, tracking, separate packages, lost packages and incorrect-address handling.
- Whether the merchant funds size exchanges or change-of-mind returns; Printful does not cover these. Define deadlines, condition requirements, return instructions and refund timing. Preserve applicable consumer rights.
- Defect/misprint handling: collect photos and order details promptly enough to meet Printful's current 30-day claim deadline. Do not promise a refund before investigating.
- Cancellation cutoff tied to production status; a Shopify cancellation/refund does not by itself prove that Printful production stopped.
- Privacy: actual payment and fulfillment providers, customer data shared for delivery, contact for requests, and any analytics/marketing tools actually used.
- Terms: legal seller identity, support contact, USD prices, tax/shipping presentation and order acceptance terms.

## Exact code configuration after approval

- `BRAND.email`: owned, monitored support inbox.
- `CHECKOUT.mode`: keep `demo` now; later `shopify` after testing and launch approval.
- `CHECKOUT.shopifyDomain`: bare canonical `NAME.myshopify.com`, with no scheme, path or custom domain.
- `CHECKOUT.liveHosts`: approved production hostnames only. Preview domains are deliberately denied.
- `CHECKOUT.policies`: real HTTPS URLs for `shipping`, `returns`, `privacy`, `terms`.
- `CHECKOUT.readiness`: `merchant`, `shipping`, `taxes`, `policies`, `fulfillment`, `testOrder` become true only after documented provider-side verification.
- Each approved product's `release`: `approved`, `fulfillmentVerified`, `priceVerified` must all be true. All default to false.
- `variantIds`: exact keys such as `"M / Black"`; values are numeric Shopify IDs stored as strings. Every offered, purchasable combination needs its own ID; no `default` fallback.
- `CHECKOUT.liveApproved`: last owner-approved release step, currently false.

The alternate Stripe adapter now requires `stripeLinks["SIZE / COLOR"]` pointing to a dedicated `https://buy.stripe.com/...` link. Legacy `buyUrl` is ignored. It supports one total unit, not a whole cart, and all global/product release gates still apply. The provider must disable quantity adjustments and contain the correct variant. Do not configure these links in production for the proposed Shopify launch.

Public JS flags are release checks, not access controls. Customers can edit their browser state or visit provider URLs directly. Unapproved products must be unpublished/unavailable at Shopify/Stripe, even when hidden or disabled here. Never put live links for concepts into a public branch.

## End-to-end acceptance before launch

- Run `npm run test:syntax`, `npm run test:checkout`, `npm test`, and `npm run audit:checkout`.
- Use provider test mode in an isolated test environment. No real charge or production submission is authorized by this branch. Keep automatic Printful submission off during testing, and verify current provider behavior for test orders.
- Verify successful and failed payments, cancel/back/retry, wrong/unsupported address, sold-out variants, quantities and mixed carts, price consistency, shipping/tax totals, notifications, and no partial-cart handoff.
- Verify a mapped order reaches the correct Printful draft/manual-review state with exact size/color/artwork/address. If test orders do not import, use an explicitly approved controlled test path; do not claim a simulated payment proves production fulfillment.
- Verify retries do not create duplicates; refunds and cancellations are reconciled in both systems. Check tracking/status updates.
- Reconcile the received sample to the actual listing, including any visual features the supplier does not produce.
- Obtain approval for the specific final prices, policies, products and live launch. Review/merge separately. A later paid test order requires its own approved amount; do not buy silently.

## Sources (checked October 21, 2026)

- [Shopify cart permalinks](https://help.shopify.com/en/manual/checkout-settings/cart-permalink)
- [Shopify pricing](https://www.shopify.com/pricing)
- [Shopify Payments testing](https://help.shopify.com/en/manual/payments/shopify-payments/testing-shopify-payments)
- [Connect Printful to Shopify](https://help.printful.com/hc/en-us/articles/50262260641297-How-do-I-connect-my-Shopify-store-to-Printful)
- [Printful Shopify shipping limitations](https://help.printful.com/hc/en-us/articles/50262284973841-How-do-I-set-up-shipping-for-my-Shopify-store)
- [Printful billing](https://help.printful.com/hc/en-us/articles/50262313219985-How-does-Printful-charge-for-Shopify-orders)
- [Printful returns](https://help.printful.com/hc/en-us/articles/50263870468753-What-is-Printful-s-return-and-refund-policy)
- [Stripe post-payment fulfillment](https://docs.stripe.com/payment-links/post-payment)
- [California internet sales](https://cdtfa.ca.gov/formspubs/pub109/)

## Validation for this preparation branch

- Eight Node checkout tests passed, including the committed catalog's disabled state, wrong host/provider, missing approvals, malformed/duplicate mappings, stale/unapproved/concept lines, invalid quantities and restricted Stripe URLs.
- Thirty Playwright desktop/mobile cases covered: 28 passed on the full run; the two preview-cart checks passed on a targeted rerun after fixing their network detector to distinguish the local `checkout.js` asset from a payment navigation. All six newly added provider-handoff cases passed with fully mocked checkout destinations.
- JavaScript syntax checks, local readiness audit and `git diff --check` passed.
- The standard Playwright browser download failed in this environment. Tests ran using Chromium 143 from the official npm package `@sparticuz/chromium` outside the repository; no production dependency was added.
- Real Shopify/Stripe payment, Printful order synchronization, live inventory, physical sample quality, Safari and production deployment were not verified. No provider account settings were changed.
