import React, { useState } from "react";
import "./Apply.css";
import { submitApplication } from "../services/applicationService";


function Apply() {
  const [type, setType] = useState("passport");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState("");


  const [form, setForm] = useState({
    name: "",
    familyName: "",
    dateOfBirth: "",
    country: "",
    lga: "",
    city: "",
    phone: "",
    sex: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Build clean payload for backend
      const data = {
        name: form.name,
        familyName: form.familyName,
        dateOfBirth: form.dateOfBirth,
        country: form.country,
        lga: form.lga,
        city: form.city,
        phone: form.phone,
        sex: form.sex,
        email: form.email,

        // include any extra fields you collected
        nationality: form.nationality,
        motherName: form.motherName,
        pollingUnit: form.pollingUnit,
      };

      const res = await submitApplication(type, data);

      // res.application.tracking exists (based on your backend response)
      setTracking(res.application.tracking);
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="applySuccess container">
        <div className="successCard card">
          <h2>✅ Application Submitted Successfully</h2>
          <p>
            Your <strong>{type.toUpperCase()}</strong> application has been
            received. You will receive a tracking number via email shortly.
          </p>
          <p><strong>Tracking Number:</strong> {tracking}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="applyPage">
      <div className="container">
        <div className="applyHeader">
          <h1>Apply for a Government Document</h1>
          <p>
            Select the document type below and fill in all required fields accurately.
          </p>
        </div>

        <form className="applyForm card" onSubmit={handleSubmit}>
          {/* Document type selector */}
          <div className="formGroup">
            <label htmlFor="type" className="label">Document Type</label>
            <select
              id="type"
              name="type"
              className="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="passport">Passport</option>
              <option value="nin">National ID (NIN)</option>
              <option value="voter">Voter’s Card</option>
            </select>
          </div>

          {/* Common fields */}
          <div className="formGrid">
            <div className="formGroup">
              <label className="label">First Name</label>
              <input
                name="name"
                className="input"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="formGroup">
              <label className="label">Family Name</label>
              <input
                name="familyName"
                className="input"
                value={form.familyName}
                onChange={handleChange}
                placeholder="Enter family name"
                required
              />
            </div>
          </div>

          <div className="formGrid">
            <div className="formGroup">
              <label className="label">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                className="input"
                value={form.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label className="label">Sex</label>
              <select
                name="sex"
                className="select"
                value={form.sex}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="formGrid">
            <div className="formGroup">
              <label className="label">Country</label>
              <input
                name="country"
                className="input"
                value={form.country}
                onChange={handleChange}
                placeholder="Enter country"
                required
              />
            </div>

            <div className="formGroup">
              <label className="label">City</label>
              <input
                name="city"
                className="input"
                value={form.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
              />
            </div>
          </div>

          <div className="formGrid">
            <div className="formGroup">
              <label className="label">LGA (Local Government Area)</label>
              <input
                name="lga"
                className="input"
                value={form.lga}
                onChange={handleChange}
                placeholder="Enter LGA"
                required
              />
            </div>

            <div className="formGroup">
              <label className="label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="input"
                value={form.phone}
                onChange={handleChange}
                placeholder="+234..."
                required
              />
            </div>
          </div>

          <div className="formGroup">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
          </div>

          {/* Dynamic section based on document type */}
          {type === "passport" && (
            <div className="extraSection">
              <h3>Passport Details</h3>
              <p className="helper">Provide your nationality and intended use.</p>
              <div className="formGroup">
                <label className="label">Nationality</label>
                <input
                  name="nationality"
                  className="input"
                  onChange={handleChange}
                  placeholder="e.g. Nigerian"
                />
              </div>
            </div>
          )}

          {type === "nin" && (
            <div className="extraSection">
              <h3>National ID (NIN) Details</h3>
              <p className="helper">Enter your parent or guardian’s details.</p>
              <div className="formGroup">
                <label className="label">Mother’s Maiden Name</label>
                <input
                  name="motherName"
                  className="input"
                  onChange={handleChange}
                  placeholder="Enter mother's maiden name"
                />
              </div>
            </div>
          )}

          {type === "voter" && (
            <div className="extraSection">
              <h3>Voter’s Card Details</h3>
              <p className="helper">Enter your polling unit and registration area.</p>
              <div className="formGroup">
                <label className="label">Polling Unit</label>
                <input
                  name="pollingUnit"
                  className="input"
                  onChange={handleChange}
                  placeholder="Enter polling unit"
                />
              </div>
            </div>
          )}

          {error && <div className="errorBox">{error}</div>}

          <div className="formActions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Apply;
