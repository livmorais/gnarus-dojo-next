import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("should force high resolution params for CDN image urls", () => {
    render(
      <Avatar
        imageLink="https://cdn2.gnarususercontent.com.br/1/18484/dd1dcf17-0cf2-401c-8424-9e13f5639974.jpeg?width=100&height=100&aspect_ratio=1:1"
        initials="AB"
        alt="Instrutor"
        enhanceImageQuality
      />,
    );

    const avatarImage = screen.getByRole("img", { name: "Instrutor" });
    const src = avatarImage.getAttribute("src");

    expect(src).not.toBeNull();

    const imageUrl = new URL(src ?? "");

    expect(imageUrl.searchParams.get("width")).toBe("500");
    expect(imageUrl.searchParams.get("height")).toBe("500");
    expect(imageUrl.searchParams.get("size")).toBe("500");
    expect(imageUrl.searchParams.get("aspect_ratio")).toBe("1:1");
  });

  it("should append query param correctly when url has no query string", () => {
    render(
      <Avatar
        imageLink="https://www.gravatar.com/avatar/default-avatar"
        initials="AB"
        alt="Perfil"
        enhanceImageQuality
      />,
    );

    const avatarImage = screen.getByRole("img", { name: "Perfil" });
    const src = avatarImage.getAttribute("src");

    expect(src).toBe("https://www.gravatar.com/avatar/default-avatar?size=500");
  });

  it("should keep original image src when quality enhancement is disabled", () => {
    render(
      <Avatar
        imageLink="https://www.gravatar.com/avatar/default-avatar"
        initials="AB"
        alt="Perfil sem ajuste"
      />,
    );

    const avatarImage = screen.getByRole("img", { name: "Perfil sem ajuste" });
    const src = avatarImage.getAttribute("src");

    expect(src).toBe("https://www.gravatar.com/avatar/default-avatar");
  });
});
