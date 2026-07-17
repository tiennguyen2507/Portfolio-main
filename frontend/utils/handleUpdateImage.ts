/**
 * Common image upload handler
 * - Accepts File | Blob | FormData | string (data URL or remote URL)
 * - Uploads to backend and returns the image URL when successful; otherwise returns null
 */

const BASE_URL = 'https://blog-data.up.railway.app'

export type UploadableImage = File | Blob | FormData | string

/**
 * Upload an image to the backend.
 * @param input File | Blob | FormData | string (data URL or http(s) URL)
 * @returns Promise<string | null> image URL on success, null on failure
 */
export async function handleUpdateImage(
  input: UploadableImage,
  folder?: string
): Promise<string | null> {
  try {
    let formData: FormData

    if (input instanceof FormData) {
      formData = input
    } else if (typeof input === 'string') {
      // Support data URL or remote URL by fetching as Blob
      const response = await fetch(input)
      const blob = await response.blob()
      formData = new FormData()
      formData.append('file', blob, 'upload.jpg')
      folder && formData.append('folder', folder)
    } else if (input instanceof Blob) {
      formData = new FormData()
      formData.append('file', input, (input as File).name || 'upload.jpg')
      folder && formData.append('folder', folder)
    } else {
      // Fallback guard (should not happen due to union type)
      return null
    }

    const uploadResponse = await fetch(`${BASE_URL}/image/upload`, {
      method: 'POST',
      body: formData,
    })

    // Attempt to parse JSON response safely
    let data: any = null
    try {
      data = await uploadResponse.json()
    } catch (_) {
      // ignore parse error
    }

    if (!uploadResponse.ok) {
      console.error(
        'Image upload failed with status:',
        uploadResponse.status,
        data
      )
      return null
    }

    const url: string | undefined =
      data?.url || data?.secure_url || data?.data?.url
    return typeof url === 'string' && url.length > 0 ? url : null
  } catch (error) {
    console.error('handleUpdateImage error:', error)
    return null
  }
}

export default handleUpdateImage
