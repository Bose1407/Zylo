
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NFTGrid } from "@/components/NFTGrid";
import { NFTMetadata, getAllNFTs } from "@/services/nftService";

const Index = () => {
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        // Simulate network delay
        setTimeout(() => {
          const allNfts = getAllNFTs();
          setNfts(allNfts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 px-4 md:py-24 bg-gradient-to-b from-nft-dark to-background">
          <div className="container max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Digital Art Marketplace
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Mint, buy, and collect digital artwork as NFTs on the blockchain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#browse">Explore Artwork</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/create">Create NFT</a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Browse Section */}
        <section id="browse" className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Browse Artwork</h2>
            <NFTGrid nfts={nfts} loading={loading} emptyMessage="No artwork available at the moment" />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why ArtBlockNFT?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Protect Your Art</h3>
                <p className="text-muted-foreground">
                  Secure your digital creations on the blockchain, preventing theft and ensuring proper attribution.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Sell Directly</h3>
                <p className="text-muted-foreground">
                  Connect with buyers without intermediaries and retain more of your sales revenue.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Track Ownership</h3>
                <p className="text-muted-foreground">
                  Every transaction is recorded on the blockchain, creating a transparent history of ownership.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
