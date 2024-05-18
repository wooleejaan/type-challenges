export type GroceryStore<Name extends string, City extends string> = {
  name: Name;
  city: City;
};

type GroceryItem<
  Name extends string,
  Price extends number,
  InStock extends boolean
> = { name: Name; price: Price; inStock: InStock };

export type CapreseSalad = GroceryItem<"Caprese Salad", 14.99, true>;
