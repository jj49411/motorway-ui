import { describe, it, expect } from "vitest";
import { screen, within } from "@testing-library/react";
import ImageGallery from "./ImageGallery";
import { render } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";

const firstImageSrc =
  "https://motorway-ui-test.s3.eu-west-2.amazonaws.com/car-images/m3m-lnR90uM.jpg";
const secondImageSrc =
  "https://motorway-ui-test.s3.eu-west-2.amazonaws.com/car-images/oUBjd22gF6w.jpg";
const lastImageSrc =
  "https://motorway-ui-test.s3.eu-west-2.amazonaws.com/car-images/YApS6TjKJ9c.jpg";

describe("ImageGallery", () => {
  it("should render images correctly", async () => {
    render(<ImageGallery />);

    const images = await screen.findAllByRole("img");

    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute("alt", "white car");
  });

  it("should open a full size image modal when clicking an image", async () => {
    const userEvents = userEvent.setup();
    render(<ImageGallery />);

    const images = await screen.findAllByRole("img");
    const firstImage = images[0];

    expect(firstImage).toHaveAttribute("src", firstImageSrc);
    await userEvents.click(firstImage);

    const dialog = await screen.findByRole("dialog");
    let fullImage = within(dialog).getByRole("img");

    expect(fullImage).toHaveAttribute("src", firstImageSrc);
    expect(fullImage).toHaveAttribute("alt", "full size image");

    const prevButton = within(dialog).getByRole("button", { name: "Prev" });
    const nextButton = within(dialog).getByRole("button", { name: "Next" });

    expect(prevButton).toBeDisabled();

    // go to next image
    await userEvents.click(nextButton);
    fullImage = within(dialog).getByRole("img");
    expect(fullImage).toHaveAttribute("src", secondImageSrc);

    // go back to previous image
    await userEvents.click(prevButton);
    fullImage = within(dialog).getByRole("img");
    expect(fullImage).toHaveAttribute("src", firstImageSrc);

    // go to last image
    await userEvents.click(nextButton);
    await userEvents.click(nextButton);
    fullImage = within(dialog).getByRole("img");
    expect(fullImage).toHaveAttribute("src", lastImageSrc);

    expect(nextButton).toBeDisabled();

    await userEvents.click(
      within(dialog).getByRole("button", { name: "Close" }),
    );

    expect(dialog).not.toBeInTheDocument();
  });
});
