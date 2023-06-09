import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

import axios from "../../axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CategoryForm from "../../components/Forms/CategoryForm";
import ModalDashboard from "../../components/Atoms/Modal/ModalDashboard";
function Categories() {
  const [categories, setCategories] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [object, setObject] = useState({ name: "" });
  const [method, setMethod] = useState("update");

  // create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/categories", {
        name: nameInput,
      });
      if (response?.data?.success) {
        toast.success(`Create category ${nameInput} successfully`);
        setCategories([...categories, response.data.category]);
        setNameInput("");
      } else toast.error(response?.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in submit form category");
    }
  };
  // get category in useeffect
  const getAllCategories = async () => {
    try {
      const response = await axios.get("/categories");
      if (response?.data?.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [object]);
  return (
    <Layout>
      <div className="container-fluid row mt-3">
        <div className="col-3">
          <AdminMenu />
        </div>
        <div className="col-9">
          <div className="container">
            <h3>Manage Category</h3>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={nameInput}
              setValue={setNameInput}
            />
            <div className="p-3"></div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{category.name}</td>
                      <td>
                        <button
                          className="btn btn-secondary m-1"
                          data-bs-toggle="modal"
                          data-bs-target="#modal"
                          onClick={() => {
                            setObject(category);
                            setMethod("update");
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#modal"
                          onClick={() => {
                            setObject(category);
                            setMethod("delete");
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <ModalDashboard
              instance="category"
              object={object}
              method={method}
              setObject={setObject}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
