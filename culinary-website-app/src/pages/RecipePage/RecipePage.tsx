import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { RootState } from 'store/store';
import styles from './RecipePage.module.css';
import servingsIcon from 'assets/servingsIcon.png';
import cookingTimeIcon from 'assets/cookingTimeIcon.png';
import bookmark from 'assets/bookmark.png';
import bin from 'assets/bin.png';
import { addRecipeToFavourites } from 'store/favouriteRecipes/actions';
import Loader from 'components/Loader';
import ConfirmDeleteRecipeModalComponent from 'components/ConfirmDeleteRecipeModalComponent';
import { API_URL, API_KEY } from 'constants/index';
import { RecipeFull } from 'types/recipeFull';
import { DishNutrition } from 'types/dishNutrition';
import { DishIngredients } from 'types/dishIngredients';
import MyRecipeBookButton from 'components/MyRecipeBookButton/MyRecipeBookButton';

const RecipePage = () => {
  const params = useParams<'recipeId'>();
  const favouriteRecipesList = useSelector((state: RootState) => state.favouriteRecipes.favouriteRecipes);
  const isRecipeFavourite = Boolean(favouriteRecipesList.find(favouriteRecipe => favouriteRecipe.id === Number(params.recipeId)));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConfirmRecipeDeleteModalVisible, setIsConfirmRecipeDeleteModalVisible] = useState(false);
  const [fullRecipe, setFullRecipe] = useState<RecipeFull | null>(null);
  const [dishNutrition, setDishNutrition] = useState<DishNutrition | null>(null);
  const [dishIngredients, setDishIngredients] = useState<DishIngredients | null>(null);
  
  useEffect(() => {
    if (params.recipeId) {
      Promise.all([
        fetch(`${API_URL}/recipes/${params.recipeId}/information?apiKey=${API_KEY}`)
          .then(response => {
            if(response.ok) {
              return response.json();
            }

            throw new Error('Error on full recipe fetch!');
          }), 
        fetch(`${API_URL}/recipes/${params.recipeId}/nutritionWidget.json?apiKey=${API_KEY}`)
          .then(response => {
            if(response.ok) {
              return response.json();
            }

            throw new Error('Error on dish nutrients fetch!');
          }),
        fetch(`${API_URL}/recipes/${params.recipeId}/ingredientWidget.json?apiKey=${API_KEY}`)
          .then(response => {
            if(response.ok) {
              return response.json();
            }

            throw new Error('Error on dish ingredients fetch!');
        }),
      ])
        .then(([fullRecipeObj, dishNutrition, dishIngredients]) => {
          setFullRecipe(fullRecipeObj);
          setDishNutrition(dishNutrition);
          setDishIngredients(dishIngredients);
        })
        .catch((_error: Error) => {
          console.log('Source is not reachable!');
          navigate('/page-not-found');
        });
    };
}, [dispatch, params, navigate]);

  const handleAddToMyRecipeBookButtonClick = (fullRecipe: RecipeFull) => {
    if (params.recipeId) {
      dispatch(addRecipeToFavourites({ id: fullRecipe.id, title:fullRecipe.title, image: fullRecipe.image }));
    };
  };

  const openConfirmDeleteRecipeModal = () => {
    setIsConfirmRecipeDeleteModalVisible(true);
  };

  return (
    <>
      {(isConfirmRecipeDeleteModalVisible && fullRecipe) &&
        <ConfirmDeleteRecipeModalComponent 
          recipePreview={ {id: fullRecipe.id, title:fullRecipe.title, image: fullRecipe.image} }
          closeModal={() => setIsConfirmRecipeDeleteModalVisible(false)}
        />
      }
      {(!fullRecipe && !dishNutrition) && <Loader />}
      {(fullRecipe && dishNutrition) && (
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
              {!isRecipeFavourite && 
                <MyRecipeBookButton 
                  text='Add to my recipe book' 
                  purpose='addButton' 
                  icon={bookmark}
                  specialButton
                  onClick={() => handleAddToMyRecipeBookButtonClick(fullRecipe)} 
                />
              }
              {isRecipeFavourite && (
                 <MyRecipeBookButton 
                 text='Delete from my recipe book'
                 purpose='deleteButton'
                 icon={bin}
                 specialButton
                 onClick={openConfirmDeleteRecipeModal}
               />
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
            <div className={styles.recipeSummary} dangerouslySetInnerHTML={{__html: fullRecipe.summary}}></div>
            </div>
            <div className={styles.recipeIngredientsContainer}>
              <h2 className={styles.recipeIngredientsTitle}>Ingredients</h2>
              <ul className={styles.recipeIngredientsList}>
                {dishIngredients?.ingredients.map((ingredient, index) =>
                  <li key={index}>{ingredient.name}: {ingredient.amount.metric.value}{ingredient.amount.metric.unit}</li>
                )}
              </ul>
            </div>
            <div className={styles.recipeInstructionsContainer}>
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
            </div>
            <NavLink to={`/recipes`} className={styles.linkToSearchResults}>
              <button className={styles.backToSearchResultsButton}>Back to search results</button>
            </NavLink>
          </div>
        </div>
        )
      }
    </>
  );
};

export default RecipePage;