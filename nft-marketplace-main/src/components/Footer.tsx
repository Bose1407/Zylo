
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">ArtBlock</span>
              <span className="text-xl font-bold ml-1">NFT</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-1">
              A blockchain marketplace for digital artists
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <nav className="flex flex-col md:flex-row gap-2 md:gap-6">
              <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
                Explore
              </Link>
              <Link to="/create" className="text-sm font-medium transition-colors hover:text-primary">
                Create
              </Link>
              <Link to="/my-collection" className="text-sm font-medium transition-colors hover:text-primary">
                My Collection
              </Link>
            </nav>
            
            <div className="text-center md:text-right text-sm text-muted-foreground">
              <p>© 2023 ArtBlockNFT. All rights reserved.</p>
              <p className="mt-1">Powered by Ethereum</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
