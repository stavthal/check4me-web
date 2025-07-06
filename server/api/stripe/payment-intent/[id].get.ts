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

  const paymentIntentId = getRouterParam(event, 'id');

  if (!paymentIntentId || typeof paymentIntentId !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Payment Intent ID is required",
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return {
      success: true,
      paymentIntent: {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        description: paymentIntent.description,
        metadata: paymentIntent.metadata,
        created: paymentIntent.created,
      },
    };
  } catch (error) {
    console.error("Failed to retrieve payment intent:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to retrieve payment information",
    });
  }
});
