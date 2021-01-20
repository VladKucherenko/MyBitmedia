import './App.scss';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import MainPage from './components/main_page/Main_page';
import UsersList from './components/users_list/Users_List';
import { compose } from 'redux';
import UserStatistic from './components/user_statistic/User_Statistic';

const App = () => {

  return (
    <div>
      <Switch>
        <Route exact path='/' render={() => <MainPage />} />
        <Route path='/users-list' render={() => <UsersList />} />
        <Route path='/user/:id' render={() => <UserStatistic />} />
      </Switch>


    </div>
  );
}

export default App;
