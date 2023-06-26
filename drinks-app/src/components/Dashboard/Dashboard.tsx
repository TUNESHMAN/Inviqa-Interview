import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const { Search } = Input;

const suffix = (
  <LocalDrinkIcon
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchOutput, setSearchOutput] = useState([]);

  const searchDrinks = useCallback(async () => {
    setIsLoading(true);
    try {
      setIsLoading(false);
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`
      );
      //   Limit the search result to 5
      const slicedArray = response.data.drinks.slice(0, 5);
      setSearchOutput(slicedArray);
    } catch (error: any) {
      setIsLoading(false);
      throw new Error(error);
    }
  }, [searchValue]);

  const onSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue.length) {
      const search = setTimeout(searchDrinks, 1000);
      return () => clearTimeout(search);
    }
  }, [searchValue, searchDrinks]);

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        mt={5}
      >
        <Grid item>
          <Search
            size="large"
            placeholder="Search"
            enterButton="Search"
            loading={isLoading}
            onChange={onSearch}
            value={searchValue}
            allowClear
            style={{ width: 400, height: 50 }}
            suffix={suffix}
            prefix={<SearchOutlined />}
          />
        </Grid>
      </Grid>

      <Paper
        sx={{
          p: 2,
          margin: "auto",
          mt: 5,
          maxHeight: "70vh",
          overflow: "auto",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
          }}
        >
          {searchOutput.length < 1 ? (
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: "20px",
                color: "#000000",
                margin: "0 auto",
                fontWeight: 700,
                paddingY: 5,
              }}
            >
              No Drinks Found
            </Typography>
          ) : (
            searchOutput.map((drink: any, index: number) => (
              <Grid item xs={12} md={4} key={index}>
                <Box>
                  <Item>
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      marginBottom={3}
                    >
                      <Grid item>
                        <Typography
                          mt={0.5}
                          fontWeight={400}
                          fontFamily={"Inter"}
                          fontSize={"20px"}
                          color={"#2E2E3A"}
                          fontStyle={"normal"}
                          paddingLeft={2}
                        >
                          {drink.strDrink}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton color="inherit">
                          <LocalBarIcon />
                        </IconButton>
                      </Grid>
                    </Grid>

                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                      }}
                    >
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" aria-label="notifications">
                            <SportsBarIcon />
                          </IconButton>
                        }
                        disablePadding
                      >
                        <ListItemButton>
                          <Grid container>
                            <Grid item xs={12} sm container>
                              <Grid item xs container direction="column">
                                <Grid item>
                                  <Grid container>
                                    <Grid item xs={2}>
                                      <ListItemIcon>
                                        <Avatar
                                          alt={drink.strDrink}
                                          src={drink.strDrinkThumb}
                                          sx={{ width: 30, height: 30 }}
                                        />
                                      </ListItemIcon>
                                    </Grid>
                                    <Grid item>
                                      {" "}
                                      <Typography
                                        fontFamily={"Inter"}
                                        fontSize={"12px"}
                                        color={"#4E4E4E"}
                                        fontWeight={700}
                                      >
                                        {drink.strIBA}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <ListItemText
                                    primary={
                                      <React.Fragment>
                                        <Typography
                                          color={"#000000"}
                                          fontFamily={"Inter"}
                                          fontSize={"14px"}
                                          fontWeight={500}
                                        >
                                          {drink.strCategory}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                    secondary={
                                      <React.Fragment>
                                        {/* Date Modified */}
                                        <Grid
                                          container
                                          direction="row"
                                          alignItems="center"
                                          mt={2}
                                        >
                                          <Grid item xs={2}>
                                            <ListItemIcon>
                                              <CalendarMonthIcon fontSize="small" />
                                            </ListItemIcon>
                                          </Grid>
                                          <Grid item>
                                            <Typography
                                              component="p"
                                              variant="body2"
                                              color="#4E4E4E"
                                              fontFamily={"Inter"}
                                              fontSize={"12px"}
                                              paddingBottom={0.5}
                                              fontWeight={400}
                                            >
                                              Date: {drink.dateModified}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                        {/* First Ingredient */}
                                        <Grid
                                          container
                                          direction="row"
                                          alignItems="center"
                                          mt={2}
                                        >
                                          {drink.strIngredient1 ? (
                                            <Grid item xs={2}>
                                              <ListItemIcon>
                                                <LocalDrinkIcon fontSize="small" />
                                              </ListItemIcon>
                                            </Grid>
                                          ) : (
                                            ""
                                          )}
                                          {drink.strIngredient1 ? (
                                            <Grid item>
                                              <Typography
                                                component="p"
                                                variant="body2"
                                                color="#4E4E4E"
                                                fontFamily={"Inter"}
                                                fontSize={"12px"}
                                                paddingBottom={0.5}
                                                fontWeight={400}
                                              >
                                                {drink.strIngredient1} -{" "}
                                                {drink.strMeasure1
                                                  ? drink.strMeasure1
                                                  : 0}
                                              </Typography>
                                            </Grid>
                                          ) : (
                                            ""
                                          )}
                                        </Grid>

                                        {/* Second Ingredient */}
                                        <Grid
                                          container
                                          direction="row"
                                          alignItems="center"
                                          mt={2}
                                        >
                                          {drink.strIngredient2 ? (
                                            <Grid item xs={2}>
                                              <ListItemIcon>
                                                <LocalDrinkIcon fontSize="small" />
                                              </ListItemIcon>
                                            </Grid>
                                          ) : (
                                            ""
                                          )}
                                          {drink.strIngredient2 ? (
                                            <Grid item>
                                              <Typography
                                                component="p"
                                                variant="body2"
                                                color="#4E4E4E"
                                                fontFamily={"Inter"}
                                                fontSize={"12px"}
                                                paddingBottom={0.5}
                                                fontWeight={400}
                                              >
                                                {drink.strIngredient2} -{" "}
                                                {drink.strMeasure2
                                                  ? drink.strMeasure2
                                                  : 0}
                                              </Typography>
                                            </Grid>
                                          ) : (
                                            ""
                                          )}
                                        </Grid>
                                        {/* Third Ingredient */}
                                        <Grid
                                          container
                                          direction="row"
                                          alignItems="center"
                                          mt={2}
                                        >
                                          {drink.strIngredient3 ? (
                                            <Grid item xs={2}>
                                              <ListItemIcon>
                                                <LocalDrinkIcon fontSize="small" />
                                              </ListItemIcon>
                                            </Grid>
                                          ) : (
                                            ""
                                          )}
                                          {drink.strIngredient3 ? (
                                            <Grid item>
                                              <Typography
                                                component="p"
                                                variant="body2"
                                                color="#4E4E4E"
                                                fontFamily={"Inter"}
                                                fontSize={"12px"}
                                                paddingBottom={0.5}
                                                fontWeight={400}
                                              >
                                                {drink.strIngredient3} -{" "}
                                                {drink.strMeasure3
                                                  ? drink.strMeasure3
                                                  : 0}
                                              </Typography>
                                            </Grid>
                                          ) : (
                                            ""
                                          )}
                                        </Grid>
                                        {/* Fourth Ingredient */}
                                        <Grid
                                          container
                                          direction="row"
                                          alignItems="center"
                                          mt={2}
                                        >
                                          {drink.strIngredient4 ? (
                                            <Grid item xs={2}>
                                              <ListItemIcon>
                                                <LocalDrinkIcon fontSize="small" />
                                              </ListItemIcon>
                                            </Grid>
                                          ) : (
                                            ""
                                          )}
                                          {drink.strIngredient4 ? (
                                            <Grid item>
                                              <Typography
                                                component="p"
                                                variant="body2"
                                                color="#4E4E4E"
                                                fontFamily={"Inter"}
                                                fontSize={"12px"}
                                                paddingBottom={0.5}
                                                fontWeight={400}
                                              >
                                                {drink.strIngredient4} -{" "}
                                                {drink.strMeasure4
                                                  ? drink.strMeasure4
                                                  : 0}
                                              </Typography>
                                            </Grid>
                                          ) : (
                                            ""
                                          )}
                                        </Grid>
                                        {/* Fifth Ingredient */}
                                        <Grid
                                          container
                                          direction="row"
                                          alignItems="center"
                                          mt={2}
                                        >
                                          {drink.strIngredient5 ? (
                                            <Grid item xs={2}>
                                              <ListItemIcon>
                                                <LocalDrinkIcon fontSize="small" />
                                              </ListItemIcon>
                                            </Grid>
                                          ) : (
                                            ""
                                          )}
                                          {drink.strIngredient5 ? (
                                            <Grid item>
                                              <Typography
                                                component="p"
                                                variant="body2"
                                                color="#4E4E4E"
                                                fontFamily={"Inter"}
                                                fontSize={"12px"}
                                                paddingBottom={0.5}
                                                fontWeight={400}
                                              >
                                                {drink.strIngredient5} -{" "}
                                                {drink.strMeasure5
                                                  ? drink.strMeasure5
                                                  : 0}
                                              </Typography>
                                            </Grid>
                                          ) : (
                                            ""
                                          )}
                                        </Grid>
                                      </React.Fragment>
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Item>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </Paper>
      {/* </Box> */}
    </React.Fragment>
  );
};

export default Dashboard;
