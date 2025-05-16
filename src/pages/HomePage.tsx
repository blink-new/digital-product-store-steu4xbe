import { useState } from 'react'
import { Download, ShoppingBag, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import Section from '../components/Section'

const featuredProducts = products.slice(0, 4)
const categories = Array.from(new Set(products.map(product => product.category)))

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory)
    
  return (
    <div>
      {/* Hero section */}
      <Section 
        className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 section-hero"
        containerClassName="flex flex-col items-center text-center"
      >
        <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">Premium Digital Products for Creators</h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Discover high-quality templates, assets, and tools to accelerate your projects and enhance your creative workflow.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="gap-2">
            <ShoppingBag className="h-5 w-5" />
            Browse Products
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            Learn More
          </Button>
        </div>
      </Section>
      
      {/* Featured products */}
      <Section>
        <h2 className="mb-8 text-3xl font-bold">Featured Products</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>
      
      {/* Benefits section */}
      <Section className="bg-primary/5">
        <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Our Digital Products</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Premium Quality</h3>
            <p className="mt-2 text-muted-foreground">
              All our products are crafted with attention to detail and meet the highest quality standards.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Download className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Instant Download</h3>
            <p className="mt-2 text-muted-foreground">
              Get immediate access to your purchased products. No waiting time, start using right away.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Secure Payments</h3>
            <p className="mt-2 text-muted-foreground">
              Shop with confidence. Our secure checkout process protects your payment information.
            </p>
          </div>
        </div>
      </Section>
      
      {/* All products section */}
      <Section>
        <h2 className="mb-8 text-3xl font-bold">All Products</h2>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger 
              value="all" 
              onClick={() => setActiveCategory('all')}
            >
              All
            </TabsTrigger>
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Section>
      
      {/* Call to action */}
      <Section 
        className="bg-primary" 
        containerClassName="flex flex-col items-center text-center"
      >
        <h2 className="text-3xl font-bold text-primary-foreground">Ready to Enhance Your Projects?</h2>
        <p className="mt-4 max-w-2xl text-primary-foreground/90">
          Browse our collection of premium digital products and take your work to the next level.
        </p>
        <Button size="lg" variant="secondary" className="mt-8">
          Shop Now
        </Button>
      </Section>
    </div>
  )
}

export default HomePage