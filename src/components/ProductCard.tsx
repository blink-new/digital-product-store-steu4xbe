import { Link } from 'react-router-dom'
import { ShoppingCart, Check } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Product, useCartStore } from '../store/cart'
import { Badge } from './ui/badge'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, isInCart } = useCartStore()
  const alreadyInCart = isInCart(product.id)

  const handleAddToCart = () => {
    if (!alreadyInCart) {
      addItem(product)
      toast.success(`${product.name} added to cart`)
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between">
            <h3 className="line-clamp-1 font-semibold">{product.name}</h3>
            <Badge className="ml-2 shrink-0">${product.price.toFixed(2)}</Badge>
          </div>
          <Badge variant="outline" className="mt-1 w-fit">
            {product.category}
          </Badge>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full"
          variant={alreadyInCart ? "secondary" : "default"}
          disabled={alreadyInCart}
        >
          {alreadyInCart ? (
            <>
              <Check className="mr-2 h-4 w-4" /> In Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard