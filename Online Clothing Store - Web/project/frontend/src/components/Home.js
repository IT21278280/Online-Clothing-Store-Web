import React from "react";
import "../css/home.css";
import { Link } from "react-router-dom";
import MainImage from "../img/main.png";
import storeImage from "../img/store.png";
import cashImage from "../img/cashback.png";
import deliveryImage from "../img/delivery.png";
import paymentImage from "../img/payment.png";
import qualityImage from "../img/quality.png";

// import Footer from './inc/footer'

function Home() {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-md-6 order-md-2 main-image-container">
          <img src={MainImage} alt={"main"} className="img-fluid main-image" />
        </div>
        <div className="col-md-6 order-md-1">
          <h2 className="main-header">
            Wrap your body nicely
            <br /> and comfy
          </h2>
          <p className="main-para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
            velit a est sagittis blandit. Mauris consectetur mollis sem, sed
            lobortis leo eleifend eu. Ut sit amet ipsum nulla. Nulla vel est
            quis mi congue egestas.{" "}
          </p>

          <div className="btn-container d-flex justify-content-center align-items-center">
            <Link to="/products">
              <button className="shop-btn">SHOP NOW</button>
            </Link>
            <Link to="/about">
              <button className="about-btn">ABOUT US</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="content container-fluid mb-5">
        <div className="container mt-5 mb-5 store-container">
          <div className="row mt-4">
            <div className="col-md-6">
              <img
                src={storeImage}
                alt={"store"}
                className="img-fluid mx-auto d-block"
              />
            </div>
            <div className="col-md-6 mb-5">
              <h2 className="text-center store-header mb-5">
                Why Choosing Us{" "}
              </h2>
              <div className="row row-cols-2">
                <div className="col mb-5 ml-5">
                  <img
                    src={qualityImage}
                    alt={"store"}
                    className="img-fluid d-block col-md-3 float-left"
                  />
                  <h5 className="text-left">Top Quality</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut la
                  </p>
                </div>
                <div className="col">
                  <img
                    src={deliveryImage}
                    alt={"store"}
                    className="img-fluid d-block col-md-3"
                  />
                  <h5 className="text-left">Fast Delivery</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut la
                  </p>
                </div>
                <div className="col mb-5">
                  <img
                    src={cashImage}
                    alt={"store"}
                    className="img-fluid d-block col-md-3 float-left"
                  />
                  <h5 className="text-left">Cashback Reward</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut la
                  </p>
                </div>
                <div className="col">
                  <img
                    src={paymentImage}
                    alt={"store"}
                    className="img-fluid d-block col-md-3"
                  />
                  <h5 className="text-left">Secure Payment</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut la
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="arrival-container text-center">
        <div className="header mb-5 mt-5">New Arrival</div>
        <div className="row mt-5">
          <div className="col-md-3 arrival-img">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clothing-store-4b928.appspot.com/o/img3.1.png?alt=media&token=b5ddb366-3ca8-4b8d-8833-188bbbcca43e"
              alt={"atrrival "}
              className="img-fluid arrival-img"
            />
            <h5 className="mt-3">Vavain Blouse</h5>
            <p className="mb-5 mt-3 fw-bold home-price">Rs 4000</p>
          </div>
          <div className="col-md-3 arrival-img">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clothing-store-4b928.appspot.com/o/img9.1.png?alt=media&token=aafe8ffb-de83-4c11-87f5-a5cc0c3d9288"
              alt={"atrrival "}
              className="img-fluid arrival-img"
            />
            <h5 className="mt-3">Smocked Waist Top</h5>
            <p className="mb-5 mt-3 fw-bold home-price">Rs 4300</p>
          </div>
          <div className="col-md-3 arrival-img">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clothing-store-4b928.appspot.com/o/img14.1.png?alt=media&token=b5645c06-11fd-4f0d-ac18-f3b6fda60980"
              alt={"atrrival "}
              className="img-fluid arrival-img"
            />
            <h5 className="mt-3">Crop Top</h5>
            <p className="mb-5 mt-3 fw-bold home-price">Rs 3500</p>
          </div>
          <div className="col-md-3 arrival-img">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clothing-store-4b928.appspot.com/o/img7.1.png?alt=media&token=3cbabec7-f058-42ec-9d74-49cc5d8bbd7d"
              alt={"atrrival "}
              className="img-fluid arrival-img"
            />
            <h5 className="mt-3">Fru Blouse</h5>
            <p className="mb-5 mt-3 fw-bold home-price">Rs 4000</p>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="summer-container"></div>
        <div className="header mb-5">Summer Collection</div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clothing-store-4b928.appspot.com/o/img4.1.png?alt=media&token=6685a37e-01d7-49d8-b806-e63c43b5681b"
              alt={"atrrival "}
              className="img-fluid"
            />
          </div>
          <div className="col-md-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clothing-store-4b928.appspot.com/o/img8.1.png?alt=media&token=3eb35591-d87c-4bcd-9896-24bb6291695e"
              alt={"atrrival "}
              className="img-fluid mt-5"
            />
          </div>
          <div className="col-md-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clothing-store-4b928.appspot.com/o/img12.1.png?alt=media&token=ede1ef43-ec3d-4d82-b2a5-3ee9ff5a90a8"
              alt={"atrrival "}
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="header mb-3 mt-5">Popular This Week</div>
        <div className="row">
          <div className="col-md-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clothing-store-4b928.appspot.com/o/img5.1.png?alt=media&token=1b7e409e-8a0f-4507-a2aa-c4e35d9568a3"
              alt={"atrrival "}
              className="img-fluid popular-image"
            />
            <h5 className="mt-3">Pstmng T-Shirt</h5>
            <p className="mb-5 mt-3 fw-bold home-price">Rs 2900</p>
            <Link
              to="/product/64400e3f8a0c5284c812c7ed"
              className="text-decoration-none"
            >
              <button className="add-to-cart d-flex justify-content-center align-items-center text-decoration-none">
                Add to Cart
              </button>
            </Link>
          </div>
          <div className="col-md-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clothing-store-4b928.appspot.com/o/img19.1.png?alt=media&token=d21e70ae-8f80-48ae-89d1-d3cf9dde0670"
              alt={"atrrival "}
              className="img-fluid popular-image"
            />
            <h5 className="mt-3">Slim Fit Shirt</h5>
            <p className="mb-5 mt-3 fw-bold home-price">Rs 2500</p>
            <Link
              to="/product/644254e1a5d4885ff97cd650"
              className="text-decoration-none"
            >
              <button className="add-to-cart">Add to Cart</button>
            </Link>
          </div>
          <div className="col-md-4">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/clothing-store-4b928.appspot.com/o/img13.1.png?alt=media&token=16c27684-0f02-4e56-9432-0d6090fe4f4b"
              alt={"atrrival "}
              className="img-fluid popular-image"
            />
            <h5 className="mt-3">Cami Top</h5>
            <p className="mb-5 mt-3 fw-bold home-price">Rs 3500</p>
            <Link to="/product/644010658a0c5284c812c7fd">
              <button className="add-to-cart">Add to Cart</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
