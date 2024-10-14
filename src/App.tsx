import PrivateLayout from "./layouts/private-layout";
import PublicLayout from "./layouts/public-layout";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import AdminBookingsPage from "./pages/private/admin/bookings";
import EventsPage from "./pages/private/admin/events";
import CreateEventPage from "./pages/private/admin/events/create";
import EditEventPage from "./pages/private/admin/events/edit";
import AdminReports from "./pages/private/admin/reports";
import UsersPage from "./pages/private/admin/users";
import EventInfoPage from "./pages/private/event";
import Homepage from "./pages/private/home";
import ProfilePage from "./pages/private/profile";
import UserBookingPage from "./pages/private/profile/bookings";
import UserReports from "./pages/private/profile/reports/page";

import ThemeProvider from "./theme/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          />
          <Route
            path="/register"
            element={
              <PublicLayout>
                <RegisterPage />
              </PublicLayout>
            }
          />
          <Route
            path="/"
            element={
              <PrivateLayout>
                <Homepage />
              </PrivateLayout>
            }
          />
          <Route
            path="/event/:id"
            element={
              <PrivateLayout>
                <EventInfoPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateLayout>
                <ProfilePage />
              </PrivateLayout>
            }
          />   
          <Route
            path="/profile/bookings"
            element={
              <PrivateLayout>
                <UserBookingPage/>
              </PrivateLayout>
            }
          /> 
          <Route
            path="/profile/reports"
            element={
              <PrivateLayout>
                <UserReports/>
              </PrivateLayout>
            }
          /> 
          <Route
            path="/admin/events"
            element={
              <PrivateLayout>
                <EventsPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/events/create"
            element={
              <PrivateLayout>
                <CreateEventPage/>
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/events/edit/:id"
            element={
              <PrivateLayout>
                <EditEventPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <PrivateLayout>
                <AdminBookingsPage />
              </PrivateLayout>
            }
          />
           <Route
            path="/admin/users"
            element={
              <PrivateLayout>
                <UsersPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <PrivateLayout>
                <AdminReports />
              </PrivateLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
