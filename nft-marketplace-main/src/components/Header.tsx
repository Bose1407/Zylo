
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWeb3 } from "@/contexts/Web3Context";
import { Wallet, Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { account, connectWallet, disconnectWallet, isConnecting, isConnected } = useWeb3();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">ArtBlock</span>
            <span className="text-xl font-bold ml-1">NFT</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Explore
          </Link>
          <Link to="/create" className="text-sm font-medium transition-colors hover:text-primary">
            Create
          </Link>
          {isConnected && (
            <Link to="/my-collection" className="text-sm font-medium transition-colors hover:text-primary">
              My Collection
            </Link>
          )}
        </nav>

        {/* Desktop Search & Wallet */}
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search art..."
              className="w-[200px] pl-8 bg-muted/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          {isConnected ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={disconnectWallet}
              >
                <Wallet className="h-4 w-4" />
                {account && truncateAddress(account)}
              </Button>
            </div>
          ) : (
            <Button 
              className="gap-2" 
              onClick={connectWallet} 
              disabled={isConnecting}
            >
              <Wallet className="h-4 w-4" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 space-y-4 border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search art..."
              className="w-full pl-8 bg-muted/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          <nav className="space-y-2">
            <Link 
              to="/" 
              className="block p-2 hover:bg-muted/50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link 
              to="/create" 
              className="block p-2 hover:bg-muted/50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Create
            </Link>
            {isConnected && (
              <Link 
                to="/my-collection" 
                className="block p-2 hover:bg-muted/50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                My Collection
              </Link>
            )}
          </nav>
          
          {isConnected ? (
            <Button
              variant="outline"
              className="w-full gap-2 justify-center"
              onClick={() => {
                disconnectWallet();
                setIsMenuOpen(false);
              }}
            >
              <Wallet className="h-4 w-4" />
              {account && truncateAddress(account)}
            </Button>
          ) : (
            <Button 
              className="w-full gap-2 justify-center" 
              onClick={() => {
                connectWallet();
                setIsMenuOpen(false);
              }}
              disabled={isConnecting}
            >
              <Wallet className="h-4 w-4" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
