export interface FilterShopsProps {
  setRoute: (Route) => void;
}

type AutocompletePrediction = google.maps.places.AutocompletePrediction;

export interface LocationSearchProps {
  enabled?: boolean;
  location: AutocompletePrediction | null;
  setLocation: (value: AutocompletePrediction | null) => void;
}

export interface SelectorPanelProps {
  title: string;
  selected: { [p: string]: boolean };
  items: { [p: string]: Product };
  onSelect: (value: string) => void;
  onReset: () => void;
}
