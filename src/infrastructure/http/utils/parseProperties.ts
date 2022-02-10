const formatRoomData = (rooms: any, ref: any) => {
    const formattedRooms:any = []
    rooms.forEach((room: any) => {
        if (room.node.remaining > 0)
            formattedRooms.push({
                room_name: room.node.name,
                description: room.node.description,
                photos: room.node.photos,
                price: room.node.price,
                pertner_reference: ref
            })
    })

    return formattedRooms
}

const checkIfIsPartner = (partnerRefs:any) => {
    let isPartner
    partnerRefs.forEach((partnerRef: any) => {
        if (partnerRef.partner === 'GMAH') {
            isPartner = true
        }
    })
    return isPartner ? true : false
}

export default (hotel_id: any, properties: any) => {
    const desiredProperties:any = []

    properties.forEach((property: { node: any }) => {
        if (hotel_id.includes(property.node.id)) {
            if (checkIfIsPartner(property.node.partnerReferences))
                desiredProperties.push({
                    hotel: {
                        id: property.node.id,
                        name: property.node.name,
                        url: property.node.url,
                        photos: property.node.photos,
                        country: property.node.country,
                        pertner_ref: 'GMAH'
                    },
                    rooms: property.node.rooms.edges
                })
        }
    })

    desiredProperties.forEach((desiredProperty: any) => {
        const formattedRooms = formatRoomData(desiredProperty.rooms, desiredProperty.hotel.partner_ref)
        desiredProperty.rooms = formattedRooms
    })

    return desiredProperties
}