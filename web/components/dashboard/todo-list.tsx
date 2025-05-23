"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoListCard: React.FC = () => {
  const todos: Todo[] = [
    { id: "1", text: "Workout for 30 minutes", completed: false },
    { id: "2", text: "Read a chapter", completed: true },
    { id: "3", text: "Prepare presentation", completed: false }
  ];

  return (
    <Card className="p-6">
      <h3 className="mb-3 text-lg font-semibold">Today's Tasks</h3>
      <div className="space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center justify-between gap-2 rounded p-2">
            <div className="flex flex-1 items-center gap-2">
              <Checkbox checked={todo.completed} id={`todo-${todo.id}`} disabled />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`flex-1 ${todo.completed ? "text-gray-500 line-through" : ""}`}
              >
                {todo.text}
              </label>
            </div>
          </div>
        ))}

        {todos.length === 0 && (
          <p className="py-2 text-center text-gray-500">No tasks available.</p>
        )}
      </div>
    </Card>
  );
};
