import {screen, render, fireEvent} from "@testing-library/react";
import LoginForm from "./LoginForm";

import { describe } from "vitest";

describe("LoginForm", () => {
    test("renders username and password fields", () => {
        render(<LoginForm />);
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /login/i})).toBeInTheDocument();
    });

    test("allows user to input username and password", () => {
        render(<LoginForm />);
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
        fireEvent.change(usernameInput, {target: {value: "testuser"}});
        fireEvent.change(passwordInput, {target: {value: "testpassword"}});
        expect(usernameInput).toHaveValue("testuser");
        expect(passwordInput).toHaveValue("testpassword");
    });

});

