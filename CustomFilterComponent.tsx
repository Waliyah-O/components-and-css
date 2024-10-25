import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Badge, Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import PuggButtons from "../../Components/PuggButtons";

interface FilterProps {
  items: any[];
  tags: string[];
  onFilterChange: (filteredItems: any[]) => void;
}

export const FilterComponent: React.FC<FilterProps> = ({
  items,
  tags,
  onFilterChange,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredItems(items);
    } else {
      const newFilteredItems = items.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag))
      );
      setFilteredItems(newFilteredItems);
    }
    onFilterChange(filteredItems);
  }, [selectedTags, items]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <Box>
      <Text mb={2} fontWeight="bold">
        Filter by tags:
      </Text>
      <Wrap spacing={2} mb={4}>
        {tags.map((tag) => (
          <WrapItem key={tag}>
            <Badge
              px={2}
              py={1}
              borderRadius="full"
              variant={selectedTags.includes(tag) ? "solid" : "outline"}
              colorScheme="blue"
              cursor="pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          </WrapItem>
        ))}
      </Wrap>
      <Text mb={2} fontWeight="bold">
        Filtered Items:
      </Text>
      <Flex direction="column">
        {filteredItems.map((item, index) => (
          <Box key={index} p={2} borderWidth={1} borderRadius="md" mb={2}>
            {item.name}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

interface FilterTagProps<T> {
  items: T[];
  tags: string[];
  filterKey: keyof T;
  renderItem: (item: T) => React.ReactNode;
}

export function FilterTagComponent<T>({
  items,
  tags,
  filterKey,
  renderItem,
}: FilterTagProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("tag") || "";

  const handleFilterChange = (value: string | null) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (value === null) {
        newParams.delete("tag");
      } else {
        newParams.set("tag", value);
      }
      return newParams;
    });
  };

  const filterItems = (items: T[]) => {
    return items.filter((item) => {
      if (!item[filterKey] || !typeFilter) return true;
      const normalizedItemTag = String(item[filterKey])
        .replace("#", "")
        .toLowerCase();
      const normalizedTypeFilter = typeFilter.replace("#", "").toLowerCase();
      return normalizedItemTag === normalizedTypeFilter;
    });
  };

  const displayedItems = typeFilter ? filterItems(items) : items;

  return (
    <div>
      <Flex
        w="100%"
        overflowX="scroll"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
          scrollbarWidth: "none",
        }}
        gap="10px"
        mb={{ base: "0px", lg: "20px" }}
        pl={{ base: "1px", lg: "0px" }}
        pt="20px"
      >
        {tags.map((tag) => (
          <PuggButtons
            key={tag}
            id={tag}
            text={tag}
            btnVariant={typeFilter === tag ? "primary" : "outline"}
            action={() => handleFilterChange(tag)}
            radius="10px"
          />
        ))}
      </Flex>
      <Flex>
        {typeFilter && (
          <PuggButtons
            text="Clear filter"
            btnVariant="outline"
            action={() => handleFilterChange(null)}
            radius="10px"
          />
        )}
      </Flex>
      <div></div>
      <div>
        {displayedItems.map((item, index) => (
          <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
        ))}
      </div>
    </div>
  );
}

interface FilterBtnProps<T, F extends string> {
  items: T[];
  filterOptions: F[];
  getFilteredItems: (items: T[], currentFilter: F) => T[];
  renderItem: (item: T) => React.ReactNode;
  defaultFilter: F;
}

export function FilterBtnComponent<T, F extends string>({
  items,
  filterOptions,
  getFilteredItems,
  renderItem,
  defaultFilter,
}: FilterBtnProps<T, F>) {
  const [filter, setFilter] = useState<F>(defaultFilter);

  const filteredItems = getFilteredItems(items, filter);

  const FilterBtn = ({
    children,
    filterType,
  }: {
    children: React.ReactNode;
    filterType: F;
  }) => (
    <button
      className={filter === filterType ? "active-link" : ""}
      onClick={() => setFilter(filterType)}
    >
      {children}
    </button>
  );

  return (
    <div>
      <Flex
        w="100%"
        gap="40px"
        alignItems="center"
        justifyContent={{ base: "space-between", md: "center" }}
        mb="1.5em"
        mt={{ base: "0em", lg: "1em" }}
        pt={{ base: "0em", lg: "1em" }}
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        {filterOptions.map((option) => (
          <FilterBtn key={option} filterType={option}>
            {option}
          </FilterBtn>
        ))}
      </Flex>
      <div>
        {filteredItems.map((item, index) => (
          <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
        ))}
      </div>
    </div>
  );
}

//use case for fikterbtn

// Define our product type
// interface Product {
//   id: number;
//   name: string;
//   category: 'Electronics' | 'Clothing' | 'Books' | 'Home';
//   price: number;
// }

// // Sample product data
// const products: Product[] = [
//   { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
//   { id: 2, name: 'T-shirt', category: 'Clothing', price: 19.99 },
//   { id: 3, name: 'Novel', category: 'Books', price: 14.99 },
//   { id: 4, name: 'Lamp', category: 'Home', price: 39.99 },
//   { id: 5, name: 'Smartphone', category: 'Electronics', price: 599 },
//   { id: 6, name: 'Jeans', category: 'Clothing', price: 49.99 },
//   { id: 7, name: 'Cookbook', category: 'Books', price: 24.99 },
//   { id: 8, name: 'Blender', category: 'Home', price: 79.99 },
// ];

// // Define our filter options
// type FilterOption = 'All' | Product['category'];
// const filterOptions: FilterOption[] = ['All', 'Electronics', 'Clothing', 'Books', 'Home'];

// const ProductCatalog: React.FC = () => {
//   // Function to filter items based on the current filter
//   const getFilteredItems = (items: Product[], currentFilter: FilterOption) => {
//     if (currentFilter === 'All') {
//       return items;
//     }
//     return items.filter(item => item.category === currentFilter);
//   };

//   // Function to render each product item
//   const renderProduct = (product: Product) => (
//     <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
//       <h3>{product.name}</h3>
//       <p>Category: {product.category}</p>
//       <p>Price: ${product.price.toFixed(2)}</p>
//     </div>
//   );

//   return (
//     <div>
//       <h1>Product Catalog</h1>
//       <FilterBtnComponent<Product, FilterOption>
//         items={products}
//         filterOptions={filterOptions}
//         getFilteredItems={getFilteredItems}
//         renderItem={renderProduct}
//         defaultFilter="All"
//       />
//     </div>
//   );
// };

// export default ProductCatalog;

// usecase

// In your main component
// const MyComponent = () => {
//   const items = [/* your items array */];
//   const tags = ["#techie", "#casual", "#formal"]; // Array of string tags

//   return (
// <FilterComponent
//   items={items}
//   tags={tags}
//   filterKey="tag"
//   renderItem={(item) => (
//     <div>
//       {/* Render your item here */}
//       {item.name}
//     </div>
//   )}
// />
//   );
// };
