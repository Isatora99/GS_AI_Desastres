"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Send, Bot, User, Shield, Award, AlertTriangle, Droplets, Mountain, Flame, Sun, Zap } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface UserProfile {
  name: string
  location: string
  type: "adult" | "child" | "elderly"
  area: "urban" | "rural"
  points: number
  badges: string[]
  level: number
}

const disasterTypes = [
  { id: "flood", name: "Enchentes", icon: Droplets, color: "text-blue-500" },
  { id: "landslide", name: "Deslizamentos", icon: Mountain, color: "text-amber-600" },
  { id: "fire", name: "Queimadas", icon: Flame, color: "text-red-500" },
  { id: "drought", name: "Secas", icon: Sun, color: "text-yellow-500" },
  { id: "earthquake", name: "Terremotos", icon: Zap, color: "text-purple-500" },
]

const badges = [
  { id: "first_chat", name: "Primeiro Contato", description: "Iniciou sua primeira conversa" },
  { id: "safety_expert", name: "Especialista em Segurança", description: "Aprendeu 10 dicas de segurança" },
  { id: "kit_master", name: "Mestre do Kit", description: "Criou seu kit de emergência" },
  { id: "simulator", name: "Simulador", description: "Completou uma simulação" },
]

export default function DisasterPreventionAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Olá! Sou seu assistente virtual para prevenção de desastres naturais. Como posso ajudá-lo hoje? Você pode me perguntar sobre enchentes, deslizamentos, queimadas, secas ou terremotos!",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Usuário",
    location: "Brasil",
    type: "adult",
    area: "urban",
    points: 0,
    badges: ["first_chat"],
    level: 1,
  })
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          userProfile: userProfile,
          conversationHistory: messages.slice(-5), // Últimas 5 mensagens para contexto
        }),
      })

      if (!response.ok) {
        throw new Error("Falha na comunicação com o assistente")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Atualizar pontos e badges
      if (data.points) {
        setUserProfile((prev) => ({
          ...prev,
          points: prev.points + data.points,
          level: Math.floor((prev.points + data.points) / 100) + 1,
        }))
      }

      if (data.newBadge) {
        setUserProfile((prev) => ({
          ...prev,
          badges: [...prev.badges, data.newBadge],
        }))
      }
    } catch (error) {
      console.error("Erro:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Desculpe, ocorreu um erro. Tente novamente em alguns instantes.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickActions = [
    "Como me preparar para enchentes?",
    "Kit de emergência básico",
    "O que fazer durante um deslizamento?",
    "Sinais de alerta para queimadas",
    "Simulação de evacuação",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🛡️ Assistente de Prevenção de Desastres</h1>
          <p className="text-gray-600">Sua jornada gamificada para conscientização e segurança</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="disasters">Desastres</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Chat Area */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Conversa com o Assistente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96 mb-4 p-4 border rounded-lg">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex gap-3 max-w-[80%] ${
                            message.role === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`p-3 rounded-lg ${
                              message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 mb-4">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </ScrollArea>

                  {/* Quick Actions */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Ações rápidas:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => setInput(action)}
                          className="text-xs"
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua pergunta sobre prevenção de desastres..."
                      disabled={isLoading}
                    />
                    <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sidebar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Seu Progresso
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Nível {userProfile.level}</span>
                      <span>{userProfile.points} pts</span>
                    </div>
                    <Progress value={userProfile.points % 100} className="h-2" />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Conquistas Recentes</h4>
                    {userProfile.badges.slice(-3).map((badgeId) => {
                      const badge = badges.find((b) => b.id === badgeId)
                      return badge ? (
                        <Badge key={badgeId} variant="secondary" className="mb-1 block">
                          {badge.name}
                        </Badge>
                      ) : null
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil do Usuário</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome</label>
                    <Input
                      value={userProfile.name}
                      onChange={(e) => setUserProfile((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Localização</label>
                    <Input
                      value={userProfile.location}
                      onChange={(e) => setUserProfile((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Tipo</label>
                      <select
                        value={userProfile.type}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, type: e.target.value as any }))}
                        className="w-full p-2 border rounded"
                      >
                        <option value="adult">Adulto</option>
                        <option value="child">Criança</option>
                        <option value="elderly">Idoso</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Área</label>
                      <select
                        value={userProfile.area}
                        onChange={(e) => setUserProfile((prev) => ({ ...prev, area: e.target.value as any }))}
                        className="w-full p-2 border rounded"
                      >
                        <option value="urban">Urbana</option>
                        <option value="rural">Rural</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conquistas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {badges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`p-3 rounded-lg border ${
                          userProfile.badges.includes(badge.id)
                            ? "bg-green-50 border-green-200"
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Award
                            className={`h-4 w-4 ${
                              userProfile.badges.includes(badge.id) ? "text-green-500" : "text-gray-400"
                            }`}
                          />
                          <span className="font-medium">{badge.name}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{badge.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Disasters Tab */}
          <TabsContent value="disasters" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {disasterTypes.map((disaster) => {
                const Icon = disaster.icon
                return (
                  <Card key={disaster.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon className={`h-6 w-6 ${disaster.color}`} />
                        {disaster.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        Clique para conversar sobre {disaster.name.toLowerCase()} com o assistente.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setActiveTab("chat")
                          setInput(`Me conte sobre ${disaster.name.toLowerCase()} e como me prevenir`)
                        }}
                      >
                        Aprender mais
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Links Úteis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href="https://www.defesacivil.gov.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-medium">Defesa Civil Nacional</h4>
                    <p className="text-sm text-gray-600">Portal oficial da Defesa Civil</p>
                  </a>
                  <a
                    href="https://portal.inmet.gov.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-medium">INMET</h4>
                    <p className="text-sm text-gray-600">Instituto Nacional de Meteorologia</p>
                  </a>
                  <a
                    href="https://www.cemaden.gov.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-medium">CEMADEN</h4>
                    <p className="text-sm text-gray-600">Centro Nacional de Monitoramento</p>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Telefones de Emergência
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Defesa Civil</h4>
                    <p className="text-lg font-bold text-red-600">199</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Bombeiros</h4>
                    <p className="text-lg font-bold text-red-600">193</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">SAMU</h4>
                    <p className="text-lg font-bold text-red-600">192</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Polícia Militar</h4>
                    <p className="text-lg font-bold text-red-600">190</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
