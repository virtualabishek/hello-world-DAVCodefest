import React, { useEffect, useRef, useState } from "react";
import {
  CameraIcon,
  ArrowUpTrayIcon,
  ShieldExclamationIcon,
  BeakerIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";

// --- Loading Skeleton for the Results Panel ---
const ResultsSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="space-y-3">
      <div className="h-6 w-1/3 rounded-md bg-slate-200"></div>
      <div className="h-10 w-1/2 rounded-md bg-slate-200"></div>
    </div>
    <div className="space-y-3">
      <div className="h-6 w-1/3 rounded-md bg-slate-200"></div>
      <div className="h-24 w-full rounded-md bg-slate-200"></div>
    </div>
  </div>
);

const DiseaseIdentifier = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [imageBlob, setImageBlob] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingSolution, setIsFetchingSolution] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera access error:", err);
      });
  }, []);

  const resetState = () => {
    setImageBlob(null);
    setImagePreview(null);
    setPrediction("");
    setSolution("");
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
        setPrediction("");
        setSolution("");
      }, "image/jpeg");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageBlob(file);
      setImagePreview(URL.createObjectURL(file));
      setPrediction("");
      setSolution("");
    }
  };

  const handleSendToAPI = async () => {
    if (!imageBlob) return;
    setIsLoading(true);
    setSolution("");
    setPrediction("");
    const formData = new FormData();
    formData.append("file", imageBlob);

    try {
      const res = await fetch("http://127.0.0.1:8080/ai/getdisease", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPrediction(data.prediction || "Could not identify disease.");
    } catch (error) {
      console.error("Upload failed", error);
      setPrediction("❌ Error contacting API");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetSolution = async () => {
    if (!prediction || prediction.includes("❌")) return;
    setIsFetchingSolution(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:8080/ai/getsolution?disease=${prediction}`
      );
      const data = await res.json();
      setSolution(data.solution || "No specific solution found.");
    } catch (error) {
      console.error("Error fetching solution", error);
      setSolution("❌ Failed to fetch solution.");
    } finally {
      setIsFetchingSolution(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="text-center">
          <div className="inline-flex items-center gap-3">
            <ShieldExclamationIcon className="h-10 w-10 text-green-600" />
            <h1 className="text-4xl font-bold text-slate-800">
              Plant Disease Identifier
            </h1>
          </div>
          <p className="mt-2 text-lg text-slate-600">
            Use your camera or upload an image to detect plant diseases.
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* --- Input Panel --- */}
          <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-700">
              1. Provide an Image
            </h2>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-slate-900">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />
              )}
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={captureImage}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
              >
                <CameraIcon className="h-5 w-5" />
                <span>Capture</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-200"
              >
                <ArrowUpTrayIcon className="h-5 w-5" />
                <span>Upload</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {imageBlob && (
              <button
                onClick={handleSendToAPI}
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Analyzing..." : "Identify Disease"}
              </button>
            )}
          </div>

          {/* --- Results Panel --- */}
          <div className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-700">
              2. View Results
            </h2>
            {isLoading ? (
              <ResultsSkeleton />
            ) : prediction ? (
              <div className="space-y-6">
                <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <BeakerIcon className="h-7 w-7 flex-shrink-0 text-amber-500" />
                    <div>
                      <h3 className="font-semibold text-amber-900">
                        Detected Disease
                      </h3>
                      <p className="text-lg font-bold text-amber-900">
                        {prediction}
                      </p>
                    </div>
                  </div>
                </div>

                {!solution && (
                  <button
                    onClick={handleGetSolution}
                    disabled={isFetchingSolution || prediction.includes("❌")}
                    className="w-full inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isFetchingSolution ? "Finding Solution..." : "Get Recommended Solution"}
                  </button>
                )}

                {solution && (
                  <div className="rounded-lg border border-green-300 bg-green-50 p-4">
                    <div className="flex items-start gap-3">
                      <CheckBadgeIcon className="h-7 w-7 flex-shrink-0 text-green-600" />
                      <div>
                        <h3 className="font-semibold text-green-900">
                          Recommended Solution
                        </h3>
                        <p className="mt-1 text-base text-green-800">
                          {solution}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <button onClick={resetState} className="w-full text-sm text-slate-500 hover:text-slate-700">Start Over</button>

              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-8 text-center">
                <BeakerIcon className="h-12 w-12 text-slate-300" />
                <p className="mt-4 font-semibold text-slate-600">
                  Your analysis results will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseIdentifier;  