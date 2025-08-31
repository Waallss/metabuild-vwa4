"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Package, Star, Filter, Grid3X3, List } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { VirtualMerch as VirtualMerchType } from "@/types/wallet"

interface VirtualMerchProps {
  merch: VirtualMerchType[]
  tokenSymbol: string
}

export function VirtualMerch({ merch, tokenSymbol }: VirtualMerchProps) {
  const { toast } = useToast()
  const [purchasingItems, setPurchasingItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [userInventory, setUserInventory] = useState<VirtualMerchType[]>([])

  const handlePurchase = async (item: VirtualMerchType) => {
    setPurchasingItems((prev) => new Set(prev).add(item.id))

    // Simulate purchase process
    setTimeout(() => {
      setPurchasingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(item.id)
        return newSet
      })

      // Add to user inventory
      setUserInventory((prev) => [...prev, item])

      toast({
        title: "NFT Purchased Successfully!",
        description: `${item.name} has been minted to your wallet for ${item.price} ${tokenSymbol}`,
      })
    }, 2000)
  }

  const getCategoryIcon = (category: VirtualMerchType["category"]) => {
    switch (category) {
      case "tshirt":
        return "👕"
      case "sneakers":
        return "👟"
      case "hat":
        return "🧢"
      case "hoodie":
        return "🧥"
      case "badge":
        return "🏷️"
      case "pass":
        return "🎫"
      case "wellness":
        return "🧘"
      default:
        return "🎽"
    }
  }

  const getCategories = () => {
    const categories = ["all", ...new Set(merch.map((item) => item.category))]
    return categories
  }

  const filteredMerch = selectedCategory === "all" ? merch : merch.filter((item) => item.category === selectedCategory)

  const isOwned = (itemId: string) => {
    return userInventory.some((item) => item.id === itemId)
  }

  if (merch.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Merchandise Available</h3>
          <p className="text-muted-foreground">
            Virtual merchandise will be available soon. Check back later for exclusive NFT wearables!
          </p>
        </CardContent>
      </Card>
    )
  }

  const MerchCard = ({ item }: { item: VirtualMerchType }) => {
    const owned = isOwned(item.id)

    return (
      <Card
        className={`bg-card border-border hover:border-primary/50 transition-colors ${owned ? "ring-2 ring-primary/20" : ""}`}
      >
        <CardHeader className="p-0">
          <div className="relative">
            <img
              src={item.image || `/placeholder.svg?height=200&width=300&query=${item.category} NFT`}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant="secondary" className="bg-background/80">
                {getCategoryIcon(item.category)} NFT
              </Badge>
              {owned && (
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Owned
                </Badge>
              )}
            </div>
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-primary text-primary-foreground">
                {item.price} {tokenSymbol}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">{item.name}</h4>
            <p className="text-sm text-muted-foreground text-pretty">{item.description}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Category: {item.category}</span>
              <span>Limited Edition</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          {owned ? (
            <Button disabled variant="outline" className="w-full border-primary/20 text-primary bg-primary/5">
              <Star className="w-4 h-4 mr-2" />
              Already Owned
            </Button>
          ) : (
            <Button
              onClick={() => handlePurchase(item)}
              disabled={purchasingItems.has(item.id)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {purchasingItems.has(item.id) ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Minting NFT...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy for {item.price} {tokenSymbol}
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="inventory">My Inventory ({userInventory.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Virtual Merchandise</h3>
              <p className="text-muted-foreground">Exclusive NFT wearables purchasable with {tokenSymbol} tokens</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="border-border text-foreground hover:bg-muted"
              >
                {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter:</span>
            {getCategories().map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:bg-muted"
                }
              >
                {category === "all" ? "All Items" : `${getCategoryIcon(category)} ${category}`}
              </Button>
            ))}
          </div>

          {/* Merchandise Grid */}
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredMerch.map((item) => (
              <MerchCard key={item.id} item={item} />
            ))}
          </div>

          {filteredMerch.length === 0 && (
            <Card className="bg-card border-border">
              <CardContent className="text-center py-8">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Items Found</h3>
                <p className="text-muted-foreground">No merchandise available in this category.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">My NFT Collection</h3>
            <p className="text-muted-foreground">Your owned virtual merchandise NFTs</p>
          </div>

          {userInventory.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Items Owned</h3>
                <p className="text-muted-foreground">
                  Purchase NFT merchandise from the marketplace to build your collection!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {userInventory.map((item) => (
                <Card key={`owned-${item.id}`} className="bg-card border-border border-primary/20">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={item.image || `/placeholder.svg?height=200&width=300&query=${item.category} NFT`}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          Owned
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground text-pretty">{item.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          Purchased for: {item.price} {tokenSymbol}
                        </span>
                        <span>NFT ID: #{item.id}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button
                      variant="outline"
                      className="w-full border-border text-foreground hover:bg-muted bg-transparent"
                      onClick={() => window.open(`https://basescan.org/nft/${item.tokenAddress}/${item.id}`, "_blank")}
                    >
                      View on BaseScan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
