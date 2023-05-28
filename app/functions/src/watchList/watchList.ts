import {ImageUrl} from "../utils/imageUrl";

export interface TargetWatchList {
    id: string;
    title: string;
  }

export interface WatchListInfo {
  authors: string;
  title: string;
  coverUrl: ImageUrl;
  publishedDate: string;
}
