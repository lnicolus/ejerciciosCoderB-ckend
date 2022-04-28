export class dbController {
  constructor(connection, table) {
    this.save = (prod) => {
      connection(table)
        .insert(prod)
        .then(() => console.log("new product posted"))
        .catch((err) => console.log("error posting", err))
        .finally(() => {
          connection.destroy();
        });
    };

    this.getAll = async () => {
      const all = await connection.from(table).select("*");
      return all;
    };

    this.getById = async (id) => {
      const byId = await connection
        .from(table)
        .select("title", "price", "thumbail")
        .where({ id: id });
      return byId;
    };

    this.modifyById = async (product) => {
      await connection(table)
        .where({ id: product.id })
        .update({
          title: product.title,
          price: product.price,
          thumbail: product.thumbail,
        });
      return "modified successfully";
    };

    this.deleteById = async (id) => {
      await connection(table).where({ id: id }).del();
      return "erased successfully";
    };

    this.deleteAll = async () => {
      await connection(table).del();
      return "you have erased all registers";
    };
  }
}

export default dbController;
