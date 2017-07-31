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
    const room = await Mongo.db.collection('rooms').find(
      {
        // name: { $in: roomNames },
        start: { $gte: startingTime },
        // end: { $lt: endingTime }
      },
      {
        name: 1,
      }
    ).toArray();
    return room;
  } catch (err) {
  console.error('Error: ', err)
  return null;
  }
}

export { getMatchingRooms, getAvailableRooms };
