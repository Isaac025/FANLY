import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BookCelebrity from "./pages/BookCelebrity";
import Booking from "./pages/Booking";
import VipMembership from "./pages/VipMembership";
import Donation from "./pages/Donation";
import CryptoPayment from "./pages/CryptoPayment";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminCelebrities from "./admin/AdminCelebrities";
import AdminBookings from "./admin/AdminBookings";
import AdminDonations from "./admin/AdminDonations";
import AdminVipMemberships from "./admin/AdminVipMemberships";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/book-celebrity" element={<BookCelebrity />} />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vip-membership"
            element={
              <ProtectedRoute>
                <VipMembership />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donation"
            element={
              <ProtectedRoute>
                <Donation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="celebrities" element={<AdminCelebrities />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="donations" element={<AdminDonations />} />
            <Route path="vip-memberships" element={<AdminVipMemberships />} />
          </Route>
          <Route path="/payment" element={<CryptoPayment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
