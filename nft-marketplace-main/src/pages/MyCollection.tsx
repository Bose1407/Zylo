
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NFTGrid } from "@/components/NFTGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWeb3 } from "@/contexts/Web3Context";
import { NFTMetadata, getNFTsByCreator, getNFTsByOwner } from "@/services/nftService";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const MyCollection = () => {
  const [createdNFTs, setCreatedNFTs] = useState<NFTMetadata[]>([]);
  const [ownedNFTs, setOwnedNFTs] = useState<NFTMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { account, isConnected, connectWallet } = useWeb3();

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!account) {
        setLoading(false);
        return;
      }
      
      try {
        // Simulate network delay
        setTimeout(() => {
          const created = getNFTsByCreator(account);
          const owned = getNFTsByOwner(account);
          
          setCreatedNFTs(created);
          setOwnedNFTs(owned);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [account]);

  if (!isConnected) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 container max-w-6xl py-12 px-4 flex flex-col items-center justify-center">
          <Wallet className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            You need to connect your wallet to view your collection of created and owned NFTs.
          </p>
          <Button onClick={connectWallet}>Connect Wallet</Button>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-6xl py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">My Collection</h1>
        
        <Tabs defaultValue="owned" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="owned">Owned NFTs</TabsTrigger>
            <TabsTrigger value="created">Created NFTs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="owned">
            <NFTGrid
              nfts={ownedNFTs}
              loading={loading}
              emptyMessage="You don't own any NFTs yet. Browse the marketplace to find something you like!"
            />
          </TabsContent>
          
          <TabsContent value="created">
            <NFTGrid
              nfts={createdNFTs}
              loading={loading}
              emptyMessage="You haven't created any NFTs yet. Click 'Create' to mint your first NFT!"
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyCollection;
