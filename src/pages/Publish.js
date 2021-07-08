import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Publish = ({ userToken }) => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("brand", brand);
  formData.append("size", size);
  formData.append("condition", condition);
  formData.append("color", color);
  formData.append("city", city);
  formData.append("picture", file);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      title &&
      description &&
      price &&
      brand &&
      size &&
      condition &&
      color &&
      city &&
      file
    ) {
      try {
        const response = await axios.post(
          "http://localhost:4000/offer/publish",
          formData,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      setErrorMessage("Merci de renseigner tous les champs");
    }
  };

  // Check if user is connect
  return userToken ? (
    <div className="container p-2">
      <form className="form-control" onSubmit={handleSubmit}>
        <label htmlFor="file" className="input-design-default">
          <i class="bi bi-image me-2"></i>
          <span>Ajoute une photo</span>
        </label>
        <input
          id="file"
          type="file"
          className="hide-input-file"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />

        <div className="form-control mb-2  bg-light">
          <input
            type="text"
            placeholder="titre"
            className="form-control mb-2"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <textarea
            placeholder="description"
            className="form-control"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            cols="30"
            rows="10"
          />
        </div>

        <div className="form-control mb-2  bg-light">
          <input
            type="text"
            placeholder="brand"
            className="form-control mb-2"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="size"
            className="form-control mb-2"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="color"
            className="form-control mb-2"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="condition"
            className="form-control mb-2"
            value={condition}
            onChange={(event) => {
              setCondition(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="city"
            className="form-control"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        </div>

        <div className="form-control bg-light d-flex align-items-center mb-2">
          <div className="input-group me-2" style={{ width: 160 }}>
            <input
              className="form-control"
              type="number"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            <div className="input-group-append">
              <span class="input-group-text">€</span>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <input type="checkbox" className="me-2" />
            <span>Je suis intérressé(e) par les échanges</span>
          </div>
        </div>
        <span className="text-danger">{errorMessage}</span>
        <div className="text-center">
          <button className="btn btn-primary" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
