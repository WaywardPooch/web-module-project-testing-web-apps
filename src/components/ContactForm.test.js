import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  // Arrange (render the form)
  render(<ContactForm />);

  // Act/Assert (look for and expect presense of header text in form)
  const formHeaderText = screen.queryByText(/contact form/i);
  expect(formHeaderText).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  // Arrange (render the form)
  render(<ContactForm />);

  // Act (user types only 3 letters inside firstname input)
  const testInput = "abc";
  const firstnameInput = screen.getByPlaceholderText(/edd/i);
  userEvent.type(firstnameInput, testInput);

  // Assert (is the error message for firstname present)
  await waitFor(() => {
    const firstnameError = screen.queryByText(
      /firstname must have at least 5 characters./i
    );
    expect(firstnameError).toBeInTheDocument();
  });
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  // Arrange (render the form)
  render(<ContactForm />);

  // Act (user presses submit, with no text in input fields)
  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  // Assert (are there three error messages showing up)
  const minLettersError = screen.queryByText(
    /must have at least 5 characters./i
  );
  const validEmailError = screen.queryByText(/must be a valid email address./i);
  const requiredFieldError = screen.queryByText(/is a required field./i);

  expect(minLettersError).toBeInTheDocument();
  expect(validEmailError).toBeInTheDocument();
  expect(requiredFieldError).toBeInTheDocument();
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  // Arrange (render the form)
  render(<ContactForm />);

  // Act (user fills in only first/lastname and clicks submit)
  const testValues = { firstname: "Johnny", lastname: "Testing" };
  const firstnameInput = screen.getByPlaceholderText(/edd/i);
  const lastnameInput = screen.getByPlaceholderText(/burke/i);
  const submitButton = screen.getByRole("button");

  userEvent.type(firstnameInput, testValues.firstname);
  userEvent.type(lastnameInput, testValues.lastname);
  userEvent.click(submitButton);

  // Assert (does the email invalid error show up)
  const validEmailError = screen.queryByText(/must be a valid email address./i);
  expect(validEmailError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {});

test("renders all fields text when all fields are submitted.", async () => {});
