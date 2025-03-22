import React, { useState } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import ProductGrid from "./ProductGrid";
import QuickViewModal from "./QuickViewModal";
import CartPanel from "./CartPanel";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  rating: number;
  description?: string;
  images?: string[];
  colors?: string[];
  themes?: string[];
  occasion?: string;
  color?: string;
  theme?: string;
}

const Home = () => {
  // State for filters
  const [filters, setFilters] = useState({
    occasion: "all",
    color: "all",
    theme: "all",
  });

  // State for quick view modal
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // State for cart panel
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Sample products data
  const products: Product[] = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1612160609504-334bdc6b70c9?w=400&q=80",
      title: "Handcrafted Floral Bouquet",
      price: 39.99,
      rating: 4.5,
      description:
        "A beautiful handcrafted floral bouquet made with premium seasonal flowers. Perfect for birthdays, anniversaries, or any special occasion.",
      images: [
        "https://images.unsplash.com/photo-1612160609504-334bdc6b70c9?w=600&q=80",
        "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80",
        "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&q=80",
      ],
      colors: ["Red", "Pink", "White", "Mixed"],
      themes: ["Birthday", "Anniversary", "Congratulations", "Thank You"],
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
      description:
        "A charming rustic gift basket filled with artisanal treats and handcrafted items. Perfect for housewarmings or to show appreciation.",
      images: [
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
      ],
      colors: ["Brown", "Natural"],
      themes: ["Housewarming", "Thank You", "Congratulations"],
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
      description:
        "An elegant personalized jewelry box, handcrafted from premium wood with customizable engravings. A perfect keepsake gift.",
      images: [
        "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&q=80",
      ],
      colors: ["Walnut", "Cherry", "Maple"],
      themes: ["Anniversary", "Birthday", "Wedding"],
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
      description:
        "A luxurious collection of handcrafted artisanal chocolates made with premium ingredients and unique flavor combinations.",
      images: [
        "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=600&q=80",
      ],
      colors: ["Assorted"],
      themes: ["Valentine", "Birthday", "Thank You"],
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
      description:
        "A set of handmade scented candles crafted with natural soy wax and premium essential oils for a long-lasting, clean burn.",
      images: [
        "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?w=600&q=80",
      ],
      colors: ["Green", "Red", "White"],
      themes: ["Christmas", "Housewarming", "Self-care"],
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
      description:
        "A modern custom photo frame that can be personalized with names, dates, or special messages. Available in multiple finishes.",
      images: [
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80",
      ],
      colors: ["Black", "Silver", "Gold"],
      themes: ["Graduation", "Anniversary", "Family"],
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
      description:
        "A luxuriously soft hand-knitted throw blanket made from premium yarn. Perfect for adding warmth and style to any home.",
      images: [
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
      ],
      colors: ["Beige", "Gray", "Blue"],
      themes: ["Housewarming", "Winter", "Comfort"],
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
      description:
        "An elegant ceramic tea set handcrafted by skilled artisans. Includes teapot and four matching cups with delicate designs.",
      images: [
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&q=80",
      ],
      colors: ["White", "Blue", "Floral"],
      themes: ["Wedding", "Housewarming", "Tea Lover"],
      occasion: "wedding",
      color: "white",
      theme: "elegant",
    },
  ];

  // Handle filter changes
  const handleFilterChange = (newFilters: {
    occasion: string;
    color: string;
    theme: string;
  }) => {
    setFilters(newFilters);
  };

  // Handle quick view
  const handleQuickView = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setQuickViewOpen(true);
    }
  };

  // Handle add to cart
  const handleAddToCart = (
    id: string,
    quantity: number = 1,
    options: { color?: string; theme?: string } = {},
  ) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      const newItem = {
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: quantity,
        image: product.image,
        customizations: options,
      };

      setCartItems((prev) => [...prev, newItem]);
      setCartOpen(true);
    }
  };

  // Handle favorite
  const handleFavorite = (id: string) => {
    // This would typically update a user's favorites in a real application
    console.log(`Added product ${id} to favorites`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header cartItemCount={cartItems.length} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Handcrafted Gifts with Love
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover unique artisanal gifts and custom bouquets for every
              occasion
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button className="bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                Shop Now
              </button>
            </motion.div>
          </div>
        </section>

        {/* Filter Bar */}
        <FilterBar onFilterChange={handleFilterChange} />

        {/* Product Grid */}
        <ProductGrid
          products={products}
          filters={filters}
          onQuickView={handleQuickView}
          onAddToCart={handleAddToCart}
          onFavorite={handleFavorite}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewOpen && selectedProduct && (
          <QuickViewModal
            open={quickViewOpen}
            onOpenChange={setQuickViewOpen}
            product={{
              id: selectedProduct.id,
              title: selectedProduct.title,
              price: selectedProduct.price,
              rating: selectedProduct.rating,
              description: selectedProduct.description || "",
              images: selectedProduct.images || [selectedProduct.image],
              colors: selectedProduct.colors,
              themes: selectedProduct.themes,
            }}
            onAddToCart={(id, quantity, options) => {
              handleAddToCart(id, quantity, options);
              setQuickViewOpen(false);
            }}
            onClose={() => setQuickViewOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Cart Panel */}
      <CartPanel
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
      />
    </div>
  );
};

export default Home;
