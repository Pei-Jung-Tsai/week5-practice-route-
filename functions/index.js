const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

setGlobalOptions({region: "australia-southeast2", maxInstances: 10});

if (!admin.apps.length) admin.initializeApp();


exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      logger.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});


exports.capitalizeBookOnCreate =
onDocumentCreated("books/{bookId}", async (event) => {
  const snap = event.data;
  if (!snap) return;

  const data = snap.data();

  const uppercased = Object.fromEntries(
    Object.entries(data).map(([key, value]) =>
        [key, typeof value === "string" ? value.toUpperCase() : value]));

  await snap.ref.update(uppercased);
  logger.info("Capitalised book fields", {id: snap.id, uppercased});
});