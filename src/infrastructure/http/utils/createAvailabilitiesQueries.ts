export default (check_in: any, check_out: any, adults: any) => {
    return `query findAllProperties{
         properties(first: 1){
         edges {
           cursor
           node {
             id
             name
             country
             url
             photos
             partnerReferences {
               partner
               externalId
             }
             rooms(startDate:"${check_in}", endDate:"${check_out}", adults:${parseInt(adults)}) {
               edges {
                 cursor
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
               pageInfo {
                 hasNextPage
                 hasPreviousPage
                 startCursor
                 endCursor
               }
             }
           }
         }
       }
     }`
   }