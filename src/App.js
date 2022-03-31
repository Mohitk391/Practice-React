import React, { useState } from "react";
import "./styles.css";

import faker from "faker";

faker.seed(123);

const data = [...Array(50)].map((item) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  brand: faker.lorem.word(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale"
  ]),
  idealFor: faker.random.arrayElement([
    "Men",
    "Women",
    "Girl",
    "Boy",
    "Senior"
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional"
  ]),
  color: faker.commerce.color()
}));

// const sortedData = data.sort((a,b)=>a.price-b.price);

export default function App() {
  const [products, setProducts] = useState(data);
  const [orderChanged, setOrderChanged] = useState(false);

  const sortLowToHigh = () => {
    console.log(`getting called... low to high`);
    setProducts((products) =>
      products.sort(
        (firstItem, secondItem) => firstItem.price - secondItem.price
      )
    );
    setOrderChanged((orderChanged) => !orderChanged);
  };

  const sortHighToLow = () => {
    console.log(`getting called...hight to low`);
    setProducts((products) =>
      products.sort(
        (firstItem, secondItem) => secondItem.price - firstItem.price
      )
    );
    setOrderChanged((orderChanged) => !orderChanged);
  };

  const handleOutOfStock = (e) => {
    if (e.target.checked) {
      console.log(`getting called...checked`);
      setProducts((products) => products.filter((product) => product.inStock));
    } else {
      setProducts(data);
    }
    // setProducts(updatedProducts);

    // setIsOutOfStock(isOutOfStock => !isOutOfStock);
  };

  const handleFastDelivery = (e) => {
    if (e.target.checked) {
      console.log(`getting called...checked`);
      setProducts((products) =>
        products.filter((product) => product.fastDelivery)
      );
    } else {
      setProducts(data);
    }
    // setProducts(updatedProducts);

    // setIsOutOfStock(isOutOfStock => !isOutOfStock);
  };

  return (
    <>
      <fieldset>
        <div>
          Sort by: <label htmlFor="highToLow">High to Low</label>
          <input
            type="radio"
            id="highToLow"
            name="sortInput"
            onClick={() => {
              sortHighToLow();
            }}
          />
          <label htmlFor="lowToHigh">Low to High</label>
          <input
            type="radio"
            id="lowToHigh"
            name="sortInput"
            onClick={() => {
              sortLowToHigh();
            }}
          />
        </div>
        <div>
          <label htmlFor="inStock">InStock only? </label>
          <input
            type="checkbox"
            id="inStock"
            onChange={(e) => handleOutOfStock(e)}
          />{" "}
          <label htmlFor="fastDelivery">Fast Delivery? </label>
          <input
            type="checkbox"
            id="fastDelivery"
            onChange={(e) => handleFastDelivery(e)}
          />
        </div>
      </fieldset>
      <div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery
          }) => (
            <div
              key={id}
              style={{
                border: "1px solid #4B5563",
                borderRadius: "0 0 0.5rem 0.5rem",
                margin: "1rem",
                maxWidth: "40%",
                padding: "0 0 1rem"
              }}
            >
              <img src={image} width="100%" height="auto" alt={productName} />
              <h3> {name} </h3>
              <div>Rs. {price}</div>
              {inStock && <div> In Stock </div>}
              {!inStock && <div> Out of Stock </div>}
              <div>{level}</div>
              {fastDelivery ? (
                <div> Fast Delivery </div>
              ) : (
                <div> 3 days minimum </div>
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}
