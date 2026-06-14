import React from "react";
import qs from "qs";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { sortList } from "../components/Sort";

import {
  setCategory,
  setCurrentPage,
  setFilters,
  selectFilter,
  selectFilterSort,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import GiftBlock from "../components/GiftBlock";
import Skeleton from "../components/GiftBlock/Skeleton";
import Pagination from "../components/Pagination";
import { fetchGiftsStatus, selectGift } from "../redux/slices/giftSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = useSelector(selectFilterSort);
  const { items, status } = useSelector(selectGift);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategory(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getGifts = async () => {
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchGiftsStatus({ order, sortBy, category, search, currentPage }),
    );
  };

  // Eсли бы первый рендер, проверяем и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty,
      );

      dispatch(
        setFilters({
          sort: sort ?? {
            name: "популярности",
            sortProperty: "rating",
          },
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то запрашиваем подарки
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getGifts();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  // Если это первый рендер то ничего, если изменились параметры и не первый рендер парсим
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage, navigate]);

  const allGifts = items.map((obj) => <GiftBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">Все подарки</h2>
        <div className="content__items">
          {status === "error" ? (
            <div>
              <h2>Подарков нет 😕</h2>
              <p>Вероятней всего, произошла ошибка.</p>
            </div>
          ) : status === "loading" ? (
            skeletons
          ) : (
            allGifts
          )}
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
