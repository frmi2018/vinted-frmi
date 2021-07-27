import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Offer = ({ userToken }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
          `https://vinted-frmi-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, [id]);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="spinner-border text-primary m-4" role="status" />
      <span>Chargement des infos de l'annonce en cours...</span>
    </div>
  ) : (
    <div className="container p-2 bg-light">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div
              className="col ecommerce-gallery"
              data-mdb-zoom-effect="true"
              data-mdb-auto-height="true"
            >
              <div className="row shadow-5">
                <div className="col-12">
                  <div className="lightbox text-center">
                    <img
                      src={data.product_image.secure_url}
                      alt={data.product_name}
                      className="ecommerce-gallery-main-img active w-50"
                    />
                  </div>
                </div>
                <div className="col-3 mt-1">
                  <img
                    src={data.product_image.secure_url}
                    alt="Gallery 1"
                    className="active w-100"
                  />
                </div>
                <div className="col-3 mt-1">
                  <img
                    src={data.product_image.secure_url}
                    alt="Gallery 2"
                    className="w-100"
                  />
                </div>
                <div className="col-3 mt-1">
                  <img
                    src={data.product_image.secure_url}
                    alt="Gallery 3"
                    className="w-100"
                  />
                </div>
                <div className="col-3 mt-1">
                  <img
                    src={data.product_image.secure_url}
                    alt="Gallery 4"
                    className="w-100"
                  />
                </div>
              </div>
            </div>
            <div className="col">
              <h1 className="card-title">{data.product_name}</h1>
              <h2>{data.product_price} €</h2>
              <p>{data.product_description}</p>

              <div className="d-flex flex-column border-top">
                <table className="table-borderless w-100 my-2">
                  <tbody>
                    {data.product_details.map((item, index) => {
                      const keys = Object.keys(item);
                      return (
                        keys[0] !== "MODES DE PAIEMENT" && (
                          <tr key={index}>
                            <td>{keys[0]}</td>
                            <td>{item[keys[0]]}</td>
                          </tr>
                        )
                      );
                    })}
                  </tbody>
                </table>

                <div className="d-flex align-items-center">
                  <div
                    className="avatar m-2"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    {data.owner.account.username.charAt(0).toUpperCase()}
                  </div>
                  <span>{data.owner.account.username}</span>
                </div>
                <Link
                  to={{
                    pathname: `/payment/${id}`,
                    state: { userToken: userToken },
                  }}
                >
                  <button className="btn btn-primary mt-2" type="button">
                    Acheter
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
