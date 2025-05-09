import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useFilmsStore } from "@/store/useFilmsStore";
import { toast } from "sonner";
import { FavoriteButton } from "@/components/Films/_components/Buttons/FavoriteButton";

afterEach(() => {
  cleanup();
});

vi.mock("@/store/useFilmsStore", () => ({
  useFilmsStore: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("FavoriteButton", () => {
  const mockAddToFavorites = vi.fn();
  const mockRemoveFromFavorites = vi.fn();
  const mockIsFavorite = vi.fn();

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useFilmsStore as any).mockReturnValue({
      addToFavorites: mockAddToFavorites,
      removeFromFavorites: mockRemoveFromFavorites,
      isFavorite: mockIsFavorite,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar corretamente com estado inicial", () => {
    render(<FavoriteButton filmId="123" />);
    mockIsFavorite.mockReturnValue(false);

    const button = screen.getByTestId("favorite-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-gray-100");
  });

  it("deve adicionar um filme aos favoritos ao clicar quando não for favorito", () => {
    render(<FavoriteButton filmId="123" />);
    mockIsFavorite.mockReturnValue(false);

    const button = screen.getByTestId("favorite-button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockAddToFavorites).toHaveBeenCalledWith("123");
    expect(toast.success).toHaveBeenCalledWith("Sucesso!", {
      description: "Filme adicionado aos favoritos.",
    });
  });

  it("deve remover um filme dos favoritos ao clicar quando for favorito", () => {
    mockIsFavorite.mockReturnValue(true);
    render(<FavoriteButton filmId="123" />);

    const button = screen.getByTestId("favorite-button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(mockRemoveFromFavorites).toHaveBeenCalledWith("123");
    expect(toast.success).toHaveBeenCalledWith("Sucesso!", {
      description: "Filme removido dos favoritos.",
    });
  });
  it("deve tratar erros ao adicionar/remover favoritos", () => {
    mockIsFavorite.mockReturnValue(false);
    mockAddToFavorites.mockImplementation(() => {
      throw new Error("Erro ao adicionar");
    });

    render(<FavoriteButton filmId="123" />);

    const button = screen.getByTestId("favorite-button");
    fireEvent.click(button);

    expect(mockAddToFavorites).toHaveBeenCalledWith("123");
    expect(toast.success).not.toHaveBeenCalled();
  });
});
