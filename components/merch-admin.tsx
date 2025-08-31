"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Upload, Package } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MerchForm {
  name: string
  description: string
  price: string
  category: string
  image: File | null
}

export function MerchAdmin() {
  const { toast } = useToast()
  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState<MerchForm>({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  })

  const handleInputChange = (field: keyof MerchForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setForm((prev) => ({ ...prev, image: file }))
    }
  }

  const handleCreateMerch = async () => {
    if (!form.name || !form.description || !form.price || !form.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)

    // Simulate creation process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Merchandise Created!",
      description: `${form.name} has been added to the marketplace`,
    })

    // Reset form
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: null,
    })

    setIsCreating(false)
  }

  const categories = [
    { value: "tshirt", label: "👕 T-Shirt" },
    { value: "hoodie", label: "🧥 Hoodie" },
    { value: "sneakers", label: "👟 Sneakers" },
    { value: "hat", label: "🧢 Hat" },
    { value: "badge", label: "🏷️ Badge" },
    { value: "pass", label: "🎫 Pass" },
    { value: "wellness", label: "🧘 Wellness" },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Create New Merchandise
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="merch-name" className="text-foreground">
                Item Name *
              </Label>
              <Input
                id="merch-name"
                value={form.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., FinTech Forum T-Shirt"
                className="bg-background border-border text-foreground"
              />
            </div>

            <div>
              <Label htmlFor="merch-category" className="text-foreground">
                Category *
              </Label>
              <Select value={form.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="merch-price" className="text-foreground">
                Price (in tokens) *
              </Label>
              <Input
                id="merch-price"
                type="number"
                value={form.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="e.g., 50"
                className="bg-background border-border text-foreground"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="merch-description" className="text-foreground">
                Description *
              </Label>
              <Textarea
                id="merch-description"
                value={form.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the merchandise item..."
                rows={4}
                className="bg-background border-border text-foreground resize-none"
              />
            </div>

            <div>
              <Label className="text-foreground">Item Image</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="merch-image-upload"
                />
                <label htmlFor="merch-image-upload" className="cursor-pointer">
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {form.image ? form.image.name : "Click to upload image"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        {(form.name || form.description || form.price || form.category) && (
          <div className="border-t border-border pt-6">
            <h4 className="font-medium text-foreground mb-4">Preview</h4>
            <div className="max-w-sm">
              <Card className="bg-card border-border">
                <CardHeader className="p-0">
                  <div className="relative">
                    <div className="w-full h-32 bg-muted/50 rounded-t-lg flex items-center justify-center">
                      {form.image ? (
                        <img
                          src={URL.createObjectURL(form.image) || "/placeholder.svg"}
                          alt={form.name}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                      ) : (
                        <Package className="w-8 h-8 text-muted-foreground" />
                      )}
                    </div>
                    {form.category && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-background/80">
                          {categories.find((c) => c.value === form.category)?.label || form.category} NFT
                        </Badge>
                      </div>
                    )}
                    {form.price && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="default" className="bg-primary text-primary-foreground">
                          {form.price} Tokens
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  <h4 className="font-semibold text-foreground text-sm">{form.name || "Item Name"}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {form.description || "Item description"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <Button
          onClick={handleCreateMerch}
          disabled={isCreating || !form.name || !form.description || !form.price || !form.category}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isCreating ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              Creating NFT Contract...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Create Merchandise NFT
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
