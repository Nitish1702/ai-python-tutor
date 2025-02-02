"use client";
import { useState } from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setChatWithAi } from "@/store/DashboardSlice";
import { logout } from "@/store/AuthSlice";
import { ChangeAPIKey } from "./ChangeAPIKey";
import { AiOutlineMessage } from "react-icons/ai"; // AI Chat icon
import { FaClipboardList } from "react-icons/fa"; // Quiz icon
import { IoLogOutOutline } from "react-icons/io5"; // Logout icon
import { MdApi } from "react-icons/md"; // API Key icon

interface SidebarProps {
  showQuiz: boolean;
  setShowQuiz: (value: boolean) => void;
}

export default function Sidebar({ showQuiz, setShowQuiz }: SidebarProps) {
  const dispatch = useDispatch();
  const chatWithAI = useSelector(
    (state: RootState) => state.dashboard.chatWithAi
  );
  const [changeApiKey, setChangeApiKey] = useState(false);
  
  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
    console.log("Logged Out");
  };

  const handleAIClick = () => {
    dispatch(setChatWithAi(!chatWithAI));
    console.log("ChatWithAI Button Clicked");
  };

  // Handle Quiz Button Click
  const handleQuizClick = () => {
    setShowQuiz(!showQuiz);
    console.log("Quiz Button Clicked");
  };

  return (
    <aside className="w-64 bg-gray-800 text-gray-200 p-4 flex flex-col h-screen shadow-lg">
      {/* Main Sidebar Content */}
      <div className="flex-grow">
        <h2 className="text-lg font-semibold mb-6">Dashboard</h2>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full p-3 mt-4 flex items-center gap-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          <IoLogOutOutline size={20} />
          <span className="text-sm">Logout</span>
        </button>

        {/* Quiz Button */}
        <button
          onClick={handleQuizClick}
          className="w-full p-3 mt-4 flex items-center gap-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          <FaClipboardList size={20} />
          <span className="text-sm">Take Quiz</span>
        </button>

        {/* AI Chat Button */}
        <button
          onClick={handleAIClick}
          className="w-full p-3 mt-4 flex items-center gap-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          <AiOutlineMessage size={20} />
          <span className="text-sm">
            {chatWithAI ? "Learn" : "Chat With AI"}
          </span>
        </button>
      </div>

      {/* Bottom-Anchored Button */}
      <div className="mt-auto">
        <button
          onClick={() => setChangeApiKey(true)}
          className="w-full p-3 flex items-center gap-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          <MdApi size={20} />
          <span className="text-sm">Change API Key</span>
        </button>
      </div>

      {/* API Key Modal */}
      {changeApiKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="relative max-w-md p-4 sm:p-6 md:max-w-lg lg:max-w-xl rounded-lg shadow-lg bg-white">
            <ChangeAPIKey setChangeApiKey={setChangeApiKey} />
          </div>
        </div>
      )}
    </aside>
  );
}
