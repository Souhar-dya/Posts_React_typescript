import {screen,render, fireEvent} from "@testing-library/react";
import DepertmentForm from "./DepartmentForm";
import { describe } from "vitest";


describe("DepartmentForm", () => {
    test("renders department name field and submit button", () => {
        render(<DepertmentForm />);
        expect(screen.getByLabelText(/department name/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /submit/i})).toBeInTheDocument();
    });

    test("allows user to input department name", () => {
        render(<DepertmentForm />);
        const deptNameInput = screen.getByLabelText(/department name/i);
        const deptCodeInput = screen.getByLabelText(/department code/i);
        const deptManagerSelect = screen.getByLabelText(/department manager/i);
        fireEvent.change(deptNameInput, {target: {value: "HR"}});
        fireEvent.change(deptCodeInput, {target: {value: "HR001"}});
        fireEvent.change(deptManagerSelect, {target: {value: "manager1"}});
        expect(deptNameInput).toHaveValue("HR");
        expect(deptCodeInput).toHaveValue("HR001");
        expect(deptManagerSelect).toHaveValue("manager1");
    });
});
