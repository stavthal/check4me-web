import type { RequestPhoto } from "~/types/request";

export const usePhotoUrls = () => {
  const supabase = useSupabaseClient();

  const getSignedUrl = async (filePath: string): Promise<string | null> => {
    try {
      // Extract just the file path if a full URL is passed
      let cleanPath = filePath;
      if (filePath.includes("/storage/v1/object/public/request-photos/")) {
        cleanPath = filePath.split(
          "/storage/v1/object/public/request-photos/"
        )[1];
      }

      const { data, error } = await supabase.storage
        .from("request-photos")
        .createSignedUrl(cleanPath, 3600); // Valid for 1 hour

      if (error) {
        console.error("Error creating signed URL:", error);
        return null;
      }

      return data.signedUrl;
    } catch (err) {
      console.error("Unexpected error creating signed URL:", err);
      return null;
    }
  };

  const getSignedUrls = async (
    photos: RequestPhoto[]
  ): Promise<Array<RequestPhoto & { signedUrl: string | null }>> => {
    const photosWithUrls = await Promise.all(
      photos.map(async (photo) => {
        const signedUrl = await getSignedUrl(photo.photo_url);
        return {
          ...photo,
          signedUrl,
        };
      })
    );

    return photosWithUrls;
  };

  return {
    getSignedUrl,
    getSignedUrls,
  };
};
