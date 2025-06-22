import { Home, Wrench, Images, ClipboardList } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Wrench, label: "Customize", path: "/customize" },
    { icon: Images, label: "Gallery", path: "/gallery" },
    { icon: ClipboardList, label: "Orders", path: "/orders" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={cn(
                "flex flex-col items-center py-2 px-4 transition-colors",
                isActive ? "text-guitar-accent" : "text-gray-500 hover:text-guitar-accent"
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
