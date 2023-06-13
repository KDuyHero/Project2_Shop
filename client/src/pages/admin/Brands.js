import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

import axios from "../../axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import BrandForm from "../../components/Forms/BrandForm";
import Modal from "../../components/Layout/Modal";
function Brands() {
  const [auth, setAuth] = useAuth();
  const [brands, setBrands] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [object, setObject] = useState({ name: "" });
  const [method, setMethod] = useState("update");

  // create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/brands",
        {
          name: nameInput,
        },
        {
          headers: {
            Authorization: "Bearer " + auth?.token,
          },
        }
      );
      if (response?.data?.success) {
        toast.success(`Create category ${nameInput} successfully`);
        setBrands([...brands, response.data.newBrand]);
        setNameInput("");
      } else toast.error(response?.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in submit form brand");
    }
  };
  // get category in useeffect
  const getAllBrands = async () => {
    try {
      const response = await axios.get("/brands");
      if (response?.data?.success) {
        setBrands(response.data.brands);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all brands");
    }
  };

  useEffect(() => {
    getAllBrands();
  }, [object]);
  return (
    <Layout>
      <div className="container-fluid row mt-3">
        <div className="col-3">
          <AdminMenu />
        </div>
        <div className="col-9">
          <div className="container">
            <h3>Manage Brand</h3>
            <BrandForm
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
                {brands?.map((brand, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{brand.name}</td>
                      <td>
                        <button
                          className="btn btn-secondary m-1"
                          data-bs-toggle="modal"
                          data-bs-target="#modal"
                          onClick={() => {
                            console.log(brand);
                            setObject(brand);
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
                            console.log(brand);
                            setObject(brand);
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

            <Modal
              instance="brand"
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

export default Brands;
