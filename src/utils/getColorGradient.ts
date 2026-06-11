type GradientDirection = "to top" | "to right" | "to bottom" | "to left";

type GradientTone = "darken" | "lighten";

type HexGradientOptions = {
  color: string;
  direction?: GradientDirection;
  tone?: GradientTone;
  intensity?: number;
  basePosition?: number;
  tonePosition?: number;
};

function expandHexColor(color: string) {
  const normalizedHex = color.replace("#", "");
  const isShortHex = normalizedHex.length === 3;

  const fullHex = isShortHex
    ? normalizedHex
        .split("")
        .map((char) => char + char)
        .join("")
    : normalizedHex;

  if (fullHex.length !== 6 || !/^[\da-fA-F]{6}$/.test(fullHex)) {
    return null;
  }

  return fullHex;
}

function mixChannel(value: number, tone: GradientTone, intensity: number) {
  const target = tone === "darken" ? 0 : 255;

  return Math.round(value + (target - value) * intensity);
}

function getRgbToneFromHex(
  color: string,
  tone: GradientTone,
  intensity: number,
) {
  const fullHex = expandHexColor(color);

  if (!fullHex) {
    return null;
  }

  const red = Number.parseInt(fullHex.slice(0, 2), 16);
  const green = Number.parseInt(fullHex.slice(2, 4), 16);
  const blue = Number.parseInt(fullHex.slice(4, 6), 16);

  return `rgb(${mixChannel(red, tone, intensity)} ${mixChannel(
    green,
    tone,
    intensity,
  )} ${mixChannel(blue, tone, intensity)})`;
}

export function getHexTone(
  color: string,
  tone: GradientTone,
  intensity = 0.42,
) {
  const generatedTone = getRgbToneFromHex(color, tone, intensity);

  if (generatedTone) {
    return generatedTone;
  }

  return tone === "darken"
    ? `color-mix(in srgb, ${color} 58%, black)`
    : `color-mix(in srgb, ${color} 58%, white)`;
}

export function getHexGradient({
  color,
  direction = "to right",
  tone = "darken",
  intensity = 0.42,
  basePosition = 0,
  tonePosition = 100,
}: HexGradientOptions) {
  const finalTone = getHexTone(color, tone, intensity);

  return `linear-gradient(${direction}, ${color} ${basePosition}%, ${finalTone} ${tonePosition}%)`;
}
