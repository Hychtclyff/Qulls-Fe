import { MessageCircle, MoreHorizontal, Send } from 'lucide-react';
import { INITIAL_DATA } from '../data';
import { useDashboard } from '../hooks/useDashboard';
import Image from 'next/image';
import { AdminButton } from '@/common/components/admin/ui/button';
import { useRef } from 'react';

export const Chat = () => {
  // Pastikan refs dikembalikan sebagai objek ref utuh dari hook
  const { state, actions } = useDashboard(INITIAL_DATA);
  const data = state.data;
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const activeChat = data.chats.find((c) => c.id === state.selectedChat);

  return (
    <div className="animate-slide-in-up flex h-[calc(100vh-140px)] gap-6">
      {/* Sidebar: Chat List */}
      <div className="flex w-1/3 flex-col rounded-3xl border border-cyan-100 bg-white/70 p-4 shadow-lg backdrop-blur-xl">
        <div className="mb-4 px-2">
          <h2 className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-slate-700">
            <MessageCircle size={16} className="text-cyan-500" /> DIRECT LINK
          </h2>
        </div>

        <div className="custom-scrollbar flex-1 space-y-2 overflow-y-auto">
          {data.chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => actions.setSelectedChat(chat.id)}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition-all ${
                state.selectedChat === chat.id
                  ? 'border-cyan-200 bg-cyan-50'
                  : 'border-transparent bg-transparent hover:bg-slate-50'
              }`}
            >
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src={chat.avatar}
                  alt={chat.user}
                  width={40}
                  height={40}
                  className="rounded-full bg-slate-200 object-cover"
                />
                <div
                  className={`absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white ${
                    chat.status === 'online' ? 'bg-emerald-500' : 'bg-slate-400'
                  }`}
                ></div>
              </div>
              <div className="overflow-hidden">
                <h4 className="truncate text-xs font-bold text-slate-700">{chat.user}</h4>
                <p className="truncate text-[10px] text-slate-500">
                  {chat.messages[chat.messages.length - 1]?.text || 'No messages'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-cyan-100 bg-white/80 shadow-lg backdrop-blur-xl">
        {activeChat ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cyan-100 bg-cyan-50/30 p-4">
              <div className="flex items-center gap-3">
                <Image
                  src={activeChat.avatar}
                  alt={activeChat.user}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-700">{activeChat.user}</h3>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-600">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></div>{' '}
                    ONLINE
                  </span>
                </div>
              </div>
              <MoreHorizontal size={18} className="cursor-pointer text-slate-400" />
            </div>

            {/* Messages - THE REF IS ATTACHED HERE */}
            <div
              className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-6"
              ref={chatScrollRef}
            >
              {activeChat.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'me'
                        ? 'rounded-tr-none bg-indigo-500 text-white shadow-[0_4px_15px_rgba(99,102,241,0.3)]'
                        : 'rounded-tl-none border border-slate-100 bg-white text-slate-600 shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <div className="flex gap-2 border-t border-slate-100 bg-white p-4">
              <input
                type="text"
                value={state.newMessage}
                onChange={(e) => actions.setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && actions.handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border-none bg-slate-50 px-4 py-3 text-xs transition-all outline-none focus:ring-2 focus:ring-cyan-200"
              />
              <AdminButton
                onClick={actions.handleSendMessage}
                className="rounded-xl bg-cyan-500 p-3 text-white shadow-lg transition-all hover:bg-cyan-600 hover:shadow-cyan-200"
              >
                <Send size={18} />
              </AdminButton>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            <MessageCircle size={48} className="mb-2 opacity-20" />
            <p className="text-sm">Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};
