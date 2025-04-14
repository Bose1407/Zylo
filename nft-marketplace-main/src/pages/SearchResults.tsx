
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NFTGrid } from "@/components/NFTGrid";
import { Button } from "@/components/ui/button";
import { NFTMetadata, searchNFTs } from "@/services/nftService";
import { SearchX } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<NFTMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }
      
      try {
        // Simulate network delay
        setTimeout(() => {
          const searchResults = searchNFTs(query);
          setResults(searchResults);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error searching NFTs:", error);
        setLoading(false);
      }
    };

    setLoading(true);
    fetchResults();
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-6xl py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Search Results</h1>
          {query && <p className="text-muted-foreground mt-2">Showing results for "{query}"</p>}
        </div>
        
        {!query ? (
          <div className="flex flex-col items-center justify-center py-12">
            <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Search Query</h2>
            <p className="text-muted-foreground text-center mb-6">
              Please enter a search term to find NFTs
            </p>
            <Button asChild>
              <a href="/">Browse All NFTs</a>
            </Button>
          </div>
        ) : (
          <NFTGrid
            nfts={results}
            loading={loading}
            emptyMessage={`No NFTs found matching "${query}"`}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
