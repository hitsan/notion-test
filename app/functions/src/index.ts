import * as functions from "firebase-functions";
import {updateBooksInfo} from "./book-info";
import {addPageToLifelog} from "./lifelog";

export const addBookInfo = functions.region("asia-northeast1").https.onRequest(
  async (request, response) => {
    try {
      await updateBooksInfo();
      response.send("Succese update book list");
    } catch (error) {
      functions.logger.error(error, {structuredData: true});
      response.send("Failed update book list");
    }
  });

const timeZone = "Asia/Tokyo";
exports.scheduledFunctionCrontab = functions
  .region("asia-northeast1").pubsub
  .schedule("0 6 * * *")
  .timeZone(timeZone)
  .onRun(async () => {
    try {
      await addPageToLifelog(timeZone);
      functions.logger.info("Succese dairy task", {structuredData: true});
    } catch (error) {
      functions.logger.error(error, {structuredData: true});
    }
  });
