import { ArrowRight, Check, UserRound, MailCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getApiError } from "../../api/client";
import Button from "../../components/ui/Button";
import { authService } from "../../services/authService";


const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  confirmPassword: "",
  role: "USER",
};


const roles = [
  ["USER", "Individual donor"],
  ["RESTAURANT", "Food business"],
  ["NGO", "Community organization"],
  ["VOLUNTEER", "Volunteer"],
];


export default function RegisterPage() {

  const [form, setForm] = useState(initialForm);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [emailVerified, setEmailVerified] = useState(false);

  const navigate = useNavigate();


  const update = (key) => (event) =>
    setForm((current) => ({
      ...current,
      [key]: event.target.value,
    }));


  const emailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);


  const passwordRules = {
    length: form.password.length >= 8,
    alphabet: /[A-Za-z]/.test(form.password),
    number: /\d/.test(form.password),
    special: /[@$!%*?&#]/.test(form.password),
  };


  const passwordScore =
    Object.values(passwordRules).filter(Boolean).length;


  const passwordStrength =
    passwordScore <= 1
      ? "Weak"
      : passwordScore <= 3
      ? "Medium"
      : "Strong";


  const strengthWidth = `${passwordScore * 25}%`;



  async function verifyEmail(){

  if(!emailValid){

    toast.error("Enter a valid email address");

    return;

  }

  setEmailVerified(true);

  toast.success("Email verified successfully");

}


  async function handleSubmit(event) {

    event.preventDefault();


    if (!/^[6-9]\d{9}$/.test(form.phone)) {

      toast.error(
        "Enter a valid 10 digit mobile number"
      );

      return;

    }


    if (!emailValid) {

      toast.error(
        "Enter a valid email address"
      );

      return;

    }


    if (passwordScore !== 4) {

      toast.error(
        "Password must contain alphabets, numbers and special characters"
      );

      return;

    }


    if (form.password !== form.confirmPassword) {

      toast.error(
        "Passwords do not match"
      );

      return;

    }


    setIsSubmitting(true);


    try {

      await authService.register(form);

      toast.success(
        "Account created. You can sign in now."
      );

      navigate("/login");


    } catch(error) {

      toast.error(
        getApiError(
          error,
          "We couldn't create your account."
        )
      );

    } finally {

      setIsSubmitting(false);

    }

  }



  return (

    <main className="min-h-screen bg-[#f7faf8] px-5 py-8 sm:px-8">

      <div className="mx-auto max-w-3xl">


        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xl font-semibold tracking-[-.045em]"
        >

          <span className="grid size-9 place-items-center rounded-xl bg-emerald-700 text-lg text-white">
            ✦
          </span>

          FoodShare

        </Link>



        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">


          <div className="flex items-start gap-4">

            <span className="grid size-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">

              <UserRound size={22}/>

            </span>


            <div>

              <p className="text-xs font-bold uppercase tracking-[.16em] text-emerald-700">
                Join the network
              </p>


              <h1 className="mt-2 text-3xl font-semibold tracking-[-.05em] text-slate-950">
                Create your FoodShare account.
              </h1>


              <p className="mt-2 text-slate-600">
                A few details now, then you can start making an impact.
              </p>

            </div>

          </div>



          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-5 sm:grid-cols-2"
          >


            <label className="text-sm font-semibold text-slate-700">

              Full name

              <input
                required
                value={form.fullName}
                onChange={update("fullName")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                placeholder="Your name"
              />

            </label>



            <label className="text-sm font-semibold text-slate-700">

              Phone

              <input
                required
                maxLength="10"
                value={form.phone}
                onChange={(e)=>{

                  const value =
                    e.target.value.replace(/\D/g,"");

                  setForm({
                    ...form,
                    phone:value
                  });

                }}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                placeholder="10 digit phone number"
              />

            </label>



            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">

              Email address


              <div className="mt-2 flex gap-3">


                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                  placeholder="you@example.com"
                />


                <button
                  type="button"
                  onClick={verifyEmail}
                  className="flex items-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800"
                >

                  {emailVerified
                    ?
                    <>
                    <MailCheck size={17}/>
                    Verified
                    </>
                    :
                    "Verify"
                  }

                </button>


              </div>


            </label>




            <label className="text-sm font-semibold text-slate-700">


              Password


              <input
                required
                type="password"
                value={form.password}
                onChange={update("password")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                placeholder="Create strong password"
              />



              <div className="mt-3 h-2 rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-emerald-600 transition-all"
                  style={{
                    width:strengthWidth
                  }}
                />

              </div>


              <p className="mt-2 text-xs text-slate-600">

                Password strength:
                <span className="ml-1 font-bold text-emerald-700">
                  {passwordStrength}
                </span>

              </p>


              <div className="mt-3 space-y-1 text-xs">


                {Object.entries(passwordRules).map(
                  ([key,value])=>(
                    <p
                      key={key}
                      className={
                        value
                        ?
                        "text-emerald-600"
                        :
                        "text-slate-400"
                      }
                    >

                    {value ? "✓" : "○"} {key}

                    </p>
                  )
                )}


              </div>


            </label>




            <label className="text-sm font-semibold text-slate-700">

              Confirm Password

              <input
                required
                type="password"
                value={form.confirmPassword}
                onChange={update("confirmPassword")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              />

            </label>




            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">

              Address

              <input
                required
                value={form.address}
                onChange={update("address")}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                placeholder="Your pickup address"
              />

            </label>




            <fieldset className="sm:col-span-2">

              <legend className="text-sm font-semibold text-slate-700">
                I’m joining as
              </legend>


              <div className="mt-2 grid gap-2 sm:grid-cols-2">


              {roles.map(([value,label])=>(

                <label
                key={value}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                  form.role===value
                  ?
                  "border-emerald-600 bg-emerald-50"
                  :
                  "border-slate-200 hover:border-emerald-200"
                }`}
                >

                <input
                className="sr-only"
                type="radio"
                value={value}
                checked={form.role===value}
                onChange={update("role")}
                />


                <span className="text-sm font-medium text-slate-700">
                  {label}
                </span>


                </label>

              ))}


              </div>

            </fieldset>




            <div className="sm:col-span-2">

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >

              {isSubmitting
              ?
              "Creating account..."
              :
              <>
              Create account
              <ArrowRight size={17}/>
              </>
              }

              </Button>

            </div>



          </form>



          <p className="mt-6 text-center text-sm text-slate-600">

            Already have an account?

            <Link
              className="ml-1 font-bold text-emerald-700"
              to="/login"
            >
              Sign in
            </Link>

          </p>


        </div>


      </div>

    </main>

  );

}