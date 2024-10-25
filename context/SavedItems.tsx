import React, { createContext, useContext, useState, ReactNode } from "react";

interface SavedLikedItem {
  id: string;
  image: string;
  title: string;
  vendorName: string;
  price: string;
  discountPrice: string;
  discount: number;
  quantity: number;
  color: string;
  size: string;
}

interface SavedLikedContextType {
  savedLikedItems: SavedLikedItem[];
  addToSavedLiked: (item: SavedLikedItem) => void;
  removeFromSavedLiked: (id: string) => void;
  clearSavedLiked: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const SavedLikedContext = createContext<SavedLikedContextType | undefined>(
  undefined
);

export const SavedLikedProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [savedLikedItems, setSavedLikedItems] = useState<SavedLikedItem[]>([]);

  const addToSavedLiked = (item: SavedLikedItem) => {
    setSavedLikedItems((prevItems) => {
      const existingItem = prevItems.find(
        (savedLikedItem) => savedLikedItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((savedLikedItem) =>
          savedLikedItem.id === item.id
            ? {
                ...savedLikedItem,
                quantity: savedLikedItem.quantity + item.quantity,
              }
            : savedLikedItem
        );
      }
      return [...prevItems, item];
    });
  };

  const removeFromSavedLiked = (id: string) => {
    setSavedLikedItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const clearSavedLiked = () => {
    setSavedLikedItems([]);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setSavedLikedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <SavedLikedContext.Provider
      value={{
        savedLikedItems,
        addToSavedLiked,
        removeFromSavedLiked,
        clearSavedLiked,
        updateQuantity,
      }}
    >
      {children}
    </SavedLikedContext.Provider>
  );
};

export const useSavedLiked = (): SavedLikedContextType => {
  const context = useContext(SavedLikedContext);
  if (!context) {
    throw new Error("useSavedLiked must be used within a SavedLikedProvider");
  }
  return context;
};
