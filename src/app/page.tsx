'use client'

import { useState, useRef, useEffect } from 'react'
import { Moon, Sun, ShoppingCart, User, Search, Home, Shirt, ShoppingBag, Baby, Camera, Eye, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"

export default function FashionWebsite() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />
      case 'men':
        return <ClothingPage category="Men's" />
      case 'women':
        return <ClothingPage category="Women's" />
      case 'kids':
        return <ClothingPage category="Kids'" />
      case 'customize':
        return <CustomizePage />
      default:
        return <HomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <header className="border-b border-gray-200 dark:border-gray-700">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <Image 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-QX27TRFiWgjUbyZqyr0zN9cAYjEMd7.png"
                alt="Zen Fashion Logo"
                fill
                className="object-contain dark:invert"
              />
            </div>
            <div className="text-2xl font-bold">Zen Fashion</div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setCurrentPage('home')}>
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setCurrentPage('men')}>
              <Shirt className="h-5 w-5" />
              <span className="sr-only">Men's Clothing</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setCurrentPage('women')}>
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Women's Clothing</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setCurrentPage('kids')}>
              <Baby className="h-5 w-5" />
              <span className="sr-only">Kids' Clothing</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setCurrentPage('customize')}>
              <Camera className="h-5 w-5" />
              <span className="sr-only">Customize</span>
            </Button>
            <Select>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle dark mode</span>
            </Button>
            <AccountDialog />
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping cart</span>
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2023 Zen Fashion. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function HomePage({ setCurrentPage }) {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Zen Fashion</h1>
        <p className="text-xl mb-8">Discover your perfect style with our AI-powered recommendations</p>
        <Button size="lg">Start Shopping</Button>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CategoryCard title="Men's Fashion" icon={<Shirt className="h-12 w-12" />} onClick={() => setCurrentPage('men')} />
          <CategoryCard title="Women's Fashion" icon={<ShoppingBag className="h-12 w-12" />} onClick={() => setCurrentPage('women')} />
          <CategoryCard title="Kids' Fashion" icon={<Baby className="h-12 w-12" />} onClick={() => setCurrentPage('kids')} />
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">AI Style Assistant</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <p className="mb-4">Let our AI help you find the perfect outfit based on your preferences and style.</p>
          <Button>Get AI Recommendations</Button>
        </div>
      </section>
    </div>
  )
}

function CategoryCard({ title, icon, onClick }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <Button variant="outline" onClick={onClick}>Shop Now</Button>
    </div>
  )
}

function ClothingPage({ category }) {
  const [aiRecommendation, setAiRecommendation] = useState(null)

  const getAiRecommendation = () => {
    const clothingItems = getClothingItems()
    const randomItem = clothingItems[Math.floor(Math.random() * clothingItems.length)]
    setAiRecommendation(`Based on your preferences, we recommend trying our ${randomItem.name}. It's priced at ${randomItem.price} and would be a great addition to your wardrobe!`)
  }

  const getMensClothing = () => [
    {
      name: "Classic T-Shirt",
      price: "59.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Classic%20T-Shirt.jpg-4BElBpkAvhRasvbcrYCQOWgH6DrI8j.jpeg"
    },
    {
      name: "Slim Fit Jeans",
      price: "149.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Slim%20Fit%20Jeans-oD9A2EoG5XMhNTNMrCSQGmByIEbjj9.jpeg"
    },
    {
      name: "Formal Shirt",
      price: "104.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Formal%20Shirt-Ha0Hf7XIOFAnbOB4oA5yT6gUSIb2Y0.jpeg"
    },
    {
      name: "Athletic Shorts",
      price: "89.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Athletic%20Shorts.jpg-Ky6d9LEzIVHsspUGysOI9kXsbRVqZZ.jpeg"
    },
    {
      name: "Summer Polo",
      price: "79.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Summer%20Dress.jpg-mQWG8WqWUbzSgfLqgihC7HX37r5FFD.jpeg"
    }
  ]

  const getWomensClothing = () => [
    {
      name: "Summer Dress",
      price: "119.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Summer%20Dress%20women%20dress.jpg-iz0Bu4najhLjwodyoX4yPeV8lkMXHD.jpeg"
    },
    {
      name: "Casual Sneakers",
      price: "179.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Casual%20Sneakers%20women.jpg-jEjXtrh6FuVQpDuriACxoNzKztm9p6.jpeg"
    },
    {
      name: "Leather Jacket",
      price: "389.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/leather%20jacket%20women-Ae32hULZwR4iaRfknyvKv4rHTpWHzh.png"
    },
    {
      name: "Cozy Sweater",
      price: "134.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sweater%20woman-4DCFB8EMFto0ybasCFH1AzakmvvmKX.png"
    }
  ]

  const getKidsClothing = () => [
    {
      name: "Kids T-Shirt",
      price: "49.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kids-All-Star-T-Shirt-HeroThumbnail.jpg-EEMYVQ7RZEx2of6M4trxdhAl6Ya7Ca.jpeg"
    },
    {
      name: "Kids Jeans",
      price: "89.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kids%20jeans-ffd7xySFHHAIeblo7pQuUEpjNvGgFO.jpeg"
    },
    {
      name: "Kids Sneakers",
      price: "129.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kids%20Sneakers-DumvFEOHmZO761gq3KwHeOQqLQmaji.jpeg"
    },
    {
      name: "Kids Sweater",
      price: "79.99 TND",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blue-organic-coton-sweater-cool-kids.jpg-J7XBgnd61NpvLCLR1ohHOm4noTMGxR.jpeg"
    }
  ]

  const getClothingItems = () => {
    switch (category) {
      case "Men's":
        return getMensClothing()
      case "Women's":
        return getWomensClothing()
      case "Kids'":
        return getKidsClothing()
      default:
        return getMensClothing()
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">{category} Clothing</h1>
      <div className="flex justify-between items-center">
        <Input type="search" placeholder="Search for clothes..." className="max-w-sm" />
        <Button onClick={getAiRecommendation}>Get AI Recommendation</Button>
      </div>
      {aiRecommendation && (
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg flex items-center">
          <div className="flex-shrink-0 mr-4">
            <Image
              src={getClothingItems().find(item => aiRecommendation.includes(item.name))?.image || ''}
              alt="AI Recommended Item"
              width={100}
              height={100}
              className="object-cover rounded-md"
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">AI Recommendation:</h3>
            <p>{aiRecommendation}</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {getClothingItems().map((item, index) => (
          <ClothingItem key={index} name={item.name} price={item.price} image={item.image} />
        ))}
      </div>
    </div>
  )
}

function ClothingItem({ name, price, image }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
      <div className="aspect-square relative overflow-hidden rounded-md mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{price}</p>
      <Button variant="outline" className="w-full">Add to Cart</Button>
    </div>
  )
}

function CustomizePage() {
  const [height, setHeight] = useState(170)
  const [clothingColor, setClothingColor] = useState('#000000')
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing the camera", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      context?.drawImage(videoRef.current, 0, 0, 300, 150)
      const imageDataUrl = canvasRef.current.toDataURL('image/jpeg')
      setCapturedImage(imageDataUrl)
    }
  }

  const getAiSuggestion = () => {
    const suggestions = [
      "Based on your image, a navy blue blazer would complement your style nicely.",
      "Your skin tone would look great with earth tones. Try a forest green sweater!",
      "A classic white button-up shirt would be versatile for your wardrobe.",
      "For a casual look, consider light wash jeans and a graphic tee.",
    ]
    setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)])
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Customize Your Look</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Camera Preview</h2>
          <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            {capturedImage ? (
              <Image src={capturedImage} alt="Captured" width={300} height={150} className="w-full h-full object-cover" />
            ) : (
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
            )}
            <canvas ref={canvasRef} className="hidden" width={300} height={150} />
            <div className="absolute bottom-4 left-4 right-4 flex justify-center">
              <Button onClick={cameraActive ? stopCamera : startCamera} className="mr-2">
                <Camera className="mr-2 h-4 w-4" />
                {cameraActive ? 'Stop Camera' : 'Start Camera'}
              </Button>
              <Button onClick={captureImage} disabled={!cameraActive}>
                <Eye className="mr-2 h-4 w-4" />
                Capture Image
              </Button>
            </div>
          </div>
          {capturedImage && (
            <Button onClick={getAiSuggestion} className="mt-4">
              <Sparkles className="mr-2 h-4 w-4" />
              Get AI Style Suggestion
            </Button>
          )}
          {aiSuggestion && (
            <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <h3 className="font-semibold mb-2">AI Style Suggestion:</h3>
              <p>{aiSuggestion}</p>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Customize Your Look</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="height-slider" className="block text-sm font-medium mb-2">Height (cm)</Label>
              <Slider
                id="height-slider"
                value={[height]}
                onValueChange={(value) => setHeight(value[0])}
                max={220}
                min={120}
                step={1}
              />
              <span className="mt-2 block">{height} cm</span>
            </div>
            <div>
              <Label htmlFor="color-picker" className="block text-sm font-medium mb-2">Clothing Color</Label>
              <input
                id="color-picker"
                type="color"
                value={clothingColor}
                onChange={(e) => setClothingColor(e.target.value)}
                className="w-full h-10 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AccountDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
          <span className="sr-only">Account</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>
            Log in to your account or create a new one.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" required />
              </div>
              <Button type="submit" className="w-full">Log In</Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" required />
              </div>
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}