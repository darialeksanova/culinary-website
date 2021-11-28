import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { loadFullRecipeById } from 'store/fullRecipe/actions';
import { loadDishNutrition } from 'store/dishNutrition/actions';
import { RootState } from 'store/store';
import styles from './RecipePage.module.css';
import servingsIcon from 'assets/servingsIcon.png';
import cookingTimeIcon from 'assets/cookingTimeIcon.png';
import bookmark from 'assets/bookmark.png';
import bin from 'assets/bin.png';
import { addRecipeToFavourites, deleteRecipeFromFavourites } from 'store/favouriteRecipesIds/actions';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles); 

const RecipePage = () => {
  const params = useParams<'recipeId'>();
  const fullRecipe = useSelector((state: RootState) => state.fullRecipe.fullRecipe);
  const dishNutrition = useSelector((state: RootState) => state.dishNutrition.dishNutrition);
  const favouriteRecipesIds = useSelector((state: RootState) => state.favouriteRecipesIds.favouriteRecipesIds);
  const isRecipeFavourite = favouriteRecipesIds.includes(Number(params.recipeId));
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (params.recipeId) {
      dispatch(loadFullRecipeById(params.recipeId));
      dispatch(loadDishNutrition(params.recipeId));
    };
  }, [dispatch, params]);

  const handleAddToMyRecipeBookButtonClick = () => {
    if (params.recipeId) {
      dispatch(addRecipeToFavourites(Number(params.recipeId)));
    };
  };

  const handleDeleteFromMyRecipeBookButtonClick = () => {
    if (params.recipeId) {
    dispatch(deleteRecipeFromFavourites(Number(params.recipeId)));
    };
  };

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
          {!isRecipeFavourite && (
            <button 
              className={cx({
                favouritesButton: true,
                addToFavouritesButton: true,
              })} 
              onClick={handleAddToMyRecipeBookButtonClick}
            >
              <div className={styles.favouritesIconContainer}>
                <img className={styles.favouritesIcon} src={bookmark} alt='save'></img>
              </div>
              <div className={styles.favouritesLabel}>Add to my recipe book</div>
            </button>
          )}
          {isRecipeFavourite && (
            <button 
              className={cx({
                favouritesButton: true,
                deleteFromFavouritesButton: true,
              })} 
              onClick={handleDeleteFromMyRecipeBookButtonClick}
            >
              <div className={styles.favouritesIconContainer}>
                <img className={styles.favouritesIcon} src={bin} alt='save'></img>
              </div>
              <div className={styles.favouritesLabel}>Delete from my recipe book</div>
            </button>
          )}
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
        {(fullRecipe.analyzedInstructions.length !== 0) ? (
          <>
            <div className={styles.recipeInstructions}>{fullRecipe.analyzedInstructions[0].steps.map((step, index) => {
              return (
                <React.Fragment key={index}> 
                  <h4 className={styles.stepNumber}>Step {index + 1}</h4>
                  <div className={styles.step}>{step.step}</div>
                </React.Fragment>
              )})}
            </div>
          </>
        ) : 
          <div className={styles.noInstructionsMessage}>Unfortunately, there is no step-by-step recipe for this dish yet :c</div>
        }
        <NavLink to={`/recipes`} className={styles.linkToSearchResults}>
          <button className={styles.backToSearchResultsButton}>Back to search results</button>
        </NavLink>
      </div>
    </div>
  );
};

export default RecipePage;