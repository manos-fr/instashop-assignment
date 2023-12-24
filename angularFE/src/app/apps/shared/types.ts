export type Blog = {
  objectId: string;
  title: string;
  long: number;
  lat: number;
  short_info: string;
  photo_thumb: string;
  description: string;
  url: string;
  img: string;
  photo: File | null;
  updatedAt: string;
};

export type User =
  | {
      objectId: string;
      username: string;
      sessionToken: string;
      permissions?: { read?: boolean; write?: boolean };
    }
  | undefined;

export type SightDetails = {
  id: string | null;
  title?: string;
  shortInfo?: string;
  description?: string;
  photo: string | null;
};
