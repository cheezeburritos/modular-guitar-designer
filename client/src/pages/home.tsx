import NavigationHeader from "@/components/navigation-header";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Guitar, Palette } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  const inspirationFenders = [
    {
      image: "@assets/STR1 Selection_1750774276185.png",
      title: "Stratocaster"
    },
    {
      image: "@assets/TLR1 Selection_1750774339892.png",
      title: "Telecaster"
    },
    {
      image: "@assets/JZM1_1750775080217.png",
      title: "Jazzmaster"
    },
    {
      image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=500",
      title: "Precision Bass"
    },
  ];

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-guitar-primary to-guitar-secondary text-white">
        <div className="px-4 py-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Design Your Dream Fender</h2>
            <p className="text-gray-300 text-lg">Customize authentic Fender guitars & basses - Stratocaster, Telecaster, Jazzmaster, P-Bass, Jazz Bass</p>
          </div>
          
          <div className="relative">
            <img 
              src="@assets/ChatGPT Image Jun 24, 2025, 08_34_42 PM_button_1750769309931.png" 
              alt="Hand drawing electric guitar design on paper" 
              className="w-full h-64 object-cover rounded-xl shadow-2xl" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <Button 
                className="bg-guitar-accent hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => setLocation('/customize')}
              >
                Start Designing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fender Gallery */}
      <section className="px-4 py-6">
        <h3 className="text-2xl font-bold mb-6">Fender Models</h3>
        <div className="grid grid-cols-2 gap-4">
          {inspirationFenders.map((fender, index) => (
            <div key={index} className="relative">
              <img 
                src={fender.image} 
                alt={fender.title}
                className="w-full h-48 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white p-2 rounded-lg">
                <p className="text-sm font-medium text-center">{fender.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4">
        <Button 
          className="bg-guitar-accent hover:bg-red-600 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-bounce-subtle"
          onClick={() => setLocation('/customize')}
        >
          <Palette className="text-xl" />
        </Button>
      </div>
    </div>
  );
}
