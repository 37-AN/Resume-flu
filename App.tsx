
import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, SKILLS, EXPERIENCES } from './data';
import { CommandEntry } from './types';
import { NetworkScannerDemo, PLCSimulatorDemo } from './components/Demos';

const ASCII_ART = `
███████╗████████╗██╗  ██╗ █████╗ ███╗   ██╗    ██████╗  █████╗ ██████╗ ███╗   ██╗███████╗███████╗
██╔════╝╚══██╔══╝██║  ██║██╔══██╗████╗  ██║    ██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔════╝██╔════╝
█████╗     ██║   ███████║███████║██╔██╗ ██║    ██████╔╝███████║██████╔╝██╔██╗ ██║█████╗  ███████╗
██╔══╝     ██║   ██╔══██║██╔══██║██║╚██╗██║    ██╔══██╗██╔══██║██╔══██╗██║╚██╗██║██╔══╝  ╚════██║
███████╗   ██║   ██║  ██║██║  ██║██║ ╚████║    ██████╔╝██║  ██║██║  ██║██║ ╚████║███████╗███████║
╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝
`;

const COMMANDS = {
  HELP: 'help',
  BIO: 'bio',
  SKILLS: 'skills',
  EXP: 'exp',
  DEMO: 'demo',
  CONTACT: 'contact',
  CLEAR: 'clear',
  LS: 'ls',
  SUDO: 'sudo',
  WHOAMI: 'whoami',
};

const App: React.FC = () => {
  const [history, setHistory] = useState<CommandEntry[]>([
    { type: 'output', content: <pre className="text-emerald-500 whitespace-pre overflow-x-auto text-[8px] md:text-xs leading-none mb-4">{ASCII_ART}</pre>, timestamp: new Date().toLocaleTimeString() },
    { type: 'output', content: "Welcome to Ethan Barnes' interactive portfolio terminal.", timestamp: new Date().toLocaleTimeString() },
    { type: 'output', content: "System initialized. Select a module below or type 'help'.", timestamp: new Date().toLocaleTimeString() },
  ]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.toLowerCase().trim();
    if (!raw) return;
    
    const parts = raw.split(' ');
    const command = parts[0];

    const newEntry = (content: React.ReactNode): CommandEntry => ({
      type: 'output',
      content,
      timestamp: new Date().toLocaleTimeString()
    });

    setHistory(prev => [...prev, { type: 'input', content: cmdStr, timestamp: new Date().toLocaleTimeString() }]);

    switch (command) {
      case COMMANDS.HELP:
        setHistory(prev => [...prev, newEntry(
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-2">
            {[
              { cmd: 'bio', desc: 'Profile & Info' },
              { cmd: 'skills', desc: 'Tech Matrix' },
              { cmd: 'exp', desc: 'Experience' },
              { cmd: 'demo', desc: 'Live Demos' },
              { cmd: 'contact', desc: 'Email/Web' },
              { cmd: 'ls', desc: 'List Dir' },
              { cmd: 'whoami', desc: 'Current User' },
              { cmd: 'clear', desc: 'Clear Log' },
            ].map(({ cmd, desc }) => (
              <button 
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="text-left group border border-gray-800 hover:border-emerald-600 p-2 rounded bg-gray-900/40 hover:bg-emerald-900/20 transition-all active:scale-95"
              >
                <div className="font-bold text-emerald-400 group-hover:text-emerald-300 flex items-center gap-2">
                  <span>➢</span> {cmd}
                </div>
                <div className="text-gray-500 text-[10px] uppercase tracking-wider pl-4">{desc}</div>
              </button>
            ))}
          </div>
        )]);
        break;

      case COMMANDS.LS:
        setHistory(prev => [...prev, newEntry(
          <div className="flex flex-wrap gap-4 text-emerald-400 font-bold">
            <button onClick={() => handleCommand('bio')} className="hover:text-white hover:underline">bio/</button> 
            <button onClick={() => handleCommand('skills')} className="hover:text-white hover:underline">skills/</button> 
            <button onClick={() => handleCommand('exp')} className="hover:text-white hover:underline">experience/</button> 
            <button onClick={() => handleCommand('demo')} className="hover:text-white hover:underline">demos/</button> 
            <span className="text-gray-500 font-normal">contact.txt</span>
            <span className="text-gray-600 font-normal">.config</span>
          </div>
        )]);
        break;

      case COMMANDS.BIO:
        setHistory(prev => [...prev, newEntry(
          <div className="py-2 space-y-3 max-w-3xl">
            <div className="border-l-4 border-emerald-600 pl-4 bg-gray-900/30 p-2 rounded-r">
              <h2 className="text-white font-bold text-lg">{PERSONAL_INFO.name}</h2>
              <div className="text-emerald-500 font-mono text-sm">{PERSONAL_INFO.title}</div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base opacity-90">"{PERSONAL_INFO.profile}"</p>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Based in: {PERSONAL_INFO.address}</span>
            </div>
          </div>
        )]);
        break;

      case COMMANDS.SKILLS:
        setHistory(prev => [...prev, newEntry(
          <div className="py-2">
             <div className="text-xs text-gray-500 mb-2">Executing skill_matrix_v2.0...</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(
                SKILLS.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof SKILLS>)
              ).map(([category, skills]) => (
                <div key={category} className="bg-gray-900/40 p-3 rounded border border-gray-800">
                  <h3 className="text-emerald-500 font-bold text-xs uppercase mb-2 border-b border-gray-800 pb-1">{category}</h3>
                  <div className="space-y-1">
                    {skills.map((s, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-gray-300">{s.name}</span>
                        <span className={`text-[10px] px-1.5 rounded ${
                          s.level === 'Senior' || s.level === 'Architect' ? 'bg-purple-900 text-purple-200' :
                          s.level === 'Intermediate' ? 'bg-blue-900 text-blue-200' :
                          'bg-gray-800 text-gray-400'
                        }`}>{s.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )]);
        break;

      case COMMANDS.EXP:
        setHistory(prev => [...prev, newEntry(
          <div className="py-4 space-y-6">
            {EXPERIENCES.map((e, i) => (
              <div key={i} className="group relative pl-6 border-l border-gray-800 hover:border-emerald-600 transition-colors">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-800 group-hover:bg-emerald-500 border border-black transition-colors"></div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 gap-1">
                  <h3 className="text-white font-bold text-sm">{e.role}</h3>
                  <span className="text-emerald-600 text-[10px] font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/50">{e.period}</span>
                </div>
                
                <div className="text-gray-400 text-xs mb-2 font-medium">{e.company} • {e.location}</div>
                
                <ul className="space-y-1.5">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="text-gray-500 text-xs flex gap-2 items-start hover:text-gray-300">
                      <span className="text-emerald-800 mt-1">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )]);
        break;

      case COMMANDS.DEMO:
        setHistory(prev => [...prev, newEntry(
          <div className="py-2 space-y-6">
            <div className="p-2 border border-blue-900/50 bg-blue-950/10 rounded">
                <div className="text-blue-400 text-xs font-bold mb-1"> SYSTEM STATUS: RUNNING DEMOS...</div>
                <div className="h-1 w-full bg-gray-800 rounded overflow-hidden">
                    <div className="h-full bg-blue-500 animate-[width_2s_ease-out_forwards]" style={{width: '100%'}}></div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
               <NetworkScannerDemo />
               <PLCSimulatorDemo />
            </div>
          </div>
        )]);
        break;

      case COMMANDS.CONTACT:
        setHistory(prev => [...prev, newEntry(
          <div className="p-4 space-y-3 border border-gray-800 rounded bg-gray-900/40 max-w-lg">
             <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-emerald-900 flex items-center justify-center text-emerald-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                 </div>
                 <div>
                     <div className="text-[10px] text-gray-500 uppercase">Email Protocol</div>
                     <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-emerald-400 underline decoration-gray-700 underline-offset-4">{PERSONAL_INFO.email}</a>
                 </div>
             </div>
             
             <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-emerald-900 flex items-center justify-center text-emerald-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                 </div>
                 <div>
                     <div className="text-[10px] text-gray-500 uppercase">Voice Uplink</div>
                     <div className="text-white">{PERSONAL_INFO.phone}</div>
                 </div>
             </div>

             <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-emerald-900 flex items-center justify-center text-emerald-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                 </div>
                 <div>
                     <div className="text-[10px] text-gray-500 uppercase">Hyperlink</div>
                     <a href={PERSONAL_INFO.links[0]} target="_blank" rel="noreferrer" className="text-white hover:text-emerald-400 underline decoration-gray-700 underline-offset-4">{PERSONAL_INFO.links[0]}</a>
                 </div>
             </div>
          </div>
        )]);
        break;

      case COMMANDS.CLEAR:
        setHistory([{ type: 'output', content: "Console buffer cleared. System ready.", timestamp: new Date().toLocaleTimeString() }]);
        break;

      case COMMANDS.WHOAMI:
        setHistory(prev => [...prev, newEntry(<span className="text-yellow-500 font-bold tracking-wider">guest_user_root@ethan-barnes-systems</span>)]);
        break;

      case COMMANDS.SUDO:
        setHistory(prev => [...prev, newEntry(<span className="text-red-500 font-bold bg-red-950/30 px-2 py-1 rounded">ACCESS DENIED: Administrative privileges required.</span>)]);
        break;

      default:
        setHistory(prev => [...prev, newEntry(
            <div className="flex items-center gap-2">
              <span className="text-red-400">Command '{command}' not recognized.</span>
              <button onClick={() => handleCommand('help')} className="text-gray-500 hover:text-white underline text-xs">View Help</button>
            </div>
        )]);
    }
    setInput('');
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.trim()) {
      const match = Object.values(COMMANDS).filter(c => c.startsWith(val.toLowerCase()));
      setSuggestions(match);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-black text-emerald-500 p-2 md:p-4 font-mono relative selection:bg-emerald-900 selection:text-white" onClick={focusInput}>
      <div className="scanline"></div>
      
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-2 bg-gray-900/80 backdrop-blur px-4 py-2 rounded-t shadow-lg z-20 shrink-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
        </div>
        <div className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">
           <svg className="w-4 h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
           ethan_barnes@portfolio: ~
        </div>
        <div className="text-[10px] text-gray-600 hidden md:block">BASH v5.2</div>
      </div>

      {/* Terminal History */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 mb-2 z-10 custom-scrollbar pr-2 pb-4"
      >
        {history.map((entry, idx) => (
          <div key={idx} className="group">
            {entry.type === 'input' ? (
              <div className="flex gap-2 items-center text-sm md:text-base mt-4 mb-2">
                <span className="text-emerald-700 font-bold">➜</span>
                <span className="text-white">{entry.content}</span>
                <span className="ml-auto opacity-0 group-hover:opacity-50 text-[10px] text-gray-700 transition-opacity hidden md:inline">{entry.timestamp}</span>
              </div>
            ) : (
              <div className="text-gray-300 ml-0 md:ml-5 text-sm md:text-base animate-pulse-fast">
                {entry.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Access Toolbar */}
      <div className="z-20 mb-2 overflow-x-auto pb-1 border-t border-gray-800/50 pt-2 shrink-0">
        <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-2 font-bold pl-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Quick Access Modules
        </div>
        <div className="flex gap-2 px-1">
            {[
                { label: 'PROFILE', cmd: COMMANDS.BIO, color: 'emerald' },
                { label: 'SKILLS', cmd: COMMANDS.SKILLS, color: 'emerald' },
                { label: 'EXP', cmd: COMMANDS.EXP, color: 'emerald' },
                { label: 'DEMOS', cmd: COMMANDS.DEMO, color: 'blue' },
                { label: 'CONTACT', cmd: COMMANDS.CONTACT, color: 'emerald' },
                { label: 'HELP', cmd: COMMANDS.HELP, color: 'gray' }
            ].map((btn) => (
                <button
                    key={btn.label}
                    onClick={(e) => { e.stopPropagation(); handleCommand(btn.cmd); }}
                    className={`px-3 py-1.5 bg-gray-900 border ${btn.color === 'blue' ? 'border-blue-900/50 text-blue-400 hover:border-blue-500' : 'border-gray-700 text-emerald-400 hover:border-emerald-500'} rounded text-xs hover:text-white hover:bg-gray-800 transition-all uppercase tracking-wider shadow-sm whitespace-nowrap`}
                >
                    [{btn.label}]
                </button>
            ))}
             <button 
              onClick={(e) => { e.stopPropagation(); handleCommand('clear'); }}
              className="px-3 py-1.5 bg-gray-900 border border-red-900/30 rounded text-xs text-red-400 hover:text-white hover:bg-red-900/50 hover:border-red-500 transition-all uppercase tracking-wider shadow-sm ml-auto whitespace-nowrap"
            >
              CLS
            </button>
        </div>
      </div>

      {/* Input Line */}
      <div className="relative z-20 shrink-0">
          {/* Autocomplete Popup */}
          {suggestions.length > 0 && (
            <div className="absolute bottom-full left-0 mb-2 w-64 bg-gray-900/95 backdrop-blur border border-emerald-700/50 rounded shadow-2xl overflow-hidden">
                <div className="bg-gray-800/50 px-2 py-1 text-[10px] text-gray-500 uppercase tracking-wider border-b border-gray-700">Suggestions (Press TAB)</div>
                {suggestions.map((s, i) => (
                    <div 
                        key={s}
                        className={`px-3 py-2 cursor-pointer text-sm flex justify-between items-center ${i === 0 ? 'bg-emerald-900/30 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                        onClick={(e) => { e.stopPropagation(); setInput(s); setSuggestions([]); inputRef.current?.focus(); }}
                    >
                        <span>{s}</span>
                        {i === 0 && <span className="text-[10px] bg-gray-800 px-1 rounded text-gray-400">TAB</span>}
                    </div>
                ))}
            </div>
          )}
          
          <div className="flex gap-2 items-center bg-gray-900/80 p-3 rounded shadow-inner border border-gray-800/50 ring-1 ring-white/5">
            <span className="text-emerald-500 font-bold whitespace-nowrap animate-pulse">➜</span>
            <span className="text-blue-400 font-bold whitespace-nowrap">~</span>
            <input
              ref={inputRef}
              autoFocus
              type="text"
              className="bg-transparent border-none outline-none text-gray-100 flex-1 min-w-0 placeholder-gray-700"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              placeholder="Type command..."
            />
          </div>
      </div>

      {/* Footer Info */}
      <div className="mt-2 text-[10px] text-gray-600 flex justify-between z-10 font-sans shrink-0">
        <div className="flex gap-4">
             <span>STATUS: <span className="text-emerald-500">ONLINE</span></span>
             <span className="hidden sm:inline">LATENCY: 12ms</span>
        </div>
        <div className="hidden md:block opacity-50">ETHAN BARNES SYSTEMS © 2025</div>
      </div>
    </div>
  );
};

export default App;
