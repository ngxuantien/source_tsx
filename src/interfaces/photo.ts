export interface Photo {
  id: string;
  alt_description: string;
  urls: {
    thumb: string;
    regular: string;
  };
  user: {
    name: string;
  };
  description: string;
}
