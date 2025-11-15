import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadSection } from "@/components/UploadSection";
import { ResultsSection } from "@/components/ResultsSection";
import { Sparkles, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-image.jpg";

// Mock product data with unique images for each product
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Modern Minimalist Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&h=500&fit=crop",
    similarity: 95,
  },
  {
    id: "2",
    name: "Scandinavian Wooden Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?w=500&h=500&fit=crop",
    similarity: 94,
  },
  {
    id: "3",
    name: "Designer Office Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&h=500&fit=crop",
    similarity: 92,
  },
  {
    id: "4",
    name: "Contemporary Dining Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=500&fit=crop",
    similarity: 91,
  },
  {
    id: "5",
    name: "Mid-Century Accent Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500&h=500&fit=crop",
    similarity: 90,
  },
  {
    id: "6",
    name: "Velvet Lounge Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop",
    similarity: 89,
  },
  {
    id: "7",
    name: "Ergonomic Desk Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=500&fit=crop",
    similarity: 88,
  },
  {
    id: "8",
    name: "Industrial Metal Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=500&h=500&fit=crop",
    similarity: 87,
  },
  {
    id: "9",
    name: "Leather Executive Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=500&fit=crop",
    similarity: 86,
  },
  {
    id: "10",
    name: "Vintage Wooden Armchair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1506326426992-32b61983f2fd?w=500&h=500&fit=crop",
    similarity: 85,
  },
  {
    id: "11",
    name: "Plastic Designer Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&h=500&fit=crop",
    similarity: 84,
  },
  {
    id: "12",
    name: "Rattan Wicker Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
    similarity: 83,
  },
  {
    id: "13",
    name: "Gaming Racing Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&h=500&fit=crop",
    similarity: 82,
  },
  {
    id: "14",
    name: "Folding Camping Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&h=500&fit=crop",
    similarity: 81,
  },
  {
    id: "15",
    name: "Upholstered Dining Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=500&h=500&fit=crop",
    similarity: 80,
  },
  {
    id: "16",
    name: "Outdoor Patio Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&h=500&fit=crop",
    similarity: 79,
  },
  {
    id: "17",
    name: "Bar Stool Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=500&h=500&fit=crop",
    similarity: 78,
  },
  {
    id: "18",
    name: "Kids Study Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500&h=500&fit=crop",
    similarity: 77,
  },
  {
    id: "19",
    name: "Rocking Chair Classic",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&h=500&fit=crop",
    similarity: 76,
  },
  {
    id: "20",
    name: "Bean Bag Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&h=500&fit=crop",
    similarity: 75,
  },
  {
    id: "21",
    name: "Conference Room Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=500&fit=crop",
    similarity: 74,
  },
  {
    id: "22",
    name: "Swivel Desk Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&h=500&fit=crop",
    similarity: 73,
  },
  {
    id: "23",
    name: "Accent Armchair Blue",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&h=500&fit=crop",
    similarity: 72,
  },
  {
    id: "24",
    name: "Mesh Office Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=500&h=500&fit=crop",
    similarity: 71,
  },
  {
    id: "25",
    name: "Windsor Wooden Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=500&h=500&fit=crop",
    similarity: 70,
  },
  {
    id: "26",
    name: "Tufted Velvet Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
    similarity: 89,
  },
  {
    id: "27",
    name: "Minimalist Stool",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?w=500&h=500&fit=crop&q=80&sat=1.2",
    similarity: 88,
  },
  {
    id: "28",
    name: "Lounge Chaise Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    similarity: 87,
  },
  {
    id: "29",
    name: "Reading Nook Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500&h=500&fit=crop",
    similarity: 86,
  },
  {
    id: "30",
    name: "Modern Wire Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&h=500&fit=crop",
    similarity: 85,
  },
  {
    id: "31",
    name: "Cushioned Bench Seat",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&h=500&fit=crop",
    similarity: 84,
  },
  {
    id: "32",
    name: "High Back Office Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500&h=500&fit=crop",
    similarity: 83,
  },
  {
    id: "33",
    name: "Wooden Spindle Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500&h=500&fit=crop&q=80&brightness=1.1",
    similarity: 82,
  },
  {
    id: "34",
    name: "Art Deco Armchair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1586158291800-2665f07bba79?w=500&h=500&fit=crop",
    similarity: 81,
  },
  {
    id: "35",
    name: "Stackable Plastic Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?w=500&h=500&fit=crop&sat=0.8",
    similarity: 80,
  },
  {
    id: "36",
    name: "Egg-Shaped Pod Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?w=500&h=500&fit=crop",
    similarity: 79,
  },
  {
    id: "37",
    name: "Industrial Stool",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1574096079513-d8259312b785?w=500&h=500&fit=crop",
    similarity: 78,
  },
  {
    id: "38",
    name: "Wingback Reading Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=500&h=500&fit=crop",
    similarity: 77,
  },
  {
    id: "39",
    name: "Adjustable Task Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=500&fit=crop",
    similarity: 76,
  },
  {
    id: "40",
    name: "Scandinavian Lounge",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1598300042791-e46eaeeb4a71?w=500&h=500&fit=crop",
    similarity: 75,
  },
  {
    id: "41",
    name: "Bamboo Eco Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500&h=500&fit=crop&hue=20",
    similarity: 74,
  },
  {
    id: "42",
    name: "Vintage School Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=500&fit=crop",
    similarity: 73,
  },
  {
    id: "43",
    name: "Ergonomic Kneeling Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500&h=500&fit=crop&brightness=0.9",
    similarity: 72,
  },
  {
    id: "44",
    name: "Padded Folding Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&h=500&fit=crop&sat=0.7",
    similarity: 71,
  },
  {
    id: "45",
    name: "Luxury Leather Recliner",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=500&h=500&fit=crop",
    similarity: 70,
  },
  {
    id: "46",
    name: "Cafe Bistro Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&h=500&fit=crop",
    similarity: 69,
  },
  {
    id: "47",
    name: "Modern Acrylic Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&h=500&fit=crop&brightness=1.1",
    similarity: 68,
  },
  {
    id: "48",
    name: "Banquet Hall Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1618220924273-021e8f344e82?w=500&h=500&fit=crop",
    similarity: 67,
  },
  {
    id: "49",
    name: "Director's Canvas Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500&h=500&fit=crop&brightness=0.95",
    similarity: 66,
  },
  {
    id: "50",
    name: "Meditation Floor Chair",
    category: "Furniture",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop&sat=0.8&brightness=1.05",
    similarity: 65,
  },
];

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFindSimilar = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload or paste an image URL first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
      toast({
        title: "Search complete!",
        description: `Found ${MOCK_PRODUCTS.length} similar products.`,
      });
    }, 1500);
  };

  const handleNewSearch = () => {
    setShowResults(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header
        className={`relative transition-all duration-700 ${
          showResults ? "py-8" : "py-20"
        }`}
        style={{
          backgroundImage: showResults ? "none" : `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!showResults && (
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elevated">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TwinShot Finder
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {showResults
                ? "Your visual search results"
                : "Drop an image — we'll find matching products in seconds."}
            </p>
          </div>

          {showResults && (
            <div className="text-center">
              <Button onClick={handleNewSearch} variant="outline" size="lg" className="gap-2">
                <Search className="w-4 h-4" />
                New Search
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {!showResults ? (
          <div className="space-y-8">
            <UploadSection onImageSelect={setSelectedImage} />
            
            {selectedImage && (
              <div className="text-center animate-fade-in">
                <Button
                  onClick={handleFindSimilar}
                  size="lg"
                  className="gap-2 shadow-elevated hover:shadow-xl transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Find Similar Products
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <ResultsSection results={MOCK_PRODUCTS} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Alternative names: <span className="font-medium">MatchPix</span> •{" "}
            <span className="font-medium">VisualMate</span> •{" "}
            <span className="font-medium">LookAlike</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
