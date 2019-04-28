module.exports = app => {
    app.use("/api", require("./api"));
    
    app.use("/main/*", (req, res) => {
        res.render("main/index");
    });
};
