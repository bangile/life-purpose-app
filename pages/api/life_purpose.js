import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/life-purpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q1, q2, q3 }),
      });
      const data = await res.json();
      setResult(data.message);
    } catch (err) {
      setResult("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-black text-white flex flex-col items-center justify-center px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Discover Your Life Purpose in 3 Simple Questions
      </motion.h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        Answer honestly. Let AI help you uncover your true potential.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-6 rounded-2xl shadow-lg w-full max-w-xl space-y-6"
      >
        <div>
          <label className="block mb-2 font-semibold">What excites you most in life?</label>
          <input
            type="text"
            value={q1}
            onChange={(e) => setQ1(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">What are your natural strengths?</label>
          <input
            type="text"
            value={q2}
            onChange={(e) => setQ2(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">What problem in the world do you feel called to solve?</label>
          <input
            type="text"
            value={q3}
            onChange={(e) => setQ3(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold transition disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Find My Purpose"}
        </button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 bg-white/10 p-6 rounded-2xl shadow-lg max-w-xl text-center"
        >
          <h2 className="text-2xl font-bold mb-3">Your Life Purpose</h2>
          <p className="text-lg leading-relaxed">{result}</p>
        </motion.div>
      )}

      <footer className="mt-12 text-sm text-gray-400">
        Made with ❤️ by YourBrand | © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

// API Route (pages/api/life-purpose.js)
// Place this in your Next.js `pages/api` folder.

// import OpenAI from "openai";
//
// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();
//
//   const { q1, q2, q3 } = req.body;
//
//   const prompt = `The user answered these 3 questions about their life purpose:\n
//   1. ${q1}\n
//   2. ${q2}\n
//   3. ${q3}\n
//   Based on this, write a clear, motivational statement of their life purpose in 3-4 sentences.`;
//
//   try {
//     const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4.1-mini",
//       messages: [{ role: "user", content: prompt }],
//     });
//     res.status(200).json({ message: completion.choices[0].message.content });
//   } catch (err) {
//     res.status(500).json({ message: "Error generating purpose." });
//   }
// }
