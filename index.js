import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-body-parser";
import http from "http";
import "dotenv/config";
import chatHandler from "./handlers/chat.js";
import coachHandler from "./handlers/coach.js";
import { PassThrough } from "stream";

const app = new Koa();
app.use(cors());
app.use(bodyParser());

app.use(async (ctx) => {
  ctx.response.set("content-type", "application/json");

  try {
    if (ctx.request.url === "/chat") {
      const response = await chatHandler(ctx.request);
      ctx.body = response;
    }

    if (ctx.request.url === "/coach") {
      const response = await coachHandler(ctx.request);
      ctx.body = response;
    }
  } catch (e) {
    console.error(e);
    ctx.response.set("content-type", "application/json");
    ctx.body = { error: e.toString() };
  }
});

http.createServer(app.callback()).listen(8000);
