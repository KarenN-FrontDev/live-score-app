import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { toggle } from "@/store/slices/favoritesSlice";

export const useFavorites = () => {
  const dispatch = useDispatch();

  const ids = useSelector((state: RootState) => state.favorites.ids);

  const isFavorite = (id: string) => ids.includes(id);

  const toggleFavorite = (id: string) => {
    dispatch(toggle(id));
  };

  const count = ids.length;

  return {
    ids,
    count,
    isFavorite,
    toggleFavorite,
  };
};
