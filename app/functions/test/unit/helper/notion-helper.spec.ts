import {NotionHelper} from "../../../src/helper/notion-helper";

describe("Notion Helper function test", () => {
  test("featch book test", async () => {
    const watchListDBId = process.env.NOTION_WATCHLIST_DATABASE_ID || "";
    const query = {
      property: "Categry",
      select: {
        equals: "Book",
      },
    };
    const response = await NotionHelper.featchPageIdsFromDB(watchListDBId, query);
    response.forEach((value) => {
      const id = process.env.TEST_HARRY_PAGE_ID;
      if (value.id === id) {
        expect(value.name).toEqual("ハリー・ポッターと秘密の部屋");
      } else {
        throw new Error("Cannot get book data!")
      }
    })
  });

  test("featch restraunt test", async () => {
    const DBId = process.env.NOTION_RESTRAUNT_DATABSE_ID || "";
    const query = {
      property: "GoogleMap",
      url: {
        is_empty: true,
      },
    };
    const response = await NotionHelper.featchPageIdsFromDB(DBId, query);
    const kannok = process.env.TEST_KANNOK;
    const stay = process.env.TEST_STAY;
    response.forEach((value) => {
      if (value.id === kannok) {
        expect(value.name).toEqual("kannok");
      } else if (value.id === stay) {
        expect(value.name).toEqual("stay loose");
      } else {
        throw new Error("Cannot get restraunt data!")
      }
    })
  });
});