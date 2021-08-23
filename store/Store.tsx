import TodoStore from "./TodoStore";
import {createContext, FC, useContext} from "react";

const StoreContext = createContext<TodoStore>(new TodoStore());

const StoreProvider: FC<{ store: TodoStore }> = ({store, children}) => (
	<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

const useStore = () => {
	return useContext(StoreContext)
}

export {TodoStore, StoreProvider, useStore}