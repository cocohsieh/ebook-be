const bookshelfModel = require('../models/bookshelf');
const pool = require('../utils/db');

// 傳送全部分類資料給前端
async function getCustomCategories(req, res, next) {
  let data = await bookshelfModel.getCustomCategories();
  res.json(data);
}
// 傳送最近閱讀資料給前端
const getRecentBook = async (req, res, next) => {
  // console.log('recent-book request received');

  let data = await bookshelfModel.getRecentBook();
  // console.log(data);
  res.json(data);
};

// 更新目前在的分類篩出來的bookList
const getOnCategory = async (req, res, next) => {
  // console.log('category-info', req.body[0]);

  // let data = await bookshelfModel.getFilteredBooks();
  let [data] = await pool.execute(
    'SELECT owned_books.*, customized_book_category.*, product.* FROM owned_books JOIN customized_book_category ON owned_books.category_id = customized_book_category.id JOIN product ON owned_books.product_id = product.id WHERE owned_books.category_id = ?',
    [req.body[0]]
  );
  // let onCategoryId = 'abc';
  // console.log(data.length);

  res.json(data);

  // next();
};

const getOwnedBooks = async (req, res, next) => {
  // console.log('getOwnedBooks', req.onCategoryId);
  let data = await bookshelfModel.getOwnedBooks();
  // console.log(onCategoryId);
  res.json(data);
};

module.exports = { getCustomCategories, getOwnedBooks, getOnCategory, getRecentBook };