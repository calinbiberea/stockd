export const products = ["milk", "bread", "pasta", "eggs", "toilet paper", "medicine"] as const;

export type Product = typeof products[number];

export interface FilterShopsProps {
  setRoute: (Route) => void;
}

export interface ProductSelectorProps {
  selected: { [p in Product]: boolean };
  onSelect: (value: Product) => void;
  onReset: () => void;
}

export type SafetyRating = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export interface SafetySliderProps {
  minRating: SafetyRating;
  setMinRating: (value: SafetyRating) => void;
}

export interface LocationSearchProps {
  enabled?: boolean;
  location: google.maps.places.AutocompletePrediction | null;
  setLocation: (value: google.maps.places.AutocompletePrediction | null) => void;
}
