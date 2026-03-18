import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Dumbbell, Apple, Flame, Target, Heart, Trophy, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { streamChat } from '@/services/chatService';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AIChatTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hey there! 💪 I'm **Coach Max**, your AI fitness buddy! Ready to crush your goals today? I can help with workouts, nutrition, motivation, and more! 🔥",
      timestamp: new Date()
    }
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { icon: Dumbbell, text: "What workout should I do today?", color: "from-blue-500 to-purple-500" },
    { icon: Apple, text: "Give me a healthy snack idea", color: "from-green-500 to-emerald-500" },
    { icon: Flame, text: "Motivate me to stay consistent!", color: "from-orange-500 to-red-500" },
    { icon: Target, text: "How do I reach my protein goal?", color: "from-pink-500 to-rose-500" },
    { icon: Heart, text: "Tips for better recovery?", color: "from-purple-500 to-indigo-500" },
    { icon: Trophy, text: "Celebrate my progress!", color: "from-yellow-500 to-orange-500" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setIsLoading(true);

    let assistantContent = '';

    const chatHistory = [...messages, userMsg]
      .filter(m => m.id !== '1') // skip the static welcome
      .map(m => ({ role: m.role, content: m.content }));

    try {
      await streamChat({
        messages: chatHistory,
        onDelta: (chunk) => {
          assistantContent += chunk;
          setMessages(prev => {
            const last = prev[prev.length - 1];
            if (last?.role === 'assistant' && last.id.startsWith('stream-')) {
              return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
            }
            return [...prev, {
              id: 'stream-' + Date.now(),
              role: 'assistant' as const,
              content: assistantContent,
              timestamp: new Date()
            }];
          });
        },
        onDone: () => {
          setIsLoading(false);
        },
        onError: (err) => {
          toast({ title: "AI Error", description: err, variant: "destructive" });
          setMessages(prev => [...prev, {
            id: 'err-' + Date.now(),
            role: 'assistant',
            content: "Sorry, I'm having trouble right now. Please try again! 😅",
            timestamp: new Date()
          }]);
        }
      });
    } catch {
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: "I'm having trouble connecting right now 🤔 Please try again in a moment!",
        timestamp: new Date()
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(message);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
            Coach Max AI
          </span>
        </h1>
        <p className="text-muted-foreground text-lg">Your 24/7 AI fitness companion 🤖💪</p>
      </motion.div>

      <Card className="glassmorphism-card border border-white/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500/20 to-green-500/20">
          <CardTitle className="text-foreground flex items-center space-x-2">
            <div className="relative">
              <Bot className="w-8 h-8 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-xl font-bold">Coach Max</span>
              <p className="text-sm text-muted-foreground font-normal">Your AI Fitness Companion 🤖</p>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 ml-auto">
              <Sparkles className="w-4 h-4 mr-1" />
              Online
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[700px]">
          {/* Quick Questions */}
          <div className="p-4 bg-white/5 border-b border-white/10">
            <p className="text-muted-foreground text-sm mb-3 font-medium">Quick Questions:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {quickQuestions.map((q, index) => (
                <motion.button
                  key={index}
                  onClick={() => sendMessage(q.text)}
                  disabled={isLoading}
                  className={`flex items-center space-x-2 p-3 rounded-xl bg-gradient-to-r ${q.color} bg-opacity-20 hover:bg-opacity-30 transition-all duration-200 text-white text-xs font-medium disabled:opacity-50`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <q.icon className="w-4 h-4" />
                  <span className="truncate">{q.text}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className={
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gradient-to-r from-emerald-500 to-green-500'
                    }>
                      {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </AvatarFallback>
                  </Avatar>

                  <div className={`flex-1 max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`p-4 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-auto'
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 text-foreground'
                    }`}>
                      {msg.role === 'assistant' ? (
                        <div className="prose prose-sm prose-invert max-w-none text-sm leading-relaxed">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3"
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-green-500">
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    <span className="text-sm text-muted-foreground">Coach Max is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-white/5">
            <div className="flex space-x-3">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Coach Max about workouts, nutrition, or motivation..."
                className="flex-1 bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground focus:border-emerald-500 rounded-xl h-12"
                disabled={isLoading}
              />
              <AnimatedButton
                onClick={() => sendMessage(message)}
                disabled={!message.trim() || isLoading}
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 px-6 rounded-xl h-12"
                glowEffect={true}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </AnimatedButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
