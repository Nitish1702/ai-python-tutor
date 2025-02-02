"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addMessage, setInput, setLoading } from "@/store/chatSlice";
import { setSelectedTopic } from "@/store/topicSlice";
import ReactMarkdown from "react-markdown";
import { setDarkMode } from "@/store/DashboardSlice";

export default function ChatSection() {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const input = useSelector((state: RootState) => state.chat.input);
  const loading = useSelector((state: RootState) => state.chat.loading);
  const quiz = useSelector((state: RootState) => state.quiz.quizData);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizResultPrompt, setQuizResultPrompt] = useState("");

  const isDarkMode = useSelector((state: RootState) => state.dashboard.isDarkMode);
  const apiKey = useSelector((state: RootState) => state.chat.apiKey);

  async function sendMessage() {
    if (!input.trim() && !quizMode) return;

    dispatch(setLoading(true));

    if (!quizMode) {
      // Normal chat message
      dispatch(addMessage({ role: "user", content: input }));
    }

    try {
        const prompt = quizMode ? quizResultPrompt : input;
        console.log(prompt,'hello-------------------------')
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, apiKey }),
      });

      if (!res.ok) {
        window.alert("API key failed. Change the API key.");
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      dispatch(addMessage({ role: "bot", content: data.reply }));
      dispatch(setSelectedTopic(data.reply));
      setQuizMode(false);
      dispatch(setInput(""));
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (quiz && Object.keys(quiz).length > 0) {
      setQuizMode(true);
      console.log("Quiz Data:", JSON.stringify(quiz));
  
      setQuizResultPrompt(
        JSON.stringify(quiz) +
          " Score the quiz, give insights, and classify the candidate."
      );
    }
  }, [quiz]);
  
  // New useEffect to trigger sendMessage only when quizResultPrompt is ready
  useEffect(() => {
    if (quizMode && quizResultPrompt) {
      sendMessage();
    }
  }, [quizResultPrompt]);
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={`w-full max-w-3xl p-6 mx-auto  shadow-lg flex flex-col h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Chat with AI</h2>

      <div className={`flex-1 overflow-y-auto p-4 rounded-lg shadow-inner space-y-4 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}>
        {messages.map((msg, index) => (
          <MessageBox key={index} role={msg.role} content={msg.content} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-4  bg-blue-900 border-t rounded-lg border-gray-200 flex items-center space-x-3`}>
        <input
          value={input}
          onChange={(e) => dispatch(setInput(e.target.value))}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white"
          }`}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isDarkMode
              ? "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
              : "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-200"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Night Mode Toggle Button */}
      <button
        onClick={() => dispatch(setDarkMode(!isDarkMode))}
        className={`absolute top-4 right-4 p-2 rounded-full focus:outline-none ${
          isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {isDarkMode ? "🌙" : "🌞"}
      </button>
    </div>
  );
}

export function MessageBox({
  role,
  content,
}: {
  role: string;
  content: string;
}) {
  return (
    <div
      className={`message-box ${
        role === "bot" ? "bg-blue-100" : "bg-gray-200"
      } p-4 rounded-lg`}
    >
      {role === "bot" ? (
        <div className="text-gray-800">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <div className="text-blue-800">{content}</div>
      )}
    </div>
  );
}
