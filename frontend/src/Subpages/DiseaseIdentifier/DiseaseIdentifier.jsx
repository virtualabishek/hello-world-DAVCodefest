import React, { useEffect, useRef, useState } from "react";

const DiseaseIdentifier = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [solution, setSolution] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingSolution, setIsFetchingSolution] = useState(false);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) => {
                console.error("Camera access error:", err);
            });
    }, []);

    const captureImage = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const ctx = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
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
        if (!imageBlob) {
            alert("Please capture or upload an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", imageBlob);

        try {
            setIsLoading(true);
            const res = await fetch("http://127.0.0.1:8080/ai/getdisease", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setPrediction(data.prediction);
        } catch (error) {
            console.error("Upload failed", error);
            setPrediction("❌ Error contacting API");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGetSolution = async () => {
        if (!prediction) return;

        try {
            setIsFetchingSolution(true);
            // Replace this with your actual endpoint for solution
            const res = await fetch(
                `http://127.0.0.1:8080/ai/getsolution?disease=${prediction}`
            );
            const data = await res.json();
            setSolution(data.solution || "No solution found.");
        } catch (error) {
            console.error("Error fetching solution", error);
            setSolution("❌ Failed to fetch solution.");
        } finally {
            setIsFetchingSolution(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto text-center space-y-6">
            <h1 className="text-2xl font-bold">🦠 Disease Identifier</h1>

            <div className="rounded-lg overflow-hidden shadow-md">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-auto transform -scale-x-100"
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />
                <button
                    onClick={captureImage}
                    className="bg-blue-600 text-white w-full py-2 hover:bg-blue-700"
                >
                    📸 Capture Image
                </button>
            </div>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
            />

            {imagePreview && (
                <div className="mt-4">
                    <h2 className="font-semibold mb-2">🖼️ Preview</h2>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full rounded border border-gray-300"
                    />
                </div>
            )}

            <button
                onClick={handleSendToAPI}
                className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center mx-auto"
                disabled={!imageBlob || isLoading}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                        Uploading...
                    </>
                ) : (
                    "📤 Send to API"
                )}
            </button>

            {prediction && (
                <>
                    <div className="mt-4 text-red-700 font-bold text-xl">
                        🧬 Disease: {prediction}
                    </div>

                    <button
                        onClick={handleGetSolution}
                        disabled={isFetchingSolution}
                        className="mt-2 bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 disabled:opacity-50"
                    >
                        {isFetchingSolution ? "Loading Solution..." : "💡 Get Solution"}
                    </button>
                </>
            )}

            {solution && (
                <div className="mt-4 text-gray-800 bg-green-100 p-3 rounded">
                    ✅ <strong>Solution:</strong> {solution}
                </div>
            )}
        </div>
    );
};

export default DiseaseIdentifier;
