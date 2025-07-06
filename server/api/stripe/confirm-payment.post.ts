import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (!config.stripeSecretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Stripe secret key not configured",
    });
  }

  const stripe = new Stripe(config.stripeSecretKey, {
    apiVersion: "2025-06-30.basil",
  });

  const body = await readBody(event);
  const { paymentIntentId } = body;

  try {
    // Confirm the payment intent
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

    return {
      success: true,
      status: paymentIntent.status,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error("Stripe confirmation error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to confirm payment",
    });
  }
});
