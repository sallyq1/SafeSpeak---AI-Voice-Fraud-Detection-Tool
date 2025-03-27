// app/page.tsx
"use client";

import { useState } from "react";
import Logo from "@/app/assets/icon-logo.svg"

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    verdict: "real" | "fake";
    spectrogramUrl?: string;
    [key: string]: any;
  }>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload a .wav file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setResult(null);
      const res = await fetch("http://localhost:8000/api/verify-audio", {
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-[70px]  p-20">
    
    <div className=" flex items-center gap-3">


    <Logo className="scale-[0.7]"/>

    <div className="flex flex-col text-white gap-5">
      <h1 className=" text-7xl font-semibold">SafeSpeak</h1>
      <h2 className=" text-3xl font-semibold tracking-[15px]">SAY IT SAFE</h2>
    </div>
    </div>
    
    <div className="flex flex-col w-[500px] justify-center items-center ml-20">
    <h1 className="text-3xl font-semibold mb-4 text-center text-white">Upload a WAV File</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-b from-[#0064BB] to-[#0081CC] border-[1.5px] border-white/50 rounded-2xl px-16 py-15 w-full"
      >
        
        <input
          type="file"
          accept=".wav"
          onChange={handleFileChange}
          className="file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-1 text-[18px] file:font-semibold file:text-[#0064BB] hover:file:bg-white/90 text-white"
          />

        {error && <p className="text-white my-5 text-lg">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className=" w-full bg-gradient-to-r from-[#1AC4EF] to-[#10AAE3] hover:from-[#1AC4EF]/80 hover:to-[#10AAE3]/80 text-white py-2 px-4 rounded-xl text-[18px] font-semibold disabled:opacity-50"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
      </div>

      {result && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-bold">
            Result:{" "}
            <span
              className={
                result.verdict === "real"
                  ? "text-white"
                  : "text-red-600"
              }
            >
              {result.verdict.toUpperCase()}
            </span>
          </h2>

          {result.spectrogramUrl && (
            <img
              src={result.spectrogramUrl}
              alt="Spectrogram"
              className="mt-4 rounded-md"
            />
          )}

          {/* Display any other returned data */}
          {Object.entries(result).map(([key, val]) =>
            key !== "verdict" && key !== "spectrogramUrl" ? (
              <p key={key} className="text-sm mt-2">
                <strong>{key}:</strong> {String(val)}
              </p>
            ) : null
          )}
        </div>
      )}
    </main>
  );
}
