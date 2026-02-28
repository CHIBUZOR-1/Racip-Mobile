//mobile/hooks/ingredients.ts
type Meal = Record<string, any>;

export function getIngredients(meal: Meal) {
  const ingredients: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (
      ingredient &&
      ingredient.trim() !== '' &&
      measure &&
      measure.trim() !== ''
    ) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure.trim(),
      });
    }
  }

  return ingredients;
}