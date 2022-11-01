import { render, screen } from "@testing-library/react"
import Posts from "./Posts"

describe("Posts", () => {
  it("should render the post", () => {
    render(<Posts />)
  })
})
