import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Services,
  Landing,
  Login,
  Register,
  Profile,
  Dashboard,
} from "./pages";
import NotFound from "./routes/NotFound";
import { AuthenticationContextProvider } from "./context/authentication/authentication.context";
import Protected from "./routes/Protected";
import { ReviewsContextProvider } from "./context/reviews/reviews.context";
import { UsersContextProvider } from "./context/users/users.context";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/services",
      element: (
        <Protected>
          <Services />
        </Protected>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Protected>
          <Dashboard />
        </Protected>
      ),
    },
    {
      path: "/user/:username",
      element: (
        <Protected>
          <Profile />
        </Protected>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <AuthenticationContextProvider>
        <UsersContextProvider>
          <ReviewsContextProvider>
            <RouterProvider router={router} />
          </ReviewsContextProvider>
        </UsersContextProvider>
      </AuthenticationContextProvider>
    </>
  );
}

export default App;
