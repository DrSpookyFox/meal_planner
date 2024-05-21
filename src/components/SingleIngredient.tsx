import React, { useEffect, useRef, useState } from "react";
import { Ingredient } from "../model";
import { MdEdit, MdDelete, MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "@hello-pangea/dnd";

type Props = {
  index: number;
  ingredient: Ingredient;
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
};

const SingleIngredient = ({
  index,
  ingredient,
  ingredients,
  setIngredients,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editIngredient, setEditIngredient] = useState<string>(
    ingredient.ingredient
  );

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, isDone: !ingredient.isDone }
          : ingredient
      )
    );
  };

  const handleDelete = (id: number) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, ingredient: editIngredient }
          : ingredient
      )
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={ingredient.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`ingredients__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, ingredient.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editIngredient}
              onChange={(e) => setEditIngredient(e.target.value)}
              className="ingredients__single--text"
            />
          ) : ingredient.isDone ? (
            <s className="ingredients__single--text">{ingredient.ingredient}</s>
          ) : (
            <span className="ingredients__single--text">
              {ingredient.ingredient}
            </span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !ingredient.isDone) setEdit(!edit);
              }}
            >
              <MdEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(ingredient.id)}>
              <MdDelete />
            </span>
            <span className="icon" onClick={() => handleDone(ingredient.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleIngredient;
