import { Button, Grid, IconButton } from "@mui/material";
import React from "react";
import { Category } from "../../Enums/Category.ts";
import { ClothesGender } from "../../Enums/ClothesGender.ts";
import { ClothesSize } from "../../Enums/ClothesSize.ts";
import { EquipmentType } from "../../Enums/EquipmentType.ts";
import { SupplementsType } from "../../Enums/SupplementsType.ts";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart, addRemoveFavourite } from "../../redux/Shop/shop_action";
import { connect } from "react-redux";
import "./favourites-card.styles.css";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as shoppingActions from "../../redux/Shop/shop_action";

function FavouritesCard({ item, productsAddedToWishlist }) {
  const dispatch = useDispatch();

  const verifyCategory = () => {
    if (item.category === Category.Clothes) {
      return (
        <span>
          <b>Details:</b> {ClothesGender[item.gender]} {ClothesSize[item.size]}
        </span>
      );
    } else if (item.category === Category.Equipment) {
      return (
        <span>
          <b>Details:</b> {EquipmentType[item.typeOfEquipment]}
        </span>
      );
    } else if (item.category === Category.Supplements) {
      return (
        <span>
          <b>Details:</b> {SupplementsType[item.typeOfSupplement]}
        </span>
      );
    }
  };

  const isAddedToWishList = () => {
    return productsAddedToWishlist.find((prod) => prod.id === item.id);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...item }));
  };

  const handleRemoveFromFavourite = () => {
    dispatch(addRemoveFavourite({ ...item }));
  };

  return (
    <Grid container spacing={3} className="container-favourites-card">
      <Grid item xs={10}>
        <Grid container spacing={3}>
          <Grid item md={5} lg={5}>
            <Grid container spacing={3} className="center-item-fav">
              <Grid item xs={12} className="center-item-fav">
                <span className="fav-name-text">{item.name}</span>
              </Grid>
              <Grid item xs={12} className="center-item-fav">
                <img
                  src={item.img}
                  style={{
                    objectFit: "contain",
                    height: "250px",
                    width: "250px",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} lg={6}>
            <Grid
              container
              spacing={3}
              className="center-item-fav"
              style={{ padding: "20px" }}
            >
              <Grid item xs={12}>
                <span className="text-fav">
                  <b>Brand: </b>
                  {item.brand}
                </span>
              </Grid>
              <Grid item xs={12}>
                <span className="text-fav">
                  <b>Price: </b>
                  {item.price}$
                </span>
              </Grid>
              <Grid item xs={12}>
                <span className="text-fav">
                  <b>Description: </b>
                  {item.description}
                </span>
              </Grid>
              <Grid item xs={12}>
                <span className="text-fav">
                  <b>Category: </b>
                  {Category[item.category]}
                </span>
              </Grid>
              <Grid item xs={12}>
                {verifyCategory()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} className="delete-container-fav">
        <IconButton onClick={handleRemoveFromFavourite}>
          <StarIcon
            className="icon-fav"
            style={{ color: "rgb(215, 215, 85)" }}
          />
        </IconButton>
        {!isAddedToWishList() ? (
          <IconButton onClick={handleAddToCart}>
            <AddShoppingCartIcon className="icon-fav" color="secondary" />
          </IconButton>
        ) : null}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    productsAddedToWishlist: state.shopReducer.productsAddedToWishList,
  };
};

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(shoppingActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesCard);
