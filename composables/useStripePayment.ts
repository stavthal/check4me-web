import {
  loadStripe,
  type Stripe,
  type StripeCardElement,
} from "@stripe/stripe-js";
import type { RequestRequest } from "~/types/request";

export const useStripePayment = () => {
  const config = useRuntimeConfig();
  const pending = ref(false);
  const error = ref<string | null>(null);

  let stripeInstance: Stripe | null = null;

  const initializeStripe = async () => {
    if (!stripeInstance) {
      stripeInstance = await loadStripe(config.public.stripePublishableKey);
    }
    return stripeInstance;
  };

  const createPaymentIntent = async (requestData: RequestRequest) => {
    pending.value = true;
    error.value = null;

    try {
      const response = await $fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        body: { requestData },
      });

      return response;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create payment intent";
      error.value = errorMessage;
      throw err;
    } finally {
      pending.value = false;
    }
  };

  const confirmPayment = async (
    clientSecret: string,
    paymentMethod: string
  ) => {
    const stripe = await initializeStripe();
    if (!stripe) {
      throw new Error("Stripe not initialized");
    }

    pending.value = true;
    error.value = null;

    try {
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod,
        });

      if (stripeError) {
        error.value = stripeError.message || "Payment failed";
        throw stripeError;
      }

      return paymentIntent;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Payment confirmation failed";
      error.value = errorMessage;
      throw err;
    } finally {
      pending.value = false;
    }
  };

  const createPaymentMethod = async (card: StripeCardElement) => {
    const stripe = await initializeStripe();
    if (!stripe) {
      throw new Error("Stripe not initialized");
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (error) {
      throw error;
    }

    return paymentMethod;
  };

  return {
    pending: readonly(pending),
    error: readonly(error),
    initializeStripe,
    createPaymentIntent,
    confirmPayment,
    createPaymentMethod,
  };
};
