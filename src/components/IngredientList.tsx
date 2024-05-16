import React from "react";
import { Ingredient } from "../model";
import "./styles.css";

interface Props {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const IngredientList: React.FC<Props> = ({
  ingredients,
  setIngredients,
}: Props) => {
  return <div className="ingredients">{ingredients.map(ingredient=> (
    <li>{ingredient.ingredient}</li>
  ))}</div>;
};

export default IngredientList;
