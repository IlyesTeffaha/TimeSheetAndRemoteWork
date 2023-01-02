import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes,Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./Components/Navbar";
const Team = React.lazy(() => import("./Components/Team"));
const Chat =  React.lazy(()=> import("./Components/Chat"));
function App() {
  return (
    <>
      <Header></Header>
      <AppFrame className="App">
        <BrowserRouter>
          <Suspense fallback={<p>...Loading page please wait</p>}>
            <Switch>
              <Route path="/apps/team/teamMan" element={<Team />} exact></Route>
              <Route path="/chat" element={<Chat />} exact></Route>
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AppFrame>
    </>
  );
}

const AppFrame = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export default App;
