import { ShipWheelIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const Login = () => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const { loginMutation, isPending, error } = useLogin();

    const handleLogin = (e) => {
        e.preventDefault();
        loginMutation(loginData);
    }

    return (
        <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme='forest'>
            <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
                {/* LOGIN FORM SECTION */}
                <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
                    {/* LOGO */}
                    <div className="mb-4 flex items-center justify-start gap-2">
                        <ShipWheelIcon className="size-9 text-primary" />
                        <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                            Streamify
                        </span>
                    </div>
                    {/* ERROR */}
                    {error && (
                        <div className="alert alert-error mb-4">
                            <span>{error.response.data.message}</span>
                        </div>
                    )}
                    {/* FORM */}
                    <div className="w-full">
                        <form onSubmit={handleLogin}>
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold">Welcom Back</h2>
                                    <p className="text-sm opacity-70">Sign in your account to continuey your journey</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="form-control w-full space-y-2">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" placeholder="example@gmail.com" name="email" className="input input-bordered focus:outline-none w-full" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                                    </div>
                                    <div className="form-control w-full space-y-2">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="password" placeholder="example@gmail.com" name="password" className="input input-bordered focus:outline-none w-full" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-full">
                                        {isPending ? (<>
                                            <span className="loading loading-spinner loading-xs"></span>
                                            Signing in...
                                        </>) : 'Sign In'}
                                    </button>
                                    <div className="text-center mt-4">
                                        <p className="text-sm">Don't have an account?{" "} <Link to='/signup' className="text-primary hover:underline">Create one</Link></p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* RIGHT SIDE IMAGE SECTION */}
                <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
                    <div className="max-w-md p-8">
                        {/* ILLUSTRATION */}
                        <div className="relative aspect-square max-w-sm mx-auto">
                            <img src="/i.png" alt="Language connection illustraion" className="w-full h-full" />
                        </div>
                        <div className="text-center space-y-3 mt-6">
                            <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
                            <p className="opacity-70">
                                Practice conversations, make friend, and improve your language skills together
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login