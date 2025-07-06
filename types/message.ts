export type RequestMessage = {
  id: number;
  request_id: string; // UUID to match requests table
  sender_id: string;
  sender_type: "client" | "checker";
  message: string;
  created_at: string;
  updated_at: string;
  is_read: boolean;
  sender?: {
    full_name: string;
    email: string;
  } | null;
};

export type MessageInsert = {
  request_id: string; // UUID to match requests table
  sender_id: string;
  sender_type: "client" | "checker";
  message: string;
};

export type RequestWithMessages = {
  id: string; // UUID to match requests table
  messages?: RequestMessage[];
  unread_count?: number;
};
