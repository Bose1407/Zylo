
import { ethers } from 'ethers';

// Interface for NFT metadata
export interface NFTMetadata {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  additionalImages?: string[]; // Added additionalImages as optional string array
  creator: string;
  owner: string;
  price: string;
  createdAt: number;
  history: OwnershipRecord[];
}

// Interface for ownership history
export interface OwnershipRecord {
  owner: string;
  acquiredAt: number;
  price: string;
}

// Mock database for NFTs
let mockNFTs: NFTMetadata[] = [
  {
    id: "1",
    title: "Abstract Harmony",
    description: "A vibrant exploration of color and form, creating a harmony of abstract elements.",
    imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1548546738-8509cb246ed3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ],
    creator: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    owner: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    price: "0.5",
    createdAt: Date.now() - 1000000,
    history: [
      {
        owner: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        acquiredAt: Date.now() - 1000000,
        price: "0.5"
      }
    ]
  },
  {
    id: "2",
    title: "Digital Dreamscape",
    description: "A surreal digital landscape that explores the boundary between reality and dreams.",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ],
    creator: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF",
    owner: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF",
    price: "0.75",
    createdAt: Date.now() - 2000000,
    history: [
      {
        owner: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF",
        acquiredAt: Date.now() - 2000000,
        price: "0.75"
      }
    ]
  },
  {
    id: "3",
    title: "Neon Cityscape",
    description: "A futuristic city bathed in neon lights, capturing the essence of cyberpunk aesthetics.",
    imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ],
    creator: "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9",
    owner: "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9",
    price: "1.2",
    createdAt: Date.now() - 3000000,
    history: [
      {
        owner: "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9",
        acquiredAt: Date.now() - 3000000,
        price: "1.2"
      }
    ]
  },
  {
    id: "4",
    title: "Cosmic Journey",
    description: "An exploration of space and cosmos, representing the vastness of the universe.",
    imageUrl: "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ],
    creator: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    owner: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    price: "0.85",
    createdAt: Date.now() - 4000000,
    history: [
      {
        owner: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
        acquiredAt: Date.now() - 4000000,
        price: "0.85"
      }
    ]
  },
  {
    id: "5",
    title: "Natural Serenity",
    description: "A peaceful landscape showcasing the beauty of nature and tranquility.",
    imageUrl: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ],
    creator: "0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c",
    owner: "0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c",
    price: "0.65",
    createdAt: Date.now() - 5000000,
    history: [
      {
        owner: "0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c",
        acquiredAt: Date.now() - 5000000,
        price: "0.65"
      }
    ]
  },
  {
    id: "6",
    title: "Digital Revolution",
    description: "A representation of technology's impact on modern society through abstract digital art.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ],
    creator: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    owner: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF",
    price: "0.95",
    createdAt: Date.now() - 6000000,
    history: [
      {
        owner: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        acquiredAt: Date.now() - 6000000,
        price: "0.90"
      },
      {
        owner: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF",
        acquiredAt: Date.now() - 5500000,
        price: "0.95"
      }
    ]
  },
  {
    id: "7",
    title: "Creative Workspace",
    description: "A modern digital interpretation of productivity and creativity in the workspace.",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ],
    creator: "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9",
    owner: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    price: "1.05",
    createdAt: Date.now() - 7000000,
    history: [
      {
        owner: "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9",
        acquiredAt: Date.now() - 7000000,
        price: "1.00"
      },
      {
        owner: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
        acquiredAt: Date.now() - 6500000,
        price: "1.05"
      }
    ]
  },
  {
    id: "8",
    title: "Technological Innovation",
    description: "An artistic celebration of technological breakthroughs and innovation.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1561883088-039e53143d73?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ],
    creator: "0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c",
    owner: "0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c",
    price: "0.88",
    createdAt: Date.now() - 8000000,
    history: [
      {
        owner: "0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c",
        acquiredAt: Date.now() - 8000000,
        price: "0.88"
      }
    ]
  }
];

// Get all NFTs
export const getAllNFTs = (): NFTMetadata[] => {
  return mockNFTs;
};

// Get NFT by ID
export const getNFTById = (id: string): NFTMetadata | undefined => {
  return mockNFTs.find(nft => nft.id === id);
};

// Get NFTs by creator
export const getNFTsByCreator = (creator: string): NFTMetadata[] => {
  return mockNFTs.filter(nft => nft.creator.toLowerCase() === creator.toLowerCase());
};

// Get NFTs by owner
export const getNFTsByOwner = (owner: string): NFTMetadata[] => {
  return mockNFTs.filter(nft => nft.owner.toLowerCase() === owner.toLowerCase());
};

// Create a new NFT (mint)
export const createNFT = (
  title: string,
  description: string,
  imageUrl: string,
  creator: string,
  price: string,
  additionalImages?: string[]
): NFTMetadata => {
  const newNFT: NFTMetadata = {
    id: ethers.utils.id(title + creator + Date.now()).slice(0, 42),
    title,
    description,
    imageUrl,
    additionalImages,
    creator,
    owner: creator, // Initially, creator is the owner
    price,
    createdAt: Date.now(),
    history: [
      {
        owner: creator,
        acquiredAt: Date.now(),
        price
      }
    ]
  };
  
  mockNFTs.push(newNFT);
  return newNFT;
};

// Purchase an NFT
export const purchaseNFT = (id: string, buyer: string, price: string): NFTMetadata | null => {
  const nftIndex = mockNFTs.findIndex(nft => nft.id === id);
  
  if (nftIndex === -1) {
    return null;
  }
  
  const nft = { ...mockNFTs[nftIndex] };
  
  // Add transaction to history
  nft.history.push({
    owner: buyer,
    acquiredAt: Date.now(),
    price
  });
  
  // Update owner
  nft.owner = buyer;
  nft.price = price;
  
  // Update in "database"
  mockNFTs[nftIndex] = nft;
  
  return nft;
};

// Search NFTs by title or description
export const searchNFTs = (query: string): NFTMetadata[] => {
  query = query.toLowerCase();
  return mockNFTs.filter(
    nft => nft.title.toLowerCase().includes(query) || 
           nft.description.toLowerCase().includes(query)
  );
};