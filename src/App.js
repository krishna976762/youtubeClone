import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Head from "./components/Head";
import store from "./redux/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";

const appRouter = (
  <Router>
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/" element={<MainContainer />} />
        <Route path="/watch" element={<WatchPage />} />
      </Route>
    </Routes>
  </Router>
);

function App() {
  return (
    <Provider store={store}>
      <div>
        <Head />
        {appRouter}
      </div>
    </Provider>
  );
}

export default App;
