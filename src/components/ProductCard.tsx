import React, { useState } from "react";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id?: string;
  image?: string;
  title?: string;
  price?: number;
  rating?: number;
  onQuickView?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  image = "https://images.unsplash.com/photo-1612160609504-334bdc6b70c9?w=400&q=80",
  title = "Handcrafted Floral Bouquet",
  price = 39.99,
  rating = 4.5,
  onQuickView = () => {},
  onAddToCart = () => {},
  onFavorite = () => {},
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onFavorite(id);
  };

  // Generate rating stars
  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        // This is a simplified half star (just showing outline for now)
        stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <Card className="w-full max-w-[300px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white",
            isFavorite ? "text-red-500" : "text-gray-500",
          )}
          onClick={handleFavoriteClick}
        >
          <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500" : "")} />
        </Button>
      </div>

      <CardContent className="p-4">
        <h3 className="font-medium text-lg mb-1 line-clamp-1">{title}</h3>
        <div className="flex items-center mb-2">
          <div className="flex mr-2">{renderRatingStars()}</div>
          <span className="text-sm text-gray-500">{rating.toFixed(1)}</span>
        </div>
        <p className="font-bold text-lg">${price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onQuickView(id)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Quick View
        </Button>
        <Button size="sm" className="flex-1" onClick={() => onAddToCart(id)}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
