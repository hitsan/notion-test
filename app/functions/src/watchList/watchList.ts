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

/**
 * The URL refarence image file(jpg, png)
 */
export class ImageUrl{
  private url: string;
  /**
  * constructor.
  */
  constructor(url: string) {
    const imageUrl = new URL(url);
    const imageExtension = new RegExp(".jpg|.jpeg|.png", "g");
    const isImageFileUrl = imageExtension.test(imageUrl.pathname)
    if(!isImageFileUrl) throw new Error("Illigal image url!");
    this.url = url
  }

  toString(): string {
    return this.url;
  }
}