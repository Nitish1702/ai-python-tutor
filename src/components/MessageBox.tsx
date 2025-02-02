import ReactMarkdown from "react-markdown";

// MessageBox Component
export function MessageBox({ role, content }: { role: string; content: string }) {
  return (
    <div
      className={`message-box ${role === "bot" ? "bg-blue-100" : "bg-gray-200"} p-4 rounded-lg`}
    >
      {role === "bot" ? (
        <div className="text-gray-800">
          {/* Using ReactMarkdown to render markdown content or HTML */}
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <div className="text-blue-800">{content}</div>
      )}
    </div>
  );
}