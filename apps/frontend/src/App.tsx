import "./App.css";
import { useState } from "react";
import { MyButton } from "./component/button";
import { Link } from "./component/link";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <p>{count}</p>
      <Link />
      <MyButton title="caca" />
      <button type="button" onClick={() => setCount(count + 1)}>
        +1
      </button>
    </>
  );
}

export default App;
