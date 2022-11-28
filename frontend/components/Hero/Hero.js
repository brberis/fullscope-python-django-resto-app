import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import astronaut from "../../assets/astronaut-cooking.png";
import fish from "../../assets/fish-camping.png";
import icecream from "../../assets/icecream-sprinkles.jpg";
import puppy from "../../assets/puppy-bicycle.png";
import "./Hero.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
  },
});
export default function Hero() {
  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Item className="text-container">
            <Typography className="text" variant="h2" gutterBottom>
              What will AI design for you today?
            </Typography>
            {/* <Button color="secondary" variant="contained">
              Get Started!
            </Button> */}
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item className="img-container">
            <img className="hero-img" alt="astronaut cooking" src={astronaut} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item className="img-container">
            <img className="hero-img" alt="icecream sprinkles" src={icecream} />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item className="img-container">
            <img className="hero-img" alt="fish camping" src={fish} />{" "}
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item className="img-container">
            <img className="hero-img" alt="puppy riding bicycle" src={puppy} />
          </Item>
        </Grid>
        
      </Grid>
    </Box>
  );
}