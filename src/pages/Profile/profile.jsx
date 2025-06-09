import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice";
import { updateLoggedInUser } from "../../network/auth";
import Swal from "sweetalert2";

// Images
import bgCover from "../../assets/Profile/cover.svg";

// Form Input Component
const InputField = ({ 
  label, 
  type = "text", 
  value, 
  name,
  onChange,
  placeholder = "" 
}) => (
  <div className="mb-4">
    <label className="block text-white text-sm font-medium mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-white/90 text-[#002349] rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (authUser) {
      setFormData({
        username: authUser.username || "",
        email: authUser.email || "",
        phone: authUser.phone || "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      });
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log form data before submission
    console.log("Form data before submission:", formData);
    
    setIsSubmitting(true);
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone
      };

      // Only include password fields if any password field is filled
      if (formData.currentPassword || formData.newPassword || formData.confirmNewPassword) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
        payload.confirmNewPassword = formData.confirmNewPassword;
      }


      const response = await updateLoggedInUser(payload);


      // Only update the UI if the update was successful
      if (response.data.success) {
        // Update Redux store with new user data
        dispatch(setCredentials({
          user: response.data.data.user,
          token: localStorage.getItem('token')
        }));

        // Show success message
        await Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Profile updated successfully",
          confirmButtonColor: "#002855",
        });

        // Reset password fields after successful update
        setFormData(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        }));
      }
    } catch (error) {
      // Only show error message, don't modify any state
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update profile. Please try again.",
        confirmButtonColor: "#002855",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#002349] text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      <div className="w-full max-w-md bg-[#002349] rounded-xl p-8 shadow-xl">
        <h2 className="text-white text-2xl font-bold text-center mb-6">
          Edit Profile
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
          />
          
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          
          <InputField
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
          
          <div className="pt-2 border-t border-white/20 mt-6">
            <h3 className="text-white font-medium mb-4">Change Password</h3>
            
            <InputField
              label="Current Password"
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              placeholder="Enter current password"
            />
            
            <InputField
              label="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder="Enter new password"
            />
            
            <InputField
              label="Confirm New Password"
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
              placeholder="Confirm new password"
            />
          </div>
          
          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-[#002349] font-medium py-2 px-4 rounded hover:bg-gray-100 transition disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-white font-medium py-2 px-4 rounded hover:bg-white/10 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
