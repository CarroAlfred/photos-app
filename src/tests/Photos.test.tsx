import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Photos } from "../Pages/Photos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
describe("Photos", () => {
  it("Search to be in document", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Photos />
      </QueryClientProvider>
    );
    expect(screen.getByTitle("content")).toBeInTheDocument();
  });
});
