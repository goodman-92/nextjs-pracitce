import {action, observable} from "mobx";

export interface TodoData {
	id: number
	content: string;
	checked: boolean;
}

interface ITodoStore {
	todoData: TodoData[];
	currentId: number;
	addTodo: (content: string) => void;
	removeTodo: (id: number) => void;
}

// export const todo = observable<Todo>({
// 	todoData: [],
// 	currentId: 0,
// 	addTodo(content: string): void {
// 		this.todoData.push({id: this.currentId, content, checked: false})
// 	},
// 	removeTodo(id: number): void {
// 		const fIdx = this.todoData.findIndex(d => d.id === id);
// 		if (id !== -1){
// 			this.todoData.splice(fIdx, 1)
// 		}
// 	}
// })
//

class TodoStore implements ITodoStore {
	@observable todoData: TodoData[] = [];
	@observable currentId: number = this.todoData.length;


	@action addTodo(content: string) {
		this.todoData.push({
			checked: false,
			id: this.currentId + 1,
			content
		})
	}

	removeTodo(id: number): void {

	}
}

export default TodoStore