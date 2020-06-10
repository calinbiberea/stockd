import { Product } from "../../util/productsAndSafetyFeatures";

export interface FilterShopsProps {
  setRoute: (Route) => void;
}

export interface SelectorPanelProps {
  title: string;
  selected: { [p: string]: boolean };
  items: { [p: string]: Product };
  onSelect: (value: string) => void;
  onReset: () => void;
}

export type SafetyRating = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export interface SafetySliderProps {
  minRating: SafetyRating;
  setMinRating: (value: SafetyRating) => void;
}

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

export interface LocationSearchProps {
  enabled?: boolean;
  location: AutocompletePrediction | null;
  setLocation: (value: AutocompletePrediction | null) => void;
}
