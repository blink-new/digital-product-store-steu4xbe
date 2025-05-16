import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Check, Loader2 } from 'lucide-react'
import { useCartStore } from '../store/cart'
import { Button } from '../components/ui/button'
import { Separator } from '../components/ui/separator'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { toast } from 'sonner'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { items, clearCart } = useCartStore()
  const subtotal = items.reduce((total, item) => total + item.product.price, 0)
  
  const [email, setEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvc, setCvc] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  if (items.length === 0) {
    navigate('/cart')
    return null
  }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!email.trim()) newErrors.email = 'Email is required'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) newErrors.email = 'Invalid email address'
    
    if (!cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
    else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Invalid card number'
    
    if (!expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
    else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) newErrors.expiryDate = 'Invalid format (MM/YY)'
    
    if (!cvc.trim()) newErrors.cvc = 'CVC is required'
    else if (!/^\d{3,4}$/.test(cvc)) newErrors.cvc = 'Invalid CVC'
    
    if (!nameOnCard.trim()) newErrors.nameOnCard = 'Name is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      clearCart()
      navigate('/dashboard')
      toast.success('Payment successful! Your products are ready to download.')
    }, 2000)
  }
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }
  
  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/cart" className="flex items-center text-sm text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
        </Link>
      </div>
      
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Checkout form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg border bg-background p-6">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  <p className="text-xs text-muted-foreground">
                    We'll send your receipt and download links to this email
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border bg-background p-6">
              <h2 className="text-xl font-semibold">Payment Information</h2>
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input 
                    id="card-number" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={errors.cardNumber ? 'border-destructive' : ''}
                  />
                  {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input 
                      id="expiry" 
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={errors.expiryDate ? 'border-destructive' : ''}
                    />
                    {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input 
                      id="cvc" 
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                      placeholder="123"
                      maxLength={4}
                      className={errors.cvc ? 'border-destructive' : ''}
                    />
                    {errors.cvc && <p className="text-sm text-destructive">{errors.cvc}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input 
                    id="name" 
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    placeholder="John Doe"
                    className={errors.nameOnCard ? 'border-destructive' : ''}
                  />
                  {errors.nameOnCard && <p className="text-sm text-destructive">{errors.nameOnCard}</p>}
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" /> Pay ${subtotal.toFixed(2)}
                </>
              )}
            </Button>
            
            <p className="text-center text-xs text-muted-foreground">
              Your card won't be charged in this demo.
            </p>
          </form>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border bg-background p-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            
            <Separator className="my-4" />
            
            <div className="max-h-80 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="mb-4 flex items-start gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.product.category}
                    </p>
                  </div>
                  <p className="shrink-0 font-medium">${item.product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            
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
          </div>
          
          <div className="mt-6 rounded-lg border bg-background p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 p-1">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">100% Secure Checkout</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and secure. We never store your credit card information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage