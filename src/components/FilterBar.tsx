import React, { useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { ChevronDown, Filter, X } from "lucide-react";

interface FilterOption {
  id: string;
  name: string;
}

interface FilterBarProps {
  onFilterChange?: (filters: {
    occasion: string;
    color: string;
    theme: string;
  }) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps = {}) => {
  const [filters, setFilters] = useState({
    occasion: "all",
    color: "all",
    theme: "all",
  });

  const occasions: FilterOption[] = [
    { id: "birthday", name: "Birthday" },
    { id: "wedding", name: "Wedding" },
    { id: "anniversary", name: "Anniversary" },
    { id: "graduation", name: "Graduation" },
    { id: "holiday", name: "Holiday" },
  ];

  const colors: FilterOption[] = [
    { id: "red", name: "Red" },
    { id: "blue", name: "Blue" },
    { id: "green", name: "Green" },
    { id: "purple", name: "Purple" },
    { id: "pink", name: "Pink" },
    { id: "yellow", name: "Yellow" },
  ];

  const themes: FilterOption[] = [
    { id: "rustic", name: "Rustic" },
    { id: "modern", name: "Modern" },
    { id: "vintage", name: "Vintage" },
    { id: "minimalist", name: "Minimalist" },
    { id: "bohemian", name: "Bohemian" },
  ];

  const handleFilterChange = (
    value: string,
    filterType: "occasion" | "color" | "theme",
  ) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      occasion: "all",
      color: "all",
      theme: "all",
    };
    setFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const hasActiveFilters =
    filters.occasion !== "all" ||
    filters.color !== "all" ||
    filters.theme !== "all";

  return (
    <div className="w-full bg-white border-b border-gray-200 py-3 px-4 sticky top-[80px] z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <div className="flex items-center space-x-3">
            <Select
              value={filters.occasion}
              onValueChange={(value) => handleFilterChange(value, "occasion")}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Occasion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Occasions</SelectItem>
                {occasions.map((occasion) => (
                  <SelectItem key={occasion.id} value={occasion.id}>
                    {occasion.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.color}
              onValueChange={(value) => handleFilterChange(value, "color")}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colors</SelectItem>
                {colors.map((color) => (
                  <SelectItem key={color.id} value={color.id}>
                    {color.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.theme}
              onValueChange={(value) => handleFilterChange(value, "theme")}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Themes</SelectItem>
                {themes.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
