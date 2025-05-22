import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import axios from "axios";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
<<<<<<< HEAD
    mobile: "", // Added mobile field
=======
    mobile: "",
>>>>>>> 6e9b1bce7573155a3ec3e298b57a1cb856a08902
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (formData.mobile && formData.mobile.length !== 10) return toast.error("Mobile number must be 10 digits");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post("/api/otp/send-otp", { email: formData.email });
      toast.success(response.data.message);
      setIsOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    setIsVerifyingOtp(true);
    try {
      const response = await axios.post("/api/otp/verify-otp", { email: formData.email, otp });
      toast.success(response.data.message);
      signup(formData); // Proceed with signup after OTP verification
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify OTP");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
<<<<<<< HEAD
    if (success === true) signup(formData);
=======
    if (success === true && !isOtpSent) {
      await handleSendOtp();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otp.trim()) return toast.error("OTP is required");
    handleVerifyOtp();
>>>>>>> 6e9b1bce7573155a3ec3e298b57a1cb856a08902
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
<<<<<<< HEAD
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
=======
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
>>>>>>> 6e9b1bce7573155a3ec3e298b57a1cb856a08902
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

<<<<<<< HEAD
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
=======
          {!isOtpSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
>>>>>>> 6e9b1bce7573155a3ec3e298b57a1cb856a08902
              </div>

<<<<<<< HEAD
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
=======
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
>>>>>>> 6e9b1bce7573155a3ec3e298b57a1cb856a08902
              </div>

<<<<<<< HEAD
            {/* Mobile Number Field (New) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Mobile Number</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="size-5 text-base-content/40" />
                </div>
                <input
                  type="tel"
                  className="input input-bordered w-full pl-10"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                    if (value.length <= 10) {
                      setFormData({ ...formData, mobile: value });
                    }
                  }}
                  maxLength={10}
                />
              </div>
              {formData.mobile.length !== 10 && formData.mobile.length > 0 && (
                <p className="mt-1 text-sm text-error">Please enter a valid 10-digit mobile number</p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
=======
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Mobile Number (Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="tel"
                    className="input input-bordered w-full pl-10"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.mobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setFormData({ ...formData, mobile: value });
                      }
                    }}
                    maxLength={10}
                  />
                </div>
                {formData.mobile.length !== 10 && formData.mobile.length > 0 && (
                  <p className="mt-1 text-sm text-error">Please enter a valid 10-digit mobile number</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-10"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <Eye className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSigningUp || (formData.mobile && formData.mobile.length !== 10)}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Enter OTP</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 6) {
                        setOtp(value);
                      }
                    }}
                    maxLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isVerifyingOtp || otp.length !== 6}
              >
                {isVerifyingOtp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>

              <div className="text-center">
>>>>>>> 6e9b1bce7573155a3ec3e298b57a1cb856a08902
                <button
                  type="button"
                  className="link link-primary"
                  onClick={handleSendOtp}
                  disabled={isSigningUp}
                >
                  Resend OTP
                </button>
              </div>
<<<<<<< HEAD
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp || (formData.mobile && formData.mobile.length !== 10)}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
=======
            </form>
          )}
>>>>>>> 6e9b1bce7573155a3ec3e298b57a1cb856a08902

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Right side */}
=======
>>>>>>> 6e9b1bce7573155a3ec3e298b57a1cb856a08902
      <AuthImagePattern
        title="Join Our Chatty"
        subtitle="Connect with friends and moments "
      />
    </div>
  );
};

export default SignUpPage;