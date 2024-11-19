import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarComp";
import { Pencil, Trash } from "lucide-react";
import EditCategoryModal from "../models/EditCategoryModal";

const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  });

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/categories/${id}`,
          {
            headers: getAuthHeaders(),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch category details");
        }

        const data = await response.json();
        setCategory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  const handleEditSuccess = (updatedCategory) => {
    setCategory(updatedCategory); // Update local state with new details
    alert("Category updated successfully!");
  };

  const handleDeleteCategory = async () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/categories/${id}`,
          {
            method: "DELETE",
            headers: getAuthHeaders(),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete category");
        }

        alert("Category deleted successfully");
        navigate("/select-category");
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-gray-600">
            Loading category details...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800">{category.name}</h1>
          <p className="text-gray-600 mt-4">{category.description}</p>
          {category.imageUrl && (
            <img
              src={category.imageUrl}
              alt={category.name}
              className="mt-4 w-full h-auto max-h-96 object-cover rounded-lg"
            />
          )}

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setEditModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Pencil className="h-5 w-5" />
              Edit Category
            </button>
            <button
              onClick={handleDeleteCategory}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash className="h-5 w-5" />
              Delete Category
            </button>
          </div>
        </div>
      </div>
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        categoryId={id}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default CategoryDetails;
