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
