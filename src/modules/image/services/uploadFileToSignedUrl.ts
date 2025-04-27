export const uploadFileToSignedUrl = async (signedUrl: string, file: File): Promise<void> => {
  try {
    const response = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error uploading file to signed URL:", error);
    throw error;
  }
};