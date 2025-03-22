import React from "react";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  isLoggedIn?: boolean;
  username?: string;
  cartItemCount?: number;
}

const Header = ({
  isLoggedIn = false,
  username = "Guest",
  cartItemCount = 0,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-20 px-4 mx-auto">
        {/* Mobile Menu Button (visible on small screens) */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>

        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-primary">
            Crafts N' Wraps
          </a>
        </div>

        {/* Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-sm font-medium hover:text-primary">
            Home
          </a>
          <a href="/shop" className="text-sm font-medium hover:text-primary">
            Shop
          </a>
          <a
            href="/occasions"
            className="text-sm font-medium hover:text-primary"
          >
            Occasions
          </a>
          <a href="/custom" className="text-sm font-medium hover:text-primary">
            Custom Orders
          </a>
          <a href="/about" className="text-sm font-medium hover:text-primary">
            About Us
          </a>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex items-center relative max-w-md flex-1 mx-6">
          <Input
            type="search"
            placeholder="Search for gifts, bouquets..."
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Avatar className="h-8 w-8">
                  {isLoggedIn ? (
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                      alt={username}
                    />
                  ) : null}
                  <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>My Orders</DropdownMenuItem>
                  <DropdownMenuItem>Wishlist</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>Sign In</DropdownMenuItem>
                  <DropdownMenuItem>Register</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Shopping Cart */}
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
