import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export async function loadChatHistory(): Promise<ChatMessage[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })
    .limit(100);

  if (error) {
    console.error('Failed to load chat:', error);
    return [];
  }
  return (data || []) as ChatMessage[];
}

export async function saveChatMessage(role: 'user' | 'assistant', content: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('chat_messages').insert({
    user_id: user.id,
    role,
    content,
  });
}
