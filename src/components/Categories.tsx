import React from "react";

type ICategories = {
  value: number;
  onChangeCategory: (i: number) => void;
};

const Categories: React.FC<ICategories> = React.memo(
  ({ value, onChangeCategory }) => {
    const categories = [
      "Все",
      "Букеты",
      "Свечи",
      "1 сентября",
      "Подарки для женщин",
      "Подарки для мужчин",
    ];

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, i) => (
            <li
              key={categoryName}
              onClick={() => onChangeCategory(i)}
              className={value === i ? "active" : ""}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

export default Categories;
