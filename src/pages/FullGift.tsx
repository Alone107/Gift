import React from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

const FullGift = () => {
  const { id } = useParams();

  const [gift, setGift] = React.useState<{
    imageUrl: string;
    title: string;
    price: string;
  }>();

  React.useEffect(() => {
    async function getGift(id: string) {
      try {
        const res = await axios.get(
          `https://6a0f28901736097c360b3840.mockapi.io/react-gits/` + id,
        );

        setGift(res.data);
      } catch (error) {
        console.log("error не получилось получить подарок", error);
      }
    }
    if (id) {
      getGift(id);
    }
  }, []);

  if (!id) {
    return (
      <div className="container">
        <h2>Загрузка</h2>
      </div>
    );
  }

  return (
    <>
      {gift && (
        <div className="container">
          <div className="gift-block gift-block-full">
            <img
              className="gift-block__image"
              src={`../${gift.imageUrl}`}
              alt="gift"
            />
            <div className="gift-block-full-right">
              <h4 className="gift-block__title">{gift.title}</h4>

              <div className="gift-block__bottom">
                <div className="gift-block__price">от {gift.price} ₽</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullGift;
