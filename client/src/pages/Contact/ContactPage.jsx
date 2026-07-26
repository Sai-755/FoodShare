import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Container from "../../components/layout/Container";
import { Mail } from "lucide-react";

export default function ContactPage(){

return (

<>
<Navbar/>

<main className="bg-slate-50 pt-32">

<Container>

<section className="rounded-[32px] bg-white p-10 text-center shadow-sm md:p-16">


<h1 className="text-5xl font-bold text-slate-900">
Contact FoodShare
</h1>


<p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
Have questions, suggestions or want to support our mission?
We would love to connect with you.
</p>


<div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-emerald-50 px-6 py-4 text-emerald-700">

<Mail/>

<a href="mailto:vivika@foodshare.in">
vivika@foodshare.in
</a>

</div>


</section>

</Container>

</main>


<Footer/>

</>

);

}