import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations?: {
    color?: string;
    theme?: string;
  };
}

interface CartPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: CartItem[];
}

const CartPanel = ({
  isOpen = false,
  onClose = () => {},
  items = [],
}: CartPanelProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    items.length
      ? items
      : [
          {
            id: "1",
            name: "Handcrafted Floral Bouquet",
            price: 49.99,
            quantity: 1,
            image:
              "https://images.unsplash.com/photo-1561181286-d5c73431a97f?w=300&q=80",
            customizations: {
              color: "Pink",
              theme: "Birthday",
            },
          },
          {
            id: "2",
            name: "Artisanal Gift Box",
            price: 35.5,
            quantity: 2,
            image:
              "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&q=80",
            customizations: {
              theme: "Congratulations",
            },
          },
        ],
  );

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 5.99;
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <ShoppingBag className="h-6 w-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-white" side="right">
        <SheetHeader className="space-y-2 pb-4">
          <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex h-[70vh] flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <p className="text-xl font-medium">Your cart is empty</p>
            <p className="text-center text-muted-foreground">
              Add some beautiful handcrafted items to your cart
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto py-2">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start gap-4 py-4"
                >
                  <div className="h-20 w-20 rounded-md overflow-hidden bg-secondary">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                    {item.customizations && (
                      <div className="text-xs text-muted-foreground">
                        {item.customizations.color && (
                          <span className="inline-block mr-2">
                            Color: {item.customizations.color}
                          </span>
                        )}
                        {item.customizations.theme && (
                          <span className="inline-block">
                            Theme: {item.customizations.theme}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-7 w-7 text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartPanel;
