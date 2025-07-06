export type User = {
  id: string;
  full_name: string;
  email: string | undefined;
  area: {
    id: string;
    name?: string;
  };
  role: "admin" | "checker" | "client";
};
