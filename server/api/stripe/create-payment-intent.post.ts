import Stripe from "stripe";
import { PRICING } from "~/config/pricing";

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
  const { requestData } = body;

  try {
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: PRICING.INSPECTION_FEE * 100, // Amount in cents
      currency: PRICING.CURRENCY,
      metadata: {
        requestTitle: requestData.title,
        vehicleMake: requestData.vehicleMake,
        vehicleModel: requestData.vehicleModel,
        year: requestData.year?.toString() || "",
        clientId: requestData.clientId || "",
        checkerId: requestData.checkerId || "",
      },
      description: `${PRICING.DESCRIPTION} - ${requestData.title}`,
      // Payment will be captured manually after service completion
      capture_method: "manual",
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: PRICING.INSPECTION_FEE,
    };
  } catch (error) {
    console.error("Stripe error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create payment intent",
    });
  }
});
