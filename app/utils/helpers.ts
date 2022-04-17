import { PAGE_SIZE } from "../Constants";
import { Charector } from "../modals/Charector";

export const getPages = (items: Array<any>, size: number) => {
  let totalItemCount = items.length - 1;

  let pages = (totalItemCount / 100) * size;

  let PageArray = [];

  for (let i = 1; i <= Math.ceil(pages); i++) {
    PageArray.push(i);
  }
  return PageArray;
};

export const getCurrentPageItems = (items: Array<Charector>, page: number) => {
  return items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
};
