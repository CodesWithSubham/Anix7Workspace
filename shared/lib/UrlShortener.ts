// lib/UrlShortener.ts

import getShortUrlModel from "./db/models/ShortUrl";

// Function to get URL by alias
export async function getUrl(alias: string) {
  const ShortUrl = await getShortUrlModel();
  const url = await ShortUrl.findOne({ alias });
  return url;
}

// Function to generate a random alias
export async function generateAlias() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const ShortUrl = await getShortUrlModel();
  let alias;
  do {
    alias = Array.from(
      { length: 6 },
      () => characters[Math.floor(Math.random() * characters.length)],
    ).join("");
  } while (await ShortUrl.findOne({ alias }));

  return alias;
}

// Function to create a new short URL
export async function createShortUrl(longUrl: string, uploadedBy: string) {
  const alias = await generateAlias();
  const ShortUrl = await getShortUrlModel();
  const newShortUrl = new ShortUrl({
    longUrl,
    alias,
    uploadedBy,
    adsLabel: 0, // Default adsLabel set to 0
    createdAt: new Date(),
    updatedAt: new Date(),
    expiredAt: null, // Set null by default
  });

  await newShortUrl.save();
  return newShortUrl;
}

// Function to update the URL's details
export async function updateShortUrl(
  alias: string,
  updates: Partial<{ longUrl: string; adsLabel: number; expiredAt: Date }>,
) {
  const ShortUrl = await getShortUrlModel();
  const shortUrl = await ShortUrl.findOneAndUpdate(
    { alias },
    { $set: updates },
    { new: true, runValidators: true },
  );
  return shortUrl;
}

// Function to delete a short URL by alias
export async function deleteShortUrl(alias: string) {
  const ShortUrl = await getShortUrlModel();
  const deletedUrl = await ShortUrl.findOneAndDelete({ alias });
  return deletedUrl;
}
