import { describe, it, expect } from "vitest";
import { fireEvent, screen } from "@testing-library/react";

import { render } from "../utils/test-utils";
import userEvent from "@testing-library/user-event";
import UserForm from "./UserForm";

describe("UserForm", () => {
  it("should validate fields", async () => {
    const userEvents = userEvent.setup();
    render(<UserForm />);

    const submitButton = screen.getByRole("button", { name: "Submit" });
    await userEvents.click(submitButton);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const dateOfBirthInput = screen.getByLabelText("Date of birth");
    const favouriteColourInput = screen.getByLabelText("Favourite colour");
    const salaryInput = screen.getByLabelText(/Salary/i);

    // name
    expect(nameInput).toBeInvalid();
    expect(screen.getByText("Name is required")).toBeInTheDocument();

    await userEvents.type(nameInput, "Example User");
    expect(nameInput).toHaveValue("Example User");
    expect(nameInput).toBeValid();

    // email
    expect(emailInput).toBeInvalid();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    await userEvents.type(emailInput, "example");

    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    await userEvents.type(emailInput, "@motorway.com");
    expect(emailInput).toHaveValue("example@motorway.com");
    expect(emailInput).toBeValid();

    // date of birth
    expect(dateOfBirthInput).toBeInvalid();
    expect(screen.getByText("Date of birth is required")).toBeInTheDocument();
    await userEvents.type(dateOfBirthInput, "2050-01-01");

    expect(
      screen.getByText("Date of birth must be in the past"),
    ).toBeInTheDocument();
    await userEvents.clear(dateOfBirthInput);
    await userEvents.type(dateOfBirthInput, "2026-01-01");
    expect(dateOfBirthInput).toHaveValue("2026-01-01");
    expect(dateOfBirthInput).toBeValid();

    // favourite colour
    expect(favouriteColourInput).toBeInvalid();
    expect(
      screen.getByText("Favourite colour is required"),
    ).toBeInTheDocument();

    await userEvents.type(favouriteColourInput, "blue");
    expect(favouriteColourInput).toHaveValue("blue");
    expect(favouriteColourInput).toBeValid();

    // salary
    expect(salaryInput).toHaveValue("0");
    expect(screen.getByText(/£0/i)).toBeInTheDocument();
    fireEvent.change(salaryInput, { target: { value: "30000" } });

    expect(salaryInput).toHaveValue("30000");
    expect(screen.getByText(/£30,000/i)).toBeInTheDocument();
  });
});
