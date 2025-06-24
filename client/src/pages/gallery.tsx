import NavigationHeader from "@/components/navigation-header";

export default function Gallery() {
  const fenderGallery = [
    {
      url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=500",
      title: "Fender Stratocaster",
      description: "Classic 3-tone sunburst finish with maple neck"
    },
    {
      url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=500",
      title: "Fender Telecaster",
      description: "Butterscotch blonde finish with ash body"
    },
    {
      url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=500",
      title: "Fender Jazzmaster",
      description: "Surf green finish with offset body design"
    },
    {
      url: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=500",
      title: "Fender Precision Bass",
      description: "Classic P-Bass with split-coil pickup"
    },
    {
      url: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=500",
      title: "Fender Jazz Bass",
      description: "Olympic white finish with dual single-coil pickups"
    },
    {
      url: "https://images.unsplash.com/photo-1460036521480-ff49c08c2781?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800",
      title: "Custom Fender Build",
      description: "Personalized configuration for your unique style"
    }
  ];

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Fender Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fenderGallery.map((image, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
                <p className="text-gray-600 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
