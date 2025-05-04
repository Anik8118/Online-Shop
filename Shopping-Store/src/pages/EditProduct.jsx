import { useState } from "react";
import { useNavigate } from "react-router";
import { useEditProductMutation } from "../features/api/apiSlice";

function EditProduct({ item }) {
	const [editProduct] = useEditProductMutation();
	const navigate = useNavigate();

	const [product, setProduct] = useState({
		title: item.title,
		price: item.price,
		image: item.image,
		description: item.description,
	});

	const handleChange = (e) => {
		setProduct({
			...product,
			[e.target.name]:
				e.target.name === "price"
					? Number(e.target.value)
					: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!product.image) {
			alert("Image is uploading, please wait...");
			return;
		}

		try {
			await editProduct({ ...product, id: item.id }); // pass ID to mutation
			navigate("/"); // go back after edit
		} catch (err) {
			console.error("Failed to edit product:", err);
		}
	};

	return (
		<form
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
			}}
			onSubmit={handleSubmit}
		>
			<p>Title:</p>
			<input
				value={product.title}
				onChange={handleChange}
				name="title"
				style={{ display: "block", width: "80%" }}
				required
			/>

			<p>Price:</p>
			<input
				value={product.price}
				onChange={handleChange}
				name="price"
				type="number"
				style={{ display: "block", width: "80%" }}
				required
			/>

			<p>Description:</p>
			<input
				value={product.description}
				onChange={handleChange}
				name="description"
				type="text"
				style={{ display: "block", width: "80%" }}
				required
			/>

			<p>Image Preview:</p>
			{product.image && (
				<img
					src={product.image}
					alt="Product"
					style={{ width: "100px", height: "100px" }}
				/>
			)}

			<input
				type="file"
				name="image"
			/>

			<br />
			<input type="submit" value="Save" />
		</form>
	);
}

export default EditProduct;
