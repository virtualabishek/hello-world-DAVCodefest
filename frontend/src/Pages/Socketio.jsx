// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const SocketIO = () => {
//   const [sensorData, setSensorData] = useState(null);
//   const [connectionStatus, setConnectionStatus] = useState('Connecting...');


//   useEffect(() => {
//     const socket = io('http://localhost:7180', {
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socket.on('connect', () => {
//       setConnectionStatus('Connected');
//       console.log('Socket connected');
//     });

//     socket.on('disconnect', () => {
//       setConnectionStatus('Disconnected');
//       console.log('Socket disconnected');
//     });

//     socket.on('connect_error', () => {
//       setConnectionStatus('Connection Error');
//       console.log('Connection error');
//     });

//     socket.on('sensorDataUpdate', (data) => {
//       console.log("Received from WebSocket:", data);
//       setSensorData(data);
//     });



//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="socketio-page">
//       <h1>Real-time Sensor Data</h1>
//       <div className="connection-status">
//         <p>Status: {connectionStatus}</p>
//       </div>
      
//       {sensorData ? (
//         <div className="sensor-data">
//           <h2>Flame Sensor Data</h2>
//           <p>Status: {sensorData.value ? 'Flame Detected' : 'No Flame Detected'}</p>
//           <p>Device Timestamp: {new Date(sensorData.timestamp).toLocaleString()}</p>
//           <p>Server Timestamp: {new Date(sensorData.serverTimestamp).toLocaleString()}</p>
//         </div>
//       ) : (
//         <p>Waiting for sensor data...</p>
//       )}

//     </div>
//   );
// };

// export default SocketIO;
  import React, { useEffect, useState } from 'react';
  import { io } from 'socket.io-client';

  const SocketIO = () => {
    const [sensorData, setSensorData] = useState({
      pir: null,
      soil: null,
      waterLevel: null,
      fire: null,
      gas: null,
      flame: null,
    });

    const [connectionStatus, setConnectionStatus] = useState('Connecting...');

    useEffect(() => {
      const socket = io('http://localhost:7180', {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socket.on('connect', () => {
        setConnectionStatus('Connected');
        console.log('Socket connected');
      });

      socket.on('disconnect', () => {
        setConnectionStatus('Disconnected');
        console.log('Socket disconnected');
      });

      socket.on('connect_error', () => {
        setConnectionStatus('Connection Error');
        console.log('Connection error');
      });

      // Listen for PIR sensor data
      socket.on('pir_data', (data) => {
        console.log('Received PIR sensor data:', data);
        setSensorData((prevData) => ({ ...prevData, pir: data }));
        console.log(data)
      });

      // Listen for Soil Moisture sensor data
      socket.on('soil_moisture_data', (data) => {
        console.log('Received Soil Moisture data:', data);
        setSensorData((prevData) => ({ ...prevData, soil: data }));
              console.log(data)

      });

      // Listen for Water Level sensor data
      socket.on('water_level_data', (data) => {
        console.log('Received Water Level data:', data);
        setSensorData((prevData) => ({ ...prevData, waterLevel: data }));
              console.log(data)

      });

      // Listen for Fire sensor data
      socket.on('fire_data', (data) => {
        console.log('Received Fire sensor data:', data);
        setSensorData((prevData) => ({ ...prevData, fire: data }));
              console.log(data)

      });

      // Listen for Gas sensor data
      socket.on('gas_data', (data) => {
        console.log('Received Gas sensor data:', data);
        setSensorData((prevData) => ({ ...prevData, gas: data }));
              console.log(data)

      });

      // Listen for Flame sensor data
      socket.on('fire_data', (data) => {
        console.log('Received Flame sensor data:', data);
        setSensorData((prevData) => ({ ...prevData, flame: data }));
              console.log(data)

      });


      return () => {
        socket.disconnect();
      };
    }, []);

    return (
      <div className="sensor-data-display">
        <h1>Real-time Sensor Data</h1>
        <div className="connection-status">
          <p>Status: {connectionStatus}</p>
        </div>

        <div className="sensor-section">
          <h2>PIR Sensor</h2>
          {sensorData.pir ? (
            <p>{sensorData.pir.value ? 'Motion Detected' : 'No Motion'}</p>
          ) : (
            <p>Waiting for PIR sensor data...</p>
          )}
        </div>

        <div className="sensor-section">
          <h2>Soil Moisture Sensor</h2>
          {sensorData.soil ? (
            <p>Moisture Level: {sensorData.soil.value}</p>
          ) : (
            <p>Waiting for Soil Moisture data...</p>
          )}
        </div>

        <div className="sensor-section">
          <h2>Water Level Sensor</h2>
          {sensorData.waterLevel ? (
            <p>Water Level: {sensorData.waterLevel.value}</p>
          ) : (
            <p>Waiting for Water Level data...</p>
          )}
        </div>

        {/* <div className="sensor-section">
          <h2>Fire Sensor</h2>
          {sensorData.fire ? (
            <p>{sensorData.fire.fireDetected ? 'Fire Detected' : 'No Fire'}</p>
          ) : (
            <p>Waiting for Fire data...</p>
          )}
        </div> */}

        <div className="sensor-section">
          <h2>Gas Sensor</h2>
          {sensorData.gas ? (
            <p>Gas Detected: {sensorData.gas.value ? 'Yes' : 'No'}</p>
          ) : (
            <p>Waiting for Gas data...</p>
          )}
        </div>

        <div className="sensor-section">
          <h2>Flame Sensor</h2>
          {sensorData.flame ? (
            <p>Flame Detected: {sensorData.flame.value ? 'Yes' : 'No'}</p>
          ) : (
            <p>Waiting for Flame data...</p>
          )}
        </div>

      </div>
    );
  };

  export default SocketIO;
