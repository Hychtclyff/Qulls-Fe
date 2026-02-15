import { Bot, Terminal, User } from 'lucide-react';
import { Card } from './ui/card';
import { useRef } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { INITIAL_DATA } from '../data';

export const AILab = () => {
  const aiScrollRef = useRef<HTMLDivElement>(null);
  const { state, actions } = useDashboard(INITIAL_DATA);
  const data = state.data;
  return (
    <div className="animate-slide-in-up flex h-[calc(100vh-140px)] flex-col">
      <Card
        title="YUI / CARDINAL AGENT"
        icon={Bot}
        className="flex flex-1 flex-col overflow-hidden !p-0"
      >
        <div
          className="custom-scrollbar relative flex-1 space-y-4 overflow-y-auto bg-[#0f172a] p-6 font-mono text-xs"
          ref={aiScrollRef}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          {data.aiHistory.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.sender === 'me' ? 'flex-row-reverse' : ''} relative z-10`}
            >
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded ${msg.sender === 'ai' ? 'border border-cyan-500/50 bg-cyan-500/20 text-cyan-400' : 'border border-indigo-500/50 bg-indigo-500/20 text-indigo-400'}`}
              >
                {msg.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div
                className={`max-w-[80%] rounded border p-3 ${msg.sender === 'ai' ? 'border-cyan-500/30 bg-cyan-900/10 text-cyan-100 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'border-indigo-500/30 bg-indigo-900/10 text-indigo-100'}`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {state.isAiTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-cyan-500/50 bg-cyan-500/20 text-cyan-400">
                <Bot size={16} />
              </div>
              <div className="flex h-8 items-center gap-1 px-2">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-500"></span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-500 delay-75"></span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-500 delay-150"></span>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-slate-700 bg-[#1e293b] p-4">
          <div className="animate-pulse text-cyan-500">
            <Terminal size={18} />
          </div>
          <input
            type="text"
            value={state.aiPrompt}
            onChange={(e) => actions.setAiPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && actions.handleSendAiPrompt()}
            placeholder="Enter system command or prompt..."
            className="flex-1 border-none bg-transparent font-mono text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:ring-0"
          />
          <button
            onClick={actions.handleSendAiPrompt}
            className="rounded bg-cyan-600 px-4 py-2 font-mono text-xs tracking-wider text-white uppercase shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-colors hover:bg-cyan-500"
          >
            Execute
          </button>
        </div>
      </Card>
    </div>
  );
};
