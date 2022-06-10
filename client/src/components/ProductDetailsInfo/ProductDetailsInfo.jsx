import React, {useEffect, useState} from "react";
import "./ProductDetailsInfo.css";
import { useHistory } from "react-router-dom";
import accounting from "accounting";
import { ToastContainer, toast } from "react-toastify";
import { FormQA } from "../FormQA/FormQA";
import { useTranslation } from "react-i18next";
import { handleDeleteFavorite, handleSaveFavorite } from "../Cart/actionsCart";
import imgAddFavorite from "../../media/heart-add-cart.png";
import imgDeleteFavorite from "../../media/heart-delete-cart.png";
import shoppingCart from "../../media/shoppingCart.png";
import { useStore } from "../../context/store.js";
import { totalCount } from "../../redux/actions/actions";

export default function ProductDetailsInfo({
  id,
  image,
  name,
  description,
  stock,
  // rating,
  categories,
  // reviews,
  qas,
  status,
  price,
}) {
  const { t } = useTranslation()
  const [state, dispatch] = useStore();
  const [changeButton, setChangeButton] = useState();
  const history = useHistory()
  const [cart, setCart] = useState([]);
  const [inCart, setInCart] = useState(false);
  const [user, setUser] = useState([]);

   let person = JSON.parse(localStorage.getItem("myUser"));

//Funcion para verificar si el elemento se encuentra en el listado de favoritos
  const inFavorite = (id)=>{
    let isAdd = ""
    if(state.favorites.length){
      isAdd=state.favorites.find((e) => e.id === id)
    }
    setChangeButton(isAdd)
  }
//**********************************************************/
//------------------Funciones de alertas------------------//
//**********************************************************/
  const alertSuccess = (msg) => {
    toast.success(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark"
    });
  };
  const alertInfo = (msg) => {
    toast.info(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark"
    });
  };

//**********************************************************/
//------Funciones para agregar o borrar de favoritos------//
//**********************************************************/
  const deleteFavorite = () => {
    setChangeButton(false);
    handleDeleteFavorite(id);
  };

  const postFavorite = () => {
    let person = JSON.parse(localStorage.getItem("myUser"));
    if (!person) {
      alert(t("home.mustBeLoggedIn"))
      history.push("/logIn");
      return;
    }
    setChangeButton(true);
    handleSaveFavorite(id);
    alertSuccess(t("home.altAddToFavs"))
  };

//**********************************************************/
//-------------Funcion para agregar a carrito-------------//
//**********************************************************/
  const handleSaveCart = (name, price, image, id, stock) => {
    let quantity = 1;
    let totalPrice = price;

    let products = { name, price, image, id, stock, quantity, totalPrice };
    let value = cart.find((e) => e.name === name);
    if (value) {
      setInCart(false);
      alertInfo(t("home.altAlreadyInCart"));
      return;
    } else {
      setInCart(true);
      setCart((cart) => [...cart, products]);
      alertSuccess(t("home.altAddToCart"));
    }
  };

//**********************************************************/
//------------------------useEffect------------------------//
//**********************************************************/
  useEffect(() => {
    let myUser = JSON.parse(localStorage.getItem("myUser"));
    let myCart = JSON.parse(localStorage.getItem(myUser));
    setUser(myUser);
    if (myCart) {
      setCart(myCart);
    } else {
      setCart([]);
    }
  }, []);

  useEffect(()=>{
    inFavorite(id)
  }, [])

   useEffect(() => {
    localStorage.setItem(user, JSON.stringify(cart));
    totalCount(dispatch)
  }, [cart]);


  return (
    <div className="details-container">
       <div className="img-container">
        <img src={image} alt={` ${name}`} className="product-img" />
      </div>
      <button
          className="card-btn"
          onClick={() => handleSaveCart(name, price, image, id, stock)}
        >
          <img className="cart-btn" src={shoppingCart} alt="add-cart"/>
        </button>
        {changeButton ? (
          <button className="card-btn" onClick={() => deleteFavorite()}>
            <img
              className="fav-btn"
              src={imgDeleteFavorite}
              alt="delete-favorite"
            />
          </button>
        ) : (
          <button className="card-btn" onClick={() => postFavorite()}>
            <img className="fav-btn" src={imgAddFavorite} alt="add-favorite" />
          </button>
        )} 

     
      <div className="product-info">
        <p className="title">{name}</p>
        <p className="title">{t("productDetailsInfo.categories")}</p>
        {React.Children.toArray(categories.map((category) => (
          <p>{category.name}</p>
        )))}

        <p className="title">{t("productDetailsInfo.description")}</p>
        <p className="description">{description}</p>
        <p className="title">{t("productDetailsInfo.stock")}</p>
        <p>{stock}</p>
        <p className="title">{t("productDetailsInfo.price")}</p>
        <p>{`${accounting.formatMoney(price, "U$D ", 0)}`}</p>
        {/* <p className="title">Rating: </p>
        <p>{rating}</p> */}
        {/* <p className="title">Reviews:</p>
        <p>{reviews}</p> */}
        <p className="title">{t("productDetailsInfo.qa")}</p>
        <p>{React.Children.toArray(qas.map(qa => (
          <div>
            <p>{qa.question}</p>
            {
              qa.answer
                ? <p>{qa.answer}</p>
                : null
            }
          </div>
        )))}</p>
      </div>
      <div><FormQA productId={id} /></div>
      <ToastContainer />
    </div>
  );

}


