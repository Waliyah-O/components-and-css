import React, { ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { CustomerProvider } from "./CustomerContext";
import { SearchProvider } from "./SearchContext";
import { SavedLikedProvider } from "./SavedLikedContext";

interface CombinedContextProviderProps {
  children: ReactNode;
}

export const CombinedContextProvider: React.FC<
  CombinedContextProviderProps
> = ({ children }) => {
  return (
    <CustomerProvider>
      <SearchProvider>
        <CartProvider>
          <SavedLikedProvider>{children}</SavedLikedProvider>
        </CartProvider>
      </SearchProvider>
    </CustomerProvider>
  );
};
