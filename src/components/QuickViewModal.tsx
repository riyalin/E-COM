import React, { useState } from "react";
import { Star, ShoppingCart, X, Heart, Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface QuickViewModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product?: {
    id: string;
    title: string;
    price: number;
    rating: number;
    description: string;
    images: string[];
    colors?: string[];
    themes?: string[];
  };
  onAddToCart?: (
    id: string,
    quantity: number,
    options: { color?: string; theme?: string },
  ) => void;
  onClose?: () => void;
}

const QuickViewModal = ({
  open = true,
  onOpenChange = () => {},
  product = {
    id: "1",
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
  },
  onAddToCart = () => {},
  onClose = () => {},
}: QuickViewModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0],
  );
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(
    product.themes?.[0],
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = Math.max(1, quantity + amount);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity, {
      color: selectedColor,
      theme: selectedTheme,
    });
    onClose();
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  // Generate rating stars
  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Images */}
          <div className="relative bg-gray-100 h-[300px] md:h-[500px] overflow-hidden">
            <img
              src={product.images[currentImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white",
                isFavorite ? "text-red-500" : "text-gray-500",
              )}
              onClick={handleFavoriteClick}
            >
              <Heart
                className={cn("h-5 w-5", isFavorite ? "fill-red-500" : "")}
              />
            </Button>

            {/* Thumbnail navigation */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-primary" : "bg-gray-300"}`}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 flex flex-col h-full">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {product.title}
              </DialogTitle>
              <div className="flex items-center mt-2">
                <div className="flex mr-2">{renderRatingStars()}</div>
                <span className="text-sm text-gray-500">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <p className="font-bold text-xl mt-2">
                ${product.price.toFixed(2)}
              </p>
            </DialogHeader>

            <div className="mt-4 flex-grow">
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Color:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        variant={
                          selectedColor === color ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedColor(color)}
                        className="rounded-md"
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Theme Selection */}
              {product.themes && product.themes.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Theme:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.themes.map((theme) => (
                      <Button
                        key={theme}
                        variant={
                          selectedTheme === theme ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedTheme(theme)}
                        className="rounded-md"
                      >
                        {theme}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Quantity:</h3>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-auto">
              <Button className="w-full sm:w-auto" onClick={handleAddToCart}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
