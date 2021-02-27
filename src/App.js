import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import HomeAdmin from './pages/HomeAdmin';
import Content from './pages/Content';
import Add from './pages/Add';
import Edit from './pages/Edit';
import Delete from './pages/Delete';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin/:content/delete/:id" component={Delete}/>
        <Route path="/admin/:content/edit/:id" component={Edit} />
        <Route path="/admin/:content/add" component={Add} />
        <Route path="/admin/:content" component={Content} />
        <Route path="/admin" component={HomeAdmin} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn}/>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
