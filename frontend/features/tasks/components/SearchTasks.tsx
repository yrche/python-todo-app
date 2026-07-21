import { Input, InputGroup, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useRef } from "react";

interface SearchTasksProps {
  onSearch: (search: string) => void;
}

export function SearchTasks({ onSearch }: SearchTasksProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (inputRef.current) {
      onSearch(inputRef.current.value);
    }
  }
  async function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const formData = new FormData(e.currentTarget);
    setTimeout(() => onSearch(formData.get("search") as string), 300);
  }

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <InputGroup startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>}>
        <Input name="search" placeholder="Search contacts" />
      </InputGroup>
    </form>
  );
}
