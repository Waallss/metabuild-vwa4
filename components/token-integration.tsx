"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, ArrowUpDown, Wallet, ExternalLink, TrendingUp, ShoppingCart, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { MetaverseNFT } from "@/types/wallet"

interface TokenIntegrationProps {
  metaverse: MetaverseNFT
}

export function TokenIntegration({ metaverse }: TokenIntegrationProps) {
  const { toast } = useToast()
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userBalance, setUserBalance] = useState("1,250.50")

  const handleBuyToken = async () => {
    if (!buyAmount) return

    setIsLoading(true)
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Purchase Successful!",
      description: `Bought ${buyAmount} ${metaverse.tokenSymbol} tokens`,
    })

    setBuyAmount("")
    setIsLoading(false)
  }

  const handleSellToken = async () => {
    if (!sellAmount) return

    setIsLoading(true)
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Sale Successful!",
      description: `Sold ${sellAmount} ${metaverse.tokenSymbol} tokens`,
    })

    setSellAmount("")
    setIsLoading(false)
  }

  const handleSendToken = async () => {
    if (!sendAmount || !sendAddress) return

    setIsLoading(true)
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Transfer Successful!",
      description: `Sent ${sendAmount} ${metaverse.tokenSymbol} to ${sendAddress.slice(0, 6)}...${sendAddress.slice(-4)}`,
    })

    setSendAmount("")
    setSendAddress("")
    setIsLoading(false)
  }

  const openDEX = () => {
    window.open(`https://app.uniswap.org/#/swap?outputCurrency=${metaverse.tokenAddress}`, "_blank")
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Coins className="w-5 h-5 text-primary" />
          Token Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* User Balance */}
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your Balance</p>
              <p className="text-2xl font-bold text-foreground">{userBalance}</p>
              <p className="text-sm text-muted-foreground">{metaverse.tokenSymbol}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">USD Value</p>
              <p className="text-lg font-semibold text-foreground">$312.63</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500">+5.2%</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
            <TabsTrigger value="send">Send</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Buy Tab */}
          <TabsContent value="buy" className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-muted-foreground">Amount to Buy</label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={buyAmount}
                  onChange={(e) => setBuyAmount(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
                <Badge variant="outline" className="px-3 py-2">
                  {metaverse.tokenSymbol}
                </Badge>
              </div>
              {buyAmount && (
                <p className="text-xs text-muted-foreground mt-1">
                  ≈ ${(Number.parseFloat(buyAmount) * 0.25).toFixed(2)} USD
                </p>
              )}
            </div>

            <Button
              onClick={handleBuyToken}
              disabled={!buyAmount || isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Buy {metaverse.tokenSymbol}
                </>
              )}
            </Button>
          </TabsContent>

          {/* Sell Tab */}
          <TabsContent value="sell" className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-muted-foreground">Amount to Sell</label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
                <Badge variant="outline" className="px-3 py-2">
                  {metaverse.tokenSymbol}
                </Badge>
              </div>
              {sellAmount && (
                <p className="text-xs text-muted-foreground mt-1">
                  ≈ ${(Number.parseFloat(sellAmount) * 0.25).toFixed(2)} USD
                </p>
              )}
            </div>

            <Button
              onClick={handleSellToken}
              disabled={!sellAmount || isLoading}
              variant="outline"
              className="w-full border-border text-foreground hover:bg-muted bg-transparent"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Sell {metaverse.tokenSymbol}
                </>
              )}
            </Button>
          </TabsContent>

          {/* Send Tab */}
          <TabsContent value="send" className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-muted-foreground">Recipient Address</label>
              <Input
                placeholder="0x..."
                value={sendAddress}
                onChange={(e) => setSendAddress(e.target.value)}
                className="bg-background border-border text-foreground mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Amount to Send</label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="bg-background border-border text-foreground"
                />
                <Badge variant="outline" className="px-3 py-2">
                  {metaverse.tokenSymbol}
                </Badge>
              </div>
            </div>

            <Button
              onClick={handleSendToken}
              disabled={!sendAmount || !sendAddress || isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Tokens
                </>
              )}
            </Button>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-3 mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Bought 500 {metaverse.tokenSymbol}</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">+500</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Send className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Sent 100 {metaverse.tokenSymbol}</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">-100</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                    <ArrowUpDown className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Sold 250 {metaverse.tokenSymbol}</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">-250</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-border space-y-3">
          <Button
            onClick={openDEX}
            variant="outline"
            className="w-full border-border text-foreground hover:bg-muted bg-transparent"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Trade on Uniswap
          </Button>

          <Button
            onClick={() => window.open(`https://basescan.org/token/${metaverse.tokenAddress}`, "_blank")}
            variant="outline"
            className="w-full border-border text-foreground hover:bg-muted"
          >
            <Wallet className="w-4 h-4 mr-2" />
            View on BaseScan
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
