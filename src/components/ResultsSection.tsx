import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  similarity: number;
}

interface ResultsSectionProps {
  results: Product[];
}

export const ResultsSection = ({ results }: ResultsSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "90+" | "80-90" | "70-80">("all");

  const filteredResults = results.filter((product) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "90+") return product.similarity >= 90;
    if (activeFilter === "80-90") return product.similarity >= 80 && product.similarity < 90;
    if (activeFilter === "70-80") return product.similarity >= 70 && product.similarity < 80;
    return true;
  });

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 90) return "text-secondary";
    if (similarity >= 80) return "text-primary";
    return "text-muted-foreground";
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-8 flex flex-wrap gap-3 justify-center">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          onClick={() => setActiveFilter("all")}
          className="gap-2"
        >
          All Results
          <Badge variant="secondary" className="ml-1">
            {results.length}
          </Badge>
        </Button>
        <Button
          variant={activeFilter === "90+" ? "default" : "outline"}
          onClick={() => setActiveFilter("90+")}
        >
          90%+ Match
        </Button>
        <Button
          variant={activeFilter === "80-90" ? "default" : "outline"}
          onClick={() => setActiveFilter("80-90")}
        >
          80-90% Match
        </Button>
        <Button
          variant={activeFilter === "70-80" ? "default" : "outline"}
          onClick={() => setActiveFilter("70-80")}
        >
          70-80% Match
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map((product, index) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="aspect-square bg-muted relative overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-background/90 backdrop-blur">
                  <span className={cn("font-bold", getSimilarityColor(product.similarity))}>
                    {product.similarity}%
                  </span>
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
          </Card>
        ))}
      </div>

      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No products match this filter range.
          </p>
        </div>
      )}
    </div>
  );
};
