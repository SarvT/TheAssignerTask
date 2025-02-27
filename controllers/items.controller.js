import items from "../data/items.js";

const getItems = (req, res) => {
  let { page = 1, limit = 10, sort_by = "id", sort_order = "asc" } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  let sortedItems = [...items];

  if (sort_by) {
    sortedItems.sort((a, b) => {
      const valA = a[sort_by];
      const valB = b[sort_by];

      if (sort_order === "desc") return valB - valA;
      return valA - valB;
    });
  }

  const startIndex = (page - 1) * limit;
  const paginatedItems = sortedItems.slice(startIndex, startIndex + limit);

  res.json({
    page,
    limit,
    total: items.length,
    data: paginatedItems
  });
};

export default getItems;
