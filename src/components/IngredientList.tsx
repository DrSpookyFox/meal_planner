import React from "react";
import { Ingredient } from "../model";
import "./styles.css";
import SingleIngredient from "./SingleIngredient";
import { Droppable } from "@hello-pangea/dnd";

interface props {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  completedIngredients: Ingredient[];
  setCompletedIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const IngredientList: React.FC<props> = ({
  ingredients,
  setIngredients,
  completedIngredients,
  setCompletedIngredients,
}: props) => {
  return (
    <div className="container">
      <Droppable droppableId="IngredientsList">
        {(provided, snapshot) => (
          <div
            className={`ingredients ${snapshot.isDraggingOver?'dragactive': ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="ingredients__heading">Monday 5/20</span>
            {ingredients?.map((ingredient, index) => (
              <SingleIngredient
                index={index}
                ingredient={ingredient}
                ingredients={ingredients}
                key={ingredient.id}
                setIngredients={setIngredients}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="IngredientsRemove">
        {(provided, snapshot) => (
          <div
            className={`ingredients remove ${snapshot.isDraggingOver?'dragcomplete': ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="ingredients__heading">Tuesday 5/21</span>
            {completedIngredients?.map((ingredient, index) => (
              <SingleIngredient
                index={index}
                ingredient={ingredient}
                ingredients={completedIngredients}
                key={ingredient.id}
                setIngredients={setCompletedIngredients}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default IngredientList;
