import express from "express";
import mqtt from "mqtt";

export const mqttrouter = express.Router();

const client = mqtt.connect("mqtt://192.168.1.71:1883", {
  clientId: "NodeServerClient",
});

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});
let pendingResponse = null;

client.on("message", (topic, message) => {
  if (topic === "esp32/response") {
    const responseStr = message.toString();
    console.log("Response from ESP32:", responseStr);

    if (pendingResponse) {
      pendingResponse(responseStr);
      pendingResponse = null; // clear after resolving
    }
  }
});

client.subscribe("esp32/response", (err) => {
  if (err) {
    console.error("Failed to subscribe to esp32/response", err);
  }
});

mqttrouter.get("/send", (req, res) => {
  const topic = "esp32/command";
  const message = "Hello World";

  client.publish(topic, message, () => {
    console.log(`messag sent to topic ${topic} : ${message}`);
    res.send("messag sent to esp32");
  });
});
mqttrouter.get("/", (req, res) => {
  res.send("he;;p wpr; ");
});

mqttrouter.post("/senddegree", async (req, res) => {
  const { degree } = req.body;
  console.log("req.bpody", req.body);
  if (degree === undefined) {
    return res.status(400).json({ error: "Degree value is required" });
  }

  // Publish degree to esp32/command
  client.publish("esp32/val", degree.toString());

  try {
    // Wait for response with a timeout (5 seconds)
    const esp32Response = await new Promise((resolve, reject) => {
      pendingResponse = resolve;
      setTimeout(() => {
        if (pendingResponse) {
          pendingResponse = null;
          reject(new Error("Timeout waiting for ESP32 response"));
        }
      }, 10000);
    });

    res.json({ message: esp32Response });
  } catch (err) {
    res.status(504).json({ error: err.message });
  }
});
