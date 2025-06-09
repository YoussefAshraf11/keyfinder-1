import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../store/authSlice";
import { updateLoggedInUser } from "../../network/auth";
import Swal from "sweetalert2";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = false
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      required={required}
    />
  </div>
);

const MyProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match if new password is provided
    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "New passwords do not match",
        confirmButtonColor: "#002855",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const payload = {
        username: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      // Only include password fields if current password is provided
      if (formData.currentPassword) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
        payload.confirmNewPassword = formData.confirmNewPassword;
      }

      const response = await updateLoggedInUser(payload);
      
      if (response.data.success) {
        // Update Redux store with new user data
        dispatch(setCredentials({
          user: response.data.data.user,
          token: localStorage.getItem('token')
        }));

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

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
            
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <InputField
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
          
          <div className="pt-4 mt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h2>
            
            <div className="space-y-4">
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
                placeholder="Enter new password (leave blank to keep current)"
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
          </div>
          
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
