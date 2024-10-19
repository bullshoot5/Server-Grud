import React from "react";

const EditMode = ({ setIsEdit, handleUpdate, todo }) => {
  return (
    <>
      <form
        onSubmit={handleUpdate}
        className="d-flex justify-content-between gap-3 align-items-center"
      >
        <select defaultValue={todo.status} className="form-select w-25 shadow">
          <option value="important">Önemli</option>
          <option value="daily">Günlük</option>
          <option value="job">İş</option>
        </select>
        <input
          defaultValue={todo.title}
          type="text"
          className="form-control w-50 shadow"
        />
        <div className="btn-group">
          <button type="submit" className="btn btn-sm btn-success">
            Onayla
          </button>
          <button
            onClick={() => setIsEdit(false)}
            type="button"
            className="btn btn-sm btn-danger"
          >
            İptal
          </button>
        </div>
      </form>
    </>
  );
};

export default EditMode;
