import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RadioGroup } from '../ui/radio-group'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const { loading, authUser } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const sendOtpHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/send-otp", { email: input.email });
      if (res.data.success) {
        setOtpSent(true);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const verifyOtpHandler = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/verify-otp", { email: input.email, otp: input.otp });
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post("http://localhost:8000/api/v1/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (authUser?.role === 'recruiter') {
      navigate("/admin/companies");
    } else if (authUser?.role === 'student') {
      navigate("/");
    }
  }, [authUser, navigate]);

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-full max-w-md border border-gray-200 rounded-md p-6 my-10'>
          <h1 className='font-bold text-2xl mb-6 text-center'>Sign Up</h1>
          <div className='my-4'>
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div className='my-4'>
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="mt-1 w-full p-2 border rounded"
            />
            <Button type="button" onClick={sendOtpHandler} className='mt-2 w-full'>
              {otpSent ? "Resend OTP" : "Send OTP"}
            </Button>
          </div>
          {otpSent && (
            <div className='my-4'>
              <Label>Enter OTP</Label>
              <Input
                type="text"
                value={input.otp}
                name="otp"
                onChange={changeEventHandler}
                placeholder="Enter the OTP"
                className="mt-1 w-full p-2 border rounded"
              />
              <Button type="button" onClick={verifyOtpHandler} className='mt-2 w-full'>
                Verify OTP
              </Button>
            </div>
          )}
          <div className='my-4'>
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div className='my-4'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div className='my-4'>
            
          </div>
          <div className='my-4'>
            <Label>Profile Picture</Label>
            <div className="flex items-center mt-2">
              <input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {
            loading ? (
              <Button className='w-full my-4 flex items-center justify-center'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait
              </Button>
            ) : (
              <Button type='submit' className='w-full my-4'>Sign Up</Button>
            )
          }
          <span className='text-sm block text-center mt-4'>Already have an account? <Link to={"/login"} className='text-blue-500 cursor-pointer underline'>Login</Link></span>
        </form>
      </div>
    </>
  )
}

export default Signup
