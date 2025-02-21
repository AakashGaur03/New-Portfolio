/* eslint-disable no-unused-vars */
import { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import Heads from "./Heads";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		description: "",
	});

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState("");

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: "" });
	};

	const validateForm = () => {
		let newErrors = {};
		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.email.trim()) newErrors.email = "Email is required";
		else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSuccess("");

		if (!validateForm()) return;

		setLoading(true);

		try {
			const formData = new FormData(e.target);

			const response = await fetch("https://formsubmit.co/aakashportfolio03@gmail.com", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				setSuccess("Your message has been sent successfully!");
				setFormData({ name: "", email: "", phone: "", description: "" });
			} else {
				throw new Error("Failed to send message");
			}
		} catch (error) {
			alert("Error sending email. Please try again!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Heads logo={<HiOutlineMail size={30} />} title={"CONTACT"} />
			<div className="max-w-lg mx-auto p-6 bg-[#1a1a1a] rounded-2xl shadow-xl mt-6">
				<form onSubmit={handleSubmit} className="space-y-6 mt-4">
					<input type="hidden" name="_captcha" value="false" />
					<input type="hidden" name="_next" value="https://yourwebsite.com/thank-you" />

					<div>
						<label className="block text-gray-300 font-medium mb-1">Name*</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full p-3 border rounded-lg bg-gray-800 text-white"
							placeholder="Enter your name"
							required
						/>
						{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
					</div>

					<div>
						<label className="block text-gray-300 font-medium mb-1">Email*</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full p-3 border rounded-lg bg-gray-800 text-white"
							placeholder="Enter your email"
							required
						/>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
					</div>

					<div>
						<label className="block text-gray-300 font-medium mb-1">Phone</label>
						<input
							type="tel"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							className="w-full p-3 border rounded-lg bg-gray-800 text-white"
							placeholder="Enter your phone number"
						/>
					</div>

					<div>
						<label className="block text-gray-300 font-medium mb-1">Description</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							className="w-full p-3 border rounded-lg bg-gray-800 text-white h-28 resize-none"
							placeholder="Enter your message..."
							required
						></textarea>
					</div>

					<button
						type="submit"
						className="w-full bg-[#47e5c3] text-black font-semibold py-3 rounded-lg hover:bg-[#3ac3a5] transition duration-300"
						disabled={loading}
					>
						{loading ? "Sending..." : "Submit"}
					</button>

					{success && <p className="text-green-500 text-sm mt-2">{success}</p>}
				</form>
			</div>
		</>
	);
};

export default Contact;
