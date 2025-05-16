import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Github } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold">DigitalMarket</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Premium digital products for creators, designers, and developers.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/#templates" className="text-muted-foreground transition-colors hover:text-primary">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/#ui-kits" className="text-muted-foreground transition-colors hover:text-primary">
                  UI Kits
                </Link>
              </li>
              <li>
                <Link to="/#fonts" className="text-muted-foreground transition-colors hover:text-primary">
                  Fonts
                </Link>
              </li>
              <li>
                <Link to="/#graphics" className="text-muted-foreground transition-colors hover:text-primary">
                  Graphics
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/#about" className="text-muted-foreground transition-colors hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-muted-foreground transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/#privacy" className="text-muted-foreground transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/#terms" className="text-muted-foreground transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-semibold">Subscribe to our newsletter</h4>
              <p className="mb-2 text-xs text-muted-foreground">Get the latest updates and offers.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-l-md border border-r-0 bg-background px-3 py-2 text-sm"
                />
                <button 
                  type="submit"
                  className="rounded-r-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {currentYear} DigitalMarket. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Link to="/#privacy" className="hover:text-primary">
                Privacy
              </Link>
              <Link to="/#terms" className="hover:text-primary">
                Terms
              </Link>
              <Link to="/#contact" className="hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer