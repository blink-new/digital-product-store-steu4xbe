import { useEffect, useState } from 'react'
import { Download, ExternalLink, Search } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { products } from '../data/products'
import { Product } from '../store/cart'
import Section from '../components/Section'
import Container from '../components/Container'

// Mock purchased products
const mockPurchases = [
  {
    id: '1',
    productId: '1',
    purchaseDate: '2023-10-12T10:30:00Z',
    downloadCount: 2
  },
  {
    id: '2',
    productId: '3',
    purchaseDate: '2023-10-05T09:15:00Z',
    downloadCount: 1
  },
  {
    id: '3',
    productId: '5',
    purchaseDate: '2023-09-28T14:45:00Z',
    downloadCount: 0
  }
]

interface PurchaseWithProduct {
  id: string
  product: Product
  purchaseDate: string
  downloadCount: number
}

const DashboardPage = () => {
  const [purchases, setPurchases] = useState<PurchaseWithProduct[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading purchases from API
    setLoading(true)
    
    setTimeout(() => {
      const purchasesWithProducts = mockPurchases.map(purchase => {
        const product = products.find(p => p.id === purchase.productId)
        return {
          ...purchase,
          product: product!
        }
      })
      
      setPurchases(purchasesWithProducts)
      setLoading(false)
    }, 1000)
  }, [])
  
  const filteredPurchases = purchases.filter(purchase => 
    purchase.product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
  
  const handleDownload = (purchase: PurchaseWithProduct) => {
    // In a real app, this would trigger an authenticated download
    // Here we're just simulating it
    alert(`Downloading ${purchase.product.name}...`)
    
    // Update download count (in a real app, this would be an API call)
    setPurchases(prev => 
      prev.map(p => 
        p.id === purchase.id 
          ? { ...p, downloadCount: p.downloadCount + 1 } 
          : p
      )
    )
  }
  
  const renderLoading = () => (
    <div className="flex h-64 items-center justify-center text-center">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-muted-foreground">Loading your purchases...</p>
      </div>
    </div>
  )

  const renderEmptyState = () => (
    <div className="flex h-64 flex-col items-center justify-center text-center">
      <ExternalLink className="h-12 w-12 text-muted-foreground" />
      <h2 className="mt-4 text-xl font-semibold">No purchases yet</h2>
      <p className="mt-2 text-muted-foreground">
        {searchQuery ? 'No results found for your search.' : 'You haven\'t made any purchases yet.'}
      </p>
      {searchQuery && (
        <Button 
          variant="ghost"
          className="mt-4"
          onClick={() => setSearchQuery('')}
        >
          Clear Search
        </Button>
      )}
    </div>
  )
  
  return (
    <Section>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Downloads</h1>
          <p className="text-muted-foreground">Access all your purchased digital products</p>
        </div>
        <div className="mt-4 w-full sm:mt-0 sm:w-80">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search purchases..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Purchases</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {loading ? renderLoading() : 
           filteredPurchases.length === 0 ? renderEmptyState() : (
            <div className="space-y-4">
              {filteredPurchases.map(purchase => (
                <div key={purchase.id} className="overflow-hidden rounded-lg border bg-background">
                  <div className="flex flex-col sm:flex-row">
                    <div className="aspect-square h-32 w-32 shrink-0">
                      <img 
                        src={purchase.product.image} 
                        alt={purchase.product.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="mb-2 flex items-start justify-between">
                          <h3 className="font-semibold">{purchase.product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Purchased: {formatDate(purchase.purchaseDate)}
                          </p>
                        </div>
                        <p className="mb-2 text-sm text-muted-foreground">
                          {purchase.product.category} • {purchase.product.fileSize} • {purchase.product.filetype}
                        </p>
                        <p className="text-sm">
                          Downloaded {purchase.downloadCount} times
                        </p>
                      </div>
                      <div className="mt-4">
                        <Button 
                          onClick={() => handleDownload(purchase)}
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" /> Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          {loading ? renderLoading() : (
            <div className="space-y-4">
              {filteredPurchases
                .sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())
                .slice(0, 3)
                .map(purchase => (
                  <div key={purchase.id} className="overflow-hidden rounded-lg border bg-background">
                    <div className="flex flex-col sm:flex-row">
                      <div className="aspect-square h-32 w-32 shrink-0">
                        <img 
                          src={purchase.product.image} 
                          alt={purchase.product.name} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          <div className="mb-2 flex items-start justify-between">
                            <h3 className="font-semibold">{purchase.product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Purchased: {formatDate(purchase.purchaseDate)}
                            </p>
                          </div>
                          <p className="mb-2 text-sm text-muted-foreground">
                            {purchase.product.category} • {purchase.product.fileSize} • {purchase.product.filetype}
                          </p>
                          <p className="text-sm">
                            Downloaded {purchase.downloadCount} times
                          </p>
                        </div>
                        <div className="mt-4">
                          <Button 
                            onClick={() => handleDownload(purchase)}
                            className="gap-2"
                          >
                            <Download className="h-4 w-4" /> Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Section>
  )
}

export default DashboardPage