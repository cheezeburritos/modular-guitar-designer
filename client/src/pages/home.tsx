import NavigationHeader from "@/components/navigation-header";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Guitar, Palette } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  const inspirationGuitars = [
    "https://pixabay.com/get/gd0f1a493a0f40e6b3ecb95513f155ab43175de80192292afe86f7b41cce6ccf4278386e0eed82d2ba3f1f0e987406a0aec592c8ee8629097a6160f2ad78ff08d_1280.jpg",
    "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
    "https://pixabay.com/get/g43373159cd722d04f0375a33752a4b205805b74031be7441a52ef869b3fec56bc911d5b9c4d3d6e0d0d02aceb9988e60eda6426ec51fcff7c9ec1271ba99a185_1280.jpg",
  ];

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-guitar-primary to-guitar-secondary text-white">
        <div className="px-4 py-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Design Your Dream Guitar</h2>
            <p className="text-gray-300 text-lg">Create a custom electric guitar tailored to your style</p>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Premium electric guitar showcase" 
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

      {/* Guitar Gallery */}
      <section className="px-4 py-6">
        <h3 className="text-2xl font-bold mb-6">Inspiration Gallery</h3>
        <div className="grid grid-cols-2 gap-4">
          {inspirationGuitars.map((imageUrl, index) => (
            <img 
              key={index}
              src={imageUrl} 
              alt={`Guitar inspiration ${index + 1}`}
              className="w-full h-48 object-cover rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
            />
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
