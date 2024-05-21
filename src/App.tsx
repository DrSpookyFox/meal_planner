import React, { useState } from "react";
import InputField from "./components/InputField";
import IngredientList from "./components/IngredientList";
import "./App.css";
import { Ingredient } from "./model";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";


const App: React.FC = () => {
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [completedIngredients, setcompletedIngredients] = useState<Ingredient[]>([]);

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
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = ingredients,
      complete = completedIngredients;

    if (source.droppableId === "IngredientsList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "IngredientsList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setcompletedIngredients(complete);
    setIngredients(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Meal Planner</span>
        <InputField
          ingredient={ingredient}
          setIngredient={setIngredient}
          handleAdd={handleAdd}
        />
        <IngredientList
          ingredients={ingredients}
          setIngredients={setIngredients}
          completedIngredients={completedIngredients}
          setCompletedIngredients={setcompletedIngredients}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
