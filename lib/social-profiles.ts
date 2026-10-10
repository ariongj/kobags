export const socialPlatforms = {
  facebook: { label: "Facebook", domain: "facebook.com" },
  instagram: { label: "Instagram", domain: "instagram.com" },
  linkedin: { label: "LinkedIn", domain: "linkedin.com" },
  youtube: { label: "YouTube", domain: "youtube.com" },
} as const;
export type SocialPlatform = keyof typeof socialPlatforms;
export type SocialProfiles = Partial<Record<SocialPlatform, string>>;
export function validSocialProfile(platform: SocialPlatform, value: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    const domain = socialPlatforms[platform].domain;
    return url.protocol === "https:" && !url.username && !url.password && !url.port &&
      (url.hostname === domain || url.hostname === `www.${domain}`) && url.pathname.length > 1;
  } catch { return false; }
}
