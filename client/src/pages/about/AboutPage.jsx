import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Container from "../../components/layout/Container";
import founderImage from "../../assets/images/founder.jpg";
import {
  Mail,
  Target,
  Eye,
  HeartHandshake,
  Leaf,
  UtensilsCrossed,
  Users,
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50 pt-28">

        {/* ================= HERO ================= */}

        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-24">

          <Container>

            <div className="mx-auto max-w-4xl text-center">

              <span className="inline-flex rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">
                About FoodShare
              </span>

              <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
                Connecting Food,
                <br />
                Creating Hope.
              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600">
                FoodShare is a technology-driven platform dedicated to reducing
                food waste and eliminating hunger by connecting food donors,
                NGOs, volunteers and communities through one seamless digital
                ecosystem.
              </p>

              <div className="mt-12 grid gap-6 md:grid-cols-4">

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h2 className="text-4xl font-bold text-emerald-700">1000+</h2>
                  <p className="mt-2 text-slate-600">Meals Shared</p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h2 className="text-4xl font-bold text-emerald-700">150+</h2>
                  <p className="mt-2 text-slate-600">NGOs Connected</p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h2 className="text-4xl font-bold text-emerald-700">500+</h2>
                  <p className="mt-2 text-slate-600">Volunteers</p>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <h2 className="text-4xl font-bold text-emerald-700">0%</h2>
                  <p className="mt-2 text-slate-600">Food Waste Goal</p>
                </div>

              </div>

            </div>

          </Container>

        </section>

        {/* ================= MISSION & VISION ================= */}

        <section className="py-20">

          <Container>

            <div className="mb-14 text-center">

              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">
                Our Purpose
              </span>

              <h2 className="mt-4 text-4xl font-bold text-slate-900">
                Mission & Vision
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
                Every feature in FoodShare is designed to create a positive
                social impact by reducing food waste while ensuring surplus food
                reaches those who need it most.
              </p>

            </div>

            <div className="grid gap-8 lg:grid-cols-2">

              {/* Mission */}

              <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                <div className="mb-6 inline-flex rounded-2xl bg-emerald-100 p-4">
                  <Target className="text-emerald-700" size={32} />
                </div>

                <h3 className="text-3xl font-bold text-slate-900">
                  Our Mission
                </h3>

                <p className="mt-6 text-lg leading-9 text-slate-600">
                  To build a sustainable ecosystem where restaurants, hotels,
                  caterers, individuals and organizations can donate surplus
                  food effortlessly, enabling NGOs and volunteers to distribute
                  it efficiently to communities in need while minimizing food
                  waste.
                </p>

              </div>

              {/* Vision */}

              <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                <div className="mb-6 inline-flex rounded-2xl bg-emerald-100 p-4">
                  <Eye className="text-emerald-700" size={32} />
                </div>

                <h3 className="text-3xl font-bold text-slate-900">
                  Our Vision
                </h3>

                <p className="mt-6 text-lg leading-9 text-slate-600">
                  We envision a future where no edible food is wasted and no
                  individual suffers from hunger. Through innovation,
                  collaboration and community participation, FoodShare aims to
                  become the bridge between generosity and hope.
                </p>

              </div>

            </div>

          </Container>

        </section>

        {/* ===== Founder Section Starts Here in Part 2 ===== */}
                {/* ================= FOUNDER ================= */}

        <section className="pb-24">

          <Container>

            <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-sm">

              <div className="grid gap-14 p-10 lg:grid-cols-[340px_1fr] lg:p-16">

                {/* Founder Image */}

                <div className="flex flex-col items-center justify-center">

                  <div className="relative">

                    {/* Emerald Glow */}

                    <div className="absolute inset-0 scale-110 rounded-full bg-emerald-400/30 blur-3xl"></div>

                    {/* Founder Photo */}

                    <img
                      src={founderImage}
                      alt="Vivika Suresh"
                      className="relative h-64 w-64 rounded-full border-4 border-white object-cover shadow-2xl ring-4 ring-emerald-200"
                    />

                  </div>

                  <span className="mt-8 rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">
                    Founder & CEO
                  </span>

                </div>

                {/* Founder Details */}

                <div>

                  <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">
                    Meet Our Founder
                  </span>

                  <h2 className="mt-5 text-5xl font-bold tracking-tight text-slate-900">
                    Vivika Suresh
                  </h2>

                  <p className="mt-3 text-xl font-medium text-emerald-700">
                    Founder & CEO, FoodShare
                  </p>

                  <p className="mt-8 text-lg leading-9 text-slate-600">
                    Vivika Suresh founded FoodShare with a simple but powerful
                    belief that every meal deserves a purpose. Witnessing the
                    contrast between food being discarded and families facing
                    hunger inspired her to create a technology platform that
                    bridges generosity with those who need it most.
                  </p>

                  <p className="mt-6 text-lg leading-9 text-slate-600">
                    Under her leadership, FoodShare connects restaurants,
                    hotels, caterers, households, NGOs and volunteers through a
                    seamless digital platform that enables safe and efficient
                    food redistribution. Her vision combines compassion,
                    innovation and sustainability to create lasting social
                    impact.
                  </p>

                  {/* Quote */}

                  <div className="mt-10 rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-8">

                    <p className="text-xl italic leading-9 text-emerald-900">
                      “Every meal shared is a step toward a world where
                      compassion overcomes hunger and no food is wasted.”
                    </p>

                    <p className="mt-5 font-semibold text-emerald-700">
                      — Vivika Suresh
                    </p>

                  </div>

                  {/* Founder Info */}

                  <div className="mt-10 grid gap-5 md:grid-cols-2">

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                      <div className="mb-3 inline-flex rounded-xl bg-emerald-100 p-3">
                        <Mail className="text-emerald-700" size={22} />
                      </div>

                      <p className="text-sm text-slate-500">
                        Email
                      </p>

                      <a
                        href="mailto:vivika@foodshare.in"
                        className="mt-2 block font-semibold text-emerald-700 hover:underline"
                      >
                        vivika@foodshare.in
                      </a>

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                      <div className="mb-3 inline-flex rounded-xl bg-emerald-100 p-3">
                        <HeartHandshake
                          className="text-emerald-700"
                          size={22}
                        />
                      </div>

                      <p className="text-sm text-slate-500">
                        Leadership
                      </p>

                      <p className="mt-2 font-semibold text-slate-900">
                        Founder & Chief Executive Officer
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </Container>

        </section>

        {/* ===== Why FoodShare Starts in Part 3 ===== */}

                {/* ================= WHY FOODSHARE ================= */}

        <section className="bg-white py-24">

          <Container>

            <div className="text-center">

              <span className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">
                Why FoodShare
              </span>

              <h2 className="mt-5 text-4xl font-bold text-slate-900">
                Technology With A Purpose
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                FoodShare combines technology, compassion and community
                collaboration to create a sustainable solution for food waste
                and hunger.
              </p>

            </div>


            <div className="mt-16 grid gap-8 md:grid-cols-3">


              {/* Card 1 */}

              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-2 hover:shadow-xl">

                <div className="mb-6 inline-flex rounded-2xl bg-emerald-100 p-4">

                  <UtensilsCrossed
                    size={32}
                    className="text-emerald-700"
                  />

                </div>


                <h3 className="text-2xl font-bold text-slate-900">
                  Reduce Food Waste
                </h3>


                <p className="mt-4 leading-8 text-slate-600">
                  Helping individuals, restaurants and organizations donate
                  surplus food instead of throwing it away.
                </p>


              </div>


              {/* Card 2 */}

              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-2 hover:shadow-xl">


                <div className="mb-6 inline-flex rounded-2xl bg-emerald-100 p-4">

                  <Users
                    size={32}
                    className="text-emerald-700"
                  />

                </div>


                <h3 className="text-2xl font-bold text-slate-900">
                  Connect Communities
                </h3>


                <p className="mt-4 leading-8 text-slate-600">
                  Bringing donors, NGOs and volunteers together through one
                  connected platform.
                </p>


              </div>



              {/* Card 3 */}

              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-2 hover:shadow-xl">


                <div className="mb-6 inline-flex rounded-2xl bg-emerald-100 p-4">

                  <Leaf
                    size={32}
                    className="text-emerald-700"
                  />

                </div>


                <h3 className="text-2xl font-bold text-slate-900">
                  Sustainable Future
                </h3>


                <p className="mt-4 leading-8 text-slate-600">
                  Creating a greener future by reducing food waste and
                  encouraging responsible consumption.
                </p>


              </div>


            </div>


          </Container>

        </section>




        {/* ================= IMPACT ================= */}


        <section className="py-24">


          <Container>


            <div className="rounded-[40px] bg-emerald-700 px-8 py-16 text-center text-white md:px-16">


              <h2 className="text-4xl font-bold">
                Our Impact Goal
              </h2>


              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-emerald-50">

                Together with donors, NGOs and volunteers, FoodShare aims to
                create a world where every meal reaches someone who needs it.

              </p>



              <div className="mt-12 grid gap-8 md:grid-cols-3">


                <div>

                  <h3 className="text-5xl font-bold">
                    10K+
                  </h3>

                  <p className="mt-2 text-emerald-100">
                    Meals Distributed
                  </p>

                </div>



                <div>

                  <h3 className="text-5xl font-bold">
                    500+
                  </h3>

                  <p className="mt-2 text-emerald-100">
                    Active Volunteers
                  </p>

                </div>



                <div>

                  <h3 className="text-5xl font-bold">
                    200+
                  </h3>

                  <p className="mt-2 text-emerald-100">
                    Partner Organizations
                  </p>

                </div>


              </div>


            </div>


          </Container>


        </section>




        {/* ================= CONTACT FOUNDER ================= */}


        <section className="pb-24">


          <Container>


            <div className="rounded-[36px] border border-slate-200 bg-white p-10 text-center shadow-sm md:p-16">


              <h2 className="text-4xl font-bold text-slate-900">

                Connect With FoodShare

              </h2>


              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">

                Have questions, ideas or want to support our mission?
                We would love to hear from you.

              </p>



              <a
                href="mailto:vivika@foodshare.in"
                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-emerald-700 px-8 py-4 font-semibold text-white transition hover:bg-emerald-800"
              >

                <Mail size={20} />

                Contact Founder

              </a>


            </div>


          </Container>


        </section>


      </main>


      <Footer />


    </>
  );
}