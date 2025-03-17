import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../pages/AppLayout";
import HomePage from "../pages/HomePage";
import QuestionsPage from "../pages/QuestionsPage";
import ClickedQuestionsPage from "../pages/ClickedQuestionsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Navigerar till /app i url, startar i app. Children i route så att app inte stryks utan det blir /app/blabla */}

        <Route index element={<Navigate to="app" />}></Route>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="question" element={<QuestionsPage />} />
          <Route path="question/:id" element={<ClickedQuestionsPage />} />
          {/* När du trycker på en fråga navigeras du till exakt den med ett id 
          <Route path="question/:id" element={<ClickedQuestionsPage />} />" */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
