import React, { useRef } from "react";
import "./styles.css";

interface Props {
  ingredient: string;
  setIngredient: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}
const InputField = ({ ingredient, setIngredient, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        ref={inputRef}
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Enter an ingredient"
        className="input__box"
      />
      <button className="input__submit" type="submit">
        Enter
      </button>
    </form>
    
  );
};

export default InputField;
