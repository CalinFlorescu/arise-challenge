import { Context } from "koa";
import { queryAvailabilities } from '../services/arise.service'

export default async function getAvailabilities(ctx: Context) {
  const {
    hotel_id,
    check_in,
    check_out,
    adults,
    children
  } = ctx.request.query

  try {
    const availabilities = await queryAvailabilities(hotel_id, check_in, check_out, adults, children)

    ctx.status = 200
    ctx.body = availabilities
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      error: err
    }
  }
}
