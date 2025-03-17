import AddQuestionbutton from "./AddQuestionButton";
import Home from "./Home";
import SearchBar from "./SearchBar";

function NavBar() {
  return (
    <nav className="NavBar">
      <Home />
      <SearchBar />
      <AddQuestionbutton />
    </nav>
  );
}
export default NavBar;
