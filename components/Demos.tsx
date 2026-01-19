
import React, { useState, useEffect } from 'react';

export const NetworkScannerDemo: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  const ports = [21, 22, 80, 443, 3306, 5432, 8080];
  
  const startScan = () => {
    setScanning(true);
    setLogs(["[INFO] Starting network scan at " + new Date().toLocaleTimeString()]);
    
    ports.forEach((port, index) => {
      setTimeout(() => {
        const isOpen = Math.random() > 0.4;
        setLogs(prev => [...prev, `[SCAN] Checking port ${port}... ${isOpen ? 'OPEN' : 'CLOSED'}`]);
        if (index === ports.length - 1) {
          setTimeout(() => {
            setLogs(prev => [...prev, "[SUCCESS] Scan complete. Found " + Math.floor(Math.random() * 3 + 1) + " active services."]);
            setScanning(false);
          }, 500);
        }
      }, (index + 1) * 600);
    });
  };

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded mt-2 font-mono text-sm max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-emerald-500 font-bold uppercase tracking-widest text-xs">// Network Scanner (Nmap Simulation)</h4>
        <button 
          onClick={startScan} 
          disabled={scanning}
          className={`px-3 py-1 rounded text-xs uppercase tracking-tighter ${scanning ? 'bg-gray-700 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
        >
          {scanning ? 'Scanning...' : 'Run Scan'}
        </button>
      </div>
      <div className="h-40 overflow-y-auto bg-black p-2 rounded border border-gray-800 text-gray-400">
        {logs.map((log, i) => (
          <div key={i} className={log.includes('OPEN') ? 'text-emerald-400' : ''}>{log}</div>
        ))}
        {logs.length === 0 && <div className="italic text-gray-600">Ready to scan...</div>}
      </div>
    </div>
  );
};

export const PLCSimulatorDemo: React.FC = () => {
  const [tankLevel, setTankLevel] = useState(45);
  const [valveOpen, setValveOpen] = useState(false);
  const [pumpOn, setPumpOn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTankLevel(prev => {
        let next = prev;
        if (pumpOn) next += 2;
        if (valveOpen) next -= 1.5;
        return Math.min(Math.max(next, 0), 100);
      });
    }, 200);
    return () => clearInterval(interval);
  }, [pumpOn, valveOpen]);

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded mt-2 font-mono text-sm max-w-lg">
      <h4 className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4">// PLC Automation (SCADA Simulation)</h4>
      <div className="flex gap-4">
        <div className="w-1/3 bg-gray-800 rounded p-1 relative h-48 border-2 border-gray-700">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-blue-600 transition-all duration-300" 
            style={{ height: `${tankLevel}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-white shadow-sm">
            {tankLevel.toFixed(1)}%
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs">PUMP (I:0/0)</span>
            <button 
              onClick={() => setPumpOn(!pumpOn)}
              className={`w-12 h-6 rounded-full transition-colors relative ${pumpOn ? 'bg-emerald-600' : 'bg-red-900'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${pumpOn ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">VALVE (Q:0/1)</span>
            <button 
              onClick={() => setValveOpen(!valveOpen)}
              className={`w-12 h-6 rounded-full transition-colors relative ${valveOpen ? 'bg-emerald-600' : 'bg-red-900'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${valveOpen ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
          <div className="text-[10px] text-gray-500 mt-4 leading-tight">
            Simulation based on Siemens TIA Portal logic blocks Ethan manages at Blendcor.
          </div>
        </div>
      </div>
    </div>
  );
};
