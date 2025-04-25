// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Logo from "@app/assets/icon-logo.svg";

export default function ClientHome() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [phrase, setPhrase] = useState<string>("");
  const [result, setResult] = useState<null | {
    Prediction: "REAL" | "FAKE";
    FeatureDistributionPlotURL: string;
    FeatureImportancePlotURL: string;
    FeatureStatsPlotURL: string;
    [key: string]: any;
  }>(null);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    if (uploadedFile.type !== "audio/wav") {
      setError("Only .wav files are allowed");
      setFile(null);
    } else {
      setError(null);
      setFile(uploadedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile && uploadedFile.type !== "audio/wav") {
      setError("Only .wav files are allowed");
      setFile(null);
    } else {
      setError(null);
      setFile(uploadedFile);
    }
  };

  const fetchPhrase = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/get-phrase");
      const data = await res.json();
      if (data.phrase) setPhrase(data.phrase);
    } catch (err) {
      console.error("Failed to load phrase:", err);
    }
  };

  useEffect(() => {
    fetchPhrase();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload a .wav file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("audio_file", file);

    try {
      setLoading(true);
      setResult(null);
      const res = await fetch("http://127.0.0.1:5000/verify-audio", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to verify audio.");

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  function Spinner() {
    return (
      <div className="flex justify-center mt-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }  

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0064BB] to-[#0081CC] px-4 py-8">
      {/* Header Section */}
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center mb-8 md:mb-16">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 md:w-45 md:h-45 flex items-center justify-center">
              <Logo
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                SafeSpeak
              </h1>
              <p className="text-lg md:text-xl text-white/90 tracking-wider font-medium">
                SAY IT SAFE
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20">
          <h2 className="text-2xl font-semibold mb-8 text-center text-white">
            Upload Audio File
          </h2>

          {phrase && (
            <div className="bg-white/10 border border-white/20 text-white p-4 rounded-xl mb-6 text-center">
              <p className="text-lg font-medium">Please repeat this phrase:</p>
              <p className="italic text-2xl mt-2 text-cyan-300">"{phrase}"</p>
            </div>
          )}


          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <label
                htmlFor="file-upload"
                className="w-full h-32 border-2 border-dashed border-white/40 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-white/60 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept=".wav"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="text-white text-center">
                  <p className="text-lg font-medium mb-2">
                    {file ? file.name : "Choose a WAV file"}
                  </p>
                  <p className="text-sm text-white/70">or drag and drop here</p>
                </div>
              </label>

              {error && (
                <p className="text-red-200 text-sm font-medium">{error}</p>
              )}

              {loading ? (
                <div className="flex flex-col items-center gap-2">
                  <Spinner />
                  <p className="text-white text-lg font-semibold">Analyzing...</p>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!file}
                  className="w-full bg-white/90 hover:bg-white text-[#0064BB] py-3 px-6 rounded-xl text-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify Audio
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-12 max-w-4xl mx-auto">
            {/* Prediction Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div
                  className={`text-2xl font-medium mb-2 ${
                    result.Prediction === "REAL"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {result.Prediction === "REAL" ? "REAL" : "FAKE"}
                </div>
                <div className="text-gray-600 text-lg">
                  {result.Prediction === "REAL"
                    ? "This audio appears to be authentic"
                    : "This audio appears to be synthetically generated"}
                </div>
                <div
                  className={`mt-4 px-6 py-2 rounded-full ${
                    result.Prediction === "REAL"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {result.Prediction === "REAL"
                    ? "✓ Safe to trust"
                    : "⚠️ Exercise caution"}
                </div>
              </div>
            </div>

            {/* Analysis Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                Detailed Analysis
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Feature Distribution",
                    image: result.FeatureDistributionPlotURL,
                    alt: "Feature Distribution Plot",
                    description: "Distribution of audio characteristics",
                  },
                  {
                    title: "Feature Importance",
                    image: result.FeatureImportancePlotURL,
                    alt: "Feature Importance Plot",
                    description: "Key factors in the analysis",
                  },
                  {
                    title: "Feature Statistics",
                    image: result.FeatureStatsPlotURL,
                    alt: "Feature Statistics Plot",
                    description: "Statistical measurements",
                  },
                ].map(
                  (plot, index) =>
                    plot.image && (
                      <div
                        key={index}
                        className="group bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                      >
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          {plot.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {plot.description}
                        </p>
                        <div
                          onClick={() => {
                            setModalImage(plot.image);
                            setShowModal(true);
                          }}
                          className="relative overflow-hidden rounded-lg cursor-zoom-in"
                        >
                          <img
                            src={plot.image}
                            alt={plot.alt}
                            className="w-full transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showModal && modalImage && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <div className="relative max-w-[95%] max-h-[95vh]">
              <button
                onClick={() => setShowModal(false)}
                className="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                ✕
              </button>
              <img
                src={modalImage}
                alt="Enlarged View"
                className="rounded-xl shadow-2xl max-h-[95vh]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
