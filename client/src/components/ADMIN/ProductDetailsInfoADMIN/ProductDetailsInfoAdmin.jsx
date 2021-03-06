import React from "react";
import { Link } from "react-router-dom";
import accounting from "accounting";
import { useTranslation } from "react-i18next";
export default function ProductDetailsInfoAdmin({
  id,
  image,
  name,
  description,
  stock,
  // rating,
  categories,
  // reviews,
  // qua,
  status,
  price,
}) {
  const { t } = useTranslation()
  return (
    <div className="details-container">
      <button>
        <Link
          to={`/admin/edit/${id}`}
        >
          {t("adminProductDetails.update")}
        </Link>
      </button>

      <div className="img-container">
        <img src={image} alt={` ${name}`} className="product-img" />
      </div>

      <div className="product-info">
        <p className="title">{name.toUpperCase()}</p>
        <p className="title">{t("adminProductDetails.categories")}</p>
        {React.Children.toArray(categories.map((category) => (
          <p>{category.name}</p>
        )))}

        <p className="title">{t("adminProductDetails.description")}</p>
        <p className="description">{description}</p>
        <p className="title">{t("adminProductDetails.available")}</p>
        <p>{stock}</p>
        <p className="title">{t("adminProductDetails.price")} </p>
        <p>{`${accounting.formatMoney(price, "U$D ", 0)}`}</p>

        {/* <p className="title">Rating: </p>
        <p>{rating}</p> */}
        {/* <p className="title">Reviews:</p>
        <p>{reviews}</p> */}
        {/* <p className="title">Q{"&"}A:</p>
        <p>{qua}</p> */}
      </div>
    </div>
  );
}
