import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  CameraIcon,
  ArrowUpTrayIcon,
  ShieldExclamationIcon,
  BeakerIcon,
  CheckBadgeIcon,
  LightBulbIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/solid";

// A dedicated card for displaying specific information like symptoms or solutions
const InfoCard = ({ title, content, icon: Icon, color = "green" }) => {
    const colorClasses = {
        green: { bg: 'bg-green-50', border: 'border-green-300', icon: 'text-green-600', title: 'text-green-900', content: 'text-green-800' },
        amber: { bg: 'bg-amber-50', border: 'border-amber-300', icon: 'text-amber-600', title: 'text-amber-900', content: 'text-amber-800' },
        red: { bg: 'bg-red-50', border: 'border-red-300', icon: 'text-red-600', title: 'text-red-900', content: 'text-red-800' },
    };
    const classes = colorClasses[color];

    return (
        <div className={`rounded-lg border ${classes.border} ${classes.bg} p-4`}>
            <div className="flex items-start gap-3">
                <Icon className={`h-7 w-7 flex-shrink-0 ${classes.icon}`} />
                <div>
                    <h3 className={`font-semibold ${classes.title}`}>{title}</h3>
                    <p className={`mt-1 text-base ${classes.content}`}>{content}</p>
                </div>
            </div>
        </div>
    );
};

const DiseaseIdentifier = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const streamRef = useRef(null);

  const [imageBlob, setImageBlob] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- CAMERA MANAGEMENT ---
  const startCameraStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
      })
      .catch((err) => {
        console.error("Camera access error:", err);
        setError("Could not access the camera. Please check permissions.");
      });
  };

  const stopCameraStream = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
  };
  
  useEffect(() => {
    startCameraStream();
    return () => stopCameraStream(); // Cleanup on unmount
  }, []);

  const resetState = () => {
    setImageBlob(null);
    setImagePreview(null);
    setResultData(null);
    setError(null);
    startCameraStream(); // Restart camera
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        setImageBlob(blob);
        setImagePreview(URL.createObjectURL(blob));
        setResultData(null);
        stopCameraStream(); // Turn off camera
      }, "image/jpeg");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageBlob(file);
      setImagePreview(URL.createObjectURL(file));
      setResultData(null);
      stopCameraStream(); // Turn off camera
    }
  };

  // --- API CALL ---
  const handleSendToAPI = async () => {
    if (!imageBlob) return;
    setIsLoading(true);
    setResultData(null);
    setError(null);
    const formData = new FormData();
    formData.append("file", imageBlob);

    try {
      const res = await fetch("http://127.0.0.1:8080/ai/getplantdisease", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setResultData(data);
    } catch (error) {
      console.error("Analysis failed", error);
      setError("Error contacting the analysis server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const confidence = resultData ? Math.round(resultData.confidence * 100) : 0;
  let confidenceColor = '#ef4444'; // Red
  if (confidence > 50) confidenceColor = '#f59e0b'; // Amber
  if (confidence > 75) confidenceColor = '#22c55e'; // Green

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="text-center">
          <div className="inline-flex items-center gap-3">
            <ShieldExclamationIcon className="h-10 w-10 text-green-600" />
            <h1 className="text-4xl font-bold text-slate-800">Plant Disease Identifier</h1>
          </div>
          <p className="mt-2 text-lg text-slate-600">Use your camera or upload an image to detect plant diseases.</p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* --- Input Panel --- */}
          <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-700">1. Provide an Image</h2>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-900">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full w-full object-contain" />
              ) : (
                <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" />
              )}
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={captureImage} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"><CameraIcon className="h-5 w-5" /><span>Capture</span></button>
              <button onClick={() => fileInputRef.current?.click()} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-200"><ArrowUpTrayIcon className="h-5 w-5" /><span>Upload</span></button>
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />
            </div>
            {imageBlob && <button onClick={handleSendToAPI} disabled={isLoading} className="w-full inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? "Analyzing..." : "Identify Disease"}</button>}
          </div>

          {/* --- Results Panel --- */}
          <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-700">2. View Results</h2>
            {isLoading ? <div className="animate-pulse h-64 w-full rounded-md bg-slate-200"></div> :
             error ? <InfoCard title="Error" content={error} icon={ExclamationTriangleIcon} color="red" /> :
             resultData ? (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 flex-shrink-0">
                        <CircularProgressbar value={confidence} text={`${confidence}%`} strokeWidth={8} styles={buildStyles({ pathColor: confidenceColor, textColor: '#1e293b', trailColor: '#e2e8f0' })}/>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-500">Prediction</p>
                        <p className="text-2xl font-bold text-slate-800">{resultData.prediction.replace(/_/g, " ")}</p>
                        <p className="text-sm text-slate-500">Plant: <span className="font-semibold">{resultData.info.Plant}</span></p>
                    </div>
                </div>
                <InfoCard title="Symptoms" content={resultData.info.Symptoms} icon={BeakerIcon} color="amber"/>
                <InfoCard title="Warning" content={resultData.info.Warning} icon={ExclamationTriangleIcon} color="red"/>
                <InfoCard title="Recommended Solution" content={resultData.info.Solution} icon={CheckBadgeIcon} color="green"/>
                <button onClick={resetState} className="w-full text-sm font-semibold text-slate-500 hover:text-green-600">Scan Another Plant</button>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-8 text-center">
                <BeakerIcon className="h-12 w-12 text-slate-300" />
                <p className="mt-4 font-semibold text-slate-600">Your analysis results will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseIdentifier;