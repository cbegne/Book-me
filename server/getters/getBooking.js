import Mongo from '../config/MongoConnection.js';

const getMatchingRooms = async (people, equipment) => {
  if (equipment.length === 0) {
    try {
      const room = await Mongo.db.collection('rooms').find(
        {
          capacity: { $gte: people },
        }
      ).toArray();
      return room;
    } catch (err) {
    console.error('Error: ', err)
    return null;
    }
  }
  try {
    const room = await Mongo.db.collection('rooms').find(
      {
        capacity: { $gte: people },
        equipements: { $all:  equipment },
      },
    ).toArray();
    return room;
  } catch (err) {
  console.error('Error: ', err)
  return null;
  }
}

const getAvailableRooms = async (startingTime, endingTime, roomNames) => {
  try {
    const room = await Mongo.db.collection('bookings').find(
      {
        name: { $in: roomNames },
        $and:
        [
          {
            $or:
            [
              {
                start: { $not: { $gt: startingTime, $gte: endingTime } }
              },
              {
                end: { $not: { $gt: endingTime } }
              }
            ]
          },
          {
            $or:
            [
              {
                start: { $not: { $lt: startingTime } }
              },
              {
                end: { $not: { $lt: endingTime, $lte: startingTime } }
              }
            ]
          },
        ]
      },
    ).toArray();
    return room;
  } catch (err) {
  console.error('Error: ', err)
  return null;
  }
}

export { getMatchingRooms, getAvailableRooms };
