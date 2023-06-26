import * as React from "react";
import Typography from "@mui/material/Typography";
// Alias the breadcumbs component because I have a component with same name
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
// withRouter is a higher order component that will pass updated match, location, and history props to the wrapped component whenever it renders.
import { useLocation, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

const HeaderBreadCrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathNames = location.pathname.split("/").filter((x) => x);

  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        {pathNames.length > 0 ? (
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              cursor: "pointer",
            }}
            // underline="hover"
            color="inherit"
            onClick={() => navigate("/")}
          >
            <HomeIcon sx={{ mr: 0.7 }} fontSize="inherit" />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                color: "#000000",
              }}
            >
              Home
            </Typography>
          </Link>
        ) : (
          <Typography
            // color="text.primary"
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Poppins",
              fontSize: "12px",
              color: "#000000",
            }}
          >
            {" "}
            <HomeIcon sx={{ mr: 0.5, fontSize: "14px" }} />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                color: "#000000",
              }}
            >
              Home
            </Typography>
          </Typography>
        )}

        {pathNames.map((name, index) => {
          const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathNames.length - 1;
          return isLast ? (
            <Typography
              // color="text.primary"
              sx={{
                fontFamily: "Poppins",
                fontSize: "12px",
                color: "#000000",
                fontWeight: 600,
              }}
            >
              {name.replace(/^\w/, (c) => c.toUpperCase())}
            </Typography>
          ) : (
            <Link
              key={name}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onClick={() => navigate(routeTo)}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  color: "#000000",
                  fontWeight: 400,
                }}
              >
                {name.replace(/^\w/, (c) => c.toUpperCase())}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default HeaderBreadCrumb;
