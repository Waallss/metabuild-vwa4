"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, MessageCircle, Zap, Star, Send, User, Settings, Activity, Brain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AIAgentSectionProps {
  metaverseId: string
  tokenSymbol: string
}

interface ChatMessage {
  id: string
  sender: "user" | "agent"
  message: string
  timestamp: Date
  agentId?: string
}

export function AIAgentSection({ metaverseId, tokenSymbol }: AIAgentSectionProps) {
  const { toast } = useToast()
  const [activeAgents, setActiveAgents] = useState<Set<string>>(new Set())
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isActivating, setIsActivating] = useState<Set<string>>(new Set())

  const aiAgents = [
    {
      id: "meby-1",
      name: "Meby Assistant",
      description: "Your personal AI guide for navigating the metaverse and managing your digital assets.",
      avatar: "/ai-assistant-avatar.png",
      capabilities: ["Asset Management", "Event Navigation", "Token Analytics", "Portfolio Tracking"],
      status: "available",
      tokenCost: "10",
      specialty: "General Assistant",
      personality: "Helpful and knowledgeable",
    },
    {
      id: "curator-1",
      name: "Content Curator",
      description: "AI-powered content discovery and curation for the best metaverse experiences.",
      avatar: "/ai-curator-avatar.png",
      capabilities: ["Content Discovery", "Personalized Recommendations", "Trend Analysis", "Event Suggestions"],
      status: "available",
      tokenCost: "5",
      specialty: "Content & Events",
      personality: "Creative and insightful",
    },
    {
      id: "trader-1",
      name: "Trading Bot",
      description: "Automated trading assistant for metaverse tokens and NFTs with advanced analytics.",
      avatar: "/ai-trader-avatar.png",
      capabilities: ["Price Monitoring", "Automated Trading", "Portfolio Management", "Risk Analysis"],
      status: "available",
      tokenCost: "25",
      specialty: "Trading & Finance",
      personality: "Analytical and precise",
    },
    {
      id: "social-1",
      name: "Social Connector",
      description: "Helps you connect with like-minded individuals and build meaningful relationships.",
      avatar: "/ai-social-avatar.png",
      capabilities: ["Network Building", "Event Matching", "Community Management", "Collaboration"],
      status: "coming-soon",
      tokenCost: "8",
      specialty: "Social & Networking",
      personality: "Friendly and outgoing",
    },
  ]

  const handleActivateAgent = async (agentId: string) => {
    setIsActivating((prev) => new Set(prev).add(agentId))

    // Simulate activation process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setActiveAgents((prev) => new Set(prev).add(agentId))
    setIsActivating((prev) => {
      const newSet = new Set(prev)
      newSet.delete(agentId)
      return newSet
    })

    const agent = aiAgents.find((a) => a.id === agentId)
    toast({
      title: "AI Agent Activated!",
      description: `${agent?.name} is now active and ready to assist you.`,
    })

    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: `welcome-${agentId}-${Date.now()}`,
      sender: "agent",
      message: `Hello! I'm ${agent?.name}. I'm here to help you with ${agent?.specialty.toLowerCase()}. How can I assist you today?`,
      timestamp: new Date(),
      agentId,
    }
    setChatMessages((prev) => [...prev, welcomeMessage])
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !selectedAgent) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      message: currentMessage,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")

    // Simulate AI response
    setTimeout(() => {
      const agent = aiAgents.find((a) => a.id === selectedAgent)
      const responses = [
        `I understand you're asking about "${currentMessage}". Let me help you with that.`,
        `That's a great question! Based on my analysis of the ${metaverseId} metaverse...`,
        `I can definitely assist with that. Here's what I recommend...`,
        `Let me check the latest data for you regarding "${currentMessage}".`,
      ]

      const agentMessage: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: "agent",
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        agentId: selectedAgent,
      }

      setChatMessages((prev) => [...prev, agentMessage])
    }, 1000)
  }

  const getAgentStatus = (agentId: string) => {
    if (activeAgents.has(agentId)) return "active"
    if (isActivating.has(agentId)) return "activating"
    return "inactive"
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="agents">Available Agents</TabsTrigger>
          <TabsTrigger value="chat">AI Chat ({activeAgents.size})</TabsTrigger>
          <TabsTrigger value="analytics">Agent Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">AI Agent Marketplace</h3>
            <p className="text-muted-foreground">
              Intelligent NPCs that enhance your metaverse experience using {tokenSymbol} tokens
            </p>
          </div>

          <div className="grid gap-6">
            {aiAgents.map((agent) => {
              const status = getAgentStatus(agent.id)
              const isActive = activeAgents.has(agent.id)

              return (
                <Card
                  key={agent.id}
                  className={`bg-card border-border ${isActive ? "ring-2 ring-primary/20 border-primary/30" : ""}`}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isActive ? "bg-primary/20" : "bg-primary/10"
                        }`}
                      >
                        <Bot className={`w-6 h-6 ${isActive ? "text-primary" : "text-primary/70"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-foreground">{agent.name}</CardTitle>
                          <Badge
                            variant={isActive ? "default" : "outline"}
                            className={`text-xs ${
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : agent.status === "coming-soon"
                                  ? "text-muted-foreground"
                                  : ""
                            }`}
                          >
                            {isActive ? "Active" : agent.status === "coming-soon" ? "Coming Soon" : "Available"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground text-pretty mb-2">{agent.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Specialty: {agent.specialty}</span>
                          <span>•</span>
                          <span>{agent.personality}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Capabilities</h5>
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.map((capability) => (
                          <Badge key={capability} variant="secondary" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">
                          {isActive ? "Active Cost/Hour" : "Activation Cost"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-foreground">{agent.tokenCost}</span>
                        <span className="text-sm text-muted-foreground">{tokenSymbol}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {isActive ? (
                        <Button
                          onClick={() => setSelectedAgent(agent.id)}
                          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat with Agent
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleActivateAgent(agent.id)}
                          disabled={agent.status === "coming-soon" || status === "activating"}
                          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          {status === "activating" ? (
                            <>
                              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                              Activating...
                            </>
                          ) : agent.status === "coming-soon" ? (
                            "Coming Soon"
                          ) : (
                            <>
                              <Zap className="w-4 h-4 mr-2" />
                              Activate Agent
                            </>
                          )}
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="border-border bg-transparent">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6 mt-6">
          {activeAgents.size === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="text-center py-12">
                <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Active Agents</h3>
                <p className="text-muted-foreground">Activate an AI agent to start chatting and get assistance.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Agent Selection */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Active Agents</h4>
                {Array.from(activeAgents).map((agentId) => {
                  const agent = aiAgents.find((a) => a.id === agentId)
                  if (!agent) return null

                  return (
                    <Card
                      key={agentId}
                      className={`cursor-pointer transition-colors ${
                        selectedAgent === agentId
                          ? "ring-2 ring-primary/20 border-primary/30"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedAgent(agentId)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm">{agent.name}</p>
                            <p className="text-xs text-muted-foreground">{agent.specialty}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-2">
                {selectedAgent ? (
                  <Card className="bg-card border-border h-96 flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-sm">
                            {aiAgents.find((a) => a.id === selectedAgent)?.name}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">
                            {aiAgents.find((a) => a.id === selectedAgent)?.specialty}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col p-0">
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {chatMessages
                            .filter((msg) => !msg.agentId || msg.agentId === selectedAgent)
                            .map((message) => (
                              <div
                                key={message.id}
                                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                              >
                                {message.sender === "agent" && (
                                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <Bot className="w-3 h-3 text-primary" />
                                  </div>
                                )}
                                <div
                                  className={`max-w-xs p-3 rounded-lg text-sm ${
                                    message.sender === "user"
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-muted text-foreground"
                                  }`}
                                >
                                  {message.message}
                                </div>
                                {message.sender === "user" && (
                                  <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <User className="w-3 h-3 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </ScrollArea>

                      <div className="p-4 border-t border-border">
                        <div className="flex gap-2">
                          <Input
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Ask your AI agent anything..."
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            className="bg-background border-border text-foreground"
                          />
                          <Button onClick={handleSendMessage} size="sm" className="bg-primary hover:bg-primary/90">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-card border-border h-96 flex items-center justify-center">
                    <div className="text-center">
                      <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Select an agent to start chatting</p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Agent Performance Analytics</h3>
            <p className="text-muted-foreground">Monitor your AI agents' activity and token consumption</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <Activity className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{activeAgents.size}</p>
                <p className="text-sm text-muted-foreground">Active Agents</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">
                  {Array.from(activeAgents).reduce((total, agentId) => {
                    const agent = aiAgents.find((a) => a.id === agentId)
                    return total + (agent ? Number.parseInt(agent.tokenCost) : 0)
                  }, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Tokens/Hour</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center">
                <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{chatMessages.length}</p>
                <p className="text-sm text-muted-foreground">Total Interactions</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5 text-primary" />
                <h4 className="font-medium text-foreground">Agent Management</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                AI agents automatically consume {tokenSymbol} tokens based on their usage and complexity. You can
                deactivate agents at any time to stop token consumption.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveAgents(new Set())}
                  className="border-border text-foreground hover:bg-muted"
                >
                  Deactivate All Agents
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border text-foreground hover:bg-muted bg-transparent"
                  onClick={() =>
                    toast({
                      title: "Feature Coming Soon",
                      description: "Advanced agent settings will be available in the next update.",
                    })
                  }
                >
                  Advanced Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
