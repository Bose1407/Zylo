
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ethers } from "ethers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Context";
import { NFTMetadata, getNFTById, purchaseNFT } from "@/services/nftService";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Image } from "lucide-react";

const NFTDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [nft, setNft] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const { account, isConnected, connectWallet } = useWeb3();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNFT = async () => {
      if (!id) return;
      
      try {
        // Simulate network delay
        setTimeout(() => {
          const nftData = getNFTById(id);
          if (nftData) {
            setNft(nftData);
          }
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching NFT:", error);
        setLoading(false);
      }
    };

    fetchNFT();
  }, [id]);

  const handlePurchase = async () => {
    if (!nft || !account || !isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to purchase this NFT",
        variant: "destructive",
      });
      return;
    }

    if (nft.owner.toLowerCase() === account.toLowerCase()) {
      toast({
        title: "Cannot purchase your own NFT",
        description: "You already own this NFT",
        variant: "destructive",
      });
      return;
    }

    setPurchasing(true);
    try {
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const updatedNFT = purchaseNFT(nft.id, account, nft.price);
      
      if (updatedNFT) {
        setNft(updatedNFT);
        toast({
          title: "Purchase successful!",
          description: `You are now the owner of ${nft.title}`,
        });
      } else {
        throw new Error("Failed to purchase NFT");
      }
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      toast({
        title: "Purchase failed",
        description: "There was an error purchasing this NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container max-w-6xl py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container max-w-6xl py-8 px-4 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">NFT Not Found</h1>
          <p className="text-muted-foreground mb-6">The NFT you're looking for doesn't exist or was removed.</p>
          <Button onClick={() => navigate('/')}>Go Back to Marketplace</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const isOwner = account && nft.owner.toLowerCase() === account.toLowerCase();
  const hasMultipleImages = nft.additionalImages && nft.additionalImages.length > 0;
  
  // All images includes the main image plus any additional images
  const allImages = hasMultipleImages ? [nft.imageUrl, ...nft.additionalImages] : [nft.imageUrl];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-6xl py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* NFT Image(s) */}
          <div className="rounded-lg overflow-hidden border border-border">
            {hasMultipleImages ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {allImages.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="rounded-lg overflow-hidden aspect-square">
                          <img 
                            src={img} 
                            alt={`${nft.title} - Image ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            ) : (
              <img 
                src={nft.imageUrl} 
                alt={nft.title} 
                className="w-full h-auto object-cover"
              />
            )}

            {/* Image Counter */}
            {hasMultipleImages && (
              <div className="mt-2 flex justify-center gap-1">
                {allImages.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full ${
                      idx === 0 ? 'bg-primary' : 'bg-primary/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* NFT Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{nft.title}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <span>Created by </span>
                <Badge variant="outline" className="ml-1">
                  {truncateAddress(nft.creator)}
                </Badge>
              </div>
            </div>
            
            <p className="text-muted-foreground">{nft.description}</p>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="text-2xl font-bold">{ethers.utils.formatEther(ethers.utils.parseEther(nft.price))} ETH</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <Badge variant="outline">
                      {truncateAddress(nft.owner)}
                    </Badge>
                  </div>
                </div>
                
                {isConnected ? (
                  <Button 
                    className="w-full mt-4" 
                    disabled={purchasing || isOwner}
                    onClick={handlePurchase}
                  >
                    {purchasing 
                      ? "Processing..." 
                      : isOwner 
                        ? "You Own This NFT" 
                        : `Buy for ${ethers.utils.formatEther(ethers.utils.parseEther(nft.price))} ETH`}
                  </Button>
                ) : (
                  <Button 
                    className="w-full mt-4" 
                    onClick={connectWallet}
                  >
                    Connect Wallet to Purchase
                  </Button>
                )}
              </CardContent>
            </Card>
            
            {/* Ownership History */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Ownership History</h2>
              <div className="space-y-3">
                {nft.history.map((record, index) => (
                  <div key={index} className="bg-card p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">
                        {truncateAddress(record.owner)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(record.acquiredAt)}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="text-sm">
                      <span className="text-muted-foreground">Price: </span>
                      <span>{ethers.utils.formatEther(ethers.utils.parseEther(record.price))} ETH</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NFTDetail;
