import { Context } from "koa";
import { createMutation } from '../services/arise.service'

export default async function createBooking(ctx: Context) {
  const bookingData = ctx.request.body

  try {
    const response = createMutation(bookingData)
    ctx.status = 200
    ctx.body = response
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      error: err
    };
  }
}