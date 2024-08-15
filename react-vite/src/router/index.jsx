import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import SplashPage from '../components/HomePage/SplashPage';
import Events from '../components/EventPage/Events';
import EventDetails from '../components/EventPage/EventDetails';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage/>,
      },
      {
        path: "/Events",
        element: <Events/>,
      },
      {
        path: "/event/:id",
        element: <EventDetails/>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);