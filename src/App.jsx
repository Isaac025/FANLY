import "./App.css";
import { Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
import UserBookings from "./pages/UserBookings";
import UserDonations from "./pages/UserDonations";
import UserVipMemberships from "./pages/UserVipMemberships";
import Profile from "./pages/Profile";
import AdminLogin from "./admin/AdminLogin";
import PaymentConfirmation from "./pages/PaymentConfirmation";
// import AdminChats from "./admin/AdminChats";
// import AdminChatDetails from "./admin/AdminChatDetails";
import BackToTop from "./components/BackToTop";
import ScrollToTop from "./components/ScrollToTop";
import Smartsupp from "./components/Smartsupp";

function App() {
  const location = useLocation();

  // Check if current path starts with /admin
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <div className="App">
      <ScrollToTop />
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
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <UserBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-donations"
          element={
            <ProtectedRoute>
              <UserDonations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-vip-memberships"
          element={
            <ProtectedRoute>
              <UserVipMemberships />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
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
          path="/payment-confirmation"
          element={
            <ProtectedRoute>
              <PaymentConfirmation />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />

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
          {/* <Route path="chats" element={<AdminChats />} /> */}
          {/* <Route path="chats/:id" element={<AdminChatDetails />} /> */}
        </Route>
        <Route path="/payment" element={<CryptoPayment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminPage && <Smartsupp />}
      <BackToTop />
    </div>
  );
}

export default App;
