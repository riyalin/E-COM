import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Pagination } from "./ui/pagination";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  rating: number;
  occasion?: string;
  color?: string;
  theme?: string;
}

interface ProductGridProps {
  products?: Product[];
  filters?: {
    occasion?: string;
    color?: string;
    theme?: string;
  };
  onQuickView?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1612160609504-334bdc6b70c9?w=400&q=80",
      title: "Handcrafted Floral Bouquet",
      price: 39.99,
      rating: 4.5,
      occasion: "birthday",
      color: "pink",
      theme: "floral",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80",
      title: "Rustic Gift Basket",
      price: 49.99,
      rating: 4.2,
      occasion: "housewarming",
      color: "brown",
      theme: "rustic",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=400&q=80",
      title: "Personalized Jewelry Box",
      price: 29.99,
      rating: 4.8,
      occasion: "anniversary",
      color: "white",
      theme: "elegant",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&q=80",
      title: "Artisanal Chocolate Collection",
      price: 24.99,
      rating: 4.7,
      occasion: "valentine",
      color: "brown",
      theme: "gourmet",
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?w=400&q=80",
      title: "Handmade Scented Candles Set",
      price: 34.99,
      rating: 4.3,
      occasion: "christmas",
      color: "green",
      theme: "cozy",
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&q=80",
      title: "Custom Photo Frame",
      price: 19.99,
      rating: 4.1,
      occasion: "graduation",
      color: "black",
      theme: "modern",
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80",
      title: "Hand-Knitted Throw Blanket",
      price: 59.99,
      rating: 4.9,
      occasion: "housewarming",
      color: "beige",
      theme: "cozy",
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&q=80",
      title: "Ceramic Tea Set",
      price: 44.99,
      rating: 4.6,
      occasion: "wedding",
      color: "white",
      theme: "elegant",
    },
  ],
  filters = {},
  onQuickView = () => {},
  onAddToCart = () => {},
  onFavorite = () => {},
}: ProductGridProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Apply filters when they change
  useEffect(() => {
    let result = [...products];

    if (filters.occasion && filters.occasion !== "all") {
      result = result.filter(
        (product) => product.occasion === filters.occasion,
      );
    }

    if (filters.color && filters.color !== "all") {
      result = result.filter((product) => product.color === filters.color);
    }

    if (filters.theme && filters.theme !== "all") {
      result = result.filter((product) => product.theme === filters.theme);
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, filters]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-700">
              No products found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <ProductCard
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    rating={product.rating}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                    onFavorite={onFavorite}
                  />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                          }}
                        />
                      </PaginationItem>
                    )}

                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === index + 1}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(index + 1);
                          }}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                          }}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
