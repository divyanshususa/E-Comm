import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/Productcontext";
import PageNavigation from "./component/PageNavigation";
import MyImage from "./component/MyImage";
import Button from "react-bootstrap/Button";
import { Container } from "./styles/Container";
import FormatPrice from "./Helpers/FormatPrice";
import FormatPriced from "./Helpers/FormatPriced";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import AddToCart from "./component/AddToCart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./features/cartSlice";
import toast from "react-hot-toast";
import { StarRateIcon } from "./static/icons";

const API = "http://localhost:5000/api/products/details";

const icons = [
  {
    icon: MdSecurity,
    text: "Year Warranty",
  },
  {
    icon: TbTruckDelivery,
    text: "Year Warranty",
  },
  {
    icon: TbReplace,
    text: "Year Warranty",
  },
  {
    icon: MdSecurity,
    text: "Year Warranty",
  },
];

const SingleProduct = () => {
  const [productQuantity, setProductQuantity] = useState(0);
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();

  const currency = useSelector(state => state.currency)

  console.log("currency :" ,currency);

  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(addToCart(e));
    console.log("when added", e);
    toast.success("Item added In Your Cart");
  };

  const { id } = useParams();
  //console.log("~ file:SingleProduct.js ~line 19 ~SingleProduct ~id",id)

  const { _id, pname, aprice, dprice, pdes, pcat, quantity, pphoto } =
    singleProduct;

  useEffect(() => {
    getSingleProduct(`${API}?id=${id}`);
  }, []);

  if (isSingleLoading) {
    return <div className="page_loading">SingleLoading.....</div>;
  }

  return (
    <div className="mt-4">
      <PageNavigation title={pname} />
      <Container className="container">
        <div className="grid grid-two-column">
          <div className="flex items-start justify-around">
            <div className="flex flex-col justify-between h-[440px] ">
              <div className="flex items-center justify-center border-1 border-blue-300 w-48 rounded-xl p-3 bg-gray-100">
                <img src={pphoto} className="h-28 object-cover" alt="" />
              </div>
              <div className="flex items-center justify-center border-1 border-blue-300 w-48 rounded-xl p-3 bg-gray-100">
                <img src={pphoto} className="h-28 object-cover" alt="" />
              </div>
              <div className="flex items-center justify-center border-1 border-blue-300 w-48 rounded-xl p-3 bg-gray-100">
                <img src={pphoto} className="h-28 object-cover" alt="" />
              </div>
            </div>
            {/* <div className="product-images"> */}
            <MyImage imgs={pphoto} />
          </div>
          <div className="product-data">
            <h2 className="text-6xl text-black font-sans font-semibold">
              {pname}
            </h2>

            <p className="flex items-center capitalize text-gray-400 ">
              <div>
                <StarRateIcon
                  className="text-yellow-300"
                  style={{ fontSize: "2rem" }}
                />
                <StarRateIcon
                  className="text-yellow-300"
                  style={{ fontSize: "2rem" }}
                />
                <StarRateIcon
                  className="text-yellow-300"
                  style={{ fontSize: "2rem" }}
                />
                <StarRateIcon
                  className="text-yellow-300"
                  style={{ fontSize: "2rem" }}
                />
                <StarRateIcon
                  className="text-yellow-300"
                  style={{ fontSize: "2rem" }}
                />
              </div>
              <span className="text-2xl ml-3">
                {" "}
                <span className="text-black"> 4.1</span> /5
              </span>
            </p>

            <div className="my-2">
              <span className="text-4xl">
                <FormatPrice price={aprice} />
              </span>
              <span className="text-2xl ml-3 line-through text-gray-400">
                <FormatPrice price={dprice} />
              </span>
              <span className="bg-red-300 rounded-xl text-2xl text-white p-2 text-center ml-3">
                - 40%
              </span>
            </div>
            <p className="text-2xl tracking-wide font-medium">{pdes}</p>
            <hr />

            <div className="my-2">
              <span className="text-3xl capitalize font-mono">
                select colors :
              </span>
              <div className=" mt-4 flex justify-between w-52">
                <div
                  className={`bg-red-400 h-10 w-10 rounded-full`}
                  style={{ fontSize: "2rem" }}
                />
                <div
                  className={`bg-green-400 h-10 w-10 rounded-full`}
                  style={{ fontSize: "2rem" }}
                />
                <div
                  className={`bg-blue-400 h-10 w-10 rounded-full`}
                  style={{ fontSize: "2rem" }}
                />
              </div>
            </div>
            <hr />

            <div className="my-2">
              <span className="text-3xl capitalize font-mono">
                choose size :
              </span>
              <div className=" mt-4 flex justify-between w-[40%]">
                <div className={`bg-gray-200 py-2 px-3 rounded-full`}>
                  <span className="text-2xl cursor-pointer font-sans capitalize">
                    small
                  </span>
                </div>
                <div className={`bg-gray-200 py-2 px-3 rounded-full`}>
                  <span className="text-2xl cursor-pointer font-sans capitalize">
                    medium
                  </span>
                </div>
                <div className={`bg-black py-2 px-3 rounded-full`}>
                  <span className="text-2xl cursor-pointer text-white font-sans capitalize">
                    large
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="my-2">
              <span className="text-3xl capitalize font-mono">quantity :</span>
              <div className=" mt-4 ">
                <div
                  className={`bg-gray-100 py-2 px-3 w-48 flex justify-between items-center rounded-full `}
                >
                  <button
                    className="text-3xl hover:text-gray-400"
                    onClick={() => {
                      if (productQuantity === 0) return;
                      setProductQuantity((prev) => (prev -= 1));
                    }}
                  >
                    -
                  </button>
                  <span className="text-2xl cursor-pointer font-sans capitalize">
                    {productQuantity}
                  </span>
                  <button
                    className="text-3xl hover:text-gray-400 "
                    onClick={() => {
                      setProductQuantity((prev) => (prev += 1));
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <hr />

            <div className="flex gap-3 text-2xl mt-4 text-white  justify-between">
              <button className="w-full capitalize p-2 rounded bg-blue-500">
                add to cart
              </button>
              <button className="w-full capitalize p-2 rounded bg-blue-500">
                buy now
              </button>
            </div>
            {/* <div
              className="d-flex  align-items-end"
              style={{ width: "100%", gap: "3rem" }}
            >
              {
                quantity > 0 && (
                  <Button
                    style={{
                      width: "150px",
                      height: "50px",
                      background: "#ff3054db",
                      border: "none",
                    }}
                    variant="outline-light"
                    className="mt-2 mb-2"
                    onClick={() => send(singleProduct)}
                  >
                    Add TO Cart
                  </Button>
                )
                // <AddToCart  product={singleProduct}/>
              }
              {/* <button className="btn btn-primary" style={{fontSize:'14px', padding:'12px 18px', backgroundColor: "rgb(175, 122, 109)"}}>Place order</button> */}
            {/* </div> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

const Wrapper = styled.section`
  // .container {
  //   padding: 9rem 0;
  // }

  // .product_images {
  //   display: flex;
  //   align-items: center;
  // }

  // .product-data {
  //   display: flex;
  //   flex-direction: column;
  //   align-items: flex-start;
  //   justify-content: center;
  //   gap: 2rem;

  //   .product-data-warranty {
  //     width: 100%;
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: center;
  //     border-bottom: 1px solid #ccc;
  //     margin-bottom: 1rem;

  //     .product-warranty-data {
  //       text-align: center;

  //       .warranty-icon {
  //         background-color: rgba(220, 220, 220, 0.5);
  //         border-radius: 50%;
  //         width: 4rem;
  //         height: 4rem;
  //         padding: 0.6rem;
  //       }
  //       p {
  //         font-size: 1.4rem;
  //         padding-top: 0.4rem;
  //       }
  //     }
  //   }

  //   .product-data-price {
  //     font-weight: bold;
  //   }
  //   .product-data-real-price {
  //     color: ${({ theme }) => theme.colors.btn};
  //   }
  //   .product-data-info {
  //     display: flex;
  //     flex-direction: column;
  //     gap: 1rem;
  //     font-size: 1.8rem;

  //     span {
  //       font-weight: bold;
  //     }
  //   }

  //   hr {
  //     max-width: 100%;
  //     width: 90%;
  //     /* height: 0.2rem; */
  //     border: 0.1rem solid #000;
  //     color: red;
  //   }
  // }

  // .product-images {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }

  // .page_loading {
  //   font-size: 3.2rem;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
  // @media (max-width: ${({ theme }) => theme.media.mobile}) {
  //   padding: 0 2.4rem;
  // }
`;

export default SingleProduct;
