import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ErrorProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorComponent({ message = "An error occurred", onRetry }: ErrorProps = {}) {
  const router = useRouter();
  return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <h2 className="mt-2 text-xl font-semibold text-gray-900">{message}</h2>
          <div className="container text-gray-700 mt-2 space-x-2">
          {onRetry && (
            <Button onClick={onRetry} className="mt-4">
              Try Again
            </Button>
          )}
            <Button onClick={()=>{
              router.push('/');
            }} className="mt-4">
              Go Home
            </Button>
            </div>
        </div>
      </div>
  )
}