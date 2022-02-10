import Router from "koa-router";
import { koaSwagger } from "koa2-swagger-ui";
import path from "path";
import yamljs from "yamljs";
import handlers from "./handlers";
import bookingValidation from './middleware/validator'

const router = new Router();

router.get("/availabilities", handlers.getAvailabilities);

router.post("/booking", bookingValidation, handlers.createBooking)

router.get(
  "/docs",
  koaSwagger({
    routePrefix: false,
    swaggerOptions: {
      spec: yamljs.load(path.join(__dirname, "../../../openapi.yaml")),
    },
  })
);

export default router;
