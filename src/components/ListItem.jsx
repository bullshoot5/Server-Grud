import React, { useState } from 'react';
import EditMode from './EditMode';
import ContentMode from './ContentMode';
import axios from 'axios';
import { toast } from 'react-toastify';

const ListItem = ({ setTodos, todo, allTodos }) => {
  const [isEdit, setIsEdit] = useState(false);

  //* Silme işlemi gerçekleştiğinde çalışacak fonksiyondur.
  const handleDelete = () => {
    //* API'ye delete isteği at.
    axios
      .delete(`http://localhost:3000/todos/${todo.id}`)
      .then(() => {
        //* Bütün todolar arasından idsini bildiğimiz todoyu kaldır.
        const filtredTodos = allTodos.filter((item) => item.id !== todo.id);
        //* State'i güncelller
        setTodos(filtredTodos);

        toast.info('Todo kaldırıldı', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      })
      //* İşlem başarısız olursa error bildirimi bastırır.
      .catch((err) =>
        toast.error('Başarısız oldu', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      );
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('gönderildi');
    console.log(e);
    //* Inputlardaki değerler
    const status = e.target[0].value;
    const title = e.target[1].value;
    //* API'yi güncelle
    axios
      .patch(`http://localhost:3000/todos/${todo.id}`, { title, status })
      .then(() => {
        //* 1.Mevcut todonun yerine güncel halini koy
        const updated = { ...todo, title, status };
        /* 2.
         * Dizideki eski todonun yerine güncel halini koymak için diziyi döndük.
         * Sonrasında tıkladığınmız elemanın idsi ile dizi içerisinde bulunan
         * idlerden biri eşleşirse onun yerine güncellenmiş halini koyduk.
         */
        const newTodos = allTodos.map((item) =>
          item.id === updated.id ? updated : item
        );
        //* 3.statei güncelle
        setTodos(newTodos);
        //* 4.düzenleme modundan çık
        setIsEdit(false);
        //* 5.Bildirim bastır
        toast.success('Başarıyla güncellendi!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      });
  };

  return (
    <li className="relative py-2  list-group-item bg-dark text-white d-flex justify-content-between align-items-center gap-3">
      {isEdit ? (
        <EditMode
          todo={todo}
          handleUpdate={handleUpdate}
          setIsEdit={setIsEdit}
        />
      ) : (
        <div className="d-flex w-100 justify-content-between align-items-center">
          <ContentMode
            handleDelete={handleDelete}
            todo={todo}
            setIsEdit={setIsEdit}
          />
        </div>
      )}
      <span className="date">{todo.date}</span>
    </li>
  );
};

export default ListItem;
