import ReactMarkdown from 'react-markdown';
import { useEffect, useRef } from 'react';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type Props = {
  messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
  const lastMessageRef = useRef<HTMLParagraphElement>(null);

  const onCopyMessage = (
    e: import('react').ClipboardEvent<HTMLParagraphElement>
  ): void => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.clipboardData.setData('text/plain', selection.toString());
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  return (
    <>
      {messages.map((message, index) => (
        <p
          key={index}
          onCopy={onCopyMessage}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={`px-3 py-1 rounded-xl ${message.role === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-100 text-black self-start'}`}
        >
          {/* <strong>{message.role === 'user' ? 'You' : 'Assistant'}:</strong>{' '} */}
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </p>
      ))}
    </>
  );
};

export default ChatMessages;
