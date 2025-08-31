"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, Coins, Palette, Settings, Rocket } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MetaverseForm {
  name: string
  description: string
  organizer: string
  launchDate: string
  image: File | null
  tokenName: string
  tokenSymbol: string
  tokenSupply: string
  initialPrice: string
}

export default function CreatePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isCreating, setIsCreating] = useState(false)
  const [currentStep, setCurrentStep] = useState("basic")
  const [form, setForm] = useState<MetaverseForm>({
    name: "",
    description: "",
    organizer: "",
    launchDate: "",
    image: null,
    tokenName: "",
    tokenSymbol: "",
    tokenSupply: "",
    initialPrice: "",
  })

  const handleInputChange = (field: keyof MetaverseForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setForm((prev) => ({ ...prev, image: file }))
    }
  }

  const handleCreateMetaverse = async () => {
    setIsCreating(true)

    // Simulate creation process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    toast({
      title: "Metaverse Created Successfully!",
      description: `${form.name} has been deployed to Base network with token ${form.tokenSymbol}`,
    })

    setIsCreating(false)
    router.push("/")
  }

  const isFormValid = () => {
    return form.name && form.description && form.organizer && form.tokenName && form.tokenSymbol && form.tokenSupply
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Marketplace
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Create Metaverse</h1>
                <p className="text-sm text-muted-foreground">Deploy your own tokenized virtual world</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Base Network
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="token" className="flex items-center gap-2">
                <Coins className="w-4 h-4" />
                Token Setup
              </TabsTrigger>
              <TabsTrigger value="config" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Configuration
              </TabsTrigger>
              <TabsTrigger value="deploy" className="flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                Deploy
              </TabsTrigger>
            </TabsList>

            {/* Basic Information */}
            <TabsContent value="basic" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Metaverse Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-foreground">
                          Metaverse Name *
                        </Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="e.g., Chile Fintech Forum 2025"
                          className="bg-background border-border text-foreground"
                        />
                      </div>

                      <div>
                        <Label htmlFor="organizer" className="text-foreground">
                          Organizer *
                        </Label>
                        <Input
                          id="organizer"
                          value={form.organizer}
                          onChange={(e) => handleInputChange("organizer", e.target.value)}
                          placeholder="e.g., FinteChile"
                          className="bg-background border-border text-foreground"
                        />
                      </div>

                      <div>
                        <Label htmlFor="launchDate" className="text-foreground">
                          Launch Date
                        </Label>
                        <Input
                          id="launchDate"
                          value={form.launchDate}
                          onChange={(e) => handleInputChange("launchDate", e.target.value)}
                          placeholder="e.g., May 13-14, 2025"
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="description" className="text-foreground">
                          Description *
                        </Label>
                        <Textarea
                          id="description"
                          value={form.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Describe your metaverse project..."
                          rows={6}
                          className="bg-background border-border text-foreground resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground">Metaverse Image</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {form.image ? form.image.name : "Click to upload metaverse image"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Token Setup */}
            <TabsContent value="token" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">ERC-20 Token Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="tokenName" className="text-foreground">
                        Token Name *
                      </Label>
                      <Input
                        id="tokenName"
                        value={form.tokenName}
                        onChange={(e) => handleInputChange("tokenName", e.target.value)}
                        placeholder="e.g., FinteChile by MetaBuild HUB"
                        className="bg-background border-border text-foreground"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tokenSymbol" className="text-foreground">
                        Token Symbol *
                      </Label>
                      <Input
                        id="tokenSymbol"
                        value={form.tokenSymbol}
                        onChange={(e) => handleInputChange("tokenSymbol", e.target.value.toUpperCase())}
                        placeholder="e.g., $FINTECH"
                        className="bg-background border-border text-foreground"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tokenSupply" className="text-foreground">
                        Total Supply *
                      </Label>
                      <Input
                        id="tokenSupply"
                        type="number"
                        value={form.tokenSupply}
                        onChange={(e) => handleInputChange("tokenSupply", e.target.value)}
                        placeholder="e.g., 1000000"
                        className="bg-background border-border text-foreground"
                      />
                    </div>

                    <div>
                      <Label htmlFor="initialPrice" className="text-foreground">
                        Initial Price (USD)
                      </Label>
                      <Input
                        id="initialPrice"
                        type="number"
                        value={form.initialPrice}
                        onChange={(e) => handleInputChange("initialPrice", e.target.value)}
                        placeholder="e.g., 0.01"
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2">Token Preview</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="text-foreground">{form.tokenName || "Not set"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Symbol:</span>
                        <span className="text-foreground">{form.tokenSymbol || "Not set"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Supply:</span>
                        <span className="text-foreground">
                          {form.tokenSupply ? Number(form.tokenSupply).toLocaleString() : "Not set"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Network:</span>
                        <span className="text-foreground">Base</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuration */}
            <TabsContent value="config" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Advanced Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Virtual Merchandise</h4>
                        <p className="text-sm text-muted-foreground">Enable NFT merchandise for your metaverse</p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Coming Soon
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">AI Agents</h4>
                        <p className="text-sm text-muted-foreground">Add AI-powered assistants to your metaverse</p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Coming Soon
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">Community Features</h4>
                        <p className="text-sm text-muted-foreground">Enable chat, forums, and social features</p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Coming Soon
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Deploy */}
            <TabsContent value="deploy" className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Ready to Deploy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 rounded-lg p-6">
                    <h4 className="font-medium text-foreground mb-4">Deployment Summary</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Metaverse Name</p>
                          <p className="text-sm font-medium text-foreground">{form.name || "Not set"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Organizer</p>
                          <p className="text-sm font-medium text-foreground">{form.organizer || "Not set"}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Launch Date</p>
                          <p className="text-sm font-medium text-foreground">{form.launchDate || "Not set"}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Token</p>
                          <p className="text-sm font-medium text-foreground">
                            {form.tokenSymbol || "Not set"} ({form.tokenName || "Not set"})
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Supply</p>
                          <p className="text-sm font-medium text-foreground">
                            {form.tokenSupply ? Number(form.tokenSupply).toLocaleString() : "Not set"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Network</p>
                          <p className="text-sm font-medium text-foreground">Base</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-foreground">Deploy NFT contract for metaverse</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-foreground">Deploy ERC-20 token contract</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-foreground">Initialize metaverse marketplace</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateMetaverse}
                    disabled={!isFormValid() || isCreating}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                  >
                    {isCreating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Deploying to Base Network...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5 mr-2" />
                        Deploy Metaverse
                      </>
                    )}
                  </Button>

                  {!isFormValid() && (
                    <p className="text-sm text-muted-foreground text-center">
                      Please complete all required fields in the previous steps
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
