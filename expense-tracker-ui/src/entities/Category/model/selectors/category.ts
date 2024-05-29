import { StateSchema } from 'app/providers/StoreProvider';
import { getUserCategories } from '../slice/categorySlice';
import { Category } from '../types/category';

export const getCategoriesIsLoading = (state: StateSchema) => state.category?.isLoading;

export const getCategoryExpense = (state: StateSchema) => {
  const allCategories = getUserCategories.selectAll(state);
  return allCategories.filter((category: Category) => category.type === 'expense');
};

export const getCategoryIncome = (state: StateSchema) => {
  const allCategories = getUserCategories.selectAll(state);
  return allCategories.filter((category: Category) => category.type === 'income');
};
