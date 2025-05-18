import React from "react";

export default function Preview() {
  return (
    <div className="min-h-screen bg-[#141414] text-white font-press-start p-4 pb-24">
      <header className="text-center text-4xl text-[#FFD700] mb-6">Progress</header>

      <section className="bg-[#1f1f1f] rounded-2xl p-4 mb-6 flex items-center gap-4 shadow-md">
        <div className="w-20 h-20 bg-yellow-500 rounded-full" />
        <div>
          <div className="text-2xl">ritesh</div>
          <div className="text-sm text-yellow-400 mt-1">Rank: rookie</div>
        </div>
        <div className="ml-auto flex gap-2 text-sm">
          <div className="bg-[#2a2a2a] px-3 py-1 rounded-lg">Lvl 0</div>
          <div className="bg-[#2a2a2a] px-3 py-1 rounded-lg">XP 0</div>
        </div>
      </section>

      <h2 className="text-center text-xl mb-4">Track your Progress</h2>

      <div className="flex justify-center items-center gap-3 text-base mb-6">
        <button className="text-gray-400 text-2xl">&#x3c;</button>
        <div className="text-white">May 2025</div>
        <button className="text-gray-400 text-2xl">&#x3e;</button>
      </div>

      <div className="flex justify-center gap-2 text-sm mb-6">
        {[
          { day: "Wed", date: 12 },
          { day: "Thurs", date: 13 },
          { day: "Fri", date: 14 },
          { day: "Sat", date: 15 },
          { day: "Sun", date: 16 }
        ].map(({ day, date }, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl text-center w-16 ${
              day === "Fri" ? "bg-gradient-to-b from-yellow-500 to-yellow-700 text-black" : "bg-[#1f1f1f] text-white"
            }`}
          >
            <div>{day}</div>
            <div>{date}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#1f1f1f] rounded-xl p-4 mb-4">
        <h3 className="text-base mb-4 text-white">Weekly Progress</h3>
        <div className="mb-6">
          <div className="mb-2 text-sm text-gray-300">Public</div>
          <div className="bg-[#141414] text-center py-10 rounded text-white text-sm border border-gray-700">No images uploaded</div>
        </div>
        <div>
          <div className="mb-2 text-sm text-gray-300">Private</div>
          <div className="bg-[#141414] text-center py-10 rounded text-white text-sm border border-gray-700">No images uploaded</div>
        </div>
      </div>

      <button className="w-full border border-white rounded-full py-3 flex items-center justify-center gap-2 mt-4">
        <span className="text-sm">Check friends Progress</span>
        <span className="text-yellow-400 text-xl">➤</span>
      </button>

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-[#141414] py-2">
        <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center">
          <span className="text-white">🏠</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center">
          <span className="text-white">📈</span>
        </div>
        <div className="w-16 h-16 rounded-full bg-gradient-to-b from-yellow-500 to-yellow-700 text-black flex items-center justify-center text-3xl shadow-lg">🏆</div>
        <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center">
          <span className="text-white">📷</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center">
          <span className="text-white">👤</span>
        </div>
      </nav>
    </div>
  );
}