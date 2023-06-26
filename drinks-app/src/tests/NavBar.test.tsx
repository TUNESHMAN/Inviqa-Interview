import { render, screen } from "@testing-library/react";
import NavBar from "../components/NavBar";
describe("NavBar", () => {
  test("renders correctly", () => {
    render(<NavBar />);
    const logoElement = screen.getByRole("img", { name: /logo/i });
    expect(logoElement).toBeInTheDocument();
  });
});
