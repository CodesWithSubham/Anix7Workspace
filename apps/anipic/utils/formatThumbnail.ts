// Utility to format image URLs for thumbnail display
export function formatThumbnailImageUrl(url: string): string {
  try {
    const urlObj = new URL(url);

    // Handle Google-hosted images
    if (urlObj.hostname.endsWith("googleusercontent.com")) {
      // Replace any /s*, /w*, /h*, /s*-*, /w*-* etc. before the image file name
      return url.replace(/\/(s|w|h)\d+(?:-[^/]*)?\//, `/w320-rw-e90/`);
    }

    // Handle Imgur images
    if (urlObj.hostname.includes("imgur.com")) {
      // Match filename without suffix, e.g. abc123.jpg → abc123m.jpg
      return url.replace(/(\.\w+)$/, "m$1");
    }

    // Default: unchanged
    return urlObj.toString();
  } catch {
    return url; // fallback if invalid URL
  }
}

// https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgP6Y5k_0M9L0avhQXxUcv-M7ZT_z-5xTDtWbVjBcZ7DGocSI-K0sifhuNLDQ3G_fQn5BTsnTuZ4msCnPaRHb3Cd-RKVxpbNMhc9w_GsZbi78yk44i6sgcG1xF1gpxXNe8tu7_obDqpN7S97s_G-B5YVIIqjBbuFQV9AZMAFXRYVTEkr6OYVZErOyQ5Vps/s16000-rw/Suzume%20-%20Anix7.jpg

// https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgP6Y5k_0M9L0avhQXxUcv-M7ZT_z-5xTDtWbVjBcZ7DGocSI-K0sifhuNLDQ3G_fQn5BTsnTuZ4msCnPaRHb3Cd-RKVxpbNMhc9w_GsZbi78yk44i6sgcG1xF1gpxXNe8tu7_obDqpN7S97s_G-B5YVIIqjBbuFQV9AZMAFXRYVTEkr6OYVZErOyQ5Vps/w320-rw-e90/Suzume%20-%20Anix7.jpg
