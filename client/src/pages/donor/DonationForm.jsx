import {
  CheckCircle2,
  ImagePlus,
  LocateFixed,
  MapPin,
  UploadCloud,
} from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { getApiError } from "../../api/client";
import Button from "../../components/ui/Button";
import { donationService } from "../../services/donationService";

const emptyForm = {
  foodName: "",
  description: "",
  category: "Rice",
  foodType: "Veg",
  quantity: "",
  quantityUnit: "Plates",
  pickupAddress: "",
  pickupTime: "",
  expiryTime: "",
  latitude: "",
  longitude: "",
};

const categories = [
  "Rice",
  "Curry",
  "Bread",
  "Bakery",
  "Fruits",
  "Vegetables",
  "Beverages",
  "Snacks",
  "Other",
];

const units = [
  "Plates",
  "Kg",
  "Packets",
  "Boxes",
  "Liters",
];

function Field({
  label,
  hint,
  children,
  className = "",
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-semibold text-slate-700">
        {label}
      </span>

      {hint && (
        <span className="ml-2 text-xs font-normal text-slate-400">
          {hint}
        </span>
      )}

      <div className="mt-2">{children}</div>
    </label>
  );
}

const input =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100";

export default function DonationForm() {
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const fileInput = useRef(null);

  const update =
    (key) =>
    (event) =>
      setForm((current) => ({
        ...current,
        [key]: event.target.value,
      }));

  function useLocation() {
    if (!navigator.geolocation) {
      toast.error("Location is not supported in this browser.");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setForm((current) => ({
          ...current,
          latitude: coords.latitude.toFixed(6),
          longitude: coords.longitude.toFixed(6),
        }));

        toast.success("Current location added.");
        setIsLocating(false);
      },
      () => {
        toast.error(
          "We couldn't access your location. Enter coordinates manually."
        );
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.latitude || !form.longitude) {
      toast.error("Add a pickup location before publishing.");
      return;
    }

    setIsSubmitting(true);

    try {
      let images = [];

      if (image) {
        const upload = await donationService.uploadImage(image);
        images = [upload.imageUrl];
      }

      const payload = {
        ...form,
        quantity: Number(form.quantity),
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        pickupTime: new Date(form.pickupTime).toISOString(),
        expiryTime: new Date(form.expiryTime).toISOString(),
        images,
      };

      await donationService.create(payload);

      toast.success("Donation published successfully!");

      setForm(emptyForm);
      setImage(null);
    } catch (error) {
      toast.error(
        getApiError(
          error,
          "We couldn't publish this donation."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
  onSubmit={handleSubmit}
  className="grid gap-7 xl:grid-cols-[1.4fr_.75fr]"
>
  <div className="space-y-7">

    {/* Food Details */}
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
          <CheckCircle2 size={20} />
        </span>

        <div>
          <h2 className="text-lg font-semibold">
            Food Details
          </h2>

          <p className="text-sm text-slate-500">
            Provide accurate details about the food.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">

        <Field
          label="Food Name"
          className="sm:col-span-2"
        >
          <input
            required
            value={form.foodName}
            onChange={update("foodName")}
            className={input}
            placeholder="Fresh Veg Biryani"
          />
        </Field>

        <Field label="Category">
          <select
            value={form.category}
            onChange={update("category")}
            className={input}
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Food Type">
          <select
            value={form.foodType}
            onChange={update("foodType")}
            className={input}
          >
            <option value="Veg">
              Veg
            </option>

            <option value="Non-Veg">
              Non-Veg
            </option>

            <option value="Vegan">
              Vegan
            </option>
          </select>
        </Field>

        <Field label="Quantity">
          <input
            required
            min="1"
            type="number"
            value={form.quantity}
            onChange={update("quantity")}
            className={input}
            placeholder="25"
          />
        </Field>

        <Field label="Unit">
          <select
            value={form.quantityUnit}
            onChange={update("quantityUnit")}
            className={input}
          >
            {units.map((unit) => (
              <option
                key={unit}
                value={unit}
              >
                {unit}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Description"
          className="sm:col-span-2"
        >
          <textarea
            required
            minLength={5}
            maxLength={500}
            value={form.description}
            onChange={update("description")}
            className={`${input} min-h-32 resize-none`}
            placeholder="Mention ingredients, packaging, allergens, pickup instructions..."
          />
        </Field>

      </div>

    </section>

    {/* Collection Details */}

    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

      <div className="flex items-center gap-3">

        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
          <MapPin size={20}/>
        </span>

        <div>

          <h2 className="text-lg font-semibold">
            Collection Details
          </h2>

          <p className="text-sm text-slate-500">
            Help volunteers reach the pickup location.
          </p>

        </div>

      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">

        <Field label="Pickup Time">

          <input
            required
            type="datetime-local"
            value={form.pickupTime}
            onChange={update("pickupTime")}
            className={input}
          />

        </Field>

        <Field label="Expiry Time">

          <input
            required
            type="datetime-local"
            value={form.expiryTime}
            onChange={update("expiryTime")}
            className={input}
          />

        </Field>

        <Field
          label="Pickup Address"
          className="sm:col-span-2"
        >

          <input
            required
            value={form.pickupAddress}
            onChange={update("pickupAddress")}
            className={input}
            placeholder="Street, Area, City"
          />

        </Field>

                <div className="sm:col-span-2 rounded-2xl bg-slate-50 p-5">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h3 className="text-sm font-semibold text-slate-800">
                Pickup Coordinates
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                These help nearby NGOs and receivers locate your donation.
              </p>

            </div>

            <button
              type="button"
              onClick={useLocation}
              disabled={isLocating}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-slate-200 hover:bg-emerald-50 disabled:opacity-50"
            >
              <LocateFixed size={16} />

              {isLocating
                ? "Getting Location..."
                : "Use My Location"}
            </button>

          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <input
              required
              type="number"
              step="any"
              value={form.latitude}
              onChange={update("latitude")}
              className={input}
              placeholder="Latitude"
            />

            <input
              required
              type="number"
              step="any"
              value={form.longitude}
              onChange={update("longitude")}
              className={input}
              placeholder="Longitude"
            />

          </div>

        </div>

      </div>

    </section>

  </div>

  {/* Right Sidebar */}

  <aside className="space-y-6">

    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold">
        Upload Food Image
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        A clear image increases the chances of your donation being accepted.
      </p>

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) =>
          setImage(e.target.files?.[0] || null)
        }
      />

      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        className="mt-6 flex min-h-[180px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50 transition hover:bg-emerald-100"
      >

        {image ? (
          <>

            <ImagePlus
              size={34}
              className="text-emerald-700"
            />

            <p className="mt-4 font-semibold text-emerald-700">
              {image.name}
            </p>

            <p className="text-sm text-slate-500">
              Click to change image
            </p>

          </>
        ) : (
          <>

            <UploadCloud
              size={38}
              className="text-emerald-700"
            />

            <p className="mt-4 font-semibold text-slate-800">
              Upload Food Image
            </p>

            <p className="text-sm text-slate-500">
              JPG • PNG • WEBP
            </p>

          </>
        )}

      </button>

    </section>

    <section className="rounded-2xl bg-emerald-950 p-6 text-white">

      <h2 className="text-lg font-semibold">
        Before Publishing
      </h2>

      <ul className="mt-5 space-y-3 text-sm text-emerald-100">

        <li>
          • Make sure the food is safe to consume.
        </li>

        <li>
          • Mention allergens if applicable.
        </li>

        <li>
          • Ensure pickup timing is accurate.
        </li>

        <li>
          • Upload a clear image for faster approval.
        </li>

      </ul>

    </section>
        <Button
      type="submit"
      className="w-full"
      disabled={isSubmitting}
    >
      {isSubmitting
        ? "Publishing Donation..."
        : "Publish Donation"}
    </Button>

    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">

      <h3 className="text-sm font-semibold text-emerald-800">
        💚 Thank you for helping reduce food waste
      </h3>

      <p className="mt-2 text-sm leading-6 text-emerald-700">
        After publishing, nearby NGOs and receivers can immediately view
        your donation and send a pickup request.
      </p>

    </div>

  </aside>

</form>
);
}