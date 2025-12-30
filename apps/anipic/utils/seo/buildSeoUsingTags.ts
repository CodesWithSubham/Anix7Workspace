import { capitalize } from "../capitalize";

export function buildSeoTitle(tags: string[] = []) {
  if (!tags.length) return "AI Generated Image";

  const clean = tags.map((t) => t.replace(/[-_]/g, " ").toLowerCase());

  const subjects = [
    "girl",
    "boy",
    "man",
    "woman",
    "character",
    "portrait",
    "person",
    "landscape",
    "city",
    "car",
    "logo",
    "animal",
    "cat",
    "dog",
  ];

  const styles = [
    "anime",
    "realistic",
    "photorealistic",
    "3d",
    "cyberpunk",
    "fantasy",
    "illustration",
    "watercolor",
    "oil painting",
  ];

  const subject = clean.find((t) => subjects.some((s) => t.includes(s))) ?? clean[0];

  const style = clean.find((t) => styles.includes(t));

  const extras = clean
    .filter((t) => t !== subject && t !== style)
    .slice(0, 2)
    .join(", ");

  if (style && extras)
    return `${capitalize(subject)} AI Generated Image - ${capitalize(style)}, ${extras}`;

  if (style) return `${capitalize(subject)} ${capitalize(style)} AI Art`;

  return `${capitalize(subject)} AI Generated Image`;
}

export function buildSeoDescription(tags: string[] = []) {
  if (!tags.length)
    return "Download high quality AI generated images, wallpapers, and digital art from AniPic.";

  return `Download high quality ${capitalize(
    tags.slice(0, 4).join(", "),
  )} AI generated image. Free AI art and wallpapers in HD quality.`;
}
