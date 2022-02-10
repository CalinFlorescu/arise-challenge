export default (data:any) => {
    const {
      hotel_partner_ref,
      room_type_partner_ref,
      primary_contact,
      adults,
      children,
      price
    } = data
  
    return `mutation {
      createReservation(payload: {
        hotelId: ${hotel_partner_ref}
        roomId: ${room_type_partner_ref}
        checkIn: ""
        checkOut: ""
        contactPerson: {
          firstName: ${primary_contact.firstName}
          lastName: ${primary_contact.lastName}
        }
        adults: ${adults}
        childrenAges: ${children}
        price: {
          currency: ${price.currency}
          amount: ${parseInt(price.amount)}
          decimalPlaces: 1
        }
      }){
        property{
          name
          country
          id
          url
          photos
          partnerReferences {
            partner
            externalId
          }
          rooms {
            edges {
              node {
                id
                name
                description
                photos {
                  url
                }
                price {
                  currency
                  amount
                }
                remaining
              }
            }
          }
        }
      }
    }`
  }
  