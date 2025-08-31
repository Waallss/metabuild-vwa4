"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Coins } from "lucide-react"
import type { MetaverseNFT } from "@/types/wallet"

interface MetaverseCardProps {
  metaverse: MetaverseNFT
  onViewDetails: (id: string) => void
}

export function MetaverseCard({ metaverse, onViewDetails }: MetaverseCardProps) {
  const formatPrice = (price: string | undefined) => {
    if (!price) return "TBA"
    return `$${Number.parseFloat(price).toLocaleString()}`
  }

  const isAlephProject = metaverse.organizer === "Aleph"

  return (
    <Card
      className={`bg-card border-border hover:border-primary/50 transition-all duration-200 group ${
        isAlephProject ? "border-primary/20" : ""
      }`}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={metaverse.image || "/placeholder.svg"}
            alt={metaverse.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge variant="secondary" className="bg-background/80 text-foreground">
              NFT
            </Badge>
            {isAlephProject && <Badge className="bg-primary/10 text-primary border-primary/20">Aleph</Badge>}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-foreground text-lg mb-1 text-balance">{metaverse.name}</h3>
            <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{metaverse.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Organizer</p>
              <p className="text-sm font-medium text-foreground">{metaverse.organizer}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Launch Date</p>
              <p className="text-sm font-medium text-foreground">{metaverse.launchDate}</p>
            </div>
          </div>

          <div className={`rounded-lg p-3 ${isAlephProject ? "bg-primary/5 border border-primary/10" : "bg-muted/50"}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{metaverse.tokenSymbol}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                ERC-20
              </Badge>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Token Name:</span>
              <span className="text-foreground font-medium">{metaverse.tokenName}</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-muted-foreground">Supply:</span>
              <span className="text-foreground font-medium">
                {Number.parseFloat(metaverse.supply || "0").toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onViewDetails(metaverse.id)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
