"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toggleQuiz } from "@/store/quizSlice";
import { useDispatch } from "react-redux";

const lessonPlan = [
    // 1. Introduction to Python
    {
      title: "Introduction to Python",
      description: "Python is a high-level programming language used for a variety of applications, from web development to data analysis. In this lesson, we'll write your first Python program.",
      explanation: `Python is known for its simplicity and readability. You can use Python to automate tasks, create applications, analyze data, and more. The "print()" function is one of the most basic functions used to output text or data.`,
      code: `print("Hello, World!")`,
      question: "What will be printed by the code above?",
      answerOptions: ["Hello, World!", "Hello", "World"],
      correctAnswer: "Hello, World!",
    },
    
    // 2. Variables and Data Types
    {
      title: "Variables and Data Types",
      description: "A variable is a container for storing data values. In Python, variables do not require explicit declaration of data types.",
      explanation: `In Python, variables are used to store data such as numbers, strings, and more. A data type defines the type of data a variable holds. Common data types in Python include integers, floating-point numbers, strings, and booleans.`,
      code: `name = "Alice"\nprint(name)`,
      question: "What is the value of the variable 'name'?",
      answerOptions: ["Alice", "Bob", "Charlie"],
      correctAnswer: "Alice",
    },
  
    // 3. If-Else Statements
    {
      title: "If-Else Statements",
      description: "If-else statements help you make decisions in your program. They are used to test conditions and perform different actions based on those conditions.",
      explanation: `An if statement evaluates an expression and executes code if the expression evaluates to True. An optional else block can be used to define code that runs when the condition is False.`,
      code: `age = 10\nif age < 18:\n    print("You are a minor")\nelse:\n    print("You are an adult")`,
      question: "What will be printed if age is 10?",
      answerOptions: ["You are a minor", "You are an adult"],
      correctAnswer: "You are a minor",
    },
  
    // 4. Loops in Python
    {
      title: "Loops in Python",
      description: "Loops allow you to repeat code multiple times. Python provides two main types of loops: for loops and while loops.",
      explanation: `A "for" loop is used to iterate over a sequence (like a list or range). It will execute a block of code a specific number of times. A "while" loop repeats as long as a condition is True.`,
      code: `for i in range(5):\n    print(i)`,
      question: "What will be printed by the code above?",
      answerOptions: ["0 1 2 3 4", "1 2 3 4 5", "0 1 2 3 4 5"],
      correctAnswer: "0 1 2 3 4",
    },
  
    // 5. Functions in Python
    {
      title: "Functions in Python",
      description: "Functions allow you to group code into reusable blocks, improving readability and maintainability.",
      explanation: `A function is defined using the "def" keyword, followed by the function name and parameters. Functions can return values using the "return" keyword.`,
      code: `def greet(name):\n    return "Hello " + name\n\nprint(greet("Alice"))`,
      question: "What will the code print?",
      answerOptions: ["Hello Alice", "Hello Bob", "Alice"],
      correctAnswer: "Hello Alice",
    },
  
    // 6. Lists in Python
    {
      title: "Lists in Python",
      description: "Lists allow you to store multiple items in a single variable. You can add, remove, or modify elements in a list.",
      explanation: `Lists are ordered collections of items. You can access elements in a list by their index, which starts at 0. Lists can hold different types of data, such as strings, integers, or other lists.`,
      code: `fruits = ["Apple", "Banana", "Cherry"]\nprint(fruits[1])`,
      question: "What will be printed by the code above?",
      answerOptions: ["Apple", "Banana", "Cherry"],
      correctAnswer: "Banana",
    },
  
    // 7. Dictionaries in Python
    {
      title: "Dictionaries in Python",
      description: "Dictionaries allow you to store data in key-value pairs, making it easy to access values using their corresponding keys.",
      explanation: `Dictionaries are unordered collections. Each element consists of a key and a value. You can access the value by referring to its key.`,
      code: `person = {"name": "Alice", "age": 25}\nprint(person["name"])`,
      question: "What will be printed by the code above?",
      answerOptions: ["Alice", "25", "name"],
      correctAnswer: "Alice",
    },
  
    // 8. Error Handling in Python (Try-Except)
    {
      title: "Error Handling in Python",
      description: "Error handling allows you to gracefully handle unexpected issues in your code, ensuring that your program does not crash.",
      explanation: `In Python, the try-except block is used to handle exceptions. You can catch specific exceptions and display custom error messages to the user.`,
      code: `try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")`,
      question: "What will be printed by the code above?",
      answerOptions: ["10", "Cannot divide by zero", "Error"],
      correctAnswer: "Cannot divide by zero",
    },
  
    // 9. Object-Oriented Programming (OOP) Basics
    {
      title: "Object-Oriented Programming (OOP)",
      description: "OOP is a programming paradigm based on the concept of 'objects'. Objects represent real-world entities and have attributes and behaviors.",
      explanation: `In Python, a class is a blueprint for creating objects. A class defines attributes (variables) and methods (functions) that the objects created from the class will have.`,
      code: `class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f"{self.name} says woof!"\n\nmy_dog = Dog("Buddy")\nprint(my_dog.bark())`,
      question: "What will the code print?",
      answerOptions: ["Buddy says woof!", "Buddy", "woof!"],
      correctAnswer: "Buddy says woof!",
    },
  
    // 10. Working with Files in Python
    {
      title: "Working with Files",
      description: "Learn how to read from and write to files in Python. This is essential for tasks like saving data or processing logs.",
      explanation: `In Python, you can use the built-in "open()" function to open a file. Use "write()" to write to a file and "read()" to read from it. The 'with' statement ensures the file is properly closed after use.`,
      code: `# Writing to a file\nwith open("example.txt", "w") as file:\n    file.write("Hello, Python!")\n\n# Reading from a file\nwith open("example.txt", "r") as file:\n    print(file.read())`,
      question: "What will be printed by the code above?",
      answerOptions: ["Hello, Python!", "example.txt", "Error"],
      correctAnswer: "Hello, Python!",
    },
  
    // 11. Using Python Libraries (e.g., math, random)
    {
      title: "Using Python Libraries",
      description: "Learn how to use built-in Python libraries like 'math' and 'random' to perform tasks like mathematical calculations and random number generation.",
      explanation: `Python has a rich standard library, including modules like "math" for mathematical operations and "random" for generating random numbers.`,
      code: `import math\nprint(math.sqrt(16))`,
      question: "What will the code print?",
      answerOptions: ["4", "16", "Error"],
      correctAnswer: "4",
    },
  
    // 12. List Comprehensions in Python
    {
      title: "List Comprehensions",
      description: "List comprehensions provide a concise way to create lists. They are often more efficient than using a for-loop.",
      explanation: `A list comprehension consists of an expression followed by a for clause, creating a new list by iterating over an existing iterable.`,
      code: `numbers = [1, 2, 3, 4, 5]\nsquares = [x ** 2 for x in numbers]\nprint(squares)`,
      question: "What will the code print?",
      answerOptions: ["[1, 4, 9, 16, 25]", "[1, 2, 3, 4, 5]", "[1, 2, 3, 4]"],
      correctAnswer: "[1, 4, 9, 16, 25]",
    },
  
    // 13. Lambda Functions in Python
    {
      title: "Lambda Functions",
      description: "Lambda functions are anonymous functions that you define in a single line. They are often used for simple operations.",
      explanation: `A lambda function is defined using the "lambda" keyword followed by the parameters, a colon, and the expression. Lambda functions can be used anywhere you would use a regular function.`,
      code: `multiply = lambda x, y: x * y\nprint(multiply(2, 3))`,
      question: "What will the code print?",
      answerOptions: ["6", "2", "None"],
      correctAnswer: "6",
    },
  
    // 14. Python Modules and Packages
    {
      title: "Python Modules and Packages",
      description: "Learn how to organize your Python code into reusable modules and packages.",
      explanation: `A module is a file containing Python code, while a package is a collection of modules. You can import modules and use their functions in your code.`,
      code: `import os\nprint(os.getcwd())`,
      question: "What will the code print?",
      answerOptions: ["Current working directory path", "Error", "Nothing"],
      correctAnswer: "Current working directory path",
    },
  
    // 15. Regular Expressions in Python
    {
      title: "Regular Expressions",
      description: "Learn how to use regular expressions to search for patterns in strings, a powerful technique for text processing.",
      explanation: `Regular expressions allow you to specify patterns for matching text. The "re" module in Python provides functions to work with regular expressions.`,
      code: `import re\npattern = r"\\d{3}"\nresult = re.findall(pattern, "My number is 123456")\nprint(result)`,
      question: "What will the code print?",
      answerOptions: ["['123']", "['123', '456']", "Error"],
      correctAnswer: "['123']",
    },
  
    // 16. Python List Methods
    {
      title: "Python List Methods",
      description: "Learn how to use various list methods like append, remove, and sort to manipulate lists.",
      explanation: `Python lists have built-in methods that allow you to add, remove, and modify elements. For example, "append()" adds an item to the end of the list, "remove()" deletes an item, and "sort()" arranges the items in order.`,
      code: `numbers = [1, 3, 2, 5, 4]\nnumbers.sort()\nprint(numbers)`,
      question: "What will the code print?",
      answerOptions: ["[1, 2, 3, 4, 5]", "[5, 4, 3, 2, 1]", "[1, 3, 2, 5, 4]"],
      correctAnswer: "[1, 2, 3, 4, 5]",
    },
  ];
  

  

export default function InteractivePythonLesson() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [time, setTime] = useState(0); // Timer state
  const router = useRouter();
  const dispatch = useDispatch();

  const currentLesson = lessonPlan[currentStep];
  const progress = ((currentStep + 1) / lessonPlan.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => setTime((prev) => prev + 1), 1000); // Increase every second
    return () => clearInterval(timer); // Cleanup timer when component unmounts
  }, []);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmitAnswer = () => {
    if (userAnswer === currentLesson.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setShowAnswer(true);
  };

  const handleNextStep = () => {
    setIsCorrect(null);
    setShowAnswer(false);
    setUserAnswer(""); // Reset user answer
    if (currentStep < lessonPlan.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      dispatch(toggleQuiz()); // Finish the quiz and reset state
    }
  };

  const handlePreviousStep = () => {
    setIsCorrect(null);
    setShowAnswer(false);
    setUserAnswer(""); // Reset user answer
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center  p-6">
      <div className="max-w-4xl overflow-y-scroll w-full bg-white p-8 rounded-xl shadow-xl border-2 border-gray-200">
        {/* Minimalist Title and Description */}
        <h2 className="text-3xl font-semibold text-center text-gray-900">{currentLesson.title}</h2>
        <p className="text-sm text-gray-700 mt-2 mb-4">{currentLesson.description}</p>

        {/* Code Display */}
        <div className="overflow-auto bg-gray-50 rounded-lg p-4 mb-4">
          <SyntaxHighlighter language="python" style={docco}>
            {currentLesson.code}
          </SyntaxHighlighter>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold text-gray-900 mt-4">{currentLesson.question}</h3>

        {/* Answer Options */}
        <div className="mt-4 mb-6">
          {currentLesson.answerOptions.map((option, idx) => (
            <div key={idx} className="flex items-center">
              <input
                type="radio"
                id={`answer-${idx}`}
                name="answer"
                value={option}
                checked={userAnswer === option}
                onChange={handleAnswerChange}
                className="mr-2"
              />
              <label htmlFor={`answer-${idx}`} className="text-sm text-gray-800">
                {option}
              </label>
            </div>
          ))}
        </div>

        {/* Submit Answer Button */}
        <div className="mt-4">
          <button
            onClick={handleSubmitAnswer}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            disabled={userAnswer === ""}
          >
            Submit Answer
          </button>
        </div>

        {/* Answer Feedback */}
        {showAnswer && (
          <div className="mt-4 text-center">
            {isCorrect ? (
              <p className="text-green-600 text-lg font-semibold">Correct! 🎉</p>
            ) : (
              <p className="text-red-500 text-lg font-semibold">
                Oops! That&apos;s not correct. Try again!
              </p>
            )}

            {/* Explanation Section */}
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900">Explanation:</h4>
              <p className="text-sm text-gray-700 mt-2">{currentLesson.explanation}</p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full h-2 bg-gray-300 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">{`Progress: ${Math.round(progress)}%`}</p>
        </div>

        {/* Timer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">{`Time Elapsed: ${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, "0")}`}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={handlePreviousStep}
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNextStep}
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
          >
            {currentStep < lessonPlan.length - 1 ? "Next Lesson" : "Finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
