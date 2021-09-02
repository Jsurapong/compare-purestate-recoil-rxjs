import axios from "axios";

interface List {
  id: number;
  title: string;
  author: string;
}

interface Form {
  id: number | null;
  method: "post" | "put";
  data: List;
}

export interface State {
  list: List[];
  detail: List;
  form: Form;
}

const initDetail: List = { id: 0, title: "", author: "" }; // show

const initForm: Form = {
  id: 0,
  method: "post",
  data: { id: 0, title: "", author: "" },
}; // edit form

export const initState: State = {
  list: [],
  detail: initDetail,
  form: initForm,
};

class User {
  apiUrl = "http://localhost:4000/posts";
  state: State = initState;

  setState = (...params: any) => {};

  init = (setState: (...p: any) => void) => {
    this.setState = setState;
    this.setState(this.state);
  };

  updateState = (key: string, value: {} | string | number | []) => {
    const newState: State = { ...this.state, [key]: value };
    this.state = newState;
    this.setState(this.state); // force component re-render
  };

  getItemForm = (id: number | null): List | {} => {
    const item = this.state.list.find((item) => item.id === id);
    return item || initForm;
  };

  form = {
    init: () => {}, // set init form options api fetch
    onChange: (key: string, value: string | number) => {
      const newForm = { ...this.state.form, [key]: value };
      this.updateState("form", newForm);
    },
    selectedId: (id: number | null) => {
      this.updateState("formMethod", id ? "put" : "post");

      const user = this.getItemForm(id);
      this.updateState("form", user);
    },
  };

  submit = () => this[this.state.form.method]();

  // api
  fetch = async (id: number | null) => {
    const { data } = await axios(`${this.apiUrl}${id || ""}`);

    const key = id ? "item" : "list";

    this.updateState(key, data);
  };
  post = async () => {
    const data = this.state.form;
    await axios.post(this.apiUrl, data);
    this.updateState("form", initForm);
    this.fetch(null);
  };
  put = async () => {
    const data = this.state.form;
    await axios.put(`${this.apiUrl}/${this.state.form.id}`, data);
    this.updateState("form", initForm);
    this.fetch(null);
  };
  delete = async (id: number) => {
    await axios.delete(`${this.apiUrl}/${id}`);
    const newList = this.state.list.filter((item) => item?.id !== id);

    this.updateState("list", newList);
  };
}

export { User };
