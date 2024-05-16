import React, { useState } from "react";
import InputField from "./components/InputField";
import "./App.css";
import { Ingredient } from "./model";

const App: React.FC = () => {
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (ingredient) {
      setIngredients([
        ...ingredients,
        { id: Date.now(), ingredient: ingredient, isDone: false },
      ]);
      setIngredient("");
    }
  };
  console.log(ingredients);

  return (
    <div className="App">
      <span className="heading">Meal Planner</span>
      <InputField
        ingredient={ingredient}
        setIngredient={setIngredient}
        handleAdd={handleAdd}
      />
    </div>
  );
};

export default App;
