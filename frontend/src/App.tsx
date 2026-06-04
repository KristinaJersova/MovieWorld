import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/layout/Layout";

import { FeedPage } from "./pages/FeedPage";
import { MoviePage } from "./pages/MoviePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminPage } from "./pages/AdminPage";
import { WatchlistPage } from "./pages/WatchlistPage";

import { ProtectedRoute } from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <FeedPage />
            </Layout>
          }
        />

        <Route
          path="/movies/:id"
          element={
            <Layout>
              <MoviePage />
            </Layout>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Layout>
                <WatchlistPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}