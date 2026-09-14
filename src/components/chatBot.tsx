import { Button } from './ui/button';
import { FaArrowTurnUp } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useEffect, useRef, useState } from 'react';

type FormData = {
  prompt: string;
};

type ChatResponse = {
  message: string;
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const chatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const conversationId = useRef(crypto.randomUUID());

  const { register, handleSubmit, reset, formState } = useForm<FormData>();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const onSubmit = async ({ prompt }: FormData) => {
    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
    setIsBotTyping(true);
    reset();
    const { data } = await axios.post<ChatResponse>('/api/chat', {
      prompt,
      conversationId: conversationId.current,
    });
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: data.message },
    ]);
    setIsBotTyping(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 mb-10">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`px-3 py-1 rounded-xl ${message.role === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-100 text-black self-start'}`}
          >
            {/* <strong>{message.role === 'user' ? 'You' : 'Assistant'}:</strong>{' '} */}
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </p>
        ))}
        {isBotTyping && (
          <div className="flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse self-start"></div>
            <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.2s] self-start"></div>
            <div className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.4s] self-start"></div>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={onKeyDown}
        ref={formRef}
        className="flex flex-col gap-2 items-end border-2 p-4 rounded-2xl"
      >
        <textarea
          {...register('prompt', {
            required: true,
            validate: (value) => value.trim() !== '',
          })}
          className="w-full border-0 focus:outline-0 resize-none"
          placeholder="Ask me anything..."
          maxLength={1000}
        />
        <Button disabled={!formState.isValid} className="rounded-full w-9 h-9">
          <FaArrowTurnUp />
        </Button>
      </form>
    </div>
  );
};

export default chatBot;
