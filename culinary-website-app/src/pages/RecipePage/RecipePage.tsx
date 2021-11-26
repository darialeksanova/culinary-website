import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { loadFullRecipeById } from 'store/fullRecipe/actions';
import { loadDishNutrition } from 'store/dishNutrition/actions';
import { RootState } from 'store/store';
import styles from './RecipePage.module.css';
import servingsIcon from 'assets/servingsIcon.png';
import cookingTimeIcon from 'assets/cookingTimeIcon.png';
import bookmark from 'assets/bookmark.png';

const RecipePage = () => {
  const params = useParams<'recipeId'>();
  const fullRecipe = useSelector((state: RootState) => state.fullRecipe.fullRecipe);
  const dishNutrition = useSelector((state: RootState) => state.dishNutrition.dishNutrition);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (params.recipeId) {
      dispatch(loadFullRecipeById(params.recipeId));
      dispatch(loadDishNutrition(params.recipeId));
    };
  }, [dispatch, params]);

  return (
    <div className={styles.recipePage}>
      <h1 className={styles.recipeTitle}>{fullRecipe.title}</h1>
      <div className={styles.recipeContainer}>
        <div className={styles.recipeShortDescription}>
          <div className={styles.shortDescriptionItem}>
            <img className={styles.servingsIcon} src={servingsIcon} alt='servings'></img>
            {fullRecipe.servings}
          </div>
          <div className={styles.shortDescriptionItem}>
            <img className={styles.servingsIcon} src={cookingTimeIcon} alt='servings'></img>
            {fullRecipe.readyInMinutes} min
          </div>
          <button className={styles.addToFavouritesButton}>
            <div className={styles.addToFavouritesIconContainer}>
              <img className={styles.addToFavouritesIcon} src={bookmark} alt='save'></img>
            </div>
            <div className={styles.addToFavouritesLabel}>Add to my recipe book</div>
          </button>
        </div>
        <div className={styles.nutritionContainer}>
          <h2 className={styles.nutritionTitle}>Nutrition Value</h2>
          <div className={styles.nutrients}>
            <div className={styles.nutrient}>Calories: {dishNutrition.calories}</div>
            <div className={styles.nutrient}>Carbs: {dishNutrition.carbs}</div>
            <div className={styles.nutrient}>Fat: {dishNutrition.fat}</div>
            <div className={styles.nutrient}>Protein: {dishNutrition.protein}</div>
          </div>
        </div>
        <div className={styles.recipeImageContainer}>
          <img className={styles.recipeImage} src={fullRecipe.image} alt='dish'></img>
        </div>
        <div className={styles.recipeFullDescription}>
          <div className={styles.recipeSummary}>{fullRecipe.summary}</div>
        </div>
        <h2 className={styles.recipeInstructionsTitle}>How to cook?</h2>
        <div className={styles.recipeInstructions}>{fullRecipe.analyzedInstructions[0].steps.map((step, index) => {
          return (
            <React.Fragment key={index}> 
              <h4 className={styles.stepNumber}>Step {index + 1}</h4>
              <div className={styles.step}>{step.step}</div>
            </React.Fragment>
          )})}
        </div>
      </div>
    </div>
  );
};

export default RecipePage;