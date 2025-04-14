
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useWeb3 } from "@/contexts/Web3Context";
import { createNFT } from "@/services/nftService";
import { Image, Upload, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CreateNFT = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { account, isConnected, connectWallet } = useWeb3();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Generate a temporary preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // In a real app, we would upload the file to IPFS or a storage service
    // For this mock, we'll just use the URL directly
    setImageUrl(url);
  };

  const handleAdditionalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Generate a temporary preview URL
    const url = URL.createObjectURL(file);
    
    // Add to additional images
    setAdditionalImages(prev => [...prev, url]);
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handlePlaceholderImageSelect = () => {
    // Use a random placeholder image
    const randomId = Math.floor(Math.random() * 1000);
    const url = `https://source.unsplash.com/random/600x600/?art,${randomId}`;
    setPreviewUrl(url);
    setImageUrl(url);
  };

  const handleAddRandomAdditionalImages = () => {
    // Add 2 random additional images
    const randomIds = [
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 1000)
    ];
    
    const urls = randomIds.map(id => 
      `https://source.unsplash.com/random/600x600/?art,${id}`
    );
    
    setAdditionalImages(prev => [...prev, ...urls]);
  };

  const handleCreateNFT = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to create an NFT",
        variant: "destructive",
      });
      return;
    }
    
    if (!title || !description || !price || !imageUrl) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Validate price
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum <= 0) {
        throw new Error("Invalid price");
      }
      
      // Simulate minting delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create the NFT
      const newNFT = createNFT(
        title,
        description,
        imageUrl,
        account,
        price.toString(),
        additionalImages.length > 0 ? additionalImages : undefined
      );
      
      toast({
        title: "NFT Created!",
        description: `You've successfully minted "${title}"`,
      });
      
      // Navigate to the newly created NFT
      navigate(`/nft/${newNFT.id}`);
    } catch (error) {
      console.error("Error creating NFT:", error);
      toast({
        title: "Creation failed",
        description: "There was an error creating your NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container max-w-4xl py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Create New NFT</h1>
        
        {!isConnected ? (
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle>Connect Wallet</CardTitle>
              <CardDescription>
                You need to connect your wallet to create NFTs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={connectWallet}>
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Mint Your Artwork</CardTitle>
              <CardDescription>
                Fill in the details about your digital artwork to create an NFT
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateNFT} className="space-y-6">
                {/* Artwork Upload/Preview */}
                <div className="space-y-2">
                  <Label htmlFor="image">Artwork Main Image</Label>
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 text-center">
                    {previewUrl ? (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mx-auto max-h-64 rounded-md"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            setPreviewUrl("");
                            setImageUrl("");
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4">
                        <Image className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop an image, or click to browse
                        </p>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            asChild
                          >
                            <label htmlFor="image-upload" className="cursor-pointer">
                              Choose File
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                              />
                            </label>
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handlePlaceholderImageSelect}
                          >
                            Use Placeholder
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Additional Images */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="additional-images">Additional Images (Optional)</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddRandomAdditionalImages}
                    >
                      <Plus size={16} className="mr-1" />
                      Add Random Images
                    </Button>
                  </div>
                  
                  {/* Display additional images */}
                  {additionalImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {additionalImages.map((url, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={url} 
                            alt={`Additional ${index + 1}`} 
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveAdditionalImage(index)}
                          >
                            <X size={12} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <label htmlFor="additional-image-upload" className="cursor-pointer">
                        <Plus size={16} className="mr-1" />
                        Add Image
                        <input
                          id="additional-image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAdditionalImageChange}
                        />
                      </label>
                    </Button>
                    
                    {additionalImages.length > 0 && (
                      <Badge variant="outline">
                        {additionalImages.length} additional image{additionalImages.length !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter the title of your artwork"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your artwork..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                
                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price">Price (ETH)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.05"
                    min="0.0001"
                    step="0.0001"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Creating NFT..." : "Create NFT"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateNFT;
