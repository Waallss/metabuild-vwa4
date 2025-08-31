"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, X } from "lucide-react"
import { WalletConnect } from "./wallet-connect"

export function FloatingWallet() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Wallet Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        >
          <Wallet className="w-4 h-4" />
        </Button>
      </div>

      {/* Floating Wallet Panel */}
      {isOpen && (
        <div className="fixed top-16 right-4 z-50">
          <Card className="w-80 shadow-xl border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Wallet Connection</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-6 w-6 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <WalletConnect />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />}
    </>
  )
}
