import axios from 'axios'
import parseProperties from '../utils/parseProperties'
import createAvailabilitiesQuery from '../utils/createAvailabilitiesQueries'
import createReservationMutation from '../utils/createReservationMutation'

export const queryAvailabilities = async (
  hotel_id: any,
  check_in: any,
  check_out: any,
  adults: any,
  children: any
  ) => {

  const data = await axios({
      url: process.env.GRAPHQL_ENDPOINT,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ 
        query: createAvailabilitiesQuery(check_in, check_out, adults)
      })
  })
  .then(response => {
    if (response.data &&
      response.data.data && 
      response.data.data.properties && 
      response.data.data.properties.edges) {
        return response.data.data.properties.edges
      }
    
    throw new Error('Data is missing')
  })
  .catch(err => {
    return new Error(err)
  })

  return parseProperties(hotel_id, data)
} 

export const createMutation = async (data: any) => {
  const mutation = createReservationMutation(data)

  const response = await axios({
    url: process.env.GRAPHQL_ENDPOINT,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ 
      query: mutation
    })
  })
  .then(response => {
    if (response.data &&
      response.data.data && 
      response.data.data.properties && 
      response.data.data.properties.edges) {
        return response.data.data.properties.edges
      }
    
    throw new Error('Error at mutation creation')
  })
  .catch(err => {
    return new Error(err)
  })
}