import React, { useState } from "react";
import { Heart, Mail, Lock, User, ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router";

const Signup: React.FC = () => {
  const Navigate = useNavigate()
  const[username , setusername ] = useState("");
  const[firsname , setfirstname ] = useState("");
  const[lastname , setlastaname ] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signup:", username , firsname , lastname ,  formData.email , formData.password , formData.confirmPassword);
    try{
      const Response = await fetch(`${BACKEND_URL}/api/v1/user/signup`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json" 
        },
        body : JSON.stringify({
          email : formData.email,
          password : formData.password ,
          username :  username,
          firstname : firsname,
          lastname : lastname,
        })
      }) 
      if(Response.ok){
        alert("Sign Up Succsessfully");
        Navigate("/login")
      }else{
        alert("Error While Signing Up")
      }
    }catch(e){
      console.log(e);
      alert("Error Internal Server Error")
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Heart className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-primary hover:text-primary-dark"
          >
            Sign in
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                User name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={username}
                  onChange={(e)=> setusername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your user name"
                />
              </div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="firstname"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={firsname}
                  onChange={(e)=> setfirstname(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your first name"
                />
              </div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="lastname"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={lastname}
                  onChange={(e)=> setlastaname(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-primary hover:text-primary-dark"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-primary hover:text-primary-dark"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              Create account
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" fullWidth>
                <img
                  className="h-5 w-5"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                />
                <span className="ml-2">Google</span>
              </Button>
              <Button variant="outline" fullWidth>
                <img
                  className="h-7 w-7"
                  src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
                  alt="GitHub logo"
                />
                <span className="ml-2">GitHub</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
