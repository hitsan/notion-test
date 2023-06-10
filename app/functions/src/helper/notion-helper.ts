import {Client} from "@notionhq/client";
import * as functions from "firebase-functions";

/**
 * Notion Helper
 */
export class NotionHelper {
  private static notion: Client = (()=>{
    const notionToken = process.env.NOTION_TOKEN;
    if (!notionToken) throw new Error("Do not find NOTION_TOKEN");
    return new Client({auth: notionToken});
  })();

  /**
  * Get page contents
  * @param {string} dbId ID of DB
  * @param {object} properties Filtering properties
  */
  static async featchPageIdsFromDB(dbId: string, properties: object): Promise<{id: string, name: string}[]> {
    const filteringQuery: {database_id: string, filter: any,} = {database_id: dbId, filter: properties};
    try {
      const response = await this.notion.databases.query(filteringQuery);
      const properties = response.results;
      const idList = properties.map((result) => {
        if (!("properties" in result && "title" in result.properties.Name)) {
          throw new Error("Ilegal data");
        }
        const name = result.properties.Name.title[0].plain_text;
        return {id: result.id, name: name};
      });
      return idList;
    } catch (error) {
      functions.logger.error(error, {structuredData: true});
      throw error;
    }
  }

  /**
  * Update page properties
  * @param {string} pageId ID of page
  * @param {string} icon icon
  * @param {object} properties Filtering properties
  * @todo Make Emoji Type
  */
  static async updatePageProperties(pageId: string, icon: string, properties: object) {
    const updatingQuery: {page_id: string, icon: any, properties: any,} = {page_id: pageId, icon: {emoji: icon}, properties};
    try {
      const response = await this.notion.pages.update(updatingQuery);
      return (response.id===pageId);
    } catch (error) {
      functions.logger.error(error, {structuredData: true});
      throw error;
    }
  }

  /**
   * Create page to DB
  * @param {string} databaseId ID of DB
  * @param {string} icon icon
  * @param {object} properties Filtering properties
   */
  static async createPage(databaseId: string, icon: string, properties: object) {
    const database = {database_id: databaseId};
    const creatingQuery: {parent: {database_id: string}, icon: any, properties: any,} = {parent: database, icon: {emoji: icon}, properties};
    const response = await this.notion.pages.create(creatingQuery);
    return (!!response);
  }
}
