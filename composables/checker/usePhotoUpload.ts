export const usePhotoUpload = () => {
  const supabase = useSupabaseClient();
  const uploading = ref(false);

  type RequestPhotoInsert = {
    request_id: number;
    photo_url: string;
    filename: string;
    uploaded_by: string | undefined;
    description?: string;
  };

  const uploadPhotos = async (requestId: number, files: File[]) => {
    uploading.value = true;

    try {
      const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${requestId}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("request-photos")
          .upload(fileName, file);

        if (uploadError) {
          throw new Error(`Upload failed: ${uploadError.message}`);
        }

        const { data: urlData } = await supabase.storage
          .from("request-photos")
          .getPublicUrl(fileName);

        // save photo metadata to the database
        const photoData: RequestPhotoInsert = {
          request_id: requestId,
          photo_url: urlData.publicUrl,
          filename: file.name,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id,
          description: "", // Optional field, can be set later
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: dbError } = await (supabase as any)
          .from("request_photos")
          .insert(photoData);

        if (dbError) {
          throw new Error(`Database insert failed: ${dbError.message}`);
        }
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      console.error(error);
    } finally {
      uploading.value = false;
    }
  };

  return { uploading, uploadPhotos };
};
