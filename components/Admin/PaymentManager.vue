<script setup lang="ts">
interface PaymentData {
  id: string;
  amount: number;
  currency: string;
  status: string;
  description: string | null;
  metadata: Record<string, string>;
  created: number;
}

const pending = ref(false);
const error = ref<string | null>(null);
const paymentIntentId = ref("");
const paymentData = ref<PaymentData | null>(null);

const toast = useToast();

const fetchPaymentDetails = async () => {
  if (!paymentIntentId.value.trim()) {
    error.value = "Please enter a payment intent ID";
    return;
  }

  pending.value = true;
  error.value = null;

  try {
    const response = await $fetch(
      `/api/stripe/payment-intent/${paymentIntentId.value}`
    );
    paymentData.value = response.paymentIntent;
  } catch (err: unknown) {
    error.value =
      err instanceof Error ? err.message : "Failed to fetch payment details";
  } finally {
    pending.value = false;
  }
};

const capturePayment = async () => {
  if (!paymentData.value) return;

  pending.value = true;

  try {
    await $fetch("/api/stripe/capture-payment", {
      method: "POST",
      body: { paymentIntentId: paymentData.value.id },
    });

    toast.add({
      title: "Payment captured successfully!",
      description: "Funds have been released to the platform.",
      color: "success",
    });

    // Refresh payment data
    await fetchPaymentDetails();
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to capture payment";
    toast.add({
      title: "Capture failed",
      description: errorMessage,
      color: "error",
    });
  } finally {
    pending.value = false;
  }
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString();
};
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Payment Management</h1>

    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h2 class="text-lg font-semibold mb-4">Lookup Payment Details</h2>

      <div class="flex gap-4 mb-4">
        <UInput
          v-model="paymentIntentId"
          placeholder="Enter Payment Intent ID (pi_...)"
          class="flex-1"
        />
        <UButton
          :loading="pending"
          :disabled="pending"
          @click="fetchPaymentDetails"
        >
          Fetch Details
        </UButton>
      </div>

      <div v-if="error" class="text-red-600 text-sm">
        {{ error }}
      </div>
    </div>

    <div v-if="paymentData" class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-start mb-6">
        <h2 class="text-lg font-semibold">Payment Details</h2>
        <UBadge
          :color="
            paymentData.status === 'requires_capture'
              ? 'warning'
              : paymentData.status === 'succeeded'
              ? 'success'
              : 'neutral'
          "
          variant="soft"
        >
          {{ paymentData.status.replace("_", " ").toUpperCase() }}
        </UBadge>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 class="font-medium text-gray-900 mb-2">Basic Information</h3>
          <dl class="space-y-2">
            <div>
              <dt class="text-sm text-gray-500">Payment ID</dt>
              <dd class="text-sm font-mono">{{ paymentData.id }}</dd>
            </div>
            <div>
              <dt class="text-sm text-gray-500">Amount</dt>
              <dd class="text-lg font-semibold text-green-600">
                {{ formatCurrency(paymentData.amount, paymentData.currency) }}
              </dd>
            </div>
            <div>
              <dt class="text-sm text-gray-500">Created</dt>
              <dd class="text-sm">{{ formatDate(paymentData.created) }}</dd>
            </div>
            <div>
              <dt class="text-sm text-gray-500">Description</dt>
              <dd class="text-sm">
                {{ paymentData.description || "No description" }}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 class="font-medium text-gray-900 mb-2">Request Information</h3>
          <dl class="space-y-2">
            <div v-if="paymentData.metadata.requestTitle">
              <dt class="text-sm text-gray-500">Request Title</dt>
              <dd class="text-sm">{{ paymentData.metadata.requestTitle }}</dd>
            </div>
            <div v-if="paymentData.metadata.vehicleMake">
              <dt class="text-sm text-gray-500">Vehicle</dt>
              <dd class="text-sm">
                {{ paymentData.metadata.vehicleMake }}
                {{ paymentData.metadata.vehicleModel }}
                <span v-if="paymentData.metadata.year"
                  >({{ paymentData.metadata.year }})</span
                >
              </dd>
            </div>
            <div v-if="paymentData.metadata.clientId">
              <dt class="text-sm text-gray-500">Client ID</dt>
              <dd class="text-sm font-mono">
                {{ paymentData.metadata.clientId }}
              </dd>
            </div>
            <div v-if="paymentData.metadata.checkerId">
              <dt class="text-sm text-gray-500">Checker ID</dt>
              <dd class="text-sm font-mono">
                {{ paymentData.metadata.checkerId }}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div
        v-if="paymentData.status === 'requires_capture'"
        class="border-t pt-6"
      >
        <h3 class="font-medium text-gray-900 mb-3">Actions</h3>
        <div class="flex gap-3">
          <UButton
            color="success"
            :loading="pending"
            :disabled="pending"
            @click="capturePayment"
          >
            Capture Payment
          </UButton>
          <p class="text-sm text-gray-600 flex items-center">
            This will release the funds to the platform after service
            completion.
          </p>
        </div>
      </div>

      <div v-else-if="paymentData.status === 'succeeded'" class="border-t pt-6">
        <div class="flex items-center gap-2 text-green-600">
          <UIcon name="i-lucide-check-circle" />
          <span class="font-medium"
            >Payment has been successfully captured</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
