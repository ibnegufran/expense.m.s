import React from "react";
import Header from "../components/header";
import Layout from "../components/layout";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const Front = () => {
  return (
    <>
      <div className="front-con bg-gray-900 h-screen">
        <Header />
        <div className="" style={{ height: "92vh" }}>
          <div className="row flex flex-column flex-md-row justify-content-around  h-full align-items-center px-4 md:px-8">
            <div className="content col-12 col-md-5 text-capitalize ">
              <h2 className="fs-1 text-white line-height-3 mb-2">
                the <span className="text-yellow-500 ">expense tracker</span>{" "}
                that works for you
              </h2>
              <p className="fs-5 text-gray-200 ">
                track all your expenses here...
              </p>
              <Button className="bg-yellow-500  px-3 py-2 rounded-5 border-0 fw-bold">
                <Link
                  to="/dashboard"
                  className="text-decoration-none text-gray-900"
                >
                  get started
                </Link>{" "}
              </Button>
            </div>
            <div className="image col-12 col-md-6 ">
              <img
                src="../images/image1.png"
                alt=""
                className=" w-full float-lg-end h-20rem md:h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Front;
