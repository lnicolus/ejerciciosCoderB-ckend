import handlebars from "express-handlebars";

export function viewEngine(app) {
  app.engine(
    "hbs",
    handlebars.engine({
      extname: "hbs",
      defaultLayout: "mainLayout.hbs",
      layoutsDir: "./front/view/layouts",
      partialsDir: "./front/view/partials",
    })
  );

  app.set("view engine", "hbs");
  app.set("view", "./front/view/pages");
}
