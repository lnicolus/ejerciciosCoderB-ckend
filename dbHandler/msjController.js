export class msgHandler {
  constructor(connection, table) {
    this.save = (msg) => {
      connection(table)
        .insert(msg)
        .then(() => {
          return;
        })
        .catch((err) => alert("Error", err));
    };
    this.loadAll = async () => {
      const all = await connection.from(table).select("*");
      return all;
    };
  }
}

export default msgHandler;
