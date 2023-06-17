import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { publicRequest } from "../../redux/Shop/shop_action";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { newUserSchema } from "../../validations/newUserSchema.tsx";
import { useFormik } from "formik";
import { connect } from "react-redux";
import "./update-user-page.styles.css";

const UpdateUserPage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);

  const formikUser = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phone: "",
      country: "",
      city: "",
      address: "",
      admin: false,
    },
    validationSchema: newUserSchema,
    onSubmit: (values) => {
      onSubmitUpdate(values);
    },
  });

  const getUser = async () => {
    const res = await publicRequest.get("/user/" + userId);
    setUser(res.data);
  };

  const notify = (response) => {
    if (!response) {
      toast.error("Something went wrong.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      toast.success(`User ${response.data.name} was updated successfully!`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  const onSubmitUpdate = async (usr) => {
    setIsUpdated(true);
    const response = await axios
      .put("https://localhost:7177/api/User/" + `${userId}`, {
        id: userId,
        firstName: usr.firstName,
        lastName: usr.lastName,
        email: usr.email,
        password: usr.password,
        dateOfBirth: usr.dateOfBirth,
        phone: usr.phone,
        country: usr.country,
        city: usr.city,
        address: usr.address,
        admin: false,
      })
      .catch((e) => console.log(e));
    notify(response);
    setIsUpdated(false);
  };

  useEffect(() => {
    getUser();
  }, [userId, isUpdated]);
  return (
    <Grid
      container
      spacing={3}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <Grid item xs={11} className="container-info-prod">
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={12}
              lg={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <span className="user-name-update">
                {user.firstName} {user.lastName}
              </span>
              <span className="user-email-update">{user.email}</span>
            </Grid>

            <Grid
              item
              xs={12}
              lg={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <span className="subheader-text">Account Details</span>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {user.lastName} {user.firstName}
                </span>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{user.address}</span>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{user.dateOfBirth}</span>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span className="subheader-text">Contact Details</span>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{user.phone}</span>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">
                  {user.city} | {user.country}
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <form className="user-form" onSubmit={formikUser.handleSubmit}>
          <Grid
            container
            spacing={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} sm={11} md={10} lg={5}>
              <TextField
                className="text-field-form"
                InputProps={{ className: "input-text-field" }}
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formikUser.values.firstName}
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                error={
                  !!formikUser.errors.firstName && formikUser.touched.firstName
                }
                helperText={formikUser.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={11} md={10} lg={5}>
              <TextField
                className="text-field-form"
                InputProps={{ className: "input-text-field" }}
                name="lastName"
                type="text"
                placeholder="Last name"
                value={formikUser.values.lastName}
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                error={
                  !!formikUser.errors.lastName && formikUser.touched.lastName
                }
                helperText={formikUser.errors.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={11} md={10} lg={5}>
              <TextField
                className="text-field-form"
                InputProps={{ className: "input-text-field" }}
                name="email"
                type="text"
                placeholder="Email"
                value={formikUser.values.email}
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                error={!!formikUser.errors.email && formikUser.touched.email}
                helperText={formikUser.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={11} md={10} lg={5}>
              <TextField
                className="text-field-form"
                InputProps={{ className: "input-text-field" }}
                name="password"
                type="password"
                placeholder="Password"
                value={formikUser.values.password}
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                error={
                  !!formikUser.errors.password && formikUser.touched.password
                }
                helperText={formikUser.errors.password}
              />
            </Grid>
            <Grid item xs={12} sm={11} md={10} lg={5}>
              <TextField
                className="text-field-form"
                InputProps={{ className: "input-text-field" }}
                name="dateOfBirth"
                type="text"
                multiline
                placeholder="Date of birth"
                value={formikUser.values.dateOfBirth}
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                error={
                  !!formikUser.errors.dateOfBirth &&
                  formikUser.touched.dateOfBirth
                }
                helperText={formikUser.errors.dateOfBirth}
              />
            </Grid>
            <Grid item xs={12} sm={11} md={10} lg={5}>
              <TextField
                className="text-field-form"
                InputProps={{ className: "input-text-field" }}
                name="phone"
                type="text"
                multiline
                placeholder="Phone"
                value={formikUser.values.phone}
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                error={!!formikUser.errors.phone && formikUser.touched.phone}
                helperText={formikUser.errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={11} md={10} lg={5}>
              <TextField
                className="text-field-form"
                InputProps={{ className: "input-text-field" }}
                name="country"
                type="text"
                multiline
                placeholder="Country"
                value={formikUser.values.country}
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                error={
                  !!formikUser.errors.country && formikUser.touched.country
                }
                helperText={formikUser.errors.country}
              />
            </Grid>
            <Grid item xs={12} sm={11} md={10} lg={5}>
              <TextField
                className="text-field-form"
                InputProps={{ className: "input-text-field" }}
                name="city"
                type="text"
                multiline
                placeholder="City"
                value={formikUser.values.city}
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                error={!!formikUser.errors.city && formikUser.touched.city}
                helperText={formikUser.errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={11} md={10} lg={5}>
              <TextField
                className="text-field-form"
                InputProps={{ className: "input-text-field" }}
                name="address"
                type="text"
                multiline
                placeholder="Address"
                value={formikUser.values.address}
                onChange={formikUser.handleChange}
                onBlur={formikUser.handleBlur}
                error={
                  !!formikUser.errors.address && formikUser.touched.address
                }
                helperText={formikUser.errors.address}
              />
            </Grid>
            <Grid item xs={12} sm={11} md={10} lg={5}>
              <Button variant="contained" type="submit" className="form-button">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
  };
};

export default connect(mapStateToProps)(UpdateUserPage);
