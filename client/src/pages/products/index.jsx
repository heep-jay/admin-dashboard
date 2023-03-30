import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";
import { InfinitySpin } from "react-loader-spinner";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  //   console.log(stat[0].yearlySalesTotal);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}>
      <CardContent key={_id}>
        <Typography
          sx={{ fontSize: "14px" }}
          color={theme.palette.secondary[700]}
          gutterBottom>
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} component="div">
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>

        <CardActions>
          <Button
            sx={{ ml: "-7px" }}
            variant="prmary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}>
            See more
          </Button>
        </CardActions>
      </CardContent>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}>
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat[0].yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  console.log(data);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See all list of products" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}>
          {data.map((data) => (
            <Product
              key={data._id}
              _id={data._id}
              name={data.name}
              description={data.description}
              price={data.price}
              rating={data.rating}
              category={data.category}
              supply={data.supply}
              stat={data.stat}
            />
          ))}
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            height="80vh"
            alignItems="center"
            justifyContent="center">
            <InfinitySpin width="200" color={theme.palette.secondary[300]} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Products;
