export type CartItemType = Record<
  "title" | "id" | "image" | "category" | "description",
  string
> & {
  price: number;
  qty: number;
  rating: {
    rate: number;
    count: number;
  };
};

export type InitStateType<T extends Record<string, unknown>> = T & {
  error: string;
  loading: boolean;
};

export type User = {
  address: {
    geolocation: {
      lat: `${number}`;
      long: `${number}`;
    };
    city: string;
    street: string;
    number: number;
    zipcode: `${number}-${number}`;
  };
  id: number;
  email: `${string}@${string}.${string}`; //"john@gmail.com";
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: `${number}-${number}-${number}-${number}`; //"1-570-236-7033";
};
