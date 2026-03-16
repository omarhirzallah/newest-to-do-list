import { useState } from 'react';
import * as taskService from '../services/taskService';

export const useTaskActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const createTask = (taskData) => {
    taskService.addTask(taskData);
  };

  const updateTaskData = (taskId, updates) => {
    taskService.updateTask(taskId, updates);
  };

  const deleteTask = (taskId) => {
    if (confirm('Delete this task?')) {
      taskService.deleteTask(taskId);
    }
  };

  const toggleComplete = (taskId) => {
    taskService.updateTask(taskId, { status: 'completed' });
  };

  const editTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const saveTask = (taskData) => {
    if (editingTask) {
      updateTaskData(editingTask.id, taskData);
    } else {
      createTask(taskData);
    }
    setEditingTask(null);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    editingTask,
    setEditingTask,
    createTask,
    updateTask: updateTaskData,
    deleteTask,
    toggleComplete,
    editTask,
    saveTask,
  };
};
