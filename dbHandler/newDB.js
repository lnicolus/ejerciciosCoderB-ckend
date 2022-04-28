export class newDB {
    constructor(connection, tablename) {
        this.createDB = async () => {

            if (tablename === 'products') {

                connection.schema.createTable(tablename, (table) => {
                    table.string('title')
                    table.float('price')
                    table.string('thumbail')
                    table.increments('id')
                })
                    .then(() => console.log('new table succesfully created'))
                    .catch((error) => console.log(error, 'table already exists'))
                    .finally(() => { connection.destroy() })
            }


            if (tablename === 'messages') {

                connection.schema.createTable(tablename, table => {
                    table.string('mail')
                    table.string('msg')
                    table.timestamp('time').defaultTo(connection.fn.now())
                })
                    .then((res) => alert('table successfully created', res))
                    .catch((error) => alert('table already exists'))
                    .finally(() => { connection.destroy() })
            }
        }
    }
}

