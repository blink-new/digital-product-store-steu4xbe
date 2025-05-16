import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, Trash2, ArrowLeft, ShoppingCart } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'
import { useCartStore } from '../store/cart'
import { toast } from 'sonner'
import Section from '../components/Section'

const CartPage = () => {
  const navigate = useNavigate()
  const { items, removeItem, clearCart } = useCartStore()
  const subtotal = items.reduce((total, item) => total + item.product.price, 0)
  
  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id)
    toast.success(`${name} removed from cart`)
  }
  
  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared')
  }
  
  const handleCheckout = () => {
    navigate('/checkout')
  }
  
  if (items.length === 0) {
    return (
      <Section centered={true} className="py-16">
        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/">
          <Button className="mt-6">
            <ShoppingCart className="mr-2 h-4 w-4" /> Browse Products
          </Button>
        </Link>
      </Section>
    )
  }
  
  return (
    <Section>
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/" className="flex items-center text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
        </Link>
      </div>
      
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex flex-col overflow-hidden rounded-lg border bg-background sm:flex-row">
                <div className="aspect-square h-24 w-24 shrink-0 sm:h-32 sm:w-32">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="h-full w-full object-cover" 
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <div className="flex items-start justify-between">
                      <Link to={`/product/${item.product.id}`} className="hover:underline">
                        <h3 className="font-semibold">{item.product.name}</h3>
                      </Link>
                      <p className="ml-4 shrink-0 font-semibold">${item.product.price.toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.product.category} • {item.product.fileSize} • {item.product.filetype}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRemoveItem(item.id, item.product.name)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {items.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-4"
              onClick={handleClearCart}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
            </Button>
          )}
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-background p-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            
            <Separator className="my-4" />
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Subtotal ({items.length} items)</p>
                <p className="font-medium">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">Tax</p>
                <p className="font-medium">$0.00</p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between font-semibold">
                <p>Total</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="mt-6 w-full"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            
            <p className="mt-4 text-center text-xs text-muted-foreground">
              By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default CartPage