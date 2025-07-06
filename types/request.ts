export type RequestRequest = {
  title: string;
  vehicleMake: string;
  vehicleModel: string;
  year: number | undefined;
  location: string;
  notes: string;
  listingLink: string;
  status?: string;
  areaId: string;
  clientId?: string;
  checkerId?: string;
};

export type RequestWithClient = {
  id: string;
  title: string;
  vehicle_make: string;
  vehicle_model: string;
  year: number;
  location: string;
  notes: string;
  listing_link: string;
  status: string;
  created_at: string;
  area_id: number;
  client_id: string;
  checker_id?: string | null;
  client?: { full_name: string } | null;
  client_full_name?: string;
  checker_full_name?: string;
};

export type RequestPhoto = {
  id: number;
  request_id: number;
  photo_url: string;
  filename: string;
  uploaded_by: string;
  uploaded_at: string;
  description?: string;
};

export type RequestWithPhotos = RequestWithClient & {
  photos?: RequestPhoto[];
};

export type CheckerRequestWithPhotos = Omit<RequestWithClient, "id"> & {
  id: number;
  photos?: Array<{
    id: number;
    photo_url: string;
    filename: string;
    uploaded_at: string;
  }>;
};
