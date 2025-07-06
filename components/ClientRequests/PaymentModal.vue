<script setup lang="ts">
import type { StripeCardElement, StripeElements } from "@stripe/stripe-js";
import { PRICING } from "~/config/pricing";
import type { RequestRequest } from "~/types/request";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (paymentIntentId: string) => void;
  requestData: RequestRequest;
}

const props = defineProps<Props>();

const {
  initializeStripe,
  createPaymentIntent,
  confirmPayment,
  createPaymentMethod,
  pending,
  error,
} = useStripePayment();

const cardElement = ref<StripeCardElement | null>(null);
const stripeElements = ref<StripeElements | null>(null);
const paymentError = ref<string | null>(null);
const clientSecret = ref<string | null>(null);
const paymentIntentId = ref<string | null>(null);

const toast = useToast();

onMounted(async () => {
  if (props.isOpen) {
    await initializeStripeElements();
  }
});

watch(
  () => props.isOpen,
  async (newValue) => {
    if (newValue) {
      await initializeStripeElements();
    }
  }
);

const initializeStripeElements = async () => {
  try {
    const stripe = await initializeStripe();
    if (!stripe) return;

    stripeElements.value = stripe.elements();
    cardElement.value = stripeElements.value.create("card", {
      style: {
        base: {
          fontSize: "16px",
          color: "#424770",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
      },
    });

    // Wait for next tick to ensure DOM is ready
    await nextTick();
    const cardContainer = document.getElementById("card-element");
    if (cardContainer && cardElement.value) {
      cardElement.value.mount("#card-element");
    }
  } catch (err) {
    console.error("Failed to initialize Stripe:", err);
    paymentError.value = "Failed to initialize payment form";
  }
};

const handlePayment = async () => {
  if (!cardElement.value) {
    paymentError.value = "Payment form not ready";
    return;
  }

  paymentError.value = null;

  try {
    // Create payment intent
    const intentData = await createPaymentIntent(props.requestData);
    clientSecret.value = intentData.clientSecret;
    paymentIntentId.value = intentData.paymentIntentId;

    if (!clientSecret.value) {
      paymentError.value = "Failed to create payment intent";
      return;
    }

    // Create payment method
    const paymentMethod = await createPaymentMethod(cardElement.value);

    // Confirm payment
    const result = await confirmPayment(clientSecret.value, paymentMethod.id);

    if (result && result.status === "requires_capture") {
      // Payment succeeded and is held for manual capture
      toast.add({
        title: "Payment successful!",
        description:
          "Your payment has been secured. We will process your request now.",
        color: "success",
      });
      props.onPaymentSuccess(paymentIntentId.value!);
    } else {
      paymentError.value = "Payment failed. Please try again.";
    }
  } catch (err) {
    console.error("Payment error:", err);
    paymentError.value = error.value || "Payment failed. Please try again.";
  }
};

const closeModal = () => {
  paymentError.value = null;
  clientSecret.value = null;
  paymentIntentId.value = null;
  if (cardElement.value) {
    cardElement.value.unmount();
    cardElement.value = null;
  }
  props.onClose();
};
</script>

<template>
  <UModal
    :open="isOpen"
    title="Payment for Vehicle Inspection"
    :close="{ onClick: closeModal }"
  >
    <template #body>
      <div class="p-6">
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Service Details</h3>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600 mb-1">Vehicle Inspection Service</p>
            <p class="text-2xl font-bold text-green-600">
              €{{ PRICING.INSPECTION_FEE }}
            </p>
            <p class="text-sm text-gray-500 mt-1">
              One-time payment for professional vehicle inspection
            </p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4">Payment Information</h3>
          <div
            id="card-element"
            class="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
          />

          <div v-if="paymentError" class="mt-2 text-sm text-red-600">
            {{ paymentError }}
          </div>
        </div>

        <div class="text-sm text-gray-600 mb-6">
          <p class="mb-2">🔒 Your payment is secure and encrypted</p>
          <p class="mb-2">💰 Funds will be held until service completion</p>
          <p>✅ Payment will be processed only after successful inspection</p>
        </div>

        <div class="flex gap-4">
          <UButton
            :loading="pending"
            :disabled="pending"
            color="primary"
            class="flex-1"
            @click="handlePayment"
          >
            Pay €{{ PRICING.INSPECTION_FEE }}
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            class="flex-1"
            @click="closeModal"
          >
            Cancel
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<style scoped>
/* Additional styling for Stripe elements can be added here */
</style>
