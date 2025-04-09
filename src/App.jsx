import { useState } from "react";
import { motion } from "framer-motion";

export default function KentutPredictor() {
  const [timeSinceMeal, setTimeSinceMeal] = useState(1);
  const [fiberIntake, setFiberIntake] = useState(false);
  const [dairyIntake, setDairyIntake] = useState(false);
  const [activityLevel, setActivityLevel] = useState(1);
  const [result, setResult] = useState(null);

  const predictKentut = () => {
    let score = 0;
    if (fiberIntake) score += 40;
    if (dairyIntake) score += 30;
    if (activityLevel < 3) score += 10;
    if (timeSinceMeal < 2) score += 20;

    const probability = Math.min(100, score);
    let message = "Tidak terdeteksi. Aman untuk saat ini 💨";
    if (probability > 75) message = "⚠️ POTENSI KENTUT TINGGI! Siap-siap!";
    else if (probability > 40) message = "😬 Waspada, mungkin sebentar lagi...";

    setResult({ probability, message });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-100 to-yellow-100">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl font-bold mb-6">
        🧪 Kentut Predictor 3000
      </motion.h1>

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <div>
          <label className="font-medium">Waktu sejak makan terakhir (jam)</label>
          <input type="range" min="0" max="6" value={timeSinceMeal} onChange={(e) => setTimeSinceMeal(Number(e.target.value))} />
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="fiber" checked={fiberIntake} onChange={(e) => setFiberIntake(e.target.checked)} />
          <label htmlFor="fiber">Saya makan kol/kacang/brokoli</label>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="dairy" checked={dairyIntake} onChange={(e) => setDairyIntake(e.target.checked)} />
          <label htmlFor="dairy">Saya minum susu/produk olahan susu</label>
        </div>

        <div>
          <label className="font-medium">Aktivitas fisik (1 = diam saja, 5 = aktif banget)</label>
          <input type="range" min="1" max="5" value={activityLevel} onChange={(e) => setActivityLevel(Number(e.target.value))} />
        </div>

        <button onClick={predictKentut} className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg">
          🔮 Prediksi Kentut
        </button>

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-4 text-lg">
            <p className="font-bold">Probabilitas Kentut: {result.probability}%</p>
            <p>{result.message}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
