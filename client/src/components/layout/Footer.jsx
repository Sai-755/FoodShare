import { Link } from "react-router-dom";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12 text-slate-400">

      <Container>

        <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-start">


          {/* Brand */}

          <div>

            <Link
              to="/"
              className="text-xl font-semibold text-white"
            >
              FoodShare
            </Link>

            <p className="mt-2 max-w-xs text-sm leading-6">
              Good food belongs on plates.
              Together, we reduce food waste and help communities in need.
            </p>

          </div>



          {/* Footer Links */}

          <div className="grid grid-cols-2 gap-12 text-sm">


            {/* Company */}

            <div>

              <h3 className="mb-4 font-semibold text-white">
                Company
              </h3>


              <div className="flex flex-col gap-3">

                <Link
                  to="/about"
                  className="transition hover:text-white"
                >
                  About Us
                </Link>


                <Link
                  to="/contact"
                  className="transition hover:text-white"
                >
                  Contact
                </Link>


              </div>

            </div>



            {/* Legal */}

            <div>

              <h3 className="mb-4 font-semibold text-white">
                Legal
              </h3>


              <div className="flex flex-col gap-3">


                <Link
                  to="/privacy"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </Link>


                <Link
                  to="/terms"
                  className="transition hover:text-white"
                >
                  Terms & Conditions
                </Link>


              </div>

            </div>


          </div>


        </div>



        {/* Bottom */}

        <div className="mt-10 border-t border-white/10 pt-6">

          <p className="text-xs">
            © 2026 FoodShare. All rights reserved.
          </p>

        </div>


      </Container>

    </footer>
  );
}