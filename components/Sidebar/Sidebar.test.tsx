import { screen, render } from "@testing-library/react"
import Sidebar from "./Sidebar"

describe("Sidebar", () => {
  it("should render the sidebar", () => {
    render(<Sidebar />)
  })
})
