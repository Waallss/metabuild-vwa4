"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ExternalLink, Copy, Wallet } from "lucide-react"
import { MetaverseHeader } from "@/components/metaverse-header"
import { TokenStats } from "@/components/token-stats"
import { TokenIntegration } from "@/components/token-integration"
import { VirtualMerch } from "@/components/virtual-merch"
import { AIAgentSection } from "@/components/ai-agent-section"
import { useToast } from "@/hooks/use-toast"
import type { MetaverseNFT, VirtualMerch as VirtualMerchType } from "@/types/wallet"

const mockMetaverses: Record<string, MetaverseNFT> = {
  "1": {
    id: "1",
    name: "Chile Fintech Forum 2025",
    description:
      "The premier fintech event in Latin America, bringing together innovators, investors, and industry leaders in Santiago.",
    image: "/futuristic-fintech-conference-hall-with-holographi.png",
    organizer: "FinteChile",
    organizerWallet: "0x1234567890abcdef1234567890abcdef12345678",
    tokenAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    tokenName: "FinteChile by MetaBuild HUB",
    tokenSymbol: "$FINTECH",
    launchDate: "May 13-14, 2025",
    creator: "0x1234567890abcdef1234567890abcdef12345678",
    supply: "1,000,000",
    price: "200000",
  },
  "2": {
    id: "2",
    name: "La Cumbre Digital",
    description:
      "5th edition of the digital transformation summit featuring cutting-edge technology and innovation across Latin America.",
    image: "/digital-summit-with-purple-and-cyan-lighting-moder.png",
    organizer: "Aleph",
    organizerWallet: "0x2345678901bcdef12345678901bcdef123456789",
    tokenAddress: "0xbcdef12345678901bcdef12345678901bcdef123",
    tokenName: "Aleph by MetaBuild HUB",
    tokenSymbol: "$ALEPH",
    launchDate: "March 20-22, 2025",
    creator: "0x2345678901bcdef12345678901bcdef123456789",
    supply: "500,000",
    price: "400000",
  },
  "3": {
    id: "3",
    name: "Aleph Hub",
    description:
      "A collaborative virtual workspace for entrepreneurs, startups, and innovators to connect and build the future together.",
    image: "/futuristic-innovation-hub-with-floating-platforms-.png",
    organizer: "Aleph",
    organizerWallet: "0x3456789012cdef123456789012cdef1234567890",
    tokenAddress: "0xcdef123456789012cdef123456789012cdef1234",
    tokenName: "Aleph by MetaBuild HUB",
    tokenSymbol: "$ALEPH",
    launchDate: "February 1, 2025",
    creator: "0x3456789012cdef123456789012cdef1234567890",
    supply: "750,000",
    price: "300000",
  },
  "4": {
    id: "4",
    name: "Aleph Studio",
    description:
      "Creative metaverse space for digital artists, designers, and content creators to showcase and monetize their work.",
    image: "/ai-blockchain-summit-with-neural-network-visualiza.png",
    organizer: "Aleph",
    organizerWallet: "0x4567890123def1234567890123def12345678901",
    tokenAddress: "0xdef1234567890123def1234567890123def12345",
    tokenName: "Aleph by MetaBuild HUB",
    tokenSymbol: "$ALEPH",
    launchDate: "April 15, 2025",
    creator: "0x4567890123def1234567890123def12345678901",
    supply: "600,000",
    price: "250000",
  },
  "5": {
    id: "5",
    name: "Aleph Wellness",
    description:
      "Virtual wellness center offering meditation spaces, fitness programs, and mental health resources in an immersive environment.",
    image: "/serene-virtual-wellness-center-with-meditation-spa.png",
    organizer: "Aleph",
    organizerWallet: "0x5678901234ef12345678901234ef123456789012",
    tokenAddress: "0xef12345678901234ef12345678901234ef123456",
    tokenName: "Aleph by MetaBuild HUB",
    tokenSymbol: "$ALEPH",
    launchDate: "June 1, 2025",
    creator: "0x5678901234ef12345678901234ef123456789012",
    supply: "400,000",
    price: "180000",
  },
}

const mockMerch: Record<string, VirtualMerchType[]> = {
  "1": [
    {
      id: "m1",
      name: "FinTech Forum T-Shirt",
      description: "Exclusive NFT t-shirt for FinTech Forum 2025 attendees",
      image: "/fintech-tshirt-nft.png",
      price: "50",
      tokenAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      metaverseId: "1",
      category: "tshirt",
    },
    {
      id: "m2",
      name: "Innovation Sneakers",
      description: "Limited edition virtual sneakers with fintech-inspired design",
      image: "/fintech-sneakers-nft.png",
      price: "150",
      tokenAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      metaverseId: "1",
      category: "sneakers",
    },
  ],
  "2": [
    {
      id: "m3",
      name: "Digital Summit Hoodie",
      description: "Premium hoodie NFT commemorating La Cumbre Digital 2025",
      image: "/digital-summit-hoodie-nft.png",
      price: "100",
      tokenAddress: "0xbcdef12345678901bcdef12345678901bcdef123",
      metaverseId: "2",
      category: "hoodie",
    },
  ],
  "3": [
    {
      id: "m4",
      name: "Aleph Hub Badge",
      description: "Exclusive access badge NFT for Aleph Hub members",
      image: "/aleph-hub-badge-nft.png",
      price: "75",
      tokenAddress: "0xcdef123456789012cdef123456789012cdef1234",
      metaverseId: "3",
      category: "badge",
    },
  ],
  "4": [
    {
      id: "m5",
      name: "Creative Studio Pass",
      description: "Premium access pass for Aleph Studio creative tools and resources",
      image: "/creative-studio-pass-nft.png",
      price: "120",
      tokenAddress: "0xdef1234567890123def1234567890123def12345",
      metaverseId: "4",
      category: "pass",
    },
  ],
  "5": [
    {
      id: "m6",
      name: "Wellness Meditation Mat",
      description: "Virtual meditation mat NFT for enhanced wellness experiences",
      image: "/wellness-meditation-mat-nft.png",
      price: "60",
      tokenAddress: "0xef12345678901234ef12345678901234ef123456",
      metaverseId: "5",
      category: "wellness",
    },
  ],
}

export default function MetaverseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [metaverse, setMetaverse] = useState<MetaverseNFT | null>(null)
  const [merch, setMerch] = useState<VirtualMerchType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const id = params.id as string
    const foundMetaverse = mockMetaverses[id]
    const foundMerch = mockMerch[id] || []

    if (foundMetaverse) {
      setMetaverse(foundMetaverse)
      setMerch(foundMerch)
    }
    setIsLoading(false)
  }, [params.id])

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: `${label} copied successfully`,
    })
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const isAlephProject = metaverse?.organizer === "Aleph"

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading metaverse details...</p>
        </div>
      </div>
    )
  }

  if (!metaverse) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Metaverse Not Found</h1>
          <p className="text-muted-foreground mb-6">The metaverse you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/")} className="bg-primary hover:bg-primary/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MetaverseHeader metaverse={metaverse} onBack={() => router.push("/")} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* NFT Details */}
            <Card className={`bg-card border-border ${isAlephProject ? "border-primary/20" : ""}`}>
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    NFT Certificate
                  </Badge>
                  {isAlephProject && <Badge className="bg-primary/10 text-primary border-primary/20">Aleph</Badge>}
                  Metaverse Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={metaverse.image || "/placeholder.svg"}
                      alt={metaverse.name}
                      className="w-full h-64 object-cover rounded-lg border border-border"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{metaverse.name}</h3>
                      <p className="text-muted-foreground text-pretty">{metaverse.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Organizer</p>
                        <p className="text-sm font-medium text-foreground">{metaverse.organizer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Launch Date</p>
                        <p className="text-sm font-medium text-foreground">{metaverse.launchDate}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Creator</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-foreground">{formatAddress(metaverse.creator)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(metaverse.creator, "Creator address")}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">View on BaseScan</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            window.open(`https://basescan.org/address/${metaverse.tokenAddress}`, "_blank")
                          }
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for different sections */}
            <Tabs defaultValue="merch" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="merch">Virtual Merchandise</TabsTrigger>
                <TabsTrigger value="ai-agents">AI Agents</TabsTrigger>
              </TabsList>
              <TabsContent value="merch" className="mt-6">
                <VirtualMerch merch={merch} tokenSymbol={metaverse.tokenSymbol} />
              </TabsContent>
              <TabsContent value="ai-agents" className="mt-6">
                <AIAgentSection metaverseId={metaverse.id} tokenSymbol={metaverse.tokenSymbol} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TokenStats metaverse={metaverse} />
            <TokenIntegration metaverse={metaverse} />
          </div>
        </div>
      </div>
    </div>
  )
}
