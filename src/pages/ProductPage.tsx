import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft, Check, FileText, Download, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'
import { getProductById, getRelatedProducts } from '../data/products'
import { Product, useCartStore } from '../store/cart'
import ProductCard from '../components/ProductCard'
import { Badge } from '../components/ui/badge'
import { toast } from 'sonner'
import Section from '../components/Section'
import Container from '../components/Container'

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  
  const { addItem, isInCart } = useCartStore()
  const alreadyInCart = product ? isInCart(product.id) : false
  
  useEffect(() => {
    if (!id) return

    // Simulate loading data
    setLoading(true)
    
    setTimeout(() => {
      const foundProduct = getProductById(id)
      
      if (foundProduct) {
        setProduct(foundProduct)
        setRelatedProducts(getRelatedProducts(foundProduct.category, foundProduct.id))
      }
      
      setLoading(false)
    }, 500)
  }, [id])
  
  const handleAddToCart = () => {
    if (product && !alreadyInCart) {
      addItem(product)
      toast.success(`${product.name} added to cart`)
    }
  }
  
  if (loading) {
    return (
      <Section centered={true}>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </Section>
    )
  }
  
  if (!product) {
    return (
      <Section centered={true}>
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
          <AlertCircle className="h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-2xl font-bold">Product Not Found</h2>
          <p className="mt-2 text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-6" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </div>
      </Section>
    )
  }
  
  return (
    <div>
      <Section>
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="flex items-center text-sm text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </div>
        
        {/* Product details */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product image */}
          <div className="rounded-lg border bg-background">
            <img 
              src={product.image} 
              alt={product.name} 
              className="aspect-square h-full w-full rounded-lg object-cover"
            />
          </div>
          
          {/* Product info */}
          <div className="flex flex-col">
            <Badge variant="outline" className="mb-2 w-fit">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-4 text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">File Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border bg-muted/50 p-4">
                  <p className="text-sm font-medium">File Size</p>
                  <p className="text-base">{product.fileSize}</p>
                </div>
                <div className="rounded-lg border bg-muted/50 p-4">
                  <p className="text-sm font-medium">File Type</p>
                  <p className="text-base">{product.filetype}</p>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="mt-auto space-y-4">
              {alreadyInCart ? (
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button variant="secondary" className="w-full sm:w-1/2">
                    <Check className="mr-2 h-4 w-4" /> Added to Cart
                  </Button>
                  <Link to="/cart" className="w-full sm:w-1/2">
                    <Button variant="default" className="w-full">
                      <ShoppingCart className="mr-2 h-4 w-4" /> View Cart
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button 
                  size="lg" 
                  onClick={handleAddToCart}
                  className="w-full"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Purchase info */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg border bg-background p-6 text-center">
            <FileText className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">License</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Standard license for personal and commercial use. No redistribution.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border bg-background p-6 text-center">
            <Download className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Instant Download</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get immediate access after purchase. Download links never expire.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border bg-background p-6 text-center">
            <Check className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Quality Guaranteed</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All products are verified for quality. 30-day satisfaction guarantee.
            </p>
          </div>
        </div>
      </Section>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <Section>
          <h2 className="mb-8 text-2xl font-bold">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

export default ProductPage