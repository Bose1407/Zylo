
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NFTMetadata } from "@/services/nftService";
import { Skeleton } from "@/components/ui/skeleton";
import { ethers } from "ethers";
import { Image } from "lucide-react";

interface NFTCardProps {
  nft: NFTMetadata;
}

export function NFTCard({ nft }: NFTCardProps) {
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const hasMultipleImages = nft.additionalImages && nft.additionalImages.length > 0;

  return (
    <Link to={`/nft/${nft.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:translate-y-[-5px]">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={nft.imageUrl}
            alt={nft.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
          />
          {hasMultipleImages && (
            <div className="absolute top-2 right-2 bg-background/80 p-1 rounded-md">
              <Image size={16} className="text-primary" />
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1">{nft.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{nft.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="text-sm">
            <span className="text-muted-foreground">Creator: </span>
            <span className="font-medium">{truncateAddress(nft.creator)}</span>
          </div>
          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
            {ethers.utils.formatEther(ethers.utils.parseEther(nft.price))} ETH
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function NFTCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-1/4" />
      </CardFooter>
    </Card>
  );
}
