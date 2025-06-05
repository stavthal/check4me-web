<script setup lang="ts">
import { useUserStore } from "#imports";
import { useHydrateUserStore } from "~/composables/useHydrateUserStore";
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";

definePageMeta({ middleware: "auth" });

const { user } = useUserStore();
const { loading } = useHydrateUserStore();

const UBadge = resolveComponent("UBadge");

type Payment = {
  id: string;
  date: string;
  status: "paid" | "failed" | "refunded";
  email: string;
  amount: number;
};

const data = ref<Payment[]>([
  {
    id: "4600",
    date: "2024-03-11T15:30:00",
    status: "paid",
    email: "james.anderson@example.com",
    amount: 594,
  },
  {
    id: "4599",
    date: "2024-03-11T10:10:00",
    status: "failed",
    email: "mia.white@example.com",
    amount: 276,
  },
  {
    id: "4598",
    date: "2024-03-11T08:50:00",
    status: "refunded",
    email: "william.brown@example.com",
    amount: 315,
  },
  {
    id: "4597",
    date: "2024-03-10T19:45:00",
    status: "paid",
    email: "emma.davis@example.com",
    amount: 529,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
]);

const columns: TableColumn<Payment>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const color = {
        paid: "success" as const,
        failed: "error" as const,
        refunded: "neutral" as const,
      }[row.getValue("status") as string];

      return h(UBadge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("status")
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: () => h("div", { class: "text-right" }, "Amount"),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
];
</script>

<template>
  <div>
    <h1>Client Page</h1>
    <p>This page is for checking the status of the application.</p>

    <div v-if="loading">Loading user...</div>
    <template v-else>
      <p>User: {{ user?.full_name || "Guest" }}</p>
      <p>Role: {{ user?.role || "No role assigned" }}</p>

      <NuxtLink to="/">Go to Home</NuxtLink>

      <ClientRequestsTable :columns="columns" :data="data" class="mt-4" />
    </template>
  </div>
</template>
