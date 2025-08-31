"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Menu } from "lucide-react"

interface MarketplaceHeaderProps {
  isWalletConnected: boolean
  onCreateClick: () => void
}

export function MarketplaceHeader({ isWalletConnected, onCreateClick }: MarketplaceHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">MB</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground">MetaBuild</h1>
              <p className="text-xs text-muted-foreground leading-none">Marketplace</p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search metaverses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border h-8"
              />
            </div>
          </div>

          {/* Actions - Removed wallet component, kept only create button */}
          <div className="flex items-center gap-3">
            {isWalletConnected && (
              <Button
                onClick={onCreateClick}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            )}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
