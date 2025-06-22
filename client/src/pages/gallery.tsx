import NavigationHeader from "@/components/navigation-header";

export default function Gallery() {
  const galleryImages = [
    {
      url: "https://pixabay.com/get/gd0f1a493a0f40e6b3ecb95513f155ab43175de80192292afe86f7b41cce6ccf4278386e0eed82d2ba3f1f0e987406a0aec592c8ee8629097a6160f2ad78ff08d_1280.jpg",
      title: "Vintage Stratocaster",
      description: "Classic sunburst finish with maple neck"
    },
    {
      url: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
      title: "Gibson Les Paul",
      description: "Rich mahogany body with humbucker pickups"
    },
    {
      url: "https://images.unsplash.com/photo-1526142684086-7ebd69df27a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=500",
      title: "Modern Electric",
      description: "Contemporary design with stage lighting"
    },
    {
      url: "https://pixabay.com/get/g43373159cd722d04f0375a33752a4b205805b74031be7441a52ef869b3fec56bc911d5b9c4d3d6e0d0d02aceb9988e60eda6426ec51fcff7c9ec1271ba99a185_1280.jpg",
      title: "Studio Setup",
      description: "Professional recording environment"
    },
    {
      url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: "Premium Craftsmanship",
      description: "Hand-crafted with attention to detail"
    },
    {
      url: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
      title: "Custom Design",
      description: "Unique configuration for your style"
    }
  ];

  return (
    <div className="min-h-screen">
      <NavigationHeader />
      
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Guitar Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryImages.map((image, index) => (
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
