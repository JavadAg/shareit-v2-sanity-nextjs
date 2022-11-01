import { render, screen } from "@testing-library/react"
import Header from "./Header"

describe("Header", () => {
  it("should render the header", () => {
    render(<Header />)

    const pageHeading = screen.getByRole("heading", {
      name: "Job application form"
    })
    expect(pageHeading).toBeInTheDocument()
  })
})
