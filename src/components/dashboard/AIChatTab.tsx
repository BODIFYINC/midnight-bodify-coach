import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Dumbbell, Apple, Flame, Target, Loader2, ArrowUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { streamChat } from '@/services/chatService';
import { haptics } from '@/services/haptics';
import { loadChatHistory, saveChatMessage } from '@/services/chatPersistence';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickChips = [
  { icon: Dumbbell, text: "Today's workout?" },
  { icon: Apple, text: "Healthy snack idea" },
  { icon: Flame, text: "Motivate me!" },
  { icon: Target, text: "Hit my protein goal" },
];

export const AIChatTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history from DB
  useEffect(() => {
    const load = async () => {
      try {
        const history = await loadChatHistory();
        if (history.length > 0) {
          setMessages(history.map(m => ({
            id: m.id,
            role: m.role,
            content: m.content,
            timestamp: new Date(m.created_at),
          })));
        } else {
          setMessages([{
            id: 'welcome',
            role: 'assistant',
            content: "Hey! 💪 I'm **Coach Max**, your AI fitness buddy. Ask me anything about workouts, nutrition, or motivation!",
            timestamp: new Date(),
          }]);
        }
      } catch {
        setMessages([{
          id: 'welcome',
          role: 'assistant',
          content: "Hey! 💪 I'm **Coach Max**. Ready to crush your goals today?",
          timestamp: new Date(),
        }]);
      }
      setHistoryLoaded(true);
    };
    load();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setIsLoading(true);

    haptics.heavy();
    saveChatMessage('user', text).catch(() => {});

    let assistantContent = '';
    const chatHistory = [...messages, userMsg]
      .filter(m => m.id !== 'welcome')
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
              timestamp: new Date(),
            }];
          });
        },
        onDone: () => {
          setIsLoading(false);
          if (assistantContent) {
            saveChatMessage('assistant', assistantContent).catch(() => {});
          }
        },
        onError: (err) => {
          toast({ title: "AI Error", description: err, variant: "destructive" });
          setIsLoading(false);
        },
      });
    } catch {
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again! 😅",
        timestamp: new Date(),
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(message);
    }
  };

  const showEmptyState = historyLoaded && messages.length <= 1;

  return (
    <div className="flex flex-col" style={{ height: 'calc(100dvh - 140px)' }}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-1 py-3 space-y-1">
        {showEmptyState && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center px-6"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 via-primary/15 to-secondary/20 flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">Coach Max</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-[260px]">
              Your AI fitness companion. Ask about workouts, nutrition, or motivation.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickChips.map((chip, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage(chip.text)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-accent/20 bg-accent/8 text-[12px] font-medium text-accent transition-colors active:bg-accent/15"
                >
                  <chip.icon className="w-3.5 h-3.5" />
                  {chip.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.filter(m => m.id !== 'welcome' || !showEmptyState).map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`flex mb-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[82%] px-3.5 py-2.5 ${
                msg.role === 'user'
                  ? 'rounded-[18px] rounded-br-[6px] bg-gradient-to-br from-accent to-primary text-white'
                  : 'rounded-[18px] rounded-bl-[6px] bg-card/80 border border-border/50 text-foreground'
              }`}>
                {msg.role === 'assistant' ? (
                  <div className="prose prose-sm prose-invert max-w-none text-[13px] leading-relaxed [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_strong]:text-accent">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start mb-1"
          >
            <div className="px-4 py-3 rounded-[18px] rounded-bl-[6px] bg-card/80 border border-border/50">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-accent/60"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick chips when messages exist */}
      {!showEmptyState && messages.length > 1 && messages.length < 4 && (
        <div className="flex gap-1.5 px-1 py-1.5 overflow-x-auto no-scrollbar">
          {quickChips.slice(0, 3).map((chip, i) => (
            <button
              key={i}
              onClick={() => sendMessage(chip.text)}
              disabled={isLoading}
              className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full border border-border/50 bg-card/60 text-[11px] font-medium text-muted-foreground disabled:opacity-50 active:bg-muted/60"
            >
              <chip.icon className="w-3 h-3" />
              {chip.text}
            </button>
          ))}
        </div>
      )}

      {/* Input bar — iMessage style */}
      <div className="py-2 px-1">
        <div className="flex items-end gap-2 rounded-full border border-border/60 bg-card/80 backdrop-blur-xl pl-4 pr-1.5 py-1.5">
          <input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Message Coach Max..."
            className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none py-1.5 min-w-0"
            disabled={isLoading}
          />
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => sendMessage(message)}
            disabled={!message.trim() || isLoading}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
              message.trim()
                ? 'bg-gradient-to-br from-accent to-primary shadow-lg shadow-accent/30'
                : 'bg-muted/60'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            ) : (
              <ArrowUp className={`w-4 h-4 ${message.trim() ? 'text-white' : 'text-muted-foreground/50'}`} />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
