import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Container from "../../components/layout/Container";

export default function TermsPage() {

  return (

    <>
      <Navbar />

      <main className="bg-slate-50 pt-32">

        <Container>

          <section className="rounded-[32px] bg-white p-10 shadow-sm md:p-16">


            <h1 className="text-5xl font-bold text-slate-900">
              Terms & Conditions
            </h1>


            <p className="mt-6 text-lg leading-8 text-slate-600">
              Welcome to FoodShare. By using our platform, you agree to
              follow these terms and conditions.
            </p>


            <h2 className="mt-10 text-2xl font-bold">
              Food Donations
            </h2>


            <p className="mt-4 text-slate-600 leading-8">
              Donors must provide accurate information regarding food quality,
              quantity and availability.
            </p>


            <h2 className="mt-10 text-2xl font-bold">
              User Responsibility
            </h2>


            <p className="mt-4 text-slate-600 leading-8">
              Users are responsible for maintaining accurate account details
              and using FoodShare responsibly.
            </p>


            <h2 className="mt-10 text-2xl font-bold">
              Platform Usage
            </h2>


            <p className="mt-4 text-slate-600 leading-8">
              FoodShare reserves the right to improve, update or modify
              platform services.
            </p>


          </section>

        </Container>

      </main>


      <Footer />

    </>

  );
}