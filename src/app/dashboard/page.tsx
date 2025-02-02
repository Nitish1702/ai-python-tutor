"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { toggleQuiz } from "@/store/quizSlice";
import Sidebar from "@/components/Sidebar";
import ChatSection from "@/components/ChatSection";
import CanvasSection from "@/components/CanvasSection";
import QuizForm from "@/components/QuizForm";
import InteractivePython from "@/components/TeachingComponent";
import { loadUser } from "@/store/AuthSlice";
import LessonQuiz from "@/components/LessonQuiz";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const showQuiz = useSelector((state: RootState) => state.quiz.showQuiz);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  // const user = useSelector((state: RootState) => state.auth.user);
  const chatWithAI = useSelector((state: RootState) => state.dashboard.chatWithAi);

  // Handle loading state while fetching user data
  const [loading, setLoading] = useState(true);

  // Load user data from Redux or localStorage
  useEffect(() => {
    const loadUserData = async () => {
      dispatch(loadUser());
      setLoading(false);
    };

    loadUserData();
  }, [dispatch]);

  // Redirect to sign-in page if not authenticated, but only after loading state is complete
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/Home");
    }
  }, [isAuthenticated, loading, router]);

  // Show a loading screen while waiting for authentication
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex relative h-[95vh]">
      <Sidebar setShowQuiz={() => dispatch(toggleQuiz())} showQuiz={showQuiz} />

      {/* Conditionally render Chat or Interactive Python teaching component */}
      {chatWithAI ? (
        <div className="flex-1 flex flex-col sm:flex-row">
          <ChatSection />
          <CanvasSection />

          {/* Quiz modal */}
          {showQuiz && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex items-center justify-center">
              <div className="relative max-w-md w-full p-4 sm:p-6 md:max-w-lg lg:max-w-xl bg-white rounded-lg shadow-lg">
                <QuizForm />
              </div>
            </div>
          )}
        </div>
          ) : (
                  <>
                  <InteractivePython />
                  {showQuiz && (
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex items-center justify-center">
                      <div className="relative max-w-md p-4 sm:p-6 md:max-w-lg lg:max-w-xl rounded-lg shadow-lg">
                        <LessonQuiz />
                      </div>
                    </div>
                      )}
                      </>
      )}
    </div>
  );
}
