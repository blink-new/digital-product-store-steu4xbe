import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Button } from '../components/ui/button'

const NotFoundPage = () => {
  return (
    <div className="container flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="mt-8 gap-2">
          <Home className="h-4 w-4" /> Back to Home
        </Button>
      </Link>
    </div>
  )
}

export default NotFoundPage