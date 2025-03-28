const WebSocket = require('ws');

const wss = new WebSocket.Server({ host: '0.0.0.0', port: 8080 }); // Bind to all interfaces

wss.on('connection', (ws) => {
  console.log('Happynest app connected');

  const sendVitals = () => {
    const vitals = {
      steps: Math.floor(Math.random() * 1000) + 3000,
      heartRate: Math.floor(Math.random() * 20) + 70,
      bloodPressure: {
        systolic: Math.floor(Math.random() * 46) + 100,
        diastolic: Math.floor(Math.random() * 31) + 60,
      },
      spO2: Math.floor(Math.random() * 4) + 95,
      sleep: Math.random() * 2 + 5,
      temperature: Math.random() * 1 + 36.5,
      timestamp: new Date().toISOString(),
    };
    ws.send(JSON.stringify(vitals));
    console.log('Sent vitals:', vitals);
  };

  sendVitals();
  const interval = setInterval(sendVitals, 5000); // Send vitals every minute

  ws.on('close', () => {
    console.log('Happynest app disconnected');
    clearInterval(interval);
  });
});

console.log('WebSocket server running on ws://0.0.0.0:8080');