import { getAllCategories } from "@/api/supabase";
import { NavItem } from "@/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextProps {
  menu_items: NavItem[];
}

const Context = createContext<ContextProps | undefined>(undefined);

export const MenuContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<NavItem[]>([]);

  useEffect(() => {
    const getData = async () => {
      const categories = await getAllCategories();

      const data: NavItem[] = categories.map((category) => ({
        title: `Categoria ${category.toLowerCase()}`,
        href: `/categoria-${category.toLowerCase()}`,
        icon: "user",
        label: `Categoria ${category.toLowerCase()}`,
      }));

      setData(data);
    };

    getData();
  }, []);

  return (
    <Context.Provider value={{ menu_items: data }}>{children}</Context.Provider>
  );
};

export const useMenuContext = () => {
  const value = useContext(Context);
  if (!value) {
    throw Error(
      "Use menu context can only be used inside a menu context provider"
    );
  }
  return value;
};
