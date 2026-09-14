import { FaArrowTurnUp } from 'react-icons/fa6';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';

export type ChatFormData = {
  prompt: string;
};

type Props = {
  onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
  // 1. Add mode: 'onChange' so isValid updates as the user types
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>({
    mode: 'onChange',
  });

  const submit = handleSubmit((data) => {
    reset({ prompt: '' });
    onSubmit(data);
  });

  const handleKeyForm = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <>
      <form
        onSubmit={submit}
        onKeyDown={handleKeyForm}
        className="flex flex-col gap-2 items-end border-2 p-4 rounded-2xl"
      >
        <textarea
          {...register('prompt', {
            required: true,
            validate: (value) => value.trim() !== '',
          })}
          autoFocus
          className="w-full border-0 focus:outline-0 resize-none"
          placeholder="Ask me anything..."
          maxLength={1000}
        />
        <Button
          type="submit" // 2. Explicitly declare this as a submit button
          disabled={!formState.isValid}
          className="rounded-full w-9 h-9"
        >
          <FaArrowTurnUp />
        </Button>
      </form>
    </>
  );
};

export default ChatInput;
