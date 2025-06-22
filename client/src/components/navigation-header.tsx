import { Guitar, Search, ShoppingCart, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NavigationHeader() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <Guitar className="w-8 h-8 text-guitar-accent" />
          <h1 className="text-xl font-bold text-guitar-primary">ModularGuitar</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6 text-gray-600" />
          <div className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            <Badge className="absolute -top-2 -right-2 bg-guitar-accent text-white text-xs w-5 h-5 flex items-center justify-center p-0">
              3
            </Badge>
          </div>
          <User className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </header>
  );
}
