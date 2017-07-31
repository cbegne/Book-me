import Mongo from '../config/MongoConnection.js';

const initDb = async (req, res) => {
  await Mongo.db.collection('rooms').drop(); // pour nettoyer base en dev
  Mongo.db.collection('rooms').insertMany([
    {
       name: "Salle #1",
       description: "Salle #1",
       capacity: 5,
       equipements: [
          {
             name: "TV"
          },
          {
             name: "Retro Projecteur"
          }
       ],
       createdAt: "2016-12-07T12:39:29.812Z",
       updatedAt: "2016-12-08T17:31:39.489Z"
    },
    {
       name: "Salle #2",
       description: "Salle #2",
       capacity: 10,
       equipements: [
          {
             name: "Retro Projecteur"
          }
       ],
       createdAt: "2016-12-07T12:39:55.384Z",
       updatedAt: "2016-12-07T13:33:37.184Z"
    },
    {
       name: "Salle Okjsdkso",
       description: "Salle Okjsdkso",
       capacity: 11,
       equipements: [],
       createdAt: "2016-12-07T14:15:55.733Z",
       updatedAt: "2016-12-09T16:45:19.025Z"
    },
    {
       name: "Salle de ouf",
       description: "Salle de ouf",
       capacity: 10,
       equipements: [
          {
             name: "TV"
          },
          {
             name: "Retro Projecteur"
          }
       ],
       createdAt: "2016-12-09T16:45:34.419Z",
       updatedAt: "2016-12-09T16:45:34.419Z"
    },
    {
       name: "Salle nulle",
       description: "Salle nulle",
       capacity: 26,
       equipements: [
          {
             name: "TV"
          },
          {
             name: "Retro Projecteur"
          }
       ],
       createdAt: "2016-12-09T16:45:49.096Z",
       updatedAt: "2016-12-09T16:45:49.096Z"
    }
  ]);
  await Mongo.db.collection('bookings').drop(); // pour nettoyer base en dev
  Mongo.db.collection('bookings').insertMany([
    {
       name: "Salle #1",
       author: "cbegne",
       start: "2017-08-01T12:00:00.812Z",
       end: "2017-08-01T13:00:00.812Z",
       createdAt: "2017-07-30T12:39:29.812Z",
       updatedAt: "2017-07-30T17:31:39.489Z"
    },
    {
       name: "Salle #2",
       author: "mmaster",
       start: "2017-08-01T10:00:00.812Z",
       end: "2017-08-01T12:00:00.812Z",
       createdAt: "2017-07-30T12:39:55.384Z",
       updatedAt: "2017-07-30T13:33:37.184Z"
    }
  ]);
  res.send({ success: true });
}

export default initDb;
