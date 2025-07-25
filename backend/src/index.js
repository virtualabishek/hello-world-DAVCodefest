import { app } from './app.js';   // Import Express app
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { DBCONNECT } from './DB/db.js';
import { setupSocketServer } from './services/socketService.js';  

import dotenv from 'dotenv';

dotenv.config();


const server = createServer(app);

setupSocketServer(server);



const PORT = process.env.PORT || 7180;

DBCONNECT().then(() => {
    try {
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`Server running on http://192.168.1.117:${PORT}`);
            console.log(`Server running on http://192.168.218.19:${PORT}`);
                        console.log(`Server running on http://192.168.1.100:${PORT}`);

            


             
            console.log('MongoDB connected successfully');
        });
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
}).catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
});