
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import BodifyLogo from './BodifyLogo';

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.17-1.94-1.17-3.338h-3.097v13.317c0 2.345-1.902 4.25-4.25 4.25s-4.25-1.905-4.25-4.25 1.902-4.25 4.25-4.25c.468 0 .92.077 1.34.218V7.242a7.336 7.336 0 0 0-1.34-.126c-4.041 0-7.317 3.276-7.317 7.317s3.276 7.317 7.317 7.317 7.317-3.276 7.317-7.317V9.321a9.23 9.23 0 0 0 5.532 1.852V8.106a6.135 6.135 0 0 1-2.752-1.454c-.446-.37-.849-.79-1.17-1.242-.321-.451-.564-.949-.681-1.848z"/>
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b",
      isScrolled ? "bg-black/90 backdrop-blur-lg py-3 shadow-2xl border-border" : "bg-transparent py-5 border-transparent"
    )}>
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link to="/" className="flex items-center group">
          <motion.div whileHover={{ scale: 1.06 }}>
            <BodifyLogo className="h-10 w-auto" />
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-primary bg-transparent data-[state=open]:bg-muted/80 transition-colors">
                  Product
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#181824]/95 backdrop-blur-lg border border-[#232946] rounded-xl">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link to="/" className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-[#a259ff]/30 via-[#ff5ecf]/30 to-[#ff8800]/30 p-6 no-underline outline-none focus:shadow-md hover:bg-gradient-to-b hover:from-[#a259ff]/40 hover:to-[#ff8800]/40 transition-all">
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            AI Fitness Coach
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Personalized workouts and meal plans powered by AI
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem to="/get-started" title="Get Started">
                      Start your fitness journey today
                    </ListItem>
                    <ListItem to="/#features" title="Features">
                      Explore all Bodify features
                    </ListItem>
                    <ListItem to="/#pricing" title="Pricing">
                      Simple, affordable pricing
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground hover:text-primary bg-transparent data-[state=open]:bg-muted/80">
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-[#181824]/95 backdrop-blur-lg border border-[#232946] rounded-xl">
                    <ListItem to="/about" title="About">
                      Learn about our mission
                    </ListItem>
                    <ListItem to="/team" title="Team">
                      Meet our expert team
                    </ListItem>
                    <ListItem to="/careers" title="Careers">
                      Join our growing team
                    </ListItem>
                    <ListItem to="/contact" title="Contact">
                      Get in touch with us
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/faq" className="text-foreground hover:text-primary px-4 py-2 rounded-lg hover:bg-muted/80 transition-all">
                    FAQ
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-4 ml-8">
            <a href="https://instagram.com/bodify.inc" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-card/70 border border-primary/20 text-foreground hover:text-primary hover:bg-card/90 hover:border-primary/40 shadow-sm transition-all">
              <Instagram size={20} />
            </a>
            <a href="https://tiktok.com/@bodify_inc" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-card/70 border border-primary/20 text-foreground hover:text-primary hover:bg-card/90 hover:border-primary/40 shadow-sm transition-all">
              <TikTokIcon />
            </a>
              <Link to="/login">
                <Button variant="outline" className="rounded-lg px-6">
                  Log in
                </Button>
              </Link>
            <Link to="/get-started">
              <Button className="btn-primary rounded-lg px-6 shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" className="text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

interface ListItemProps {
  to: string;
  title: string;
  children: React.ReactNode;
}

const ListItem = ({ to, title, children }: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10"
        >
          <div className="text-sm font-medium leading-none text-white">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-white/70">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export default Navbar;
