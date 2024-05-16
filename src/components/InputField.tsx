import React from "react";
import "./styles.css";
import { FunctionLikeDeclaration } from "typescript";

interface Props {
  ingredient: string;
  setIngredient: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void; 
}
const InputField = ({ ingredient, setIngredient, handleAdd}: Props) => {
  return (
    <form className="Input" onSubmit={handleAdd}>
      <input
        type="input"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Enter an ingredient"
        className="input__box"
      />
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
