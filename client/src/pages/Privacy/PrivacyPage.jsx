import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Container from "../../components/layout/Container";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50 pt-32">

        <Container>

          <section className="rounded-[32px] bg-white p-10 shadow-sm md:p-16">

            <h1 className="text-5xl font-bold text-slate-900">
              Privacy Policy
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              At FoodShare, we respect your privacy and are committed to
              protecting your personal information.
            </p>


            <h2 className="mt-10 text-2xl font-bold">
              Information We Collect
            </h2>

            <p className="mt-4 text-slate-600 leading-8">
              We collect information required to provide our services,
              including account details, donation information, contact
              information and platform activity.
            </p>


            <h2 className="mt-10 text-2xl font-bold">
              How We Use Information
            </h2>

            <p className="mt-4 text-slate-600 leading-8">
              Your information helps us connect donors, NGOs and volunteers,
              improve our platform and provide a safer food-sharing experience.
            </p>


            <h2 className="mt-10 text-2xl font-bold">
              Data Security
            </h2>

            <p className="mt-4 text-slate-600 leading-8">
              We implement appropriate security practices to protect user data
              and maintain platform reliability.
            </p>


            <h2 className="mt-10 text-2xl font-bold">
              Contact
            </h2>

            <p className="mt-4 text-slate-600">
              Email: vivika@foodshare.in
            </p>


          </section>

        </Container>

      </main>

      <Footer />

    </>
  );
}