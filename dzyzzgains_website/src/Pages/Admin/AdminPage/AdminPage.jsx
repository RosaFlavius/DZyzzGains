import React from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./styles.css";
import { Grid, Paper } from "@mui/material";
import LogoImg from "../../../images/Logo.png";

function AdminPage() {
  return (
    <Grid container spacing={3} className="container-home-layout">
      <Grid item xs={12} sm={5} lg={3}>
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={12}
        sm={7}
        lg={9}
        className="cont-img-admin"
        style={{ padding: "5px" }}
      >
        <div className="logo-img-admin">
          <img src={LogoImg} />
        </div>
      </Grid>
    </Grid>
  );
}

export default AdminPage;
