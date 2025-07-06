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

  if (!paymentIntentId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Payment Intent ID is required",
    });
  }

  try {
    // Capture the payment (release funds to platform)
    const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);

    return {
      success: true,
      status: paymentIntent.status,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
    };
  } catch (error) {
    console.error("Failed to capture payment:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to capture payment",
    });
  }
});
