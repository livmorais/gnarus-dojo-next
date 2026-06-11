export const GITHUB_AVATAR_REGEX = /github\.com\/.*\.png.*/;

export function getGravatarFallbackUrl(avatarUrl: string): string | null {
  if (!GITHUB_AVATAR_REGEX.test(avatarUrl)) return null;
  try {
    const url = avatarUrl.startsWith("http")
      ? new URL(avatarUrl)
      : new URL(`https://${avatarUrl}`);
    const d = url.searchParams.get("d");
    return d ? decodeURIComponent(d) : null;
  } catch {
    return null;
  }
}
