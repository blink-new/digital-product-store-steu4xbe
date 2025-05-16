import { Product } from '../store/cart'

export const products: Product[] = [
  {
    id: '1',
    name: 'Modern UI Kit',
    description: 'A comprehensive UI kit featuring over 300+ components for modern web applications. Includes Figma source files and code exports for React, Vue, and Angular.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop',
    category: 'Design Assets',
    fileSize: '245 MB',
    filetype: 'ZIP',
    downloadUrl: '/downloads/modern-ui-kit.zip'
  },
  {
    id: '2',
    name: 'E-commerce Website Template',
    description: 'Ready-to-use e-commerce website template with responsive design, product pages, shopping cart, and checkout functionality. Built with React and Tailwind CSS.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop',
    category: 'Templates',
    fileSize: '32 MB',
    filetype: 'ZIP',
    downloadUrl: '/downloads/ecommerce-template.zip'
  },
  {
    id: '3',
    name: 'Financial Planning Spreadsheet',
    description: 'Comprehensive Excel spreadsheet for personal financial planning. Includes budget tracker, investment calculator, retirement planner, and debt payoff strategy tools.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    category: 'Spreadsheets',
    fileSize: '5 MB',
    filetype: 'XLSX',
    downloadUrl: '/downloads/financial-planner.xlsx'
  },
  {
    id: '4',
    name: 'Mobile App UI Kit',
    description: 'Complete mobile app UI kit with 200+ screens and components. Perfect for iOS and Android app development. Figma and Sketch files included.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1551650992-ee4fd47df41f?q=80&w=1974&auto=format&fit=crop',
    category: 'Design Assets',
    fileSize: '180 MB',
    filetype: 'ZIP',
    downloadUrl: '/downloads/mobile-ui-kit.zip'
  },
  {
    id: '5',
    name: 'Stock Photo Bundle',
    description: 'Collection of 500 high-resolution stock photos. Royalty-free for commercial and personal projects. Various categories including business, nature, and lifestyle.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit=crop',
    category: 'Photos',
    fileSize: '2.3 GB',
    filetype: 'ZIP',
    downloadUrl: '/downloads/stock-photos.zip'
  },
  {
    id: '6',
    name: 'Business Plan Template',
    description: 'Professional business plan template with financial projections, market analysis, and executive summary sections. Word and PDF formats included.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?q=80&w=2070&auto=format&fit=crop',
    category: 'Documents',
    fileSize: '8 MB',
    filetype: 'ZIP',
    downloadUrl: '/downloads/business-plan.zip'
  },
  {
    id: '7',
    name: 'Social Media Graphics Pack',
    description: 'Collection of 100+ templates for Instagram, Facebook, Twitter, and LinkedIn posts. Easily customizable in Photoshop or Canva.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1968&auto=format&fit=crop',
    category: 'Design Assets',
    fileSize: '350 MB',
    filetype: 'ZIP',
    downloadUrl: '/downloads/social-media-pack.zip'
  },
  {
    id: '8',
    name: 'Premium Font Collection',
    description: 'Bundle of 20 premium fonts for branding, web, and print projects. Includes serif, sans-serif, display, and script font families with various weights.',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1467703834117-04386e3dadd8?q=80&w=2079&auto=format&fit=crop',
    category: 'Fonts',
    fileSize: '48 MB',
    filetype: 'ZIP',
    downloadUrl: '/downloads/premium-fonts.zip'
  }
]

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id)
}

export const getRelatedProducts = (category: string, currentId: string): Product[] => {
  return products
    .filter(product => product.category === category && product.id !== currentId)
    .slice(0, 4)
}