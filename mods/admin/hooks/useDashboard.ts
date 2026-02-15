  import { useState, useEffect, useRef } from 'react';
  import {
    DashboardData,
    Project,
    Task,
    Note,
    Habit,
    Chat,
    Message,
    Strategy,
    Finance,
    Schedule,
  } from '../types/data';

  type EditableItem = Project | Task | Note | Habit | Strategy | Finance | Schedule;

  type DataListKey =
    | 'projects'
    | 'tasks'
    | 'notes'
    | 'habits'
    | 'strategies'
    | 'finances'
    | 'schedules'
    | 'chats';

  export const useDashboard = (INITIAL_DATA: DashboardData) => {
    const [activeTab, setActiveTab] = useState<string>('overview');
    const [data, setData] = useState<DashboardData>(INITIAL_DATA);
    const [toast, setToast] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [editingItem, setEditingItem] = useState<Partial<EditableItem> | null>(null);

    const [selectedChat, setSelectedChat] = useState<number>(1);
    const [newMessage, setNewMessage] = useState<string>('');
    const [aiPrompt, setAiPrompt] = useState<string>('');
    const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
    const chatScrollRef = useRef<HTMLDivElement>(null);
    const aiScrollRef = useRef<HTMLDivElement>(null);

    const [timer, setTimer] = useState<number>(25 * 60);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

    useEffect(() => {
      let interval: NodeJS.Timeout | null = null;
      if (isTimerRunning && timer > 0) {
        interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      }
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isTimerRunning, timer]);

    useEffect(() => {
      // Gunakan requestAnimationFrame agar browser sempat menghitung layout baru
      const scrollElement = chatScrollRef.current;

      if (scrollElement) {
        // Berikan jeda mikroskopis agar pesan baru sudah 'tergambar' di layar
        requestAnimationFrame(() => {
          scrollElement.scrollTo({
            top: scrollElement.scrollHeight,
            behavior: 'smooth',
          });
        });
      }
      // Gunakan selectedChat atau jumlah pesan sebagai trigger yang lebih stabil
    }, [data.chats]);

    useEffect(() => {
      if (aiScrollRef.current) aiScrollRef.current.scrollTop = aiScrollRef.current.scrollHeight;
    }, [data.aiHistory, isAiTyping]);

    const showToast = (message: string) => {
      setToast(message);
      setTimeout(() => setToast(null), 3000);
    };

    const handleCreate = () => {
      setEditingItem({});
      setIsModalOpen(true);
    };

    const handleEdit = (item: EditableItem) => {
      setEditingItem({ ...item });
      setIsModalOpen(true);
    };

    const handleDelete = (id: number, category: DataListKey) => {
      if (confirm('Freeze this object permanently?')) {
        setData((prev) => {
          const currentList = prev[category] as { id: number }[];

          return {
            ...prev,
            [category]: currentList.filter((item) => item.id !== id),
          };
        });
        showToast('Object shattered.');
      }
    };

    const handleSaveModal = () => {
      if (!editingItem) return;

      const categoryMap: Record<string, DataListKey> = {
        workspace: 'notes',
        chat: 'chats',
      };

      const category = (categoryMap[activeTab] || activeTab) as DataListKey;

      if (!data[category]) {
        console.error(`Category ${category} not found in data`);
        return;
      }

      if (editingItem.id) {
        setData((prev) => {
          const list = prev[category] as { id: number }[];

          return {
            ...prev,
            [category]: list.map((item) =>
              item.id === editingItem.id ? { ...item, ...editingItem } : item,
            ),
          };
        });
        showToast('Memory overwritten.');
      } else {
        const newItem = { ...editingItem, id: Date.now() };

        setData((prev) => {
          const list = prev[category] as unknown[];
          return {
            ...prev,
            [category]: [...list, newItem],
          };
        });
        showToast('New element generated.');
      }
      setIsModalOpen(false);
    };

    const updateTaskStatus = (id: number, newStatus: string) => {
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
      }));
      showToast(`Mission status: ${newStatus.toUpperCase()}`);
    };

    const toggleHabit = (id: number) => {
      setData((prev) => ({
        ...prev,
        habits: prev.habits.map((h) =>
          h.id === id
            ? {
                ...h,
                completed: !h.completed,
                streak: !h.completed ? h.streak + 1 : h.streak,
              }
            : h,
        ),
      }));
    };

    const handleSendMessage = () => {
      if (!newMessage.trim()) return;

      const updatedChats = data.chats.map((chat: Chat) => {
        if (chat.id === selectedChat) {
          const newMsg: Message = { sender: 'me', text: newMessage };
          return { ...chat, messages: [...chat.messages, newMsg] };
        }
        return chat;
      });

      setData((prev) => ({ ...prev, chats: updatedChats }));
      setNewMessage('');
    };

    const handleSendAiPrompt = () => {
      if (!aiPrompt.trim()) return;

      const userMsg: Message = { sender: 'me', text: aiPrompt };

      setData((prev) => ({
        ...prev,
        aiHistory: [...prev.aiHistory, userMsg],
      }));

      setAiPrompt('');
      setIsAiTyping(true);

      setTimeout(() => {
        setIsAiTyping(false);
        const responses = [
          'Calculating probability... optimal path found.',
          'Accessing Main Visualizer database... Code generated.',
          'Analyzing input... Logic integrity verified.',
          'System Call executed. Prompt processed successfully.',
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const aiMsg: Message = { sender: 'ai', text: randomResponse };

        setData((prev) => ({
          ...prev,
          aiHistory: [...prev.aiHistory, aiMsg],
        }));
      }, 1500);
    };

    return {
      state: {
        activeTab,
        data,
        toast,
        isModalOpen,
        editingItem,
        selectedChat,
        newMessage,
        aiPrompt,
        isAiTyping,
        timer,
        isTimerRunning,
      },
      refs: {
        chatScrollRef,
        aiScrollRef,
      },
      actions: {
        setActiveTab,
        setIsModalOpen,
        setEditingItem,
        setNewMessage,
        setAiPrompt,
        setTimer,
        setIsTimerRunning,
        setSelectedChat,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSaveModal,
        updateTaskStatus,
        toggleHabit,
        handleSendMessage,
        handleSendAiPrompt,
      },
    };
  };
