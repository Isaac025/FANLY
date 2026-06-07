import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

const initialForm = {
  name: "",
  title: "",
  location: "",
  category: "",
  bookingFee: "",
  image: "",
  description: "",
};

const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const formData = new FormData();

  formData.append("file", file);

  try {
    const { data } = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setFormData((prev) => ({
      ...prev,
      image: data.imageUrl,
    }));

    toast.success("Image uploaded");
  } catch (error) {
    toast.error("Upload failed");
  }
};

export default function AdminCelebrities() {
  const [celebrities, setCelebrities] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCelebrities = async () => {
    try {
      const { data } = await axiosInstance.get("/celebrities");
      setCelebrities(data.data?.celebrities || data.data || []);
    } catch (error) {
      toast.error(error.message || "Could not fetch celebrities");
    }
  };

  useEffect(() => {
    fetchCelebrities();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      const { data } = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData((prev) => ({
        ...prev,
        image: data.imageUrl,
      }));

      toast.success("Image uploaded");
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        const { data } = await axiosInstance.put(
          `/celebrities/${editingId}`,
          formData,
        );

        toast.success(data.message || "Celebrity updated successfully");
      } else {
        const { data } = await axiosInstance.post("/celebrities", formData);

        toast.success(data.message || "Celebrity created successfully");
      }

      resetForm();
      fetchCelebrities();
    } catch (error) {
      toast.error(error.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (celebrity) => {
    setEditingId(celebrity._id);

    setFormData({
      name: celebrity.name || "",
      title: celebrity.title || "",
      location: celebrity.location || "",
      category: celebrity.category || "",
      bookingFee: celebrity.bookingFee || "",
      image: celebrity.image || celebrity.img || "",
      description: celebrity.description || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this celebrity?",
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axiosInstance.delete(`/celebrities/${id}`);

      toast.success(data.message || "Celebrity deleted successfully");
      fetchCelebrities();
    } catch (error) {
      toast.error(error.message || "Could not delete celebrity");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Celebrities</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 mb-8"
      >
        <h2 className="text-lg font-semibold mb-5">
          {editingId ? "Edit Celebrity" : "Add Celebrity"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="May Rice"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Actor"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Austin Texas"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Actor"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="bookingFee"
              value={formData.bookingFee}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {formData.image && (
              <img
                src={formData.image}
                alt=""
                className="w-32 h-32 rounded-lg object-cover mt-3"
              />
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded px-3 py-2"
            placeholder="Short celebrity description"
          />
        </div>

        <div className="flex gap-3 mt-5">
          <button
            disabled={loading}
            className="bg-[#1D4996] text-white px-5 py-2 rounded disabled:opacity-70"
          >
            {loading
              ? "Saving..."
              : editingId
                ? "Update Celebrity"
                : "Create Celebrity"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border px-5 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-212.5">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Title</th>
              <th className="p-4">Location</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {celebrities.length === 0 ? (
              <tr>
                <td className="p-5 text-center text-gray-500" colSpan="6">
                  No celebrities found.
                </td>
              </tr>
            ) : (
              celebrities.map((celebrity) => (
                <tr key={celebrity._id} className="border-t">
                  <td className="p-4">
                    {celebrity.image || celebrity.img ? (
                      <img
                        src={celebrity.image || celebrity.img}
                        alt={celebrity.name}
                        className="w-14 h-14 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                        {celebrity.name?.[0]}
                      </div>
                    )}
                  </td>

                  <td className="p-4 font-medium">{celebrity.name}</td>
                  <td className="p-4">{celebrity.title}</td>
                  <td className="p-4">{celebrity.location}</td>
                  <td className="p-4">
                    ${Number(celebrity.bookingFee || 0).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(celebrity)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(celebrity._id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
