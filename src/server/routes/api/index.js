const APIRouter = require("express").Router();

APIRouter.get("/get-oauth-request-token", require("./get-oauth-request-token"));
APIRouter.post("/get-oauth-access-token", require("./get-oauth-access-token"));
APIRouter.get("/fetch-posts", require("./fetch-posts"));

module.exports = APIRouter;
