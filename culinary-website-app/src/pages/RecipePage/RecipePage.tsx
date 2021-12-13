import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { RootState } from 'store/store';
import styles from './RecipePage.module.css';
import servingsIcon from 'assets/servings.png';
import cookingTimeIcon from 'assets/cookingTime.png';
import { addRecipeToFavourites } from 'store/favouriteRecipes/actions';
import LoaderComponent from 'components/LoaderComponent';
import ConfirmDeleteRecipeModalComponent from 'components/ConfirmDeleteRecipeModalComponent';
import { RecipeFull } from 'types/recipeFull';
import { DishNutrition } from 'types/dishNutrition';
import { DishIngredients } from 'types/dishIngredients';
import { apiService } from 'services/ApiService';
import UniversalButtonComponent from 'components/UniversalButtonComponent';
import classNames from 'classnames/bind';
import { Theme } from 'types/theme';

const cx = classNames.bind(styles);

const RecipePage = () => {
  const params = useParams<'recipeId'>();
  const theme = useSelector(( state: RootState ) => state.theme.theme);
  const favouriteRecipes = useSelector(( state: RootState ) => state.favouriteRecipes.favouriteRecipes);
  const isRecipeFavourite = Boolean(favouriteRecipes.find(favouriteRecipe => favouriteRecipe.id === Number(params.recipeId)));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isConfirmRecipeDeleteModalVisible, setIsConfirmRecipeDeleteModalVisible] = useState(false);
  const [fullRecipe, setFullRecipe] = useState<RecipeFull | null>(null);
  const [dishNutrition, setDishNutrition] = useState<DishNutrition | null>(null);
  const [dishIngredients, setDishIngredients] = useState<DishIngredients | null>(null);
  
  useEffect(() => {
    if (params.recipeId) {
      const apiKey = apiService.getApiKey();
      const apiUrl = apiService.getApiUrl();

      Promise.all([
        fetch(`${apiUrl}/recipes/${params.recipeId}/information?apiKey=${apiKey}`)
          .then(response => {
            if(response.ok) {
              return response.json() as Promise<RecipeFull>;
            }

            throw new Error('Error on full recipe fetch!');
          }), 
        fetch(`${apiUrl}/recipes/${params.recipeId}/nutritionWidget.json?apiKey=${apiKey}`)
          .then(response => {
            if(response.ok) {
              return response.json() as Promise<DishNutrition>;
            }

            throw new Error('Error on dish nutrients fetch!');
          }),
        fetch(`${apiUrl}/recipes/${params.recipeId}/ingredientWidget.json?apiKey=${apiKey}`)
          .then(response => {
            if(response.ok) {
              return response.json() as Promise<DishIngredients>;
            }

            throw new Error('Error on dish ingredients fetch!');
          }),
      ])
        .then(([ fullRecipeObj, dishNutrition, dishIngredients ]) => {
          setFullRecipe(fullRecipeObj);
          setDishNutrition(dishNutrition);
          setDishIngredients(dishIngredients);
        })
        .catch((_error: Error) => {
          console.log('Source is not reachable!');
          navigate('/page-not-found', { replace: true });
        });
    };
}, [ dispatch, params, navigate ]);

  const handleAddToMyRecipeBookButtonClick = useCallback(( fullRecipe: RecipeFull ): void => {
    if (params.recipeId) {
      dispatch(addRecipeToFavourites({ id: fullRecipe.id, title:fullRecipe.title, image: fullRecipe.image }));
    }
  }, [ dispatch, params.recipeId ]);

  return (
    <>
      {(isConfirmRecipeDeleteModalVisible && fullRecipe) &&
        <ConfirmDeleteRecipeModalComponent 
          recipePreview={ {id: fullRecipe.id, title:fullRecipe.title, image: fullRecipe.image} }
          closeModal={() => setIsConfirmRecipeDeleteModalVisible(false)}
        />
      }

      {(!fullRecipe && !dishNutrition) && <LoaderComponent />}

      {(fullRecipe && dishNutrition) && (
        <div className={styles.recipePage}>
          <h1 className={styles.recipeTitle}>{fullRecipe.title[0].toUpperCase()}{fullRecipe.title.slice(1).toLowerCase()}</h1>
          <div className={styles.recipeContainer}>

            <div className={styles.recipeShortDescription}>
              <div className={styles.shortDescriptionItem}>
                <img className={cx({
                  servingsIcon: true,
                  whiteIcon: theme === Theme.dark,
                  })} 
                  src={servingsIcon} 
                  alt='servings'
                >
                </img>
                {fullRecipe.servings}
              </div>
              <div className={styles.shortDescriptionItem}>
                <img className={cx({
                  cookingTimeIcon: true,
                  whiteIcon: theme === Theme.dark,
                  })} 
                  src={cookingTimeIcon} 
                  alt='ready-in-minutes'
                >
                </img>
                {fullRecipe.readyInMinutes} min
              </div>
              <div className={styles.MyRecipeBookActions}>
                {!isRecipeFavourite && 
                  <UniversalButtonComponent 
                    text='Add to recipe book' 
                    size='large'
                    weight='bold'
                    onClick={() => handleAddToMyRecipeBookButtonClick(fullRecipe)} 
                  />
                }
                {isRecipeFavourite && (
                  <UniversalButtonComponent 
                  text='Delete from recipe book'
                  size='large'
                  weight='bold'
                  onClick={() => setIsConfirmRecipeDeleteModalVisible(true)}
                />
                )}
              </div>
            </div>

            <div className={styles.nutritionContainer}>
              <h2 className={styles.nutritionTitle}>Nutrition value</h2>
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

              <div className={styles.recipeIngredientsContainer}>
                <h2 className={styles.recipeIngredientsTitle}>Ingredients</h2>
                <ul className={styles.recipeIngredientsList}>
                  {dishIngredients?.ingredients.map(( ingredient, index ) =>
                    <li key={index}>{ingredient.name}: {ingredient.amount.metric.value} {ingredient.amount.metric.unit}</li>
                  )}
                </ul>
              </div>

              <div className={styles.recipeInstructionsContainer}>
                <h2 className={styles.recipeInstructionsTitle}>How to cook?</h2>
                {(fullRecipe.analyzedInstructions.length !== 0) ? (
                  <>
                    <div className={styles.recipeInstructions}>{fullRecipe.analyzedInstructions[0].steps.map(( step, index ) => {
                      return (
                        <React.Fragment key={index}> 
                          <h4 className={styles.stepNumber}>Step {index + 1}</h4>
                          <div className={styles.step}>{step.step}</div>
                        </React.Fragment>
                      )})}
                    </div>
                  </>
                ) : 
                  <div className={styles.noInstructionsMessage}>
                    Unfortunately, there is no step-by-step recipe for this dish yet :c
                  </div>
                }
              </div>

              <div className={styles.linkToSearchResults}>
                <UniversalButtonComponent 
                  text='Back to search results' 
                  size='large' 
                  weight='bold'
                  onClick={() => navigate(-1)} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipePage;