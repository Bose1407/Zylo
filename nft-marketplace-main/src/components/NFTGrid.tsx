
import { NFTCard, NFTCardSkeleton } from "@/components/NFTCard";
import { NFTMetadata } from "@/services/nftService";

interface NFTGridProps {
  nfts: NFTMetadata[];
  loading?: boolean;
  emptyMessage?: string;
}

export function NFTGrid({ nfts, loading = false, emptyMessage = "No NFTs found" }: NFTGridProps) {
  // Generate array of length 8 for loading skeletons
  const skeletons = Array.from({ length: 8 }, (_, i) => i);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skeletons.map((index) => (
          <NFTCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <h3 className="text-xl font-semibold mb-2">Nothing to display</h3>
        <p className="text-muted-foreground text-center">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
}
