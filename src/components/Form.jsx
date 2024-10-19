import axios from "axios";
import { toast } from "react-toastify";
import { v4 as generateId } from "uuid";
const Form = ({ setTodos }) => {
  const handleSubmit = (e) => {
    //* Form gönderildiğinde sayfanın yenilenmesini engeller.
    e.preventDefault();

    //* Form içerisinde ki verilere eriştik.
    const title = e.target[0].value;
    const status = e.target[1].value;
    console.log(title);
    console.log(status);

    //* API'ye kaydedilecek olan objeyi hazırladık.
    const newTodo = {
      status,
      id: generateId(),
      title,
      date: new Date().toLocaleDateString(),
    };

    //* Oluşturduğmuz todoyu api'ye kaydet
    axios
      .post("http://localhost:3000/todos", newTodo)
      //* Başarılı bir şekilde eklenilirse çalışır.
      //* todos stateini newTodoyu ekle (arayüzün güncellenmesi için)
      .then(() => {
        toast.success("Başarıyla eklenildi", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTodos((prev) => [...prev, newTodo]);
      })
      //* Hata olursa yakalar.
      .catch((err) => {
        toast.error("Üzgünüz sorun oluştu", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-3 my-5"
    >
      <input type="text" className="form-control shadow" />
      <select className="form-select w-25 shadow">
        <option value="important">Önemli</option>
        <option value="daily">Günlük</option>
        <option value="job">İş</option>
      </select>

      <button type="submit" className="btn btn-primary shadow">
        Gönder
      </button>
    </form>
  );
};

export default Form;
