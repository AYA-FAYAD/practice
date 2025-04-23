import { createRoot } from "react-dom/client";
import Pasta from "./Pasta";

const App = () => {
  return (
    <div>
      <h1>Ciao Ciao Restaurant</h1>
      <Pasta
        name="AGLIO EOLIO "
        description="Linguine, Garlic, Olive Oil, Red Pepper Flakes, Parsley, Grana Padano"
      />
      <Pasta
        name="ARRABBIATA "
        description="Penne, Garlic, Spicy Ciao Ciao Tomato Sauce"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
