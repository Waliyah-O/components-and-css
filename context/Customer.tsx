import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { newProducts, techies } from "../data";

type ViewType = "men" | "women";

type ProfileViewType = "tiles" | "lists";

interface CustomerContextProps {
  viewType: ViewType;
  profileViewType: ProfileViewType;
  toggleView: () => void;
  toggleProfileView: () => void;
  defaultImage: string | null;
  setDefaultImage: React.Dispatch<React.SetStateAction<string | null>>;
  products: typeof techies;
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  selectedImageIndex: string | null;
  handleImageSelection: (id: string) => void;
  isLoggedIn: boolean;
  handleLoggedIn: () => void;
}

const CustomerContext = createContext<CustomerContextProps | undefined>(
  undefined
);

export const useCustomer = (): CustomerContextProps => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within an CustomerProvider");
  }
  return context;
};

interface CustomerProviderProps {
  children: ReactNode;
}

export const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [viewType, setViewType] = useState<ViewType>("men");
  const [profileViewType, setProfileViewType] =
    useState<ProfileViewType>("tiles");
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<string | null>(
    null
  );

  const products = newProducts.slice(0, 3);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * products.length);
    setDefaultImage(products[randomIndex].image);
  }, [products]);

  const handleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleImageSelection = (id: string) => {
    const selectedProduct = products.find((product) => product.id === id);
    if (selectedProduct) {
      setSelectedImageIndex(id);
      setSelectedImage(selectedProduct.image);
    }
  };
  const toggleView = () => {
    setViewType((prevView) => (prevView === "men" ? "women" : "men"));
  };

  const toggleProfileView = () => {
    setProfileViewType((prevView) =>
      prevView === "tiles" ? "lists" : "tiles"
    );
  };

  return (
    <CustomerContext.Provider
      value={{
        viewType,
        profileViewType,
        toggleView,
        toggleProfileView,
        defaultImage,
        setDefaultImage,
        products,
        selectedImage,
        setSelectedImage,
        selectedImageIndex,
        handleImageSelection,
        isLoggedIn,
        handleLoggedIn,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
